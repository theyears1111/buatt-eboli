import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import posterPrenota from "../assets/poster-prenota.jpg";


const hours = [
  { d: "Lunedì", h: "Chiuso" },
  { d: "Mar – Gio", h: "18:30 – 00:00" },
  { d: "Ven – Sab", h: "18:30 – 02:00" },
  { d: "Domenica", h: "12:30 – 15:00 · 18:30 – 00:00" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

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
            <img
              src={posterPrenota}
              alt="Poster Prenota Buatt"
              className="w-full max-w-sm border-2 border-mocha shadow-hard rotate-n2"
            />

            {[
              { icon: MapPin, label: "DOVE SIAMO", lines: ["Via Roma", "84025 Eboli (SA)"], c: "bg-teal text-kraft-light" },
              { icon: Phone, label: "TELEFONO", lines: ["351 904 2387", "WhatsApp disponibile"], c: "bg-mustard text-mocha" },
              { icon: Mail, label: "EMAIL", lines: ["ciao@buatt.it", "eventi@buatt.it"], c: "bg-lemon text-mocha" },
            ].map((b, i) => (
              <div key={b.label} className={`border-2 border-mocha p-5 shadow-soft ${b.c}`} style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-current">
                    <b.icon size={18} />
                  </div>
                  <h3 className="font-display text-sm tracking-widest">{b.label}</h3>
                </div>
                <div className="mt-3 space-y-1 font-mono text-sm">
                  {b.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </div>
            ))}

            <div className="border-2 border-mocha bg-kraft-light shadow-soft">
              <div className="flex items-center gap-2 border-b-2 border-mocha bg-brick px-4 py-2 font-display text-sm tracking-widest text-kraft-light">
                <Clock size={14} /> ORARI
              </div>
              <div className="divide-y-2 divide-mocha/20">
                {hours.map((h) => (
                  <div key={h.d} className="flex items-center justify-between px-5 py-3 font-mono text-sm">
                    <span className="uppercase tracking-widest text-mocha/70">{h.d}</span>
                    <span className="font-bold text-mocha">{h.h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border-2 border-mocha bg-kraft-light p-8 shadow-hard md:p-10">
            <span className="stamp text-brick">modulo prenotazione</span>
            <h2 className="mt-5 font-display text-4xl leading-none">UN TAVOLO PER TE.</h2>
            <p className="mt-3 font-hand text-xl text-mocha">
              Compila il modulo, ti confermiamo entro un'ora.
            </p>
            <div className="my-6 h-[3px] w-20 bg-brick" />

            {sent ? (
              <div className="border-2 border-mocha bg-mustard p-8 text-center shadow-soft rotate-n1">
                <span className="stamp text-mocha">✓ ricevuto</span>
                <h3 className="mt-4 font-display text-4xl text-mocha">GRAZIE!</h3>
                <p className="mt-3 font-hand text-xl text-mocha">
                  Ti ricontattiamo a breve.<br />Preparati a una bella serata.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="NOME" name="name" required />
                  <Field label="TELEFONO" name="phone" type="tel" required />
                </div>
                <Field label="EMAIL" name="email" type="email" required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="DATA" name="date" type="date" required />
                  <Field label="OSPITI" name="guests" type="number" min="1" defaultValue="2" required />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-mocha">
                    NOTE
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full border-2 border-mocha bg-kraft px-4 py-3 font-mono text-sm text-mocha placeholder:text-mocha/50 focus:bg-kraft-light focus:outline-none"
                    placeholder="Allergie, occasione speciale…"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 border-2 border-mocha bg-hotpink px-8 py-4 font-display text-sm tracking-widest text-kraft-light shadow-soft transition-all hover:-translate-y-1 hover:shadow-hard"
                >
                  INVIA RICHIESTA
                  <Send size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", required, min, defaultValue,
}: {
  label: string; name: string; type?: string; required?: boolean; min?: string; defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-mocha">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        min={min}
        defaultValue={defaultValue}
        className="w-full border-2 border-mocha bg-kraft px-4 py-3 font-mono text-sm text-mocha focus:bg-kraft-light focus:outline-none"
      />
    </div>
  );
}