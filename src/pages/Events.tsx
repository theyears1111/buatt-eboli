import posterWings from "../assets/poster-wings.jpg";
import posterSecret from "../assets/poster-secret.jpg";
import posterNesima from "../assets/poster-nesima.jpg";
import posterNatale from "../assets/poster-natale.jpg";
import posterConvivio from "../assets/poster-convivio.jpg";
import { useFirestore } from "../admin/useFirestore";
import { Calendar } from "lucide-react";

interface EventoItem { titolo: string; data: string; desc: string; img: string }

// Poster statici di default sempre visibili
const staticPosters = [
  { src: posterWings,    alt: "Wings Brothers",  rot: -3  },
  { src: posterSecret,   alt: "Secret Menu",     rot: 2   },
  { src: posterNesima,   alt: "Nesima Park",     rot: 1   },
  { src: posterNatale,   alt: "Bun Natale",      rot: -2  },
  { src: posterConvivio, alt: "Convivio",        rot: 1.5 },
];

export default function Events() {
  const { data: evtData } = useFirestore<{ eventi: EventoItem[] }>('eventi', { eventi: [] });
  const eventi = evtData.eventi ?? [];

  return (
    <>
      <section className="relative border-b-2 border-mocha bg-hotpink">
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <span className="stamp text-kraft-light">#what's on</span>
          <h1 className="mt-6 font-display text-6xl leading-[0.88] text-kraft-light sm:text-7xl md:text-8xl">
            EVENTI<br /><span className="text-mocha">& SERATE.</span>
          </h1>
          <p className="mt-6 font-hand text-3xl text-kraft-light">
            Quello che succede qui dentro non resta qui dentro.
          </p>
        </div>
      </section>

      {/* EVENTI DA FIREBASE */}
      {eventi.length > 0 && (
        <section className="border-b-2 border-mocha bg-kraft py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-brick">#prossimi eventi</span>
            <h2 className="mt-3 mb-12 font-display text-4xl leading-none sm:text-5xl">IN ARRIVO.</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {eventi.map((ev, i) => {
                const rots = [-2, 1.5, -1, 2, -1.5, 1];
                return (
                  <article
                    key={i}
                    className="border-2 border-mocha bg-kraft-light shadow-soft hover-lift"
                    style={{ transform: `rotate(${rots[i % rots.length]}deg)` }}
                  >
                    {ev.img && (
                      <div className="border-b-2 border-mocha overflow-hidden">
                        <img src={ev.img} alt={ev.titolo} className="w-full object-cover aspect-[4/3]" />
                      </div>
                    )}
                    <div className="p-5">
                      {ev.data && (
                        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brick">
                          <Calendar size={11} /> {ev.data}
                        </div>
                      )}
                      <h3 className="font-display text-xl leading-tight text-mocha">{ev.titolo}</h3>
                      {ev.desc && <p className="mt-2 font-sans text-sm text-mocha/70">{ev.desc}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* POSTER STORICI statici */}
      <section className="border-b-2 border-mocha bg-kraft-light py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-brick">#archivio</span>
          <h2 className="mt-3 mb-12 font-display text-4xl leading-none sm:text-5xl">LOCANDINE.</h2>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {staticPosters.map((p, i) => (
              <figure
                key={i}
                className="mb-5 inline-block w-full break-inside-avoid border-2 border-mocha shadow-soft transition-all hover:-translate-y-1 hover:shadow-hard"
                style={{ transform: `rotate(${p.rot}deg)` }}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="block w-full" />
                <figcaption className="border-t-2 border-mocha px-3 py-2 font-hand text-sm text-mocha">
                  {p.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}