import { Flame, Leaf, Music, Heart } from "lucide-react";
import posterSecret from "../assets/poster-secret.jpg";
import posterNatale from "../assets/poster-natale.jpg";
import { useFirestore } from "../admin/useFirestore";

const valuesStatic = [
  { icon: Flame, title: "FUOCO VIVO",     text: "Cuciniamo alla brace perché il calore diretto trasforma la materia in memoria.", c: "bg-brick text-kraft-light", r: -2   },
  { icon: Leaf,  title: "MATERIA LOCALE", text: "Piccoli produttori della Piana del Sele e del Cilento. Nomi, non etichette.",    c: "bg-teal text-kraft-light",  r: 1.5  },
  { icon: Music, title: "SUONO",          text: "La musica è il quarto ingrediente. Ogni serata ha la sua colonna sonora.",       c: "bg-hotpink text-kraft-light", r: -1 },
  { icon: Heart, title: "CURA",           text: "Dietro ogni piatto, ogni drink, c'è tempo, mani e attenzione vera.",             c: "bg-mustard text-mocha",      r: 2   },
];

const ingredientiStatici = [
  "Bufala campana", "Pane lievitato 24h", "Aglianico del Vulture",
  "Carne italiana", "Birre artigianali", "Erbe spontanee",
];

interface AboutData {
  titolo: string;
  sottotitolo: string;
  storia_p1: string;
  storia_p2: string;
  storia_p3: string;
  storia_p4: string;
  ingredienti: string; // separati da virgola
}

const aboutFallback: AboutData = {
  titolo: "COMUNQUE LA GENTE\nNON STA BENE.",
  sottotitolo: "noi siamo in ferie... scherziamo.",
  storia_p1: "Di chiamare le cose con il loro nome convenzionale.",
  storia_p2: "Buatt nasce nel 2014 a Eboli da un'idea semplice: aprire uno spazio dove la cucina di strada incontra la ricerca, dove la birra artigianale convive con l'Aglianico, dove la musica live non è un'aggiunta ma parte della pietanza.",
  storia_p3: 'Abbiamo iniziato a chiamarle per quello che sono veramente. Global. Street. Local. Soul.',
  storia_p4: '"L\'essenza non ha bisogno di filtri" non è uno slogan: è il modo in cui scegliamo gli ingredienti, accogliamo gli ospiti, costruiamo le serate.',
  ingredienti: "Bufala campana, Pane lievitato 24h, Aglianico del Vulture, Carne italiana, Birre artigianali, Erbe spontanee",
};

export default function About() {
  const { data: about } = useFirestore<AboutData>('about', aboutFallback);

  const ingredienti = (about.ingredienti ?? "")
    .split(",").map(s => s.trim()).filter(Boolean);
  const ingredientiList = ingredienti.length > 0 ? ingredienti : ingredientiStatici;

  return (
    <>
      <section className="relative border-b-2 border-mocha bg-kraft-light">
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <span className="stamp text-brick">#manifesto</span>
          <h1 className="mt-6 font-display text-5xl leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl whitespace-pre-line">
            {about.titolo || aboutFallback.titolo}
          </h1>
          <p className="mt-6 font-hand text-3xl text-grape">{about.sottotitolo || aboutFallback.sottotitolo}</p>
        </div>
      </section>

      {/* Storia */}
      <section className="border-b-2 border-mocha bg-kraft">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10">
          <div className="relative">
            <img src={posterSecret} alt="Poster Global Street Local Soul"
              className="w-full max-w-md border-2 border-mocha shadow-hard rotate-n2" />
            <span className="tape left-1/3 -top-3 h-5 w-28 rotate-[-5deg]" />
            <div className="sticker absolute -bottom-4 -right-2 border-2 border-mocha bg-lemon px-3 py-2 font-hand text-lg text-mocha rotate-3">
              secret menu ✺
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-brick">#LA STORIA</span>
            <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl md:text-6xl">
              ABBIAMO<br />DECISO DI<br /><span className="text-brick">SMETTERE.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-mocha">
              <p className="font-hand text-2xl text-mocha">{about.storia_p1 || aboutFallback.storia_p1}</p>
              <p>{about.storia_p2 || aboutFallback.storia_p2}</p>
              <p><strong className="text-brick">{about.storia_p3 || aboutFallback.storia_p3}</strong></p>
              <p>{about.storia_p4 || aboutFallback.storia_p4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Valori — statici */}
      <section className="border-b-2 border-mocha bg-lemon py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-brick">#I NOSTRI VALORI</span>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              QUELLO IN CUI<br />CREDIAMO VERAMENTE.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {valuesStatic.map((v, i) => (
              <div key={v.title}
                className={`hover-lift relative border-2 border-mocha p-6 shadow-soft ${v.c} reveal`}
                style={{ animationDelay: `${i * 0.08}s`, transform: `rotate(${v.r}deg)` }}>
                <div className="flex h-12 w-12 items-center justify-center border-2 border-current">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materie prime */}
      <section className="border-b-2 border-mocha bg-kraft">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-brick">#MATERIA PRIMA</span>
            <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl md:text-6xl">
              LA CAMPANIA<br /><span className="text-teal">NEL PIATTO.</span>
            </h2>
            <p className="mt-6 font-hand text-2xl text-mocha">
              Carne italiana, pane fatto in casa, vini autoctoni, cocktail firmati.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {ingredientiList.map((t, i) => (
                <li key={t} className="flex items-center gap-3 border-2 border-mocha bg-kraft-light px-3 py-2 font-mono text-xs uppercase tracking-widest"
                  style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>
                  <span className="h-2 w-2 bg-brick" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative order-1 lg:order-2">
            <img src={posterNatale} alt="Poster Natale"
              className="w-full max-w-md border-2 border-mocha shadow-hard rotate-2" />
            <span className="tape right-8 -top-3 h-5 w-24 rotate-[8deg] bg-teal" />
          </div>
        </div>
      </section>
    </>
  );
}