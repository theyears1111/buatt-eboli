import { Clock, MapPin, Phone, Send } from "lucide-react";
import { useRef } from "react";
import posterPrenota from "../assets/poster-prenota.jpg";
import { useFirestore } from "../admin/useFirestore";

const WHATSAPP_FALLBACK = "393341906133";

interface InfoData {
  nome: string; indirizzo: string; telefono: string; email: string;
  orari: string; instagram: string; facebook: string; thefork: string;
}

const infoFallback: InfoData = {
  nome: 'Buatt',
  indirizzo: 'Corso Umberto I, 16 — 84025 Eboli (SA)',
  telefono: '334 190 6133',
  email: 'ciao@buatt.it',
  orari: 'Mar–Gio: 18:30–00:00 · Ven–Sab: 18:30–02:00 · Dom: 12:30–15:00 e 18:30–00:00 · Lun: chiuso',
  instagram: '', facebook: '', thefork: '',
};

export default function Contact() {
  const { data: info } = useFirestore<InfoData>('info', infoFallback);

  const nameRef   = useRef<HTMLInputElement>(null);
  const phoneRef  = useRef<HTMLInputElement>(null);
  const dateRef   = useRef<HTMLInputElement>(null);
  const guestsRef = useRef<HTMLInputElement>(null);
  const notesRef  = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name   = nameRef.current?.value   ?? "";
    const phone  = phoneRef.current?.value  ?? "";
    const date   = dateRef.current?.value   ?? "";
    const guests = guestsRef.current?.value ?? "";
    const notes  = notesRef.current?.value  ?? "";

    let dataFormattata = date;
    if (date) {
      const d = new Date(date);
      dataFormattata = d.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }

    const msg = [
      `🍔 *Richiesta prenotazione ${info.nome}*`,
      ``,
      `👤 Nome: ${name}`,
      phone ? `📞 Tel: ${phone}` : null,
      `📅 Data: ${dataFormattata}`,
      `👥 Ospiti: ${guests}`,
      notes ? `📝 Note: ${notes}` : null,
    ].filter(Boolean).join("\n");

    const waNum = info.telefono
      ? "39" + info.telefono.replace(/\D/g, "")
      : WHATSAPP_FALLBACK;
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const orariRighe = (info.orari ?? "").split("·").map(r => r.trim()).filter(Boolean);

  return (
    <>
      <section className="relative border-b-2 border-mocha bg-hotpink">
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <span className="stamp text-kraft-light">#prenota ora</span>
          <h1 className="mt-6 font-display text-6xl leading-[0.88] text-kraft-light sm:text-7xl md:text-8xl">
            PRENOTA<br /><span className="text-mocha">UN TAVOLO.</span>
          </h1>
          <p className="mt-6 font-hand text-3xl text-kraft-light">
            Chiama, scrivi, o compila qui sotto.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-mocha bg-kraft py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10">
          {/* Info */}
          <div className="space-y-8">
            <img src={posterPrenota} alt="Poster Prenota Buatt"
              className="w-full max-w-sm border-2 border-mocha shadow-hard rotate-n2" />

            <div className="border-2 border-mocha p-5 shadow-soft bg-teal text-kraft-light" style={{ transform: 'rotate(-1deg)' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-current"><MapPin size={18} /></div>
                <h3 className="font-display text-sm tracking-widest">DOVE SIAMO</h3>
              </div>
              <p className="mt-3 font-mono text-sm">{info.indirizzo}</p>
            </div>

            <div className="border-2 border-mocha p-5 shadow-soft bg-mustard text-mocha" style={{ transform: 'rotate(1deg)' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-current"><Phone size={18} /></div>
                <h3 className="font-display text-sm tracking-widest">TELEFONO</h3>
              </div>
              <p className="mt-3 font-mono text-sm">{info.telefono}</p>
              <p className="font-mono text-sm text-mocha/60">WhatsApp disponibile</p>
            </div>

            <div className="border-2 border-mocha bg-kraft-light shadow-soft">
              <div className="flex items-center gap-2 border-b-2 border-mocha bg-brick px-4 py-2 font-display text-sm tracking-widest text-kraft-light">
                <Clock size={14} /> ORARI
              </div>
              <div className="divide-y divide-mocha/10 px-5">
                {orariRighe.length > 0 ? orariRighe.map((r, i) => (
                  <p key={i} className="py-2 font-mono text-sm text-mocha">{r}</p>
                )) : (
                  <p className="py-3 font-mono text-sm text-mocha/50">Orari non disponibili</p>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border-2 border-mocha bg-kraft-light p-8 shadow-hard md:p-10">
            <span className="stamp text-brick">modulo prenotazione</span>
            <h2 className="mt-5 font-display text-4xl leading-none">UN TAVOLO PER TE.</h2>
            <p className="mt-3 font-hand text-xl text-mocha">
              Compila e ti apriamo WhatsApp con il messaggio già pronto.
            </p>
            <div className="my-6 h-[3px] w-20 bg-brick" />
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-mocha">NOME <span className="text-brick">*</span></label>
                  <input ref={nameRef} type="text" required className="w-full border-2 border-mocha bg-kraft px-4 py-3 font-mono text-sm text-mocha focus:bg-kraft-light focus:outline-none" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-mocha">TELEFONO</label>
                  <input ref={phoneRef} type="tel" className="w-full border-2 border-mocha bg-kraft px-4 py-3 font-mono text-sm text-mocha focus:bg-kraft-light focus:outline-none" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-mocha">DATA <span className="text-brick">*</span></label>
                  <input ref={dateRef} type="date" required min={new Date().toISOString().split("T")[0]} className="w-full border-2 border-mocha bg-kraft px-4 py-3 font-mono text-sm text-mocha focus:bg-kraft-light focus:outline-none" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-mocha">OSPITI <span className="text-brick">*</span></label>
                  <input ref={guestsRef} type="number" required min="1" max="50" defaultValue="2" className="w-full border-2 border-mocha bg-kraft px-4 py-3 font-mono text-sm text-mocha focus:bg-kraft-light focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-mocha">NOTE</label>
                <textarea ref={notesRef} rows={3} placeholder="Allergie, occasione speciale, preferenze…"
                  className="w-full border-2 border-mocha bg-kraft px-4 py-3 font-mono text-sm text-mocha placeholder:text-mocha/50 focus:bg-kraft-light focus:outline-none" />
              </div>
              <button type="submit"
                className="group inline-flex w-full items-center justify-center gap-3 border-2 border-mocha bg-[#25D366] px-8 py-4 font-display text-sm tracking-widest text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-hard">
                PRENOTA SU WHATSAPP
                <Send size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-center font-mono text-[10px] text-mocha/50">
                Campi con <span className="text-brick">*</span> obbligatori · Email non richiesta
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}