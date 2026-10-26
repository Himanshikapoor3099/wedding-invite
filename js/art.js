/* Drawings used across the page, as inline SVG.
   MONOGRAM: poles apart. Her half is a night sky over the mountains, his is
   an evening sky over the beach with a football. What they share sits on
   the line between them: momos at the top, and the long drive along the
   bottom. */
window.ART = {

    monogram: (h, k) => `
<svg viewBox="0 0 240 240" class="mono-svg" role="img" aria-label="${h} and ${k} monogram">
  <defs>
    <clipPath id="mono-clip"><circle cx="120" cy="120" r="100"/></clipPath>
    <linearGradient id="mono-night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#18204a"/><stop offset="1" stop-color="#5a4a8c"/>
    </linearGradient>
    <linearGradient id="mono-eve" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f08a6c"/><stop offset=".7" stop-color="#fbd29a"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#mono-clip)">
    <rect x="0" y="0" width="120" height="240" fill="url(#mono-night)"/>
    <rect x="120" y="0" width="120" height="240" fill="url(#mono-eve)"/>
    <!-- her: stars, moon, mountains -->
    <g fill="#fff8e1">
      <circle cx="40" cy="62" r="1.4"/><circle cx="92" cy="40" r="1.1"/><circle cx="100" cy="78" r="1.2"/>
      <circle cx="30" cy="100" r="1"/><circle cx="74" cy="92" r=".9"/><circle cx="58" cy="30" r="1"/>
    </g>
    <circle cx="62" cy="62" r="11" fill="#fff3c4"/><circle cx="67" cy="57" r="10" fill="#22295a"/>
    <path d="M0 188 L38 132 L56 156 L80 120 L120 188 Z" fill="#2d2f5c"/>
    <path d="M38 132 L30 144 L36 141 L41 146 L46 140 Z M80 120 L71 134 L78 131 L83 136 L89 132 Z" fill="#f4f1ff"/>
    <!-- his: sun, sea, sand and a football -->
    <circle cx="178" cy="150" r="20" fill="#ffd779"/>
    <rect x="120" y="150" width="120" height="40" fill="#3e8db3"/>
    <path d="M124 160 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 M128 172 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0" stroke="#e8f6ff" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <rect x="120" y="182" width="120" height="12" fill="#e9c98f"/>
    <g transform="translate(190 178)">
      <circle r="7" fill="#fff" stroke="#333" stroke-width="1"/>
      <path d="M0 -3 L3 -1 L2 2.5 L-2 2.5 L-3 -1 Z" fill="#333"/>
    </g>
    <!-- poles apart -->
    <line x1="120" y1="24" x2="120" y2="192" stroke="#fffaf0" stroke-width="1.2" stroke-dasharray="3 4" opacity=".75"/>
    <!-- the long drive -->
    <rect x="0" y="192" width="240" height="48" fill="#3b3b40"/>
    <line x1="0" y1="207" x2="240" y2="207" stroke="#f3d27a" stroke-width="1.6" stroke-dasharray="8 7"/>
    <g transform="translate(120 196)">
      <path d="M-19 0 v-7 q0 -3 3 -3 h5 l5 -7 h14 l6 7 h4 q3 0 3 3 v7 z" fill="#c8102e"/>
      <path d="M-9 -10 l4 -5.5 h5 v5.5 z M3 -10 v-5.5 h7 l4.5 5.5 z" fill="#cfe7f5"/>
      <circle cx="-11" cy="0" r="4" fill="#222"/><circle cx="11" cy="0" r="4" fill="#222"/>
      <circle cx="-11" cy="0" r="1.6" fill="#bbb"/><circle cx="11" cy="0" r="1.6" fill="#bbb"/>
    </g>
  </g>
  <!-- momos, shared at the top -->
  <g transform="translate(120 46)">
    <path d="M-15 6 Q-14 -11 0 -13 Q14 -11 15 6 Q0 11 -15 6 Z" fill="#fbf4e6" stroke="#b8925a" stroke-width="1.2"/>
    <path d="M-6 -10 Q-4 -4 -5 3 M0 -13 Q1 -5 0 4 M6 -10 Q4 -4 5 3" stroke="#c9a978" stroke-width="1" fill="none"/>
  </g>
  <!-- initials -->
  <g font-family="Cinzel, serif" font-weight="600" font-size="50" text-anchor="middle" fill="#fffaf0" stroke="rgba(0,0,0,.25)" stroke-width=".8">
    <text x="80" y="134">${h}</text><text x="160" y="134">${k}</text>
  </g>
  <text x="120" y="128" text-anchor="middle" font-family="Italianno, cursive" font-size="34" fill="#f5d27a">&amp;</text>
  <circle cx="120" cy="120" r="100" fill="none" stroke="#c9a14a" stroke-width="3"/>
  <circle cx="120" cy="120" r="108" fill="none" stroke="#c9a14a" stroke-width="1" stroke-dasharray="1 5" stroke-linecap="round"/>
</svg>`,

    // Ivy, until a photo is added
    ivy: `
<svg viewBox="0 0 200 200" class="ivy-svg" role="img" aria-label="Ivy the dog">
  <ellipse cx="100" cy="186" rx="62" ry="8" fill="rgba(0,0,0,.12)"/>
  <path d="M52 186 Q48 130 100 120 Q152 130 148 186 Z" fill="#d9a066"/>
  <path d="M78 186 Q80 150 100 146 Q120 150 122 186 Z" fill="#f6e3c6"/>
  <path d="M46 62 Q20 70 28 120 Q34 136 52 120 Q58 96 60 74 Z" fill="#8a5a33"/>
  <path d="M154 62 Q180 70 172 120 Q166 136 148 120 Q142 96 140 74 Z" fill="#8a5a33"/>
  <ellipse cx="100" cy="86" rx="52" ry="48" fill="#d9a066"/>
  <ellipse cx="100" cy="106" rx="30" ry="22" fill="#f6e3c6"/>
  <circle cx="80" cy="80" r="7" fill="#2b1a10"/><circle cx="120" cy="80" r="7" fill="#2b1a10"/>
  <circle cx="82.5" cy="77.5" r="2.2" fill="#fff"/><circle cx="122.5" cy="77.5" r="2.2" fill="#fff"/>
  <ellipse cx="100" cy="96" rx="10" ry="7" fill="#2b1a10"/>
  <path d="M100 103 v6 M88 108 Q100 118 112 108" stroke="#2b1a10" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M94 112 Q100 128 106 112 Z" fill="#f07a8a"/>
  <!-- flower crown -->
  <g>
    <circle cx="70" cy="46" r="7" fill="#f6cf3e"/><circle cx="86" cy="40" r="7" fill="#b9a3e3"/>
    <circle cx="100" cy="38" r="8" fill="#e8546a"/><circle cx="114" cy="40" r="7" fill="#b9a3e3"/>
    <circle cx="130" cy="46" r="7" fill="#f6cf3e"/>
    <circle cx="100" cy="38" r="2.6" fill="#fff3c4"/><circle cx="70" cy="46" r="2" fill="#e08a1e"/><circle cx="130" cy="46" r="2" fill="#e08a1e"/>
  </g>
  <!-- bow tie -->
  <path d="M100 134 L84 126 L84 142 Z M100 134 L116 126 L116 142 Z" fill="#9b111e"/><circle cx="100" cy="134" r="4" fill="#c8102e"/>
  <!-- envelope in paws -->
  <g transform="translate(100 168) rotate(-6)">
    <rect x="-24" y="-14" width="48" height="30" rx="3" fill="#fffaf0" stroke="#c9a14a" stroke-width="1.5"/>
    <path d="M-24 -14 L0 4 L24 -14" fill="none" stroke="#c9a14a" stroke-width="1.5"/>
    <path d="M0 -1 c-3 -5 -9 -2 -6 2 l6 6 l6 -6 c3 -4 -3 -7 -6 -2 z" fill="#c8102e"/>
  </g>
  <ellipse cx="72" cy="182" rx="12" ry="7" fill="#f6e3c6"/><ellipse cx="128" cy="182" rx="12" ry="7" fill="#f6e3c6"/>
</svg>`,

    // Episode 1 thumbnail: the football ground and the first match schedule
    football: `
<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A football ground">
  <rect width="320" height="180" fill="#2f8a3e"/>
  <g fill="#36994a"><rect x="0" width="40" height="180"/><rect x="80" width="40" height="180"/><rect x="160" width="40" height="180"/><rect x="240" width="40" height="180"/></g>
  <g fill="none" stroke="#e9f7ea" stroke-width="2" opacity=".85">
    <rect x="12" y="12" width="296" height="156"/><line x1="160" y1="12" x2="160" y2="168"/>
    <circle cx="160" cy="90" r="26"/><rect x="12" y="52" width="38" height="76"/><rect x="270" y="52" width="38" height="76"/>
  </g>
  <g transform="translate(206 120)"><circle r="12" fill="#fff" stroke="#222" stroke-width="1.5"/><path d="M0 -5 L5 -1.6 L3 4 L-3 4 L-5 -1.6 Z" fill="#222"/></g>
  <g transform="translate(26 22)">
    <rect width="150" height="58" rx="10" fill="#fff" opacity=".96"/>
    <path d="M18 58 l-6 10 l16 -10 z" fill="#fff"/>
    <text x="12" y="20" font-family="Jost, sans-serif" font-size="11" font-weight="600" fill="#1f6b2c">📅 Match Schedule</text>
    <text x="12" y="36" font-family="Jost, sans-serif" font-size="10" fill="#333">Your match: Sat · 10:00 AM</text>
    <text x="12" y="50" font-family="Jost, sans-serif" font-size="10" fill="#333">Ground 2 · Be on time! ⚽</text>
  </g>
</svg>`,

    // Episode 5 thumbnail: the book
    book: `
<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A book with a heart on the cover">
  <defs><radialGradient id="bk-bg" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#5a1b22"/><stop offset="1" stop-color="#1a0a0c"/></radialGradient></defs>
  <rect width="320" height="180" fill="url(#bk-bg)"/>
  <g transform="translate(160 92) rotate(-8)">
    <rect x="-46" y="-60" width="92" height="120" rx="4" fill="#9b111e"/>
    <rect x="-46" y="-60" width="10" height="120" fill="#7a0d18"/>
    <rect x="-30" y="-48" width="66" height="96" rx="2" fill="none" stroke="#e8c27a" stroke-width="1.4"/>
    <path d="M3 -8 c-8 -12 -24 -4 -16 8 l16 16 l16 -16 c8 -12 -8 -20 -16 -8 z" fill="#e8c27a"/>
    <text x="3" y="36" text-anchor="middle" font-family="Italianno, cursive" font-size="22" fill="#e8c27a">Us</text>
  </g>
  <g fill="#f5d27a"><circle cx="70" cy="40" r="1.6"/><circle cx="250" cy="52" r="1.3"/><circle cx="236" cy="140" r="1.6"/><circle cx="84" cy="138" r="1.2"/></g>
</svg>`,

    ring: `
<svg viewBox="0 0 80 80" class="ring-svg" aria-hidden="true">
  <circle cx="40" cy="50" r="20" fill="none" stroke="#d4af37" stroke-width="5"/>
  <path d="M30 26 L40 14 L50 26 L40 34 Z" fill="#e8f4ff" stroke="#9fc4dd" stroke-width="1.2"/>
  <path d="M30 26 H50 M40 14 V34" stroke="#9fc4dd" stroke-width=".8"/>
</svg>`,

    // Royal arch for the wedding
    arch: `
<svg viewBox="0 0 300 150" class="arch-svg" aria-hidden="true">
  <path d="M14 150 Q14 118 36 108 Q46 70 96 46 Q130 30 150 6 Q170 30 204 46 Q254 70 264 108 Q286 118 286 150" fill="none" stroke="#b8892f" stroke-width="3"/>
  <path d="M26 150 Q26 128 46 118 Q56 82 102 60 Q134 44 150 24 Q166 44 198 60 Q244 82 254 118 Q274 128 274 150" fill="none" stroke="#b8892f" stroke-width="1.2" stroke-dasharray="2 5" stroke-linecap="round"/>
  <circle cx="150" cy="6" r="4" fill="#b8892f"/>
</svg><span class="pillars"></span>`,
};
