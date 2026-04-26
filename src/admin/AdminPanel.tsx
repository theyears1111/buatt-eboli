import { useState } from 'react';
import { useFirestore } from './useFirestore';
import { uploadToCloudinary } from './cloudinary';
import { menu as staticMenu, type MenuCategory, type MenuItem } from '../data/menu';
import { LogOut, Save, Upload, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Props { email: string; onLogout: () => void; }

interface InfoData { nome: string; indirizzo: string; telefono: string; email: string; orari: string; thefork: string; instagram: string; facebook: string; }
interface HomeData { tagline: string; sottotitolo: string; piatto1: PiattoData; piatto2: PiattoData; piatto3: PiattoData; }
interface PiattoData { nome: string; desc: string; prezzo: string; img: string; }
interface RecensioneItem { q: string; n: string; }
interface EventoItem { titolo: string; data: string; desc: string; img: string; }
interface AboutData { titolo: string; sottotitolo: string; storia_p1: string; storia_p2: string; storia_p3: string; storia_p4: string; ingredienti: string; }

const infoFB: InfoData = { nome: 'Buatt', indirizzo: 'Corso Umberto I, 16 — 84025 Eboli (SA)', telefono: '334 190 6133', email: 'ciao@buatt.it', orari: 'Mar–Gio: 18:30–00:00 · Ven–Sab: 18:30–02:00 · Dom: 12:30–15:00 e 18:30–00:00 · Lun: chiuso', thefork: '', instagram: '', facebook: '' };
const homeFB: HomeData = { tagline: 'Global Street, Local Soul.', sottotitolo: 'Bistrò + pub a Eboli dal 2014.', piatto1: { nome: 'Buatt', desc: '', prezzo: '13', img: '' }, piatto2: { nome: 'Tagliata di vitello', desc: '', prezzo: '20', img: '' }, piatto3: { nome: 'Bun Crock Thai', desc: '', prezzo: '10', img: '' } };
const aboutFB: AboutData = { titolo: 'COMUNQUE LA GENTE\nNON STA BENE.', sottotitolo: 'noi siamo in ferie... scherziamo.', storia_p1: 'Di chiamare le cose con il loro nome convenzionale.', storia_p2: "Buatt nasce nel 2014 a Eboli da un'idea semplice.", storia_p3: 'Global. Street. Local. Soul.', storia_p4: "L'essenza non ha bisogno di filtri.", ingredienti: 'Bufala campana, Pane lievitato 24h, Aglianico del Vulture, Carne italiana, Birre artigianali, Erbe spontanee' };

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-2 border-mocha/20 mb-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between bg-kraft-dark px-5 py-4 font-display text-sm tracking-widest text-mocha hover:bg-kraft">
        {title} {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', rows }: { label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number }) {
  return (
    <div className="mb-4">
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-mocha/60">{label}</label>
      {rows
        ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} className="w-full border-2 border-mocha/20 bg-white/50 px-3 py-2 font-sans text-sm text-mocha outline-none focus:border-brick" />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full border-2 border-mocha/20 bg-white/50 px-3 py-2 font-sans text-sm text-mocha outline-none focus:border-brick" />}
    </div>
  );
}

function ImgUpload({ label, url, onUploaded }: { label: string; url: string; onUploaded: (u: string) => void }) {
  const [up, setUp] = useState(false);
  return (
    <div className="mb-4">
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-mocha/60">{label}</label>
      {url && <img src={url} alt="" className="mb-2 h-24 w-auto border-2 border-mocha/20 object-cover" />}
      <label className="inline-flex cursor-pointer items-center gap-2 border-2 border-mocha bg-kraft px-4 py-2 font-mono text-xs uppercase tracking-widest text-mocha hover:bg-kraft-dark">
        <Upload size={13} /> {up ? 'Caricamento...' : 'Carica foto'}
        <input type="file" accept="image/*" className="hidden" disabled={up} onChange={async e => { const f = e.target.files?.[0]; if (!f) return; setUp(true); try { onUploaded(await uploadToCloudinary(f)); } catch { alert('Upload fallito'); } setUp(false); }} />
      </label>
    </div>
  );
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button onClick={onClick} disabled={saving} className="inline-flex items-center gap-2 border-2 border-mocha bg-brick px-6 py-2 font-display text-xs tracking-widest text-kraft-light hover:bg-brick/80 disabled:opacity-50">
      <Save size={14} /> {saving ? 'Salvataggio...' : 'SALVA'}
    </button>
  );
}

async function doSave<T>(fn: (v: T) => Promise<void>, val: T, set: (b: boolean) => void) {
  set(true); try { await fn(val); } catch { alert('Errore salvataggio'); } set(false);
}

export default function AdminPanel({ email, onLogout }: Props) {
  const { data: info,    save: saveInfo    } = useFirestore<InfoData>('info', infoFB);
  const { data: home,    save: saveHome    } = useFirestore<HomeData>('home', homeFB);
  const { data: recData, save: saveRec     } = useFirestore<{ recensioni: RecensioneItem[] }>('recensioni', { recensioni: [{ q: 'Atmosfera incredibile.', n: 'Marco R.' }, { q: 'Cocktail curatissimi.', n: 'Giulia D.' }, { q: 'Underground, intimo, gourmet.', n: 'Antonio P.' }] });
  const { data: galData, save: saveGal     } = useFirestore<{ foto: string[] }>('galleria', { foto: [] });
  const { data: evtData, save: saveEvt     } = useFirestore<{ eventi: EventoItem[] }>('eventi', { eventi: [] });
  const { data: about,   save: saveAbout   } = useFirestore<AboutData>('about', aboutFB);
  const { data: menuData, save: saveMenu   } = useFirestore<{ categorie: MenuCategory[]; coperto: string }>('menu', { categorie: staticMenu, coperto: '2' });

  const [infoL,  setInfoL]  = useState<InfoData | null>(null);
  const [homeL,  setHomeL]  = useState<HomeData | null>(null);
  const [recL,   setRecL]   = useState<{ recensioni: RecensioneItem[] } | null>(null);
  const [galL,   setGalL]   = useState<{ foto: string[] } | null>(null);
  const [evtL,   setEvtL]   = useState<{ eventi: EventoItem[] } | null>(null);
  const [aboutL, setAboutL] = useState<AboutData | null>(null);
  const [menuL,  setMenuL]  = useState<{ categorie: MenuCategory[]; coperto: string } | null>(null);

  const [sInfo, setSInfo]   = useState(false);
  const [sHome, setSHome]   = useState(false);
  const [sRec,  setSRec]    = useState(false);
  const [sGal,  setSGal]    = useState(false);
  const [sEvt,  setSEvt]    = useState(false);
  const [sAbout, setSAbout] = useState(false);
  const [sMenu, setSMenu]   = useState(false);
  const [upGal, setUpGal]   = useState(false);
  const [activeCat, setActiveCat] = useState(0);

  const infoD  = infoL  ?? info;
  const homeD  = homeL  ?? home;
  const recD   = recL   ?? recData;
  const galD   = galL   ?? galData;
  const evtD   = evtL   ?? evtData;
  const aboutD = aboutL ?? about;
  const menuD  = menuL  ?? menuData;
  const cats   = (menuD.categorie?.length > 0) ? menuD.categorie : staticMenu;

  const updateItem = (ci: number, ii: number, f: keyof MenuItem, v: string) =>
    setMenuL({ ...menuD, categorie: cats.map((c, cIdx) => cIdx !== ci ? c : { ...c, items: c.items.map((it, iIdx) => iIdx !== ii ? it : { ...it, [f]: v }) }) });
  const updateCat = (ci: number, f: keyof MenuCategory, v: string) =>
    setMenuL({ ...menuD, categorie: cats.map((c, cIdx) => cIdx !== ci ? c : { ...c, [f]: v }) });
  const addItem = (ci: number) =>
    setMenuL({ ...menuD, categorie: cats.map((c, cIdx) => cIdx !== ci ? c : { ...c, items: [...c.items, { name: 'Nuovo piatto', description: '', price: '0' }] }) });
  const removeItem = (ci: number, ii: number) =>
    setMenuL({ ...menuD, categorie: cats.map((c, cIdx) => cIdx !== ci ? c : { ...c, items: c.items.filter((_, iIdx) => iIdx !== ii) }) });

  return (
    <div className="min-h-screen bg-kraft">
      <header className="border-b-2 border-mocha/20 bg-mocha px-5 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <p className="font-display text-xl tracking-widest text-kraft-light">BUATT</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-mustard">Pannello Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] text-kraft-light/40 sm:block">{email}</span>
            <button onClick={onLogout} className="inline-flex items-center gap-2 border border-kraft-light/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-kraft-light/60 hover:text-brick">
              <LogOut size={12} /> Esci
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* INFO */}
        <Section title="Info & Orari" defaultOpen>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nome" value={infoD.nome} onChange={v => setInfoL({ ...infoD, nome: v })} />
            <Field label="Telefono" value={infoD.telefono} onChange={v => setInfoL({ ...infoD, telefono: v })} />
            <Field label="Indirizzo" value={infoD.indirizzo} onChange={v => setInfoL({ ...infoD, indirizzo: v })} />
            <Field label="Email" value={infoD.email} type="email" onChange={v => setInfoL({ ...infoD, email: v })} />
            <Field label="Instagram URL" value={infoD.instagram} onChange={v => setInfoL({ ...infoD, instagram: v })} />
            <Field label="Facebook URL" value={infoD.facebook} onChange={v => setInfoL({ ...infoD, facebook: v })} />
            <Field label="TheFork URL" value={infoD.thefork} onChange={v => setInfoL({ ...infoD, thefork: v })} />
          </div>
          <p className="mb-1 font-mono text-[10px] text-mocha/40">Orari: separa con · (punto centrale, copia questo: ·)</p>
          <Field label="Orari" value={infoD.orari} rows={3} onChange={v => setInfoL({ ...infoD, orari: v })} />
          <SaveBtn onClick={() => doSave(saveInfo, infoD, setSInfo)} saving={sInfo} />
        </Section>

        {/* HOME */}
        <Section title="Home — Tagline & Piatti in evidenza">
          <Field label="Tagline principale" value={homeD.tagline} onChange={v => setHomeL({ ...homeD, tagline: v })} />
          <Field label="Sottotitolo" value={homeD.sottotitolo} onChange={v => setHomeL({ ...homeD, sottotitolo: v })} />
          {(['piatto1', 'piatto2', 'piatto3'] as const).map((key, n) => {
            const p = homeD[key];
            return (
              <div key={key} className="mb-6 border-l-4 border-mustard pl-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-mocha/60">Piatto in evidenza {n + 1}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nome" value={p.nome} onChange={v => setHomeL({ ...homeD, [key]: { ...p, nome: v } })} />
                  <Field label="Prezzo (€)" value={p.prezzo} onChange={v => setHomeL({ ...homeD, [key]: { ...p, prezzo: v } })} />
                </div>
                <Field label="Descrizione" value={p.desc} rows={2} onChange={v => setHomeL({ ...homeD, [key]: { ...p, desc: v } })} />
                <ImgUpload label="Foto piatto" url={p.img} onUploaded={u => setHomeL({ ...homeD, [key]: { ...p, img: u } })} />
              </div>
            );
          })}
          <SaveBtn onClick={() => doSave(saveHome, homeD, setSHome)} saving={sHome} />
        </Section>

        {/* RECENSIONI */}
        <Section title="Recensioni (Home)">
          {recD.recensioni.map((r, i) => (
            <div key={i} className="mb-5 border-l-4 border-teal pl-4">
              <div className="flex justify-between mb-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-mocha/60">Recensione {i + 1}</p>
                <button onClick={() => setRecL({ recensioni: recD.recensioni.filter((_, j) => j !== i) })} className="flex items-center gap-1 font-mono text-[10px] text-brick hover:underline"><Trash2 size={10} /> Rimuovi</button>
              </div>
              <Field label="Testo" value={r.q} rows={2} onChange={v => setRecL({ recensioni: recD.recensioni.map((x, j) => j === i ? { ...x, q: v } : x) })} />
              <Field label="Nome autore" value={r.n} onChange={v => setRecL({ recensioni: recD.recensioni.map((x, j) => j === i ? { ...x, n: v } : x) })} />
            </div>
          ))}
          <button onClick={() => setRecL({ recensioni: [...recD.recensioni, { q: '', n: '' }] })} className="mb-4 inline-flex items-center gap-2 border-2 border-mocha px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-mocha hover:bg-kraft-dark"><Plus size={12} /> Aggiungi</button>
          <div><SaveBtn onClick={() => doSave(saveRec, recD, setSRec)} saving={sRec} /></div>
        </Section>

        {/* GALLERIA */}
        <Section title="Galleria Foto">
          <div className="mb-4 flex flex-wrap gap-2">
            {galD.foto.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="" className="h-20 w-20 border-2 border-mocha/20 object-cover" />
                <button onClick={() => setGalL({ foto: galD.foto.filter((_, j) => j !== i) })} className="absolute right-0 top-0 bg-brick p-0.5 text-kraft-light"><Trash2 size={10} /></button>
              </div>
            ))}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 border-2 border-mocha bg-kraft px-4 py-2 font-mono text-xs uppercase tracking-widest text-mocha hover:bg-kraft-dark">
            <Plus size={13} /> {upGal ? 'Caricamento...' : 'Aggiungi foto'}
            <input type="file" accept="image/*" multiple className="hidden" disabled={upGal} onChange={async e => { const files = Array.from(e.target.files ?? []); setUpGal(true); const urls = await Promise.all(files.map(f => uploadToCloudinary(f))); setGalL({ foto: [...galD.foto, ...urls] }); setUpGal(false); }} />
          </label>
          <div className="mt-4"><SaveBtn onClick={() => doSave(saveGal, galD, setSGal)} saving={sGal} /></div>
        </Section>

        {/* EVENTI */}
        <Section title="Eventi & Locandine">
          {evtD.eventi.map((ev, i) => (
            <div key={i} className="mb-6 border-l-4 border-brick pl-4">
              <div className="flex justify-between mb-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-mocha/60">Evento {i + 1}</p>
                <button onClick={() => setEvtL({ eventi: evtD.eventi.filter((_, j) => j !== i) })} className="flex items-center gap-1 font-mono text-[10px] text-brick hover:underline"><Trash2 size={10} /> Rimuovi</button>
              </div>
              <Field label="Titolo" value={ev.titolo} onChange={v => setEvtL({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, titolo: v } : e) })} />
              <Field label="Data / Orario" value={ev.data} onChange={v => setEvtL({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, data: v } : e) })} />
              <Field label="Descrizione" value={ev.desc} rows={2} onChange={v => setEvtL({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, desc: v } : e) })} />
              <ImgUpload label="Locandina" url={ev.img} onUploaded={u => setEvtL({ eventi: evtD.eventi.map((e, j) => j === i ? { ...e, img: u } : e) })} />
            </div>
          ))}
          <button onClick={() => setEvtL({ eventi: [...evtD.eventi, { titolo: '', data: '', desc: '', img: '' }] })} className="inline-flex items-center gap-2 border-2 border-mocha px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-mocha hover:bg-kraft-dark"><Plus size={12} /> Aggiungi evento</button>
          <div className="mt-4"><SaveBtn onClick={() => doSave(saveEvt, evtD, setSEvt)} saving={sEvt} /></div>
        </Section>

        {/* ABOUT */}
        <Section title="Storia (Chi Siamo)">
          <Field label="Titolo grande (\\n = a capo)" value={aboutD.titolo} rows={2} onChange={v => setAboutL({ ...aboutD, titolo: v })} />
          <Field label="Sottotitolo" value={aboutD.sottotitolo} onChange={v => setAboutL({ ...aboutD, sottotitolo: v })} />
          <div className="my-3 h-px bg-mocha/10" />
          <Field label="Paragrafo 1 (corsivo grande)" value={aboutD.storia_p1} rows={2} onChange={v => setAboutL({ ...aboutD, storia_p1: v })} />
          <Field label="Paragrafo 2" value={aboutD.storia_p2} rows={3} onChange={v => setAboutL({ ...aboutD, storia_p2: v })} />
          <Field label="Paragrafo 3 (bold rosso)" value={aboutD.storia_p3} rows={2} onChange={v => setAboutL({ ...aboutD, storia_p3: v })} />
          <Field label="Paragrafo 4" value={aboutD.storia_p4} rows={3} onChange={v => setAboutL({ ...aboutD, storia_p4: v })} />
          <p className="mb-1 font-mono text-[10px] text-mocha/40">Materie prime: separate da virgola</p>
          <Field label="Materie prime" value={aboutD.ingredienti} rows={2} onChange={v => setAboutL({ ...aboutD, ingredienti: v })} />
          <SaveBtn onClick={() => doSave(saveAbout, aboutD, setSAbout)} saving={sAbout} />
        </Section>

        {/* MENU */}
        <Section title="Menu — Prezzi & Piatti">
          <div className="mb-4 max-w-xs">
            <Field label="Coperto (€)" value={menuD.coperto ?? '2'} onChange={v => setMenuL({ ...menuD, coperto: v })} />
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {cats.map((c, i) => (
              <button key={c.id} onClick={() => setActiveCat(i)}
                className={`border-2 border-mocha px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${activeCat === i ? 'bg-brick text-kraft-light' : 'bg-kraft text-mocha hover:bg-kraft-dark'}`}>
                {c.name}
              </button>
            ))}
          </div>
          {cats[activeCat] && (
            <div>
              <div className="mb-4 grid sm:grid-cols-2 gap-3">
                <Field label="Nome categoria" value={cats[activeCat].name} onChange={v => updateCat(activeCat, 'name', v)} />
                <Field label="Sottotitolo categoria" value={cats[activeCat].subtitle} onChange={v => updateCat(activeCat, 'subtitle', v)} />
              </div>
              {cats[activeCat].items.map((item, ii) => (
                <div key={ii} className="mb-4 border-l-4 border-mustard pl-4">
                  <div className="flex justify-between mb-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-mocha/50">{item.name || `Piatto ${ii + 1}`}</p>
                    <button onClick={() => removeItem(activeCat, ii)} className="flex items-center gap-1 font-mono text-[10px] text-brick hover:underline"><Trash2 size={10} /> Rimuovi</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Nome" value={item.name} onChange={v => updateItem(activeCat, ii, 'name', v)} />
                    <Field label="Prezzo €" value={item.price} onChange={v => updateItem(activeCat, ii, 'price', v)} />
                  </div>
                  <Field label="Descrizione" value={item.description} rows={2} onChange={v => updateItem(activeCat, ii, 'description', v)} />
                  <Field label="Tag (es: Top, Chef — lascia vuoto se nessuno)" value={item.tag ?? ''} onChange={v => updateItem(activeCat, ii, 'tag', v)} />
                </div>
              ))}
              <button onClick={() => addItem(activeCat)} className="mb-4 inline-flex items-center gap-2 border-2 border-mocha px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-mocha hover:bg-kraft-dark"><Plus size={12} /> Aggiungi piatto</button>
            </div>
          )}
          <SaveBtn onClick={() => doSave(saveMenu, menuD, setSMenu)} saving={sMenu} />
          <p className="mt-2 font-mono text-[10px] text-mocha/40">⚠ Il salva aggiorna tutte le categorie insieme</p>
        </Section>

      </main>
    </div>
  );
}