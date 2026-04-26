import { useState } from 'react';
import { useFirestore } from './useFirestore';
import { uploadToCloudinary } from './cloudinary';
import { LogOut, Save, Upload, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Props { email: string; onLogout: () => void; }

// ── Tipi dati ─────────────────────────────────────────────────────────────────
interface InfoData {
  nome: string; indirizzo: string; telefono: string; email: string;
  orari: string; thefork: string; instagram: string; facebook: string;
}
interface HomeData {
  tagline: string; sottotitolo: string;
  piatto1: { nome: string; desc: string; prezzo: string; img: string };
  piatto2: { nome: string; desc: string; prezzo: string; img: string };
  piatto3: { nome: string; desc: string; prezzo: string; img: string };
}
interface EventoItem { titolo: string; data: string; desc: string; img: string }
interface GalleriaData { foto: string[] }

// ── Fallback ──────────────────────────────────────────────────────────────────
const infoFallback: InfoData = {
  nome: 'Buatt', indirizzo: 'Corso Umberto I, 16 — 84025 Eboli (SA)',
  telefono: '334 190 6133', email: 'ciao@buatt.it',
  orari: 'Mar-Dom: 18:30 – 00:00 · Lun: chiuso',
  thefork: '', instagram: 'https://www.instagram.com/buatt_bistro/',
  facebook: 'https://www.facebook.com/Buatt',
};
const homeFallback: HomeData = {
  tagline: 'Global Street, Local Soul.', sottotitolo: 'Bistrò + pub a Eboli dal 2014.',
  piatto1: { nome: 'Buatt', desc: '', prezzo: '13', img: '' },
  piatto2: { nome: 'Tagliata di vitello', desc: '', prezzo: '20', img: '' },
  piatto3: { nome: 'Bun Crock Thai', desc: '', prezzo: '10', img: '' },
};

// ── Componenti helper ─────────────────────────────────────────────────────────
function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-2 border-mocha/20 mb-4">
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-kraft-dark px-5 py-4 font-display text-sm tracking-widest text-mocha hover:bg-kraft">
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', rows }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; rows?: number;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-mocha/60">{label}</label>
      {rows ? (
        <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)}
          className="w-full border-2 border-mocha/20 bg-white/50 px-3 py-2 font-sans text-sm text-mocha outline-none focus:border-brick" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full border-2 border-mocha/20 bg-white/50 px-3 py-2 font-sans text-sm text-mocha outline-none focus:border-brick" />
      )}
    </div>
  );
}

function ImgUpload({ label, url, onUploaded }: { label: string; url: string; onUploaded: (u: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try { onUploaded(await uploadToCloudinary(file)); } catch { alert('Upload fallito'); }
    setUploading(false);
  };
  return (
    <div className="mb-4">
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-mocha/60">{label}</label>
      {url && <img src={url} alt="" className="mb-2 h-24 w-auto border-2 border-mocha/20 object-cover" />}
      <label className="inline-flex cursor-pointer items-center gap-2 border-2 border-mocha bg-kraft px-4 py-2 font-mono text-xs uppercase tracking-widest text-mocha hover:bg-kraft-dark">
        <Upload size={13} /> {uploading ? 'Caricamento...' : 'Carica foto'}
        <input type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} />
      </label>
    </div>
  );
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="inline-flex items-center gap-2 border-2 border-mocha bg-brick px-6 py-2 font-display text-xs tracking-widest text-kraft-light hover:bg-brick/80 disabled:opacity-50">
      <Save size={14} /> {saving ? 'Salvataggio...' : 'SALVA'}
    </button>
  );
}

// ── PANEL PRINCIPALE ──────────────────────────────────────────────────────────
export default function AdminPanel({ email, onLogout }: Props) {
  // Info & Orari
  const { data: info, save: saveInfo } = useFirestore<InfoData>('info', infoFallback);
  const [infoLocal, setInfoLocal] = useState<InfoData | null>(null);
  const infoD = infoLocal ?? info;
  const [savingInfo, setSavingInfo] = useState(false);

  // Home
  const { data: home, save: saveHome } = useFirestore<HomeData>('home', homeFallback);
  const [homeLocal, setHomeLocal] = useState<HomeData | null>(null);
  const homeD = homeLocal ?? home;
  const [savingHome, setSavingHome] = useState(false);

  // Galleria
  const { data: galleria, save: saveGalleria } = useFirestore<GalleriaData>('galleria', { foto: [] });
  const [galLocal, setGalLocal] = useState<GalleriaData | null>(null);
  const galD = galLocal ?? galleria;
  const [savingGal, setSavingGal] = useState(false);
  const [uploadingGal, setUploadingGal] = useState(false);

  // Eventi
  const { data: eventiData, save: saveEventi } = useFirestore<{ eventi: EventoItem[] }>('eventi', { eventi: [] });
  const [evtLocal, setEvtLocal] = useState<{ eventi: EventoItem[] } | null>(null);
  const evtD = evtLocal ?? eventiData;
  const [savingEvt, setSavingEvt] = useState(false);

  const saveWithFlag = async <T,>(fn: (v: T) => Promise<void>, val: T, set: (b: boolean) => void) => {
    set(true); try { await fn(val); } catch { alert('Errore nel salvataggio'); } set(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-kraft">
      {/* Header */}
      <header className="border-b-2 border-mocha/20 bg-mocha px-5 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <p className="font-display text-xl tracking-widest text-kraft-light">BUATT</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-mustard">Pannello Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] text-kraft-light/40 sm:block">{email}</span>
            <button onClick={onLogout}
              className="inline-flex items-center gap-2 border border-kraft-light/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-kraft-light/60 hover:text-brick">
              <LogOut size={12} /> Esci
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* ── INFO & ORARI ── */}
        <Section title="Info & Orari" defaultOpen>
          <div className="grid gap-0 sm:grid-cols-2 sm:gap-4">
            <Field label="Nome ristorante" value={infoD.nome} onChange={v => setInfoLocal({ ...infoD, nome: v })} />
            <Field label="Telefono" value={infoD.telefono} onChange={v => setInfoLocal({ ...infoD, telefono: v })} />
            <Field label="Indirizzo" value={infoD.indirizzo} onChange={v => setInfoLocal({ ...infoD, indirizzo: v })} />
            <Field label="Email" value={infoD.email} type="email" onChange={v => setInfoLocal({ ...infoD, email: v })} />
            <Field label="Instagram URL" value={infoD.instagram} onChange={v => setInfoLocal({ ...infoD, instagram: v })} />
            <Field label="Facebook URL" value={infoD.facebook} onChange={v => setInfoLocal({ ...infoD, facebook: v })} />
            <Field label="TheFork URL" value={infoD.thefork} onChange={v => setInfoLocal({ ...infoD, thefork: v })} />
          </div>
          <Field label="Orari (testo libero)" value={infoD.orari} rows={3} onChange={v => setInfoLocal({ ...infoD, orari: v })} />
          <SaveBtn onClick={() => saveWithFlag(saveInfo, infoD, setSavingInfo)} saving={savingInfo} />
        </Section>

        {/* ── HOME ── */}
        <Section title="Home — Tagline & Piatti in evidenza">
          <Field label="Tagline principale" value={homeD.tagline} onChange={v => setHomeLocal({ ...homeD, tagline: v })} />
          <Field label="Sottotitolo" value={homeD.sottotitolo} onChange={v => setHomeLocal({ ...homeD, sottotitolo: v })} />

          {([1, 2, 3] as const).map(n => {
            const key = `piatto${n}` as 'piatto1' | 'piatto2' | 'piatto3';
            const p = homeD[key];
            return (
              <div key={n} className="mb-6 border-l-4 border-mustard pl-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-mocha/60">Piatto {n}</p>
                <Field label="Nome" value={p.nome} onChange={v => setHomeLocal({ ...homeD, [key]: { ...p, nome: v } })} />
                <Field label="Descrizione" value={p.desc} rows={2} onChange={v => setHomeLocal({ ...homeD, [key]: { ...p, desc: v } })} />
                <Field label="Prezzo (€)" value={p.prezzo} onChange={v => setHomeLocal({ ...homeD, [key]: { ...p, prezzo: v } })} />
                <ImgUpload label="Foto piatto" url={p.img} onUploaded={u => setHomeLocal({ ...homeD, [key]: { ...p, img: u } })} />
              </div>
            );
          })}
          <SaveBtn onClick={() => saveWithFlag(saveHome, homeD, setSavingHome)} saving={savingHome} />
        </Section>

        {/* ── GALLERIA ── */}
        <Section title="Galleria Foto">
          <div className="mb-4 flex flex-wrap gap-2">
            {galD.foto.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="" className="h-20 w-20 border-2 border-mocha/20 object-cover" />
                <button onClick={() => setGalLocal({ foto: galD.foto.filter((_, j) => j !== i) })}
                  className="absolute right-0 top-0 bg-brick p-0.5 text-kraft-light hover:bg-brick/80">
                  <Trash2 size={10} />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 border-2 border-mocha bg-kraft px-4 py-2 font-mono text-xs uppercase tracking-widest text-mocha hover:bg-kraft-dark">
            <Plus size={13} /> {uploadingGal ? 'Caricamento...' : 'Aggiungi foto'}
            <input type="file" accept="image/*" multiple className="hidden" disabled={uploadingGal}
              onChange={async e => {
                const files = Array.from(e.target.files ?? []);
                setUploadingGal(true);
                const urls = await Promise.all(files.map(f => uploadToCloudinary(f)));
                setGalLocal({ foto: [...galD.foto, ...urls] });
                setUploadingGal(false);
              }} />
          </label>
          <div className="mt-4">
            <SaveBtn onClick={() => saveWithFlag(saveGalleria, galD, setSavingGal)} saving={savingGal} />
          </div>
        </Section>

        {/* ── EVENTI ── */}
        <Section title="Eventi & Locandine">
          {evtD.eventi.map((ev, i) => (
            <div key={i} className="mb-6 border-l-4 border-brick pl-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-mocha/60">Evento {i + 1}</p>
                <button onClick={() => setEvtLocal({ eventi: evtD.eventi.filter((_, j) => j !== i) })}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-brick hover:underline">
                  <Trash2 size={10} /> Rimuovi
                </button>
              </div>
              <Field label="Titolo" value={ev.titolo}
                onChange={v => setEvtLocal({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, titolo: v } : e) })} />
              <Field label="Data / Orario" value={ev.data}
                onChange={v => setEvtLocal({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, data: v } : e) })} />
              <Field label="Descrizione" value={ev.desc} rows={2}
                onChange={v => setEvtLocal({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, desc: v } : e) })} />
              <ImgUpload label="Locandina" url={ev.img}
                onUploaded={u => setEvtLocal({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, img: u } : e) })} />
            </div>
          ))}
          <button onClick={() => setEvtLocal({ eventi: [...evtD.eventi, { titolo: '', data: '', desc: '', img: '' }] })}
            className="inline-flex items-center gap-2 border-2 border-mocha px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-mocha hover:bg-kraft-dark">
            <Plus size={12} /> Aggiungi evento
          </button>
          <div className="mt-4">
            <SaveBtn onClick={() => saveWithFlag(saveEventi, evtD, setSavingEvt)} saving={savingEvt} />
          </div>
        </Section>

      </main>
    </div>
  );
}
