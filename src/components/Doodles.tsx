/*
 * Buatt — Doodle SVG Components
 * Fedeli agli originali del menu fisico
 * Kid+Cat (pag.1), Frog+Duck (pag.2), Hippo (pag.3), Butterfly Man (pag.4)
 */

// ── Bambino con cappello + gatto (cover menu) ─────────────────────────────────
export function DoodleKidCat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes kidSway {
          0%,100% { transform: rotate(-1deg); transform-origin: 80px 110px; }
          50% { transform: rotate(1.5deg); transform-origin: 80px 110px; }
        }
        @keyframes catWiggle {
          0%,100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        .kc-kid { animation: kidSway 12s ease-in-out infinite; }
        .kc-cat { animation: catWiggle 10s ease-in-out infinite; }
      `}</style>

      {/* KID */}
      <g className="kc-kid">
        {/* Testa */}
        <ellipse cx="82" cy="32" rx="22" ry="20" fill="#1a1a1a"/>
        {/* Cappello */}
        <rect x="62" y="14" width="40" height="8" rx="2" fill="#1a1a1a"/>
        <rect x="68" y="6" width="28" height="14" rx="3" fill="#1a1a1a"/>
        {/* Visiera */}
        <path d="M60 22 Q62 18 104 18" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
        {/* Occhi */}
        <circle cx="75" cy="30" r="5" fill="#f5f0e8"/>
        <circle cx="91" cy="30" r="5" fill="#f5f0e8"/>
        <circle cx="76" cy="31" r="2.5" fill="#1a1a1a"/>
        <circle cx="92" cy="31" r="2.5" fill="#1a1a1a"/>
        {/* Bocca */}
        <path d="M76 40 Q82 44 88 40" stroke="#f5f0e8" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Corpo */}
        <rect x="66" y="50" width="32" height="45" rx="6" fill="#1a1a1a"/>
        {/* Braccio sx — teso in avanti */}
        <path d="M66 65 Q48 68 38 72" stroke="#1a1a1a" strokeWidth="9" strokeLinecap="round" fill="none"/>
        {/* Braccio dx */}
        <path d="M98 65 Q110 60 118 55" stroke="#1a1a1a" strokeWidth="9" strokeLinecap="round" fill="none"/>
        {/* Gambe */}
        <rect x="70" y="92" width="12" height="32" rx="5" fill="#1a1a1a"/>
        <rect x="86" y="92" width="12" height="32" rx="5" fill="#1a1a1a"/>
        {/* Scarpe */}
        <ellipse cx="76" cy="125" rx="14" ry="7" fill="#1a1a1a"/>
        <ellipse cx="92" cy="125" rx="14" ry="7" fill="#1a1a1a"/>
      </g>

      {/* CAT — sotto/davanti al bambino */}
      <g className="kc-cat">
        {/* Corpo gatto */}
        <ellipse cx="58" cy="168" rx="28" ry="22" fill="#1a1a1a"/>
        {/* Testa */}
        <ellipse cx="52" cy="148" rx="22" ry="20" fill="#1a1a1a"/>
        {/* Orecchie */}
        <polygon points="34,134 40,122 48,136" fill="#1a1a1a"/>
        <polygon points="56,133 62,121 68,134" fill="#1a1a1a"/>
        <polygon points="37,134 41,126 46,135" fill="#f5f0e8" opacity="0.5"/>
        <polygon points="58,133 63,125 67,133" fill="#f5f0e8" opacity="0.5"/>
        {/* Occhi gatto */}
        <ellipse cx="44" cy="148" rx="7" ry="8" fill="#f5f0e8"/>
        <ellipse cx="62" cy="148" rx="7" ry="8" fill="#f5f0e8"/>
        <ellipse cx="44" cy="148" rx="3" ry="6" fill="#1a1a1a"/>
        <ellipse cx="62" cy="148" rx="3" ry="6" fill="#1a1a1a"/>
        <circle cx="46" cy="146" r="1.5" fill="#f5f0e8"/>
        <circle cx="64" cy="146" r="1.5" fill="#f5f0e8"/>
        {/* Naso + bocca */}
        <circle cx="52" cy="158" r="3" fill="#f5f0e8"/>
        <path d="M49 161 Q52 165 55 161" stroke="#f5f0e8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Baffi */}
        <line x1="30" y1="156" x2="46" y2="158" stroke="#f5f0e8" strokeWidth="1.5"/>
        <line x1="30" y1="160" x2="46" y2="159" stroke="#f5f0e8" strokeWidth="1.5"/>
        <line x1="58" y1="158" x2="74" y2="156" stroke="#f5f0e8" strokeWidth="1.5"/>
        <line x1="58" y1="159" x2="74" y2="160" stroke="#f5f0e8" strokeWidth="1.5"/>
        {/* Coda */}
        <path d="M86 170 Q100 155 95 140 Q90 132 85 138" stroke="#1a1a1a" strokeWidth="7" fill="none" strokeLinecap="round"/>
        {/* Zampe */}
        <ellipse cx="40" cy="185" rx="14" ry="8" fill="#1a1a1a"/>
        <ellipse cx="72" cy="185" rx="14" ry="8" fill="#1a1a1a"/>
      </g>
    </svg>
  );
}

// ── Rana su papero (pagina 2 menu) ────────────────────────────────────────────
export function DoodleFrogDuck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes fdFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fdWing {
          0%,100% { transform: rotate(0deg); transform-origin: 60px 110px; }
          50% { transform: rotate(8deg); transform-origin: 60px 110px; }
        }
        .fd-body { animation: fdFloat 14s ease-in-out infinite; }
        .fd-wing { animation: fdWing 8s ease-in-out infinite; }
      `}</style>

      <g className="fd-body">
        {/* PAPERO — corpo */}
        <ellipse cx="90" cy="118" rx="65" ry="35" fill="#1a1a1a"/>
        {/* Collo papero */}
        <ellipse cx="50" cy="96" rx="18" ry="24" fill="#1a1a1a"/>
        {/* Testa papero */}
        <ellipse cx="38" cy="76" rx="22" ry="18" fill="#1a1a1a"/>
        {/* Becco */}
        <path d="M16 76 Q8 80 10 86 Q14 88 18 82 Z" fill="#1a1a1a"/>
        {/* Occhio papero */}
        <circle cx="32" cy="70" r="6" fill="#f5f0e8"/>
        <circle cx="33" cy="71" r="3" fill="#1a1a1a"/>
        <circle cx="34" cy="70" r="1" fill="#f5f0e8"/>
        {/* Ala */}
        <g className="fd-wing">
          <path d="M55 115 Q90 100 130 110 Q120 125 70 128 Z" fill="#f5f0e8" opacity="0.2"/>
        </g>
        {/* Coda papero */}
        <path d="M155 110 Q168 100 162 90 Q158 85 152 92" stroke="#1a1a1a" strokeWidth="8" fill="none" strokeLinecap="round"/>

        {/* RANA — seduta sul papero */}
        {/* Corpo rana */}
        <ellipse cx="110" cy="92" rx="28" ry="22" fill="#1a1a1a"/>
        {/* Testa rana */}
        <ellipse cx="110" cy="72" rx="24" ry="18" fill="#1a1a1a"/>
        {/* Pancia */}
        <ellipse cx="110" cy="96" rx="16" ry="13" fill="#f5f0e8"/>
        {/* Bocca rana */}
        <path d="M98 80 Q110 88 122 80" stroke="#f5f0e8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Occhi sporgenti */}
        <ellipse cx="96" cy="58" rx="10" ry="12" fill="#1a1a1a"/>
        <ellipse cx="124" cy="58" rx="10" ry="12" fill="#1a1a1a"/>
        <circle cx="96" cy="58" r="6" fill="#f5f0e8"/>
        <circle cx="124" cy="58" r="6" fill="#f5f0e8"/>
        <circle cx="97" cy="59" r="3" fill="#1a1a1a"/>
        <circle cx="125" cy="59" r="3" fill="#1a1a1a"/>
        <circle cx="98" cy="57" r="1.2" fill="#f5f0e8"/>
        <circle cx="126" cy="57" r="1.2" fill="#f5f0e8"/>
        {/* Zampe rana ai lati */}
        <path d="M82 100 Q68 108 62 118 Q68 122 74 115 Q76 120 82 118" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M138 100 Q152 108 158 118 Q152 122 146 115 Q144 120 138 118" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ── Ippopotamo (pagina 3 menu) ────────────────────────────────────────────────
export function DoodleHippo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes hippoChew {
          0%,100% { transform: translateY(0); }
          40%,60% { transform: translateY(3px); }
        }
        @keyframes hippoEar {
          0%,100% { transform: rotate(0deg); transform-origin: 22px 45px; }
          50% { transform: rotate(12deg); transform-origin: 22px 45px; }
        }
        .hi-jaw { animation: hippoChew 12s ease-in-out infinite; }
        .hi-ear { animation: hippoEar 14s ease-in-out infinite; }
      `}</style>
      {/* Corpo */}
      <ellipse cx="120" cy="112" rx="80" ry="42" fill="#1a1a1a"/>
      {/* Testa */}
      <ellipse cx="55" cy="85" rx="46" ry="38" fill="#1a1a1a"/>
      {/* Mascella */}
      <g className="hi-jaw">
        <ellipse cx="55" cy="110" rx="38" ry="16" fill="#1a1a1a"/>
        <rect x="33" y="100" width="10" height="20" rx="4" fill="#f5f0e8"/>
        <rect x="67" y="100" width="10" height="20" rx="4" fill="#f5f0e8"/>
      </g>
      {/* Narici */}
      <ellipse cx="30" cy="80" rx="10" ry="6" fill="#f5f0e8"/>
      <ellipse cx="56" cy="75" rx="10" ry="6" fill="#f5f0e8"/>
      <circle cx="30" cy="80" r="3" fill="#1a1a1a"/>
      <circle cx="56" cy="75" r="3" fill="#1a1a1a"/>
      {/* Occhi */}
      <circle cx="36" cy="55" r="14" fill="#f5f0e8" stroke="#1a1a1a" strokeWidth="3"/>
      <circle cx="72" cy="49" r="14" fill="#f5f0e8" stroke="#1a1a1a" strokeWidth="3"/>
      <circle cx="37" cy="56" r="7" fill="#1a1a1a"/>
      <circle cx="73" cy="50" r="7" fill="#1a1a1a"/>
      <circle cx="39" cy="54" r="2.5" fill="#f5f0e8"/>
      <circle cx="75" cy="48" r="2.5" fill="#f5f0e8"/>
      {/* Orecchie */}
      <g className="hi-ear">
        <ellipse cx="16" cy="45" rx="13" ry="16" fill="#1a1a1a"/>
        <ellipse cx="16" cy="45" rx="6" ry="9" fill="#f5f0e8" opacity="0.4"/>
      </g>
      <ellipse cx="86" cy="40" rx="13" ry="16" fill="#1a1a1a"/>
      <ellipse cx="86" cy="40" rx="6" ry="9" fill="#f5f0e8" opacity="0.4"/>
      {/* Zampe */}
      <ellipse cx="58" cy="148" rx="22" ry="12" fill="#1a1a1a"/>
      <ellipse cx="112" cy="150" rx="22" ry="12" fill="#1a1a1a"/>
      <ellipse cx="165" cy="148" rx="22" ry="12" fill="#1a1a1a"/>
      {/* Coda */}
      <path d="M198 108 Q214 94 210 80 Q206 70 200 76" stroke="#1a1a1a" strokeWidth="6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── Uomo farfalla (pagina 4 menu) ─────────────────────────────────────────────
export function DoodleButterfly({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes bfWingL {
          0%,100% { transform: scaleX(1); }
          50% { transform: scaleX(0.6); }
        }
        @keyframes bfWingR {
          0%,100% { transform: scaleX(1); }
          50% { transform: scaleX(0.6); }
        }
        @keyframes bfFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .bf-wl { animation: bfWingL 7s ease-in-out infinite; transform-origin: 100px 100px; }
        .bf-wr { animation: bfWingR 7s ease-in-out infinite reverse; transform-origin: 100px 100px; }
        .bf-body { animation: bfFloat 12s ease-in-out infinite; }
      `}</style>

      {/* Ali superiori */}
      <g className="bf-wl">
        <path d="M100 100 Q22 30 15 82 Q10 118 65 112 Z" fill="#1a1a1a"/>
        {/* Pattern ala */}
        <ellipse cx="45" cy="75" rx="10" ry="15" fill="#f5f0e8" opacity="0.25"/>
      </g>
      <g className="bf-wr">
        <path d="M100 100 Q178 30 185 82 Q190 118 135 112 Z" fill="#1a1a1a"/>
        <ellipse cx="155" cy="75" rx="10" ry="15" fill="#f5f0e8" opacity="0.25"/>
      </g>
      {/* Ali inferiori */}
      <path d="M100 118 Q38 124 32 155 Q28 178 68 165 Z" fill="#1a1a1a" opacity="0.8"/>
      <path d="M100 118 Q162 124 168 155 Q172 178 132 165 Z" fill="#1a1a1a" opacity="0.8"/>

      <g className="bf-body">
        {/* Corpo insetto */}
        <ellipse cx="100" cy="110" rx="8" ry="24" fill="#1a1a1a"/>
        {/* Testa */}
        <circle cx="100" cy="82" r="13" fill="#1a1a1a"/>
        {/* Occhiali da sole — tipici dell'uomo farfalla */}
        <rect x="89" y="78" width="9" height="7" rx="2" fill="#f5f0e8" opacity="0.8"/>
        <rect x="102" y="78" width="9" height="7" rx="2" fill="#f5f0e8" opacity="0.8"/>
        <line x1="98" y1="81" x2="102" y2="81" stroke="#1a1a1a" strokeWidth="1.5"/>
        {/* Antenne */}
        <path d="M95 70 Q88 55 84 47" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M105 70 Q112 55 116 47" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="83" cy="46" r="4" fill="#1a1a1a"/>
        <circle cx="117" cy="46" r="4" fill="#1a1a1a"/>
        {/* Corpo umano — tuta intera rossa (nel menu è rosso) */}
        <rect x="88" y="134" width="24" height="65" rx="4" fill="#1a1a1a"/>
        {/* Linea zip */}
        <line x1="100" y1="136" x2="100" y2="196" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.6"/>
        {/* Gambe */}
        <rect x="87" y="196" width="11" height="46" rx="4" fill="#1a1a1a"/>
        <rect x="102" y="196" width="11" height="46" rx="4" fill="#1a1a1a"/>
        {/* Scarpe */}
        <ellipse cx="92" cy="244" rx="13" ry="6" fill="#1a1a1a"/>
        <ellipse cx="108" cy="244" rx="13" ry="6" fill="#1a1a1a"/>
        {/* Braccia */}
        <path d="M88 144 Q66 155 58 172" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M112 144 Q134 155 142 172" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
      </g>
    </svg>
  );
}

// ── Gatto doodle (alias per compatibilità) ────────────────────────────────────
export function DoodleFrog({ className = "" }: { className?: string }) {
  return <DoodleFrogDuck className={className} />;
}

export function DoodleHippoFull({ className = "" }: { className?: string }) {
  return <DoodleHippo className={className} />;
}

// ── Stella rotante ────────────────────────────────────────────────────────────
export function DoodleStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes starSpin {
          from { transform: rotate(0deg); transform-origin: 50px 50px; }
          to { transform: rotate(360deg); transform-origin: 50px 50px; }
        }
        .star { animation: starSpin 30s linear infinite; }
      `}</style>
      <g className="star">
        <polygon points="50,5 58,36 90,36 64,56 74,88 50,68 26,88 36,56 10,36 42,36"/>
        <circle cx="50" cy="50" r="8" fill="#f5f0e8"/>
      </g>
    </svg>
  );
}

// ── Burger pulsante ───────────────────────────────────────────────────────────
export function DoodleBurger({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes burgerPulse {
          0%,100% { transform: scaleY(1); transform-origin: 80px 60px; }
          50% { transform: scaleY(1.05); transform-origin: 80px 60px; }
        }
        .bur { animation: burgerPulse 10s ease-in-out infinite; }
      `}</style>
      <g className="bur">
        <path d="M18 50 Q80 20 142 50 L136 62 Q80 38 24 62 Z" fill="#1a1a1a"/>
        <ellipse cx="50" cy="40" rx="5" ry="3" fill="#1a1a1a" opacity="0.35"/>
        <ellipse cx="80" cy="33" rx="5" ry="3" fill="#1a1a1a" opacity="0.35"/>
        <ellipse cx="110" cy="38" rx="5" ry="3" fill="#1a1a1a" opacity="0.35"/>
        <path d="M20 64 Q50 56 80 60 Q110 56 140 64" stroke="#1a1a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <rect x="24" y="66" width="112" height="16" rx="8" fill="#1a1a1a"/>
        <path d="M22 84 L28 96 L132 96 L138 84 Z" fill="#1a1a1a" opacity="0.65"/>
        <path d="M20 96 Q80 112 140 96 L138 104 Q80 120 22 104 Z" fill="#1a1a1a"/>
      </g>
    </svg>
  );
}