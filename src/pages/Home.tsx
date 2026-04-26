import posterNatale from "../assets/poster-natale.jpg";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { featured } from "../data/menu";
import burgerImg from "../assets/dish-burger.jpg";
import gnoccoImg from "../assets/dish-gnocco.jpg";
import tagliataImg from "../assets/dish-tagliata.jpg";
import bunImg from "../assets/dish-bun.jpg";
import posterWings from "../assets/poster-wings.jpg";
import posterSecret from "../assets/poster-secret.jpg";
import posterPrenota from "../assets/poster-prenota.jpg";
import posterConvivio from "../assets/poster-convivio.jpg";
import doodleKid from "../assets/doodle-kid.png";
import doodleDog from "../assets/doodle-dog.png";
import doodleDancer from "../assets/doodle-dancer.png";
import doodleStar from "../assets/doodle-star.png";
import { DoodleFrogDuck, DoodleHippo, DoodleButterfly, DoodleBurger } from "../components/Doodles";

const dishImages: Record<string, string> = {
  burger: burgerImg,
  gnocco: gnoccoImg,
  tagliata: tagliataImg,
  bun: bunImg,
};


export default function Home() {
  return (
    <>
      {/* HERO — poster collage */}
      <section className="relative overflow-hidden border-b-2 border-mocha bg-kraft">
        {/* Background doodles */}
        <img
          src={doodleKid}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 bottom-0 hidden h-[300px] w-auto opacity-40 mix-blend-multiply md:block lg:h-[400px] lg:opacity-50"
        />
        <img
          src={doodleDog}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-6 hidden h-[140px] w-auto rotate-[8deg] opacity-45 mix-blend-multiply lg:block"
        />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-10">
          {/* Left — manifesto */}
          <div className="relative z-10">
            <div className="reveal mb-4 inline-flex items-center gap-2">
              <span className="stamp text-brick">Est. 2014 · Eboli</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-mocha/70">N° 001</span>
            </div>

            <h1 className="reveal reveal-delay-1 font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.88] tracking-[0.04em] text-mocha">
              BU<span className="text-brick">A</span>TT
            </h1>
            <p className="reveal reveal-delay-1 mt-2 font-mono text-xs uppercase tracking-[0.4em] text-mocha/80">
              • contenitore di contenuti •
            </p>

            <p className="reveal reveal-delay-2 mt-10 max-w-xl font-hand text-3xl leading-tight text-mocha md:text-4xl">
              L'essenza non ha bisogno di filtri,<br />
              <span className="text-brick">ma di spazio.</span>
            </p>

            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-3 border-2 border-mocha bg-mustard px-7 py-4 font-display text-sm tracking-widest text-mocha shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-hard"
              >
                APRI IL MENU
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border-2 border-mocha bg-hotpink px-7 py-4 font-display text-sm tracking-widest text-kraft-light shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-hard"
              >
                PRENOTA
              </Link>
            </div>
          </div>

          {/* Right — poster collage */}
          <div className="relative mx-auto h-[480px] w-full max-w-lg md:h-[560px] lg:h-[640px]">
            {/* washi tape top-left */}
            <span className="tape -left-4 top-4 h-6 w-28 rotate-[-18deg]" />

            <img
              src={posterWings}
              alt="Poster Buatt Wings Brothers"
              className="absolute left-0 top-4 w-[62%] rotate-[-5deg] border-2 border-mocha shadow-hard transition-transform hover:rotate-[-3deg] hover:scale-105"
            />
            <img
              src={posterSecret}
              alt="Poster Secret Menu"
              className="absolute right-0 top-20 w-[52%] rotate-[6deg] border-2 border-mocha shadow-hard transition-transform hover:rotate-[3deg] hover:scale-105"
            />
            <img
              src={posterPrenota}
              alt="Poster Prenota"
              className="absolute bottom-0 left-8 hidden w-[48%] rotate-[-3deg] border-2 border-mocha shadow-hard transition-transform hover:rotate-[-1deg] hover:scale-105 sm:block"
            />
            <img
              src={posterNatale}
              alt="Poster Natale"
              className="absolute bottom-4 right-4 hidden w-[42%] rotate-[4deg] border-2 border-mocha shadow-hard transition-transform hover:rotate-[2deg] hover:scale-105 md:block"
            />

            {/* sticker */}
            <div className="sticker absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 rotate-[-8deg] border-2 border-mocha bg-lemon px-4 py-2 font-hand text-lg text-mocha">
              dal 2014 ✺
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y-2 border-mocha bg-brick py-4">
        <div className="marquee flex whitespace-nowrap font-display text-2xl tracking-[0.15em] text-kraft-light">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 px-10">
              <span>GLOBAL</span><span>✺</span>
              <span>STREET</span><span>✺</span>
              <span>LOCAL</span><span>✺</span>
              <span>SOUL</span><span>✺</span>
              <span>BUATT</span><span>✺</span>
              <span>CONTENITORE</span><span>✺</span>
              <span>DI CONTENUTI</span><span>✺</span>
            </span>
          ))}
        </div>
      </section>

      {/* MANIFESTO quote */}
      <section className="relative mx-auto max-w-5xl px-5 py-24 text-center lg:px-10">
        <img
          src={doodleStar}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-6 h-28 w-auto opacity-50 mix-blend-multiply md:h-36"
        />
        <img
          src={doodleDancer}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 bottom-0 hidden h-64 w-auto -rotate-[6deg] opacity-45 mix-blend-multiply md:block lg:h-80"
        />
        <p className="relative font-mono text-xs uppercase tracking-[0.35em] text-mocha/70">
          # manifesto
        </p>
        <p className="relative mt-6 font-hand text-3xl leading-snug text-mocha md:text-5xl">
          "La tavola unisce.<br />
          Gli sconosciuti <span className="text-brick">fanno la storia</span>."
        </p>
        <div className="relative mx-auto mt-8 h-[3px] w-24 bg-mocha" />
      </section>

      {/* PIATTI IN EVIDENZA */}
      <section className="border-t-2 border-mocha bg-kraft-light py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-brick">#IN EVIDENZA</span>
              <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl md:text-6xl">
                I NOSTRI<br />PEZZI GROSSI
              </h2>
            </div>
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 font-hand text-2xl text-mocha hover:text-brick"
            >
              tutto il menu →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((dish, i) => {
              const rot = [-2, 1.5, -1, 2][i % 4];
              const colors = ["bg-mustard", "bg-teal", "bg-hotpink", "bg-lemon"];
              return (
                <article
                  key={dish.name}
                  className="group hover-lift relative border-2 border-mocha bg-kraft-light shadow-soft transition-all reveal"
                  style={{ animationDelay: `${i * 0.08}s`, transform: `rotate(${rot}deg)` }}
                >
                  <div className="relative overflow-hidden border-b-2 border-mocha">
                    <img
                      src={dishImages[dish.image]}
                      alt={dish.name}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="aspect-square h-full w-full object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className={`absolute right-3 top-3 border-2 border-mocha px-3 py-1 font-display text-sm ${colors[i % 4]}`}>
                      €{dish.price}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brick">
                      #{dish.category}
                    </span>
                    <h3 className="mt-1 font-display text-xl leading-tight text-mocha">{dish.name}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY split */}
      <section className="border-t-2 border-mocha bg-teal text-kraft-light relative overflow-hidden">
        <DoodleFrogDuck className="pointer-events-none absolute -right-6 bottom-0 hidden h-56 w-auto opacity-20 mix-blend-multiply lg:block" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10">
          <div className="relative">
            <img
              src={posterConvivio}
              alt="Poster Convivio"
              className="w-full max-w-md border-2 border-mocha shadow-hard rotate-n1"
            />
            <span className="tape left-6 -top-3 h-5 w-24 rotate-[8deg] bg-hotpink" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-lemon">#LA NOSTRA FILOSOFIA</span>
            <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl md:text-6xl">
              ARTE<br />&amp; BISTRÒ<br /><span className="text-lemon">DAL 2014.</span>
            </h2>
            <p className="mt-8 font-hand text-2xl text-kraft-light">
              Non siamo un ristorante. Siamo un contenitore.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-y-2 border-kraft-light/30 py-6">
              {[
                { n: "10+", l: "ANNI" },
                { n: "60+", l: "ETICHETTE" },
                { n: "∞", l: "SERATE" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-lemon">{s.n}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="group mt-8 inline-flex w-fit items-center gap-2 font-hand text-2xl text-lemon hover:text-kraft-light"
            >
              leggi il manifesto →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t-2 border-mocha bg-kraft relative overflow-hidden">
        <DoodleHippo className="pointer-events-none absolute left-0 bottom-0 hidden h-36 w-auto opacity-20 mix-blend-multiply lg:block" />
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
          <div className="mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-brick">#RECENSIONI</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">DICONO DI NOI</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { q: "Atmosfera incredibile, sembra di entrare in un altro mondo. Il Buatt è leggendario.", n: "Marco R.", c: "bg-mustard", r: -1.5 },
              { q: "Cocktail curatissimi, musica giusta, materia prima top. Il mio posto del cuore.", n: "Giulia D.", c: "bg-hotpink", r: 1.5 },
              { q: "Underground, intimo, gourmet. Serate live da paura e servizio impeccabile.", n: "Antonio P.", c: "bg-teal", r: -1 },
            ].map((t, i) => (
              <div
                key={i}
                className={`hover-lift relative border-2 border-mocha p-7 shadow-soft ${t.c} text-mocha`}
                style={{ transform: `rotate(${t.r}deg)` }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="currentColor" />)}
                </div>
                <p className="mt-5 font-hand text-xl leading-snug">"{t.q}"</p>
                <div className="mt-5 border-t-2 border-mocha pt-3 font-mono text-xs uppercase tracking-widest">
                  — {t.n}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-mocha bg-hotpink relative overflow-hidden">
        <DoodleButterfly className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 hidden h-64 w-auto opacity-20 mix-blend-multiply lg:block" />
        <div className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-10">
          <span className="stamp text-mocha">prenota adesso</span>
          <h2 className="mt-6 font-display text-5xl leading-none text-kraft-light sm:text-6xl md:text-7xl">
            VIENI AL BUATT.<br />
            <span className="text-mocha">FAI LA STORIA.</span>
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 border-2 border-mocha bg-lemon px-10 py-5 font-display text-sm tracking-widest text-mocha shadow-hard transition-all hover:-translate-y-1 hover:translate-x-0"
          >
            PRENOTA UN TAVOLO
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}