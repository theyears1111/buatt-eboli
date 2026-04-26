import logoImg from "../assets/logo-buatt.png";
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/',        label: 'Home' },
  { to: '/menu',    label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events',  label: 'Eventi' },
  { to: '/about',   label: 'Storia' },
  { to: '/contact', label: 'Contatti' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || open ? 'bg-kraft-light/95 backdrop-blur-md border-b-2 border-mocha py-3' : 'bg-transparent border-b-2 border-transparent py-5'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-10">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Buatt" className="h-7 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                location.pathname === l.to ? 'text-brick' : 'text-mocha hover:text-brick'
              }`}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/contact" className="hidden md:inline-flex border-2 border-mocha bg-brick px-5 py-2 font-display text-xs tracking-widest text-kraft-light shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-hard">
          PRENOTA
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden border-2 border-mocha p-2 text-mocha">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t-2 border-mocha bg-kraft-light">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className="block border-b border-mocha/20 px-5 py-4 font-display text-sm tracking-widest text-mocha hover:bg-kraft-dark">
              {l.label}
            </Link>
          ))}
          <div className="p-5">
            <Link to="/contact" className="block border-2 border-mocha bg-brick py-3 text-center font-display text-sm tracking-widest text-kraft-light">
              PRENOTA UN TAVOLO
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}