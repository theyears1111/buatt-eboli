import heroImg from "../assets/hero.jpg";
import burgerImg from "../assets/dish-burger.jpg";
import gnoccoImg from "../assets/dish-gnocco.jpg";
import tagliataImg from "../assets/dish-tagliata.jpg";
import bunImg from "../assets/dish-bun.jpg";
import beerImg from "../assets/gallery-beer.jpg";
import cocktailImg from "../assets/gallery-cocktail.jpg";
import interiorImg from "../assets/gallery-interior.jpg";
import liveImg from "../assets/gallery-live.jpg";
import ingredientsImg from "../assets/gallery-ingredients.jpg";
import posterWings from "../assets/poster-wings.jpg";
import posterSecret from "../assets/poster-secret.jpg";
import posterNesima from "../assets/poster-nesima.jpg";
import posterNatale from "../assets/poster-natale.jpg";
import posterConvivio from "../assets/poster-convivio.jpg";
import posterPrenota from "../assets/poster-prenota.jpg";
import { useFirestore } from "../admin/useFirestore";

// Foto statiche di default (sempre visibili)
const staticItems = [
  { src: posterWings,    alt: "Wings Brothers",       tag: "POSTER",   rot: -3   },
  { src: burgerImg,      alt: "Burger Buatt",          tag: "PIATTO",   rot: 2    },
  { src: posterSecret,   alt: "Global Street",         tag: "POSTER",   rot: 1    },
  { src: liveImg,        alt: "Serata live",           tag: "AMBIENTE", rot: -1.5 },
  { src: posterNesima,   alt: "Nesima Park",           tag: "POSTER",   rot: 2.5  },
  { src: cocktailImg,    alt: "Cocktail d'autore",     tag: "PIATTO",   rot: -2   },
  { src: posterConvivio, alt: "Convivio",              tag: "POSTER",   rot: 1.5  },
  { src: tagliataImg,    alt: "Tagliata",              tag: "PIATTO",   rot: -1   },
  { src: posterPrenota,  alt: "Prenota",               tag: "POSTER",   rot: 3    },
  { src: ingredientsImg, alt: "Materie prime",         tag: "AMBIENTE", rot: -2   },
  { src: posterNatale,   alt: "Bun Natale",            tag: "POSTER",   rot: 2    },
  { src: gnoccoImg,      alt: "Gnocco fritto",         tag: "PIATTO",   rot: -1.5 },
  { src: heroImg,        alt: "Interno",               tag: "AMBIENTE", rot: -2.5 },
  { src: beerImg,        alt: "Birra artigianale",     tag: "PIATTO",   rot: 1.5  },
  { src: bunImg,         alt: "Bun",                   tag: "PIATTO",   rot: -1   },
  { src: interiorImg,    alt: "Sala Buatt",            tag: "AMBIENTE", rot: 2    },
] as const;

const tagColors = {
  POSTER:   "bg-hotpink text-kraft-light",
  PIATTO:   "bg-mustard text-mocha",
  AMBIENTE: "bg-teal text-kraft-light",
} as const;

const rots = [-3, 2, 1, -1.5, 2.5, -2, 1.5, -1, 3, -2, 2, -1.5, -2.5, 1.5, -1, 2];

export default function Gallery() {
  // Foto aggiuntive caricate dall'admin
  const { data: galData } = useFirestore<{ foto: string[] }>('galleria', { foto: [] });

  // Foto da Firebase (caricate dall'admin) — mostrate PRIMA delle statiche
  const firebaseFotos = (galData.foto ?? []).map((url, i) => ({
    src: url,
    alt: `Foto ${i + 1}`,
    tag: "AMBIENTE" as const,
    rot: rots[i % rots.length],
    isFirebase: true,
  }));

  const allItems = [
    ...firebaseFotos,
    ...staticItems.map(s => ({ ...s, isFirebase: false })),
  ];

  return (
    <>
      <section className="relative border-b-2 border-mocha bg-kraft-light">
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <span className="stamp text-brick">#archivio visivo</span>
          <h1 className="mt-6 font-display text-6xl leading-[0.88] sm:text-7xl md:text-8xl">
            SGUARDI<br /><span className="text-brick">DAL BUATT.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-hand text-3xl text-mocha">
            Poster, piatti, serate.<br />Tutto quello che è passato di qui.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-mocha bg-kraft py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {allItems.map((img, i) => (
              <figure
                key={i}
                className="group relative mb-5 inline-block w-full break-inside-avoid border-2 border-mocha bg-kraft-light shadow-soft transition-all hover:-translate-y-1 hover:shadow-hard reveal"
                style={{ animationDelay: `${i * 0.04}s`, transform: `rotate(${img.rot}deg)` }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="block w-full" />
                <figcaption className="flex items-center justify-between gap-2 border-t-2 border-mocha px-3 py-2">
                  <span className={`border border-mocha px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${tagColors[img.tag]}`}>
                    #{img.tag}
                  </span>
                  <span className="font-hand text-sm text-mocha">{img.alt}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}