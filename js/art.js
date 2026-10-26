/* Illustrations, drawn as inline SVG in one flat, faceless editorial style.
   Shared palette: deep ink, warm skin tones, linen, camel, cherry and gold.
   Both of them wear glasses in every scene. */
window.ART = (function () {
    const C = {
        ink: "#1f1a1c", hair: "#1b1617", skinK: "#b47956", skinH: "#cf9b77",
        linen: "#f1ece2", camel: "#b0835c", khaki: "#c8ae86", cherry: "#9b111e",
        gold: "#c9a14a", cream: "#f4ede1",
    };

    /* ---------- monogram ----------
       Her half: a crescent over mountain peaks. His half: the sun setting into
       the sea. Between them, a hairline (poles apart), momos at the crown and
       the open road along the base: the things they share. */
    const monogram = (h, k, col = C.gold) => `
<svg viewBox="0 0 240 240" class="mono-svg" role="img" aria-label="${h} ${k} monogram">
  <g fill="none" stroke="${col}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="120" cy="120" r="112" stroke-width="1.4"/>
    <circle cx="120" cy="120" r="104" stroke-width=".6"/>
    <path d="M120 28 V212" stroke-width=".6" stroke-dasharray="1 4"/>
    <!-- her: crescent and peaks -->
    <path d="M70 56 a14 14 0 1 0 14 20 a11 11 0 1 1 -14 -20 z" stroke-width="1.1"/>
    <path d="M30 120 L52 90 L62 102 L80 74 L104 112" stroke-width="1.1"/>
    <path d="M75 81 L80 74 L85 82" stroke-width="1.1"/>
    <!-- his: sun and sea -->
    <path d="M156 100 a22 22 0 0 1 44 0" stroke-width="1.1"/>
    <path d="M140 106 h70 M146 114 q8 -4 16 0 t16 0 t16 0 t10 0 M152 122 q8 -4 16 0 t16 0 t16 0" stroke-width="1"/>
    <!-- momos at the crown -->
    <path d="M110 46 q10 -16 20 0 q-10 5 -20 0 z M115 41 q2 3 1 6 M120 38 v7 M125 41 q-2 3 -1 6" stroke-width="1"/>
    <!-- the road -->
    <path d="M58 196 q62 18 124 0" stroke-width="1"/>
    <path d="M110 192 h20 l-2 -5 h-5 l-3 -3 h-6 l-3 3 h-2 z" stroke-width="1"/>
  </g>
  <g fill="${col}" font-family="'Cormorant Garamond', serif" font-weight="500" font-size="66" text-anchor="middle">
    <text x="84" y="170">${h}</text><text x="158" y="170">${k}</text>
  </g>
</svg>`;

    /* ---------- the poster: by the sea at sundown ---------- */
    const poster = `
<svg viewBox="0 0 400 500" class="illus" role="img" aria-label="Himanshi and Karan by the sea at sunset">
  <defs>
    <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3352"/><stop offset=".45" stop-color="#c7766a"/><stop offset=".72" stop-color="#f2b386"/></linearGradient>
    <linearGradient id="ps-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a8a96"/><stop offset="1" stop-color="#2e4251"/></linearGradient>
    <clipPath id="ps-clip"><rect width="400" height="500"/></clipPath>
  </defs>
  <g clip-path="url(#ps-clip)">
    <rect width="400" height="500" fill="url(#ps-sky)"/>
    <circle cx="120" cy="300" r="64" fill="#ffd9a3"/>
    <circle cx="120" cy="300" r="92" fill="#ffd9a3" opacity=".18"/>
    <rect y="300" width="400" height="200" fill="url(#ps-sea)"/>
    <path d="M58 312 h124 M76 324 h88 M92 336 h56" stroke="#ffd9a3" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    <path d="M0 360 q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 M0 392 q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#cfd8de" stroke-width="1.2" fill="none" opacity=".35"/>
    <!-- the deck rail -->
    <rect y="418" width="400" height="14" fill="#8a5e3c"/><rect y="432" width="400" height="68" fill="#2a2023" opacity=".55"/>
    <g fill="#d8cfc4" opacity=".9"><rect x="18" y="432" width="7" height="68"/><rect x="88" y="432" width="7" height="68"/><rect x="330" y="432" width="7" height="68"/></g>

    <!-- HER (right), turned towards him -->
    <path d="M262 214 C300 206 318 236 314 270 C312 300 326 330 318 372 C312 404 330 430 322 470 L246 470 C252 420 236 380 246 330 C252 296 232 236 262 214 Z" fill="${C.hair}"/>
    <path d="M226 356 C226 322 246 306 270 304 C302 304 330 320 334 360 L344 500 L214 500 Z" fill="${C.camel}"/>
    <path d="M262 306 L276 334 L290 306" fill="none" stroke="#8f6646" stroke-width="2"/>
    <rect x="255" y="282" width="18" height="28" rx="6" fill="${C.skinH}"/>
    <ellipse cx="262" cy="258" rx="26" ry="32" fill="${C.skinH}" transform="rotate(-10 262 258)"/>
    <path d="M238 236 C246 212 284 208 292 238 C282 228 262 226 246 246 C244 240 240 238 238 236 Z" fill="${C.hair}"/>
    <path d="M286 236 C298 262 296 296 284 318 L304 300 C306 270 300 248 286 236 Z" fill="${C.hair}"/>
    <rect x="236" y="250" width="22" height="12" rx="4" fill="${C.ink}"/><path d="M258 254 h18" stroke="${C.ink}" stroke-width="2"/>
    <!-- her arm reaching to his collar -->
    <path d="M238 340 C220 330 206 318 196 298 L210 290 C220 306 236 318 252 324 Z" fill="${C.camel}"/>
    <ellipse cx="198" cy="290" rx="9" ry="7" fill="${C.skinH}" transform="rotate(-30 198 290)"/>

    <!-- HIM (left), looking out to sea -->
    <path d="M92 500 L100 356 C104 318 128 304 160 300 L184 298 L196 300 C226 306 244 322 246 358 L250 500 Z" fill="${C.linen}"/>
    <path d="M160 300 L174 344 L184 298 M196 300 L188 344 L184 298" fill="#ddd5c6"/>
    <path d="M170 302 L184 336 L194 302 Z" fill="${C.skinK}"/>
    <path d="M150 380 V500 M214 390 V500" stroke="#e1dace" stroke-width="2"/>
    <rect x="168" y="262" width="30" height="42" rx="8" fill="${C.skinK}"/>
    <ellipse cx="182" cy="232" rx="30" ry="37" fill="${C.skinK}"/>
    <path d="M152 236 C152 272 166 280 182 280 C200 280 212 270 212 236 C206 256 196 260 182 260 C168 260 158 254 152 236 Z" fill="#2a2120"/>
    <path d="M150 222 C146 188 170 176 188 178 C212 180 222 196 216 222 C212 206 198 202 186 204 C168 204 158 210 150 222 Z" fill="${C.hair}"/>
    <path d="M160 190 C172 172 204 170 214 192 C200 184 180 184 160 190 Z" fill="#2d2627"/>
    <rect x="156" y="222" width="22" height="13" rx="3" fill="${C.ink}"/><rect x="186" y="222" width="22" height="13" rx="3" fill="${C.ink}"/>
    <path d="M178 226 h8" stroke="${C.ink}" stroke-width="2.4"/>
    <ellipse cx="151" cy="236" rx="5" ry="8" fill="${C.skinK}"/>
  </g>
</svg>`;

    /* ---------- episode scenes (16:9) ---------- */
    const fixture = `
<svg viewBox="0 0 320 180" class="illus" role="img" aria-label="A football ground and a phone with a new message">
  <rect width="320" height="180" fill="#2c6343"/>
  <g fill="#326d4b">${[0, 64, 128, 192, 256].map((x) => `<rect x="${x}" width="32" height="180"/>`).join("")}</g>
  <g fill="none" stroke="#e9efe6" stroke-width="1.6" opacity=".75">
    <rect x="14" y="14" width="292" height="152"/><path d="M160 14 V166"/><circle cx="160" cy="90" r="24"/>
    <rect x="14" y="54" width="34" height="72"/><rect x="272" y="54" width="34" height="72"/>
  </g>
  <circle cx="226" cy="116" r="7" fill="#f4efe6"/><path d="M226 112 l3.4 2.4 -1.3 4 h-4.2 l-1.3 -4 z" fill="${C.ink}"/>
  <g transform="translate(58 30) rotate(-9)">
    <rect width="70" height="124" rx="12" fill="${C.ink}"/>
    <rect x="5" y="8" width="60" height="108" rx="8" fill="${C.cream}"/>
    <rect x="5" y="8" width="60" height="16" rx="8" fill="${C.cherry}"/>
    <rect x="11" y="32" width="40" height="11" rx="5.5" fill="#e3d8c6"/>
    <rect x="11" y="48" width="30" height="11" rx="5.5" fill="#e3d8c6"/>
    <rect x="19" y="66" width="40" height="11" rx="5.5" fill="#2c6343"/>
    <rect x="11" y="84" width="44" height="11" rx="5.5" fill="#e3d8c6"/>
    <circle cx="57" cy="22" r="7" fill="${C.gold}"/>
  </g>
</svg>`;

    const metro = `
<svg viewBox="0 0 320 180" class="illus" role="img" aria-label="A small car waiting under the metro line at dusk">
  <defs><linearGradient id="mt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#23233f"/><stop offset=".6" stop-color="#b8606a"/><stop offset="1" stop-color="#f0ad7c"/></linearGradient>
  <linearGradient id="mt-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe2a6" stop-opacity=".75"/><stop offset="1" stop-color="#ffe2a6" stop-opacity="0"/></linearGradient></defs>
  <rect width="320" height="180" fill="url(#mt-sky)"/>
  <g fill="#f6e6c8"><circle cx="40" cy="22" r="1"/><circle cx="96" cy="14" r="1.2"/><circle cx="250" cy="20" r="1"/><circle cx="290" cy="34" r="1.2"/></g>
  <circle cx="262" cy="40" r="10" fill="#f6e6c8"/>
  <rect y="56" width="320" height="16" fill="#191726"/>
  <g fill="#ffd38a" opacity=".85">${[20, 70, 120, 170, 220, 270].map((x) => `<rect x="${x}" y="72" width="18" height="2.5"/>`).join("")}</g>
  <g fill="#1e1b2c">${[34, 118, 202, 286].map((x) => `<rect x="${x}" y="72" width="14" height="82"/>`).join("")}</g>
  <rect y="150" width="320" height="30" fill="#17141f"/>
  <path d="M0 166 h320" stroke="#5a4a5c" stroke-width="2" stroke-dasharray="14 12"/>
  <polygon points="214,138 320,118 320,166" fill="url(#mt-beam)"/>
  <g transform="translate(142 120)">
    <path d="M0 30 V18 Q0 12 6 11 L16 10 L26 1 Q28 0 32 0 H56 Q62 0 66 6 L72 13 Q76 14 76 20 V30 Z" fill="${C.cherry}"/>
    <path d="M28 4 H44 V12 H20 Z M48 4 H56 Q60 4 63 8 L66 12 H48 Z" fill="#f6d9a8"/>
    <circle cx="16" cy="30" r="7" fill="${C.ink}"/><circle cx="60" cy="30" r="7" fill="${C.ink}"/>
    <circle cx="16" cy="30" r="2.6" fill="#8a8a92"/><circle cx="60" cy="30" r="2.6" fill="#8a8a92"/>
    <rect x="70" y="16" width="6" height="4" rx="2" fill="#ffe2a6"/>
  </g>
  <g transform="translate(244 104)">
    <path d="M-1 6 C-8 10 -9 26 -7 38 L7 38 C9 26 8 10 1 6 Z" fill="${C.hair}"/>
    <circle cx="0" cy="6" r="6" fill="${C.skinH}"/>
    <path d="M-6 4 Q0 -4 6 4 Q0 0 -6 4Z" fill="${C.hair}"/>
    <path d="M-7 18 Q0 14 7 18 L9 46 H-9 Z" fill="${C.camel}"/>
    <rect x="-6" y="46" width="4" height="16" fill="${C.ink}"/><rect x="2" y="46" width="4" height="16" fill="${C.ink}"/>
  </g>
</svg>`;

    const table = `
<svg viewBox="0 0 320 180" class="illus" role="img" aria-label="A table for two with dumplings, tea and coffee">
  <rect width="320" height="180" fill="#5d3f2c"/>
  <g stroke="#684834" stroke-width="2">${[18, 44, 70, 96, 122, 148, 174].map((y) => `<path d="M0 ${y} H320"/>`).join("")}</g>
  <circle cx="160" cy="94" r="80" fill="#2e211b" opacity=".35"/>
  <circle cx="160" cy="90" r="78" fill="${C.cream}"/>
  <circle cx="160" cy="90" r="72" fill="none" stroke="#e1d5bf" stroke-width="1"/>
  <circle cx="108" cy="96" r="22" fill="#fff"/><circle cx="108" cy="96" r="15" fill="none" stroke="#e8dfcf" stroke-width="1.2"/>
  <circle cx="212" cy="96" r="22" fill="#fff"/><circle cx="212" cy="96" r="15" fill="none" stroke="#e8dfcf" stroke-width="1.2"/>
  <circle cx="160" cy="58" r="24" fill="#c99b5c"/><circle cx="160" cy="58" r="19" fill="#e7cf9f"/>
  <g fill="#fbf5ea" stroke="#d9c7a5" stroke-width=".8">
    <circle cx="152" cy="52" r="6"/><circle cx="168" cy="52" r="6"/><circle cx="152" cy="66" r="6"/><circle cx="168" cy="66" r="6"/><circle cx="160" cy="59" r="6"/>
  </g>
  <g stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"><path d="M182 118 L232 138 M186 112 L236 132"/></g>
  <circle cx="122" cy="138" r="12" fill="#fff" stroke="#e1d5bf"/><circle cx="122" cy="138" r="8" fill="#c48552"/>
  <circle cx="198" cy="58" r="11" fill="#fff" stroke="#e1d5bf"/><circle cx="198" cy="58" r="7.5" fill="#3a2418"/>
  <path d="M112 62 q-6 -8 0 -16 M118 60 q-6 -8 0 -16" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/>
</svg>`;

    const poles = `
<svg viewBox="0 0 320 180" class="illus" role="img" aria-label="Night mountains on one side, a sunset beach on the other">
  <defs>
    <linearGradient id="pl-n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121633"/><stop offset="1" stop-color="#3a3768"/></linearGradient>
    <linearGradient id="pl-d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e98a72"/><stop offset="1" stop-color="#f7d29a"/></linearGradient>
    <clipPath id="pl-l"><polygon points="0,0 176,0 144,180 0,180"/></clipPath>
    <clipPath id="pl-r"><polygon points="176,0 320,0 320,180 144,180"/></clipPath>
  </defs>
  <g clip-path="url(#pl-l)">
    <rect width="320" height="180" fill="url(#pl-n)"/>
    <g fill="#f3ecd9">${[[24, 22], [62, 40], [108, 18], [140, 46], [40, 70], [92, 64]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1"/>`).join("")}</g>
    <path d="M76 30 a13 13 0 1 0 12 18 a10 10 0 1 1 -12 -18 z" fill="#f3ecd9"/>
    <path d="M-10 180 L44 96 L70 130 L104 78 L170 180 Z" fill="#26254a"/>
    <path d="M44 96 L34 112 L46 108 L54 112 Z M104 78 L92 98 L104 92 L116 98 Z" fill="#e8e4f4"/>
  </g>
  <g clip-path="url(#pl-r)">
    <rect width="320" height="180" fill="url(#pl-d)"/>
    <circle cx="246" cy="112" r="28" fill="#ffe3a3"/>
    <rect y="112" width="320" height="68" fill="#3d6780"/>
    <path d="M200 126 h90 M214 138 h60 M226 150 h34" stroke="#ffe3a3" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
    <path d="M140 164 q20 -10 40 -2 t40 2 t40 -2 t40 2 L320 180 H140 Z" fill="#e8cf9f"/>
  </g>
  <path d="M176 0 L144 180" stroke="${C.gold}" stroke-width="1.6"/>
</svg>`;

    const book = `
<svg viewBox="0 0 320 180" class="illus" role="img" aria-label="An open book with a ring resting on the last page">
  <defs><radialGradient id="bk-lamp" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#5a2a24"/><stop offset="1" stop-color="#1c0f0f"/></radialGradient></defs>
  <rect width="320" height="180" fill="url(#bk-lamp)"/>
  <path d="M60 46 Q110 34 160 48 Q210 34 260 46 L262 146 Q210 136 160 150 Q110 136 58 146 Z" fill="#2a1814" opacity=".5" transform="translate(4 6)"/>
  <path d="M60 46 Q110 34 160 48 L160 150 Q110 136 58 146 Z" fill="#f3ead8"/>
  <path d="M160 48 Q210 34 260 46 L262 146 Q210 136 160 150 Z" fill="#fbf4e6"/>
  <path d="M160 48 V150" stroke="#d8c8ab" stroke-width="2"/>
  <g stroke="#d6c6a8" stroke-width="2" stroke-linecap="round">${[66, 78, 90, 102, 114, 126].map((y) => `<path d="M76 ${y} H144"/>`).join("")}</g>
  <text x="211" y="86" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="15" fill="${C.cherry}">Will you</text>
  <text x="211" y="102" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="15" fill="${C.cherry}">marry me?</text>
  <circle cx="211" cy="126" r="8" fill="none" stroke="${C.gold}" stroke-width="2.4"/>
  <path d="M205 117 L211 110 L217 117 L211 121 Z" fill="#eaf4fb" stroke="#a9c7da" stroke-width=".8"/>
</svg>`;

    // the tennis court, with her on one knee
    const tennis = `
<svg viewBox="0 0 320 180" class="illus" role="img" aria-label="Himanshi on one knee on a tennis court, proposing to Karan">
  <defs><pattern id="tn-mesh" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0 L8 8 M8 0 L0 8" stroke="#2a5a46" stroke-width=".7"/></pattern></defs>
  <rect width="320" height="180" fill="#e9e4da"/>
  <rect width="320" height="112" fill="#1f4636"/><rect width="320" height="112" fill="url(#tn-mesh)"/>
  <g fill="#1a3a2d">${[40, 120, 200, 280].map((x) => `<rect x="${x}" y="0" width="4" height="112"/>`).join("")}</g>
  <rect y="112" width="320" height="12" fill="#4f8a5e"/>
  <rect y="124" width="320" height="56" fill="#2f5f9e"/>
  <path d="M0 130 H320 M0 168 H320" stroke="#e9eef6" stroke-width="2"/>
  <!-- net -->
  <rect x="236" y="96" width="84" height="34" fill="url(#tn-mesh)"/><rect x="236" y="94" width="84" height="4" fill="#f4f1ea"/><rect x="234" y="94" width="4" height="40" fill="#555"/>
  <!-- him -->
  <g transform="translate(96 40)">
    <rect x="-20" y="22" width="16" height="44" rx="5" fill="#3b78b8"/>
    <rect x="-22" y="2" width="4" height="26" rx="2" fill="#e8742c" transform="rotate(-12 -20 14)"/>
    <path d="M-12 22 Q-12 16 0 16 H12 Q22 16 22 26 L24 64 H-12 Z" fill="#3a3a40"/>
    <rect x="-10" y="62" width="34" height="24" rx="4" fill="#4a505c"/>
    <rect x="-6" y="86" width="9" height="34" fill="${C.skinK}"/><rect x="13" y="86" width="9" height="34" fill="${C.skinK}"/>
    <rect x="-7" y="114" width="11" height="8" fill="#d9d9d9"/><rect x="12" y="114" width="11" height="8" fill="#d9d9d9"/>
    <path d="M18 30 Q32 42 34 56 L28 58 Q24 46 14 38 Z" fill="#3a3a40"/>
    <rect x="2" y="10" width="10" height="9" fill="${C.skinK}"/>
    <ellipse cx="8" cy="0" rx="11" ry="13" fill="${C.skinK}"/>
    <path d="M-3 -2 Q-4 -15 8 -15 Q19 -15 19 -4 Q14 -10 6 -9 Q0 -8 -3 -2Z" fill="${C.hair}"/>
    <path d="M0 4 Q2 13 10 12 Q16 11 18 3 Q14 8 9 8 Q4 8 0 4Z" fill="#2a2120"/>
    <rect x="9" y="-3" width="9" height="5" rx="1.5" fill="none" stroke="${C.ink}" stroke-width="1.4"/>
  </g>
  <!-- her, on one knee -->
  <g transform="translate(176 86)">
    <path d="M6 -8 C16 -6 18 10 16 30 L4 32 C2 18 0 2 6 -8Z" fill="${C.hair}"/>
    <path d="M-6 8 Q-6 2 4 2 H12 Q20 4 20 14 L20 38 H-6 Z" fill="#f4f1ea"/>
    <g fill="${C.ink}"><rect x="-6" y="10" width="26" height="4"/><rect x="-6" y="18" width="26" height="4"/><rect x="-6" y="26" width="26" height="4"/></g>
    <path d="M-8 36 H22 L26 48 H-12 Z" fill="#f7f4ee"/>
    <rect x="-10" y="46" width="22" height="8" rx="3" fill="${C.skinH}"/>
    <rect x="-12" y="46" width="7" height="22" fill="${C.skinH}"/>
    <rect x="12" y="46" width="8" height="20" fill="${C.skinH}" transform="rotate(-8 16 46)"/>
    <rect x="-14" y="64" width="12" height="6" rx="2" fill="#f4f1ea"/><rect x="12" y="62" width="16" height="6" rx="2" fill="#f4f1ea"/>
    <path d="M-4 12 Q-18 4 -28 -2 L-25 -7 Q-14 -2 0 4 Z" fill="${C.ink}"/>
    <circle cx="-30" cy="-6" r="5" fill="#d9ec3c"/>
    <circle cx="6" cy="-6" r="10" fill="${C.skinH}"/>
    <path d="M-5 -10 Q-4 -20 8 -19 Q17 -18 16 -8 Z" fill="${C.ink}"/><path d="M-10 -9 H6" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
    <rect x="-4" y="-7" width="7" height="5" rx="1.5" fill="none" stroke="${C.ink}" stroke-width="1.3"/>
  </g>
  <g fill="#d9ec3c">${[[214, 150], [226, 156], [238, 150], [250, 158], [262, 150], [274, 157], [286, 151], [298, 158]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5"/>`).join("")}</g>
</svg>`;

    /* ---------- Ivy, in her blue collar and a festive tilak ---------- */
    const ivy = `
<svg viewBox="0 0 300 340" class="illus ivy-svg" role="img" aria-label="Ivy, a golden dog with a red tilak and a blue collar">
  <path d="M70 340 C70 280 96 236 150 232 C204 236 230 280 230 340 Z" fill="#e8cc9c"/>
  <path d="M112 340 C116 300 130 276 150 274 C170 276 184 300 188 340 Z" fill="#f3e2c2"/>
  <path d="M96 240 Q150 268 204 240 L208 258 Q150 288 92 258 Z" fill="#2b4c8c"/>
  <rect x="136" y="262" width="22" height="14" rx="3" fill="none" stroke="#c9ced6" stroke-width="3"/>
  <path d="M92 92 C60 100 46 160 56 222 C60 246 86 248 94 226 C100 184 104 132 100 100 Z" fill="#c58c58"/>
  <path d="M208 92 C240 100 254 160 244 222 C240 246 214 248 206 226 C200 184 196 132 200 100 Z" fill="#c58c58"/>
  <path d="M150 60 C206 60 232 100 230 150 C228 204 200 240 150 244 C100 240 72 204 70 150 C68 100 94 60 150 60 Z" fill="#ebd2a4"/>
  <path d="M150 60 C206 60 232 100 230 150 C214 118 186 100 150 100 C114 100 86 118 70 150 C68 100 94 60 150 60 Z" fill="#e0bd85"/>
  <ellipse cx="150" cy="196" rx="44" ry="38" fill="#f5e6ca"/>
  <path d="M146 92 Q150 84 154 92 L156 122 Q150 128 144 122 Z" fill="#c4262e"/>
  <path d="M104 150 Q116 138 130 148 Q118 158 104 150 Z" fill="#2a1a14"/>
  <path d="M170 148 Q184 138 196 150 Q182 158 170 148 Z" fill="#2a1a14"/>
  <circle cx="122" cy="147" r="2" fill="#fff"/><circle cx="188" cy="147" r="2" fill="#fff"/>
  <path d="M130 176 Q150 168 170 176 Q172 192 150 198 Q128 192 130 176 Z" fill="#5a3a32"/>
  <path d="M140 178 Q146 176 150 178" stroke="#7d5a50" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M150 198 V210 M136 214 Q150 224 164 214" stroke="#8b6a58" stroke-width="2.4" fill="none" stroke-linecap="round"/>
</svg>`;

    /* ---------- event backdrops ---------- */
    const decoFan = `
<svg viewBox="0 0 400 220" class="deco-fan" aria-hidden="true">
  <g fill="none" stroke="#d4af37" stroke-width=".8">
    ${Array.from({ length: 19 }, (_, i) => { const a = Math.PI * (i / 18); return `<path d="M200 220 L${(200 - 190 * Math.cos(a)).toFixed(1)} ${(220 - 190 * Math.sin(a)).toFixed(1)}"/>`; }).join("")}
    <path d="M60 220 A140 140 0 0 1 340 220"/><path d="M100 220 A100 100 0 0 1 300 220"/><path d="M140 220 A60 60 0 0 1 260 220"/>
  </g>
</svg>`;

    const arch = `
<svg viewBox="0 0 300 150" class="arch-svg" aria-hidden="true">
  <path d="M14 150 Q14 118 36 108 Q46 70 96 46 Q130 30 150 6 Q170 30 204 46 Q254 70 264 108 Q286 118 286 150" fill="none" stroke="#b8892f" stroke-width="2.4"/>
  <path d="M26 150 Q26 128 46 118 Q56 82 102 60 Q134 44 150 24 Q166 44 198 60 Q244 82 254 118 Q274 128 274 150" fill="none" stroke="#b8892f" stroke-width="1" stroke-dasharray="2 5" stroke-linecap="round"/>
  <circle cx="150" cy="6" r="3.4" fill="#b8892f"/>
</svg><span class="pillars"></span>`;

    const colonnade = `
<svg viewBox="0 0 400 90" preserveAspectRatio="xMidYMax slice" class="colonnade" aria-hidden="true">
  <g fill="none" stroke="#b8892f" stroke-width="1">
    ${Array.from({ length: 8 }, (_, i) => { const x = i * 50; return `<path d="M${x + 6} 90 V46 Q${x + 6} 26 ${x + 25} 14 Q${x + 44} 26 ${x + 44} 46 V90"/>`; }).join("")}
    <path d="M0 89.5 H400"/>
  </g>
</svg>`;

    return { C, monogram, poster, fixture, metro, table, poles, book, tennis, ivy, decoFan, arch, colonnade };
})();
