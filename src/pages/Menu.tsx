import { X } from "lucide-react";
import { useState } from "react";
import { menu, type MenuItem } from "../data/menu";
import doodleKid from "../assets/doodle-kid.png";
import doodleDog from "../assets/doodle-dog.png";
import doodleDancer from "../assets/doodle-dancer.png";


export default function Menu() {
  const [active, setActive] = useState<string>(menu[0].id);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const current = menu.find((c) => c.id === active) ?? menu[0];
  const accentColors = ["bg-mustard", "bg-brick text-kraft-light", "bg-teal text-kraft-light", "bg-hotpink text-kraft-light", "bg-lemon", "bg-grape text-kraft-light"];

  return (
    <>
      <section className="relative border-b-2 border-mocha bg-kraft-light">
        <img
          src={doodleKid}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-6 bottom-0 hidden h-[280px] w-auto opacity-40 mix-blend-multiply md:block lg:h-[360px]"
        />
        <img
          src={doodleDog}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[280px] bottom-2 hidden h-32 w-auto opacity-45 mix-blend-multiply lg:block"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <span className="stamp text-brick">la carta · coperto 3€</span>
          <h1 className="mt-6 font-display text-6xl leading-none sm:text-7xl md:text-8xl">
            MENU<span className="text-brick">.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-hand text-3xl leading-tight text-mocha">
            Dieci sezioni, decine di proposte.<br />
            <span className="text-brick">Tocca un piatto per i dettagli.</span>
          </p>
        </div>
      </section>

      {/* Sticky hashtag tabs */}
      <div className="sticky top-[72px] z-30 border-b-2 border-mocha bg-kraft">
        <div className="mx-auto max-w-7xl px-2 lg:px-6">
          <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {menu.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`whitespace-nowrap border-2 border-mocha px-4 py-2 font-display text-xs tracking-widest transition-all ${
                  active === c.id
                    ? `${accentColors[i % accentColors.length]} shadow-soft`
                    : "bg-kraft-light text-mocha hover:bg-kraft-dark"
                }`}
              >
                #{c.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div key={current.id} className="relative reveal">
          <img
            src={doodleDancer}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-8 hidden h-40 w-auto rotate-[6deg] opacity-15 mix-blend-multiply lg:block"
          />
          <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-mocha pb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brick">
                #{String(menu.indexOf(current) + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-display text-5xl leading-none sm:text-6xl">{current.name.toUpperCase()}</h2>
              <p className="mt-3 font-hand text-2xl text-mocha/80">{current.subtitle}</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {current.items.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setSelected(item)}
                className="group hover-lift relative border-2 border-mocha bg-kraft-light p-5 text-left shadow-soft transition-all reveal"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl leading-tight text-mocha transition-colors group-hover:text-brick">
                    {item.name.toUpperCase()}
                  </h3>
                  <div className="flex flex-1 items-center">
                    <span className="mx-3 h-px flex-1 border-b-2 border-dotted border-mocha/40" />
                    <span className="font-display text-xl text-mocha">€{item.price}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mocha/75">({item.description})</p>
                {item.tag && (
                  <span className="absolute -top-3 left-4 border-2 border-mocha bg-hotpink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-kraft-light rotate-n2">
                    {item.tag}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-mocha/70 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-lg border-2 border-mocha bg-kraft-light p-8 shadow-hard animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Chiudi"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 border-2 border-mocha bg-mustard p-1.5 text-mocha hover:bg-hotpink hover:text-kraft-light"
            >
              <X size={16} />
            </button>
            {selected.tag && (
              <span className="inline-block border-2 border-mocha bg-hotpink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-kraft-light rotate-n2">
                {selected.tag}
              </span>
            )}
            <h3 className="mt-4 font-display text-4xl leading-none text-mocha">{selected.name.toUpperCase()}</h3>
            <div className="my-5 h-[3px] w-20 bg-brick" />
            <p className="font-hand text-xl leading-snug text-mocha">{selected.description}</p>
            <div className="mt-8 flex items-end justify-between border-t-2 border-mocha pt-5">
              <span className="font-mono text-xs uppercase tracking-widest text-mocha/70">Prezzo</span>
              <span className="font-display text-5xl text-brick">€{selected.price}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}