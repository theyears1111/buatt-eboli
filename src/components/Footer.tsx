import logoImg from "../assets/logo-buatt.png";
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-24 bg-mocha text-kraft-light">
      <div className="overflow-hidden border-y-2 border-kraft-light/20 py-4">
        <div className="marquee-track whitespace-nowrap font-display text-2xl tracking-tight">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-10 px-10">
              <span>BUATT</span><span className="text-mustard">✺</span>
              <span className="font-hand normal-case">bistrò &amp; pub</span><span className="text-mustard">✺</span>
              <span>EBOLI</span><span className="text-mustard">✺</span>
              <span className="font-hand normal-case">est. 2014</span><span className="text-mustard">✺</span>
              <span>GLOBAL STREET LOCAL SOUL</span><span className="text-mustard">✺</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="overflow-hidden" style={{ height: '120px' }}>
              <img src={logoImg} alt="Buatt" className="brightness-0 invert" style={{ width: '320px', marginTop: '-22%', marginBottom: '-22%', height: 'auto', maxHeight: 'none' }} />
            </div>
            <p className="mt-8 max-w-md font-hand text-2xl leading-snug normal-case">
              L'essenza non ha bisogno di filtri,{' '}
              <span className="text-mustard">ma di spazio.</span>
            </p>
            <div className="mt-8 flex gap-3">
              <a href="https://www.facebook.com/Buatt" target="_blank" rel="noopener" aria-label="Facebook"
                className="border-2 border-kraft-light/30 p-2.5 transition-colors hover:border-mustard hover:text-mustard">
                <Facebook size={15} />
              </a>
              <a href="https://www.instagram.com/buattbistro/" target="_blank" rel="noopener" aria-label="Instagram"
                className="border-2 border-kraft-light/30 p-2.5 transition-colors hover:border-mustard hover:text-mustard">
                <Instagram size={15} />
              </a>
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-mustard">Esplora</h4>
            <ul className="mt-6 space-y-3 font-sans text-sm">
              {[['/', 'Home'],['/menu','Menu'],['/gallery','Gallery'],['/events','Eventi'],['/about','Storia'],['/contact','Contatti']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-kraft-light/70 hover:text-kraft-light transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-mustard">Contatti</h4>
            <ul className="mt-6 space-y-4 font-sans text-sm text-kraft-light/70">
              <li className="flex items-start gap-3"><MapPin size={14} className="mt-0.5 shrink-0 text-mustard" /><span>Corso Umberto I, 16 — 84025 Eboli (SA)</span></li>
              <li className="flex items-start gap-3"><Phone size={14} className="mt-0.5 shrink-0 text-mustard" /><span>334 190 6133</span></li>
              <li className="flex items-start gap-3"><Mail size={14} className="mt-0.5 shrink-0 text-mustard" /><span>ciao@buatt.it</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-kraft-light/20 pt-8 font-mono text-[10px] uppercase tracking-widest text-kraft-light/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Buatt — All rights reserved</span>
          <span>Bistrò &amp; pub · Eboli, Italia</span>
        </div>
      </div>
    </footer>
  );
}