// Realistic high-detail SVG artwork generator for Frontline Coins USA products
// Provides front, back, and angle views with authentic metal gradients, 3D relief, and enamel fills

export const CoinArt = {
  // 1. Valor & Honor Challenge Coin (Antique Gold / Black Nickel)
  valorEagle: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="rimG" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23fae084"/><stop offset="50%" stop-color="%23d4af37"/><stop offset="85%" stop-color="%239a7414"/><stop offset="100%" stop-color="%235c4302"/></radialGradient>
        <radialGradient id="coreG" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%231a202c"/><stop offset="100%" stop-color="%230b0e14"/></radialGradient>
        <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="%23000" flood-opacity="0.6"/></filter>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(%23rimG)"/>
      <circle cx="200" cy="200" r="182" fill="none" stroke="%233a2a02" stroke-width="6" stroke-dasharray="6,4"/>
      <circle cx="200" cy="200" r="168" fill="url(%23coreG)" stroke="url(%23rimG)" stroke-width="4"/>
      <circle cx="200" cy="200" r="156" fill="none" stroke="%23fae084" stroke-width="1.5" stroke-dasharray="2,3"/>
      <!-- Eagle Crest -->
      <g filter="url(%23emboss)" fill="url(%23rimG)">
        <path d="M200 90 L212 125 L245 125 L220 145 L230 180 L200 160 L170 180 L180 145 L155 125 L188 125 Z"/>
        <path d="M200 155 C230 155 260 180 260 215 C260 250 200 280 200 280 C200 280 140 250 140 215 C140 180 170 155 200 155 Z" fill="%230c1427" stroke="url(%23rimG)" stroke-width="3"/>
        <polygon points="200,185 208,205 230,205 212,218 219,238 200,225 181,238 188,218 170,205 192,205" fill="url(%23rimG)"/>
      </g>
      <!-- Circular Text -->
      <path id="tp1" d="M 50,200 A 150,150 0 0,1 350,200" fill="none"/>
      <path id="tp2" d="M 350,200 A 150,150 0 0,1 50,200" fill="none"/>
      <text font-family="Georgia, serif" font-size="16" font-weight="bold" fill="%23fae084" letter-spacing="4">
        <textPath href="%23tp1" startOffset="50%" text-anchor="middle">HONOR • INTEGRITY • VALOR</textPath>
      </text>
      <text font-family="sans-serif" font-size="13" font-weight="800" fill="%23fae084" letter-spacing="5">
        <textPath href="%23tp2" startOffset="50%" text-anchor="middle">UNITED STATES ARMED FORCES</textPath>
      </text>
    </svg>`,
    back: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="rimG2" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23fae084"/><stop offset="50%" stop-color="%23d4af37"/><stop offset="85%" stop-color="%239a7414"/><stop offset="100%" stop-color="%235c4302"/></radialGradient>
        <radialGradient id="blueCore" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%231a365d"/><stop offset="100%" stop-color="%230c1e3d"/></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(%23rimG2)"/>
      <circle cx="200" cy="200" r="182" fill="none" stroke="%233a2a02" stroke-width="6" stroke-dasharray="6,4"/>
      <circle cx="200" cy="200" r="168" fill="url(%23blueCore)" stroke="url(%23rimG2)" stroke-width="4"/>
      <!-- Great Seal Stars & Laurel -->
      <g fill="%23fae084">
        <circle cx="200" cy="200" r="50" fill="none" stroke="url(%23rimG2)" stroke-width="3"/>
        <path d="M160 200 Q200 250 240 200 Q200 150 160 200" fill="none" stroke="%23fae084" stroke-width="2"/>
        <text x="200" y="206" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="%23fae084" text-anchor="middle">USA</text>
      </g>
      <path id="tpb1" d="M 55,200 A 145,145 0 0,1 345,200" fill="none"/>
      <path id="tpb2" d="M 345,200 A 145,145 0 0,1 55,200" fill="none"/>
      <text font-family="Georgia, serif" font-size="15" font-weight="bold" fill="%23fae084" letter-spacing="4">
        <textPath href="%23tpb1" startOffset="50%" text-anchor="middle">DEFENDING THE FRONTLINE</textPath>
      </text>
      <text font-family="sans-serif" font-size="12" font-weight="bold" fill="%23fae084" letter-spacing="4">
        <textPath href="%23tpb2" startOffset="50%" text-anchor="middle">CUSTOM DIE-CAST 3D BRASS</textPath>
      </text>
    </svg>`,
  },

  // 2. Thin Blue Line Police Coin (Antique Silver / Vivid Blue)
  thinBlueLine: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="silverG" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="%23f1f5f9"/><stop offset="50%" stop-color="%23cbd5e1"/><stop offset="85%" stop-color="%2364748b"/><stop offset="100%" stop-color="%23334155"/></radialGradient>
        <linearGradient id="blueLine" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%231d4ed8"/><stop offset="50%" stop-color="%233b82f6"/><stop offset="100%" stop-color="%231d4ed8"/></linearGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(%23silverG)"/>
      <circle cx="200" cy="200" r="182" fill="none" stroke="%23334155" stroke-width="5" stroke-dasharray="4,4"/>
      <circle cx="200" cy="200" r="168" fill="%230f172a" stroke="url(%23silverG)" stroke-width="4"/>
      <!-- American Flag in Black & White with vibrant Blue Line -->
      <rect x="80" y="115" width="240" height="170" rx="6" fill="%231e293b"/>
      <!-- Stripes -->
      <rect x="80" y="115" width="240" height="13" fill="%23475569"/>
      <rect x="80" y="141" width="240" height="13" fill="%23475569"/>
      <rect x="80" y="167" width="240" height="13" fill="%23475569"/>
      <rect x="80" y="193" width="240" height="15" fill="url(%23blueLine)" stroke="%2393c5fd" stroke-width="1"/>
      <rect x="80" y="222" width="240" height="13" fill="%23475569"/>
      <rect x="80" y="248" width="240" height="13" fill="%23475569"/>
      <rect x="80" y="272" width="240" height="13" fill="%23475569"/>
      <!-- Canton -->
      <rect x="80" y="115" width="105" height="92" fill="%230f172a"/>
      <!-- Stars representation -->
      <circle cx="100" cy="130" r="3" fill="%23cbd5e1"/><circle cx="120" cy="130" r="3" fill="%23cbd5e1"/><circle cx="140" cy="130" r="3" fill="%23cbd5e1"/><circle cx="160" cy="130" r="3" fill="%23cbd5e1"/>
      <circle cx="110" cy="148" r="3" fill="%23cbd5e1"/><circle cx="130" cy="148" r="3" fill="%23cbd5e1"/><circle cx="150" cy="148" r="3" fill="%23cbd5e1"/>
      <circle cx="100" cy="166" r="3" fill="%23cbd5e1"/><circle cx="120" cy="166" r="3" fill="%23cbd5e1"/><circle cx="140" cy="166" r="3" fill="%23cbd5e1"/><circle cx="160" cy="166" r="3" fill="%23cbd5e1"/>
      <circle cx="110" cy="184" r="3" fill="%23cbd5e1"/><circle cx="130" cy="184" r="3" fill="%23cbd5e1"/><circle cx="150" cy="184" r="3" fill="%23cbd5e1"/>
      <!-- Police Shield Badge Overlay in Center -->
      <path d="M200 150 C230 150 245 165 245 195 C245 235 200 260 200 260 C200 260 155 235 155 195 C155 165 170 150 200 150 Z" fill="url(%23silverG)" stroke="%230f172a" stroke-width="2.5"/>
      <text x="200" y="202" font-family="sans-serif" font-size="11" font-weight="900" fill="%230f172a" text-anchor="middle">POLICE</text>
      <text x="200" y="218" font-family="sans-serif" font-size="9" font-weight="bold" fill="%231d4ed8" text-anchor="middle">PATROL</text>
    </svg>`,
    back: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="silverG2" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="%23f1f5f9"/><stop offset="50%" stop-color="%23cbd5e1"/><stop offset="85%" stop-color="%2364748b"/><stop offset="100%" stop-color="%23334155"/></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(%23silverG2)"/>
      <circle cx="200" cy="200" r="182" fill="none" stroke="%23334155" stroke-width="5" stroke-dasharray="4,4"/>
      <circle cx="200" cy="200" r="168" fill="%230f172a" stroke="url(%23silverG2)" stroke-width="4"/>
      <!-- St. Michael archangel icon -->
      <circle cx="200" cy="200" r="110" fill="%231e293b" stroke="url(%23silverG2)" stroke-width="2"/>
      <text x="200" y="180" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="%23cbd5e1" text-anchor="middle">ST. MICHAEL</text>
      <text x="200" y="205" font-family="sans-serif" font-size="13" font-weight="bold" fill="%2360a5fa" text-anchor="middle">PROTECT OUR OFFICERS</text>
      <text x="200" y="235" font-family="Georgia, serif" font-size="12" font-style="italic" fill="%2394a3b8" text-anchor="middle">"Blessed are the peacemakers"</text>
    </svg>`,
  },

  // 3. Fire & Rescue Maltese Cross (Antique Bronze / Ruby Red)
  fireRescue: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="bronzeG" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23d97706"/><stop offset="50%" stop-color="%23b45309"/><stop offset="85%" stop-color="%2378350f"/><stop offset="100%" stop-color="%23451a03"/></radialGradient>
        <radialGradient id="redEnamel" cx="40%" cy="40%" r="60%"><stop offset="0%" stop-color="%23ef4444"/><stop offset="100%" stop-color="%23991b1b"/></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(%23bronzeG)"/>
      <circle cx="200" cy="200" r="168" fill="%231f1309" stroke="url(%23bronzeG)" stroke-width="4"/>
      <!-- Maltese Cross -->
      <g fill="url(%23redEnamel)" stroke="url(%23bronzeG)" stroke-width="3">
        <path d="M200 200 L160 90 L200 115 L240 90 Z"/>
        <path d="M200 200 L240 310 L200 285 L160 310 Z"/>
        <path d="M200 200 L90 160 L115 200 L90 240 Z"/>
        <path d="M200 200 L310 160 L285 200 L310 240 Z"/>
      </g>
      <!-- Center Scramble -->
      <circle cx="200" cy="200" r="50" fill="%231c1917" stroke="url(%23bronzeG)" stroke-width="3"/>
      <text x="200" y="195" font-family="sans-serif" font-size="14" font-weight="900" fill="%23fef08a" text-anchor="middle">FIRE</text>
      <text x="200" y="215" font-family="sans-serif" font-size="12" font-weight="800" fill="url(%23bronzeG)" text-anchor="middle">RESCUE</text>
    </svg>`,
    back: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="brz2" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23d97706"/><stop offset="50%" stop-color="%23b45309"/><stop offset="100%" stop-color="%23451a03"/></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(%23brz2)"/>
      <circle cx="200" cy="200" r="168" fill="%231f1309" stroke="url(%23brz2)" stroke-width="4"/>
      <circle cx="200" cy="200" r="95" fill="none" stroke="url(%23brz2)" stroke-width="2" stroke-dasharray="3,3"/>
      <text x="200" y="175" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="%23fed7aa" text-anchor="middle">FIRST IN • LAST OUT</text>
      <text x="200" y="205" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23ef4444" text-anchor="middle">BROTHERHOOD OF VALOR</text>
      <text x="200" y="235" font-family="sans-serif" font-size="11" fill="%23fdba74" text-anchor="middle">SOLID HEAVY BRONZE RELIEF</text>
    </svg>`,
  },

  // 4. Official Breast Badge (Police / Trooper Sunburst)
  policeBadge: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 420">
      <defs>
        <radialGradient id="badgeGold" cx="35%" cy="25%" r="75%"><stop offset="0%" stop-color="%23fae084"/><stop offset="40%" stop-color="%23d4af37"/><stop offset="85%" stop-color="%239a7414"/><stop offset="100%" stop-color="%235c4302"/></radialGradient>
        <filter id="badgeShadow" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="%23000" flood-opacity="0.45"/></filter>
      </defs>
      <!-- Shield / Sunburst Contour -->
      <g filter="url(%23badgeShadow)">
        <path d="M175 25 C235 25 295 45 295 130 C295 240 175 390 175 390 C175 390 55 240 55 130 C55 45 115 25 175 25 Z" fill="url(%23badgeGold)" stroke="%23fae084" stroke-width="3"/>
        <!-- Eagle Topper -->
        <path d="M175 10 L190 35 L225 30 L205 55 L215 80 L175 60 L135 80 L145 55 L125 30 L160 35 Z" fill="url(%23badgeGold)" stroke="%233a2a02" stroke-width="1.5"/>
        <!-- Top Ribbon Banner -->
        <path d="M90 100 L260 100 L250 135 L100 135 Z" fill="%23091738" stroke="url(%23badgeGold)" stroke-width="2"/>
        <text x="175" y="125" font-family="sans-serif" font-size="14" font-weight="900" fill="%23fae084" text-anchor="middle" letter-spacing="2">STATE TROOPER</text>
        <!-- Center State / Department Seal -->
        <circle cx="175" cy="210" r="50" fill="%230b1329" stroke="url(%23badgeGold)" stroke-width="3"/>
        <polygon points="175,180 182,198 200,198 185,210 191,228 175,217 159,228 165,210 150,198 168,198" fill="url(%23badgeGold)"/>
        <!-- Bottom Banner with Badge Number -->
        <rect x="115" y="290" width="120" height="36" rx="4" fill="%23091738" stroke="url(%23badgeGold)" stroke-width="2"/>
        <text x="175" y="315" font-family="Courier, monospace" font-size="18" font-weight="bold" fill="%23fae084" text-anchor="middle" letter-spacing="3">#8421</text>
      </g>
    </svg>`,
    back: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 420">
      <defs>
        <radialGradient id="badgeGoldBack" cx="35%" cy="25%" r="75%"><stop offset="0%" stop-color="%23fae084"/><stop offset="50%" stop-color="%23b89025"/><stop offset="100%" stop-color="%235c4302"/></radialGradient>
      </defs>
      <path d="M175 25 C235 25 295 45 295 130 C295 240 175 390 175 390 C175 390 55 240 55 130 C55 45 115 25 175 25 Z" fill="url(%23badgeGoldBack)" stroke="%233a2a02" stroke-width="2"/>
      <!-- Heavy Duty Pin & Joint -->
      <rect x="171" y="90" width="8" height="200" fill="%23cbd5e1" stroke="%23475569" stroke-width="1.5"/>
      <circle cx="175" cy="90" r="10" fill="%2364748b"/>
      <circle cx="175" cy="290" r="12" fill="%2364748b"/>
      <text x="175" y="350" font-family="sans-serif" font-size="10" font-weight="bold" fill="%233a2a02" text-anchor="middle">FRONTLINE COINS USA • BALTIMORE MD</text>
    </svg>`,
  },

  // 5. Tactical Trail Badge (Appalachian Mountain Crest)
  trailBadge: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
      <defs>
        <radialGradient id="trailG" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23fde68a"/><stop offset="50%" stop-color="%23d97706"/><stop offset="100%" stop-color="%2378350f"/></radialGradient>
      </defs>
      <!-- Crest Shaped Trail Medallion -->
      <path d="M180 20 L320 80 L290 280 L180 340 L70 280 L40 80 Z" fill="url(%23trailG)" stroke="%23fef3c7" stroke-width="3"/>
      <path d="M180 35 L305 88 L278 268 L180 322 L82 268 L55 88 Z" fill="%2314532d" stroke="url(%23trailG)" stroke-width="2"/>
      <!-- Mountain Peaks -->
      <polygon points="180,95 235,190 125,190" fill="%23f8fafc"/>
      <polygon points="230,120 280,200 180,200" fill="%23e2e8f0"/>
      <polygon points="130,125 180,200 80,200" fill="%23cbd5e1"/>
      <!-- Pines & Trail -->
      <path d="M180 190 Q150 250 180 310" fill="none" stroke="url(%23trailG)" stroke-width="4" stroke-dasharray="6,4"/>
      <text x="180" y="70" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="%23fef3c7" text-anchor="middle">APPALACHIAN TRAIL</text>
      <text x="180" y="270" font-family="sans-serif" font-size="12" font-weight="900" fill="%23fef3c7" text-anchor="middle">SUMMIT MEDALLION</text>
    </svg>`,
    back: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
      <path d="M180 20 L320 80 L290 280 L180 340 L70 280 L40 80 Z" fill="%2378350f" stroke="%23fde68a" stroke-width="2"/>
      <text x="180" y="170" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="%23fef3c7" text-anchor="middle">COMMEMORATIVE</text>
      <text x="180" y="200" font-family="sans-serif" font-size="12" fill="%23fed7aa" text-anchor="middle">Includes curved tack nails for hiking stick</text>
    </svg>`,
  },

  // 6. Bottle Opener Coin
  bottleOpener: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
      <defs>
        <radialGradient id="boMetal" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23f1f5f9"/><stop offset="50%" stop-color="%2394a3b8"/><stop offset="100%" stop-color="%23334155"/></radialGradient>
      </defs>
      <!-- Circular coin with bottle opener top cutout -->
      <circle cx="180" cy="190" r="150" fill="url(%23boMetal)" stroke="%23475569" stroke-width="3"/>
      <!-- Functional Cap Opener Cutout Notch -->
      <path d="M130 90 L230 90 L210 135 L150 135 Z" fill="%230b1329" stroke="%23cbd5e1" stroke-width="2.5"/>
      <circle cx="180" cy="230" r="75" fill="%230b1329" stroke="url(%23boMetal)" stroke-width="3"/>
      <text x="180" y="225" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23f1f5f9" text-anchor="middle">FRONTLINE</text>
      <text x="180" y="245" font-family="sans-serif" font-size="10" font-weight="bold" fill="%2360a5fa" text-anchor="middle">TACTICAL OPENER</text>
    </svg>`,
  },

  // 7. Tactical Morale Patch
  tacticalPatch: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260">
      <defs>
        <pattern id="stitch" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1" fill="%2322c55e" opacity="0.3"/></pattern>
      </defs>
      <!-- Morale Patch with stitched border -->
      <rect x="20" y="20" width="320" height="220" rx="20" fill="%231c1917" stroke="%23854d0e" stroke-width="6"/>
      <rect x="30" y="30" width="300" height="200" rx="14" fill="%231e293b" stroke="%23d97706" stroke-width="2" stroke-dasharray="5,3"/>
      <path d="M180 60 L230 140 L130 140 Z" fill="%2315803d" stroke="%234ade80" stroke-width="2"/>
      <text x="180" y="175" font-family="sans-serif" font-size="18" font-weight="900" fill="%23f8fafc" text-anchor="middle" letter-spacing="2">SWAT TEAM</text>
      <text x="180" y="200" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23eab308" text-anchor="middle">3D PVC MOLDED • HOOK BACK</text>
    </svg>`,
  },

  // 8. Commemorative Service Medal & Neck Ribbon
  serviceMedal: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 440">
      <defs>
        <radialGradient id="medalGold" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="%23fae084"/><stop offset="50%" stop-color="%23d4af37"/><stop offset="100%" stop-color="%2378350f"/></radialGradient>
      </defs>
      <!-- Draped Ribbon: Red, White, Blue -->
      <polygon points="110,20 210,20 230,180 160,220 90,180" fill="%231e3a8a"/>
      <polygon points="125,20 195,20 210,185 160,215 110,185" fill="%23f8fafc"/>
      <polygon points="140,20 180,20 190,190 160,210 130,190" fill="%23b91c1c"/>
      <!-- Brass Jump Ring -->
      <circle cx="160" cy="225" r="16" fill="none" stroke="url(%23medalGold)" stroke-width="4"/>
      <!-- Solid Heavy Die-Cast Medal -->
      <circle cx="160" cy="320" r="90" fill="url(%23medalGold)" stroke="%23fef08a" stroke-width="3"/>
      <circle cx="160" cy="320" r="75" fill="%230b1329" stroke="url(%23medalGold)" stroke-width="2"/>
      <polygon points="160,270 172,305 208,305 178,325 189,360 160,340 131,360 142,325 112,305 148,305" fill="url(%23medalGold)"/>
    </svg>`,
  },

  // 9. Hard Enamel Lapel Pin
  lapelPin: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
      <defs>
        <radialGradient id="pinGold" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23fae084"/><stop offset="60%" stop-color="%23d4af37"/><stop offset="100%" stop-color="%2378350f"/></radialGradient>
      </defs>
      <!-- Shield Shaped Hard Enamel Pin -->
      <path d="M150 30 C195 30 230 45 230 110 C230 190 150 250 150 250 C150 250 70 190 70 110 C70 45 105 30 150 30 Z" fill="%230c1e3d" stroke="url(%23pinGold)" stroke-width="5"/>
      <polygon points="150,80 160,110 190,110 165,128 174,158 150,140 126,158 135,128 110,110 140,110" fill="url(%23pinGold)"/>
      <text x="150" y="200" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="%23fae084" text-anchor="middle">ST. MICHAEL</text>
    </svg>`,
  },

  // 10. Heavy Duty Coin Keychain
  keychain: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
      <defs>
        <radialGradient id="kcGold" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23fae084"/><stop offset="50%" stop-color="%23d4af37"/><stop offset="100%" stop-color="%235c4302"/></radialGradient>
      </defs>
      <!-- Key Ring -->
      <circle cx="150" cy="60" r="40" fill="none" stroke="url(%23kcGold)" stroke-width="7"/>
      <!-- Connector Links -->
      <rect x="145" y="100" width="10" height="25" rx="3" fill="url(%23kcGold)"/>
      <circle cx="150" cy="135" r="10" fill="url(%23kcGold)"/>
      <!-- Coin Inset -->
      <circle cx="150" cy="250" r="105" fill="url(%23kcGold)" stroke="%233a2a02" stroke-width="2"/>
      <circle cx="150" cy="250" r="90" fill="%230f172a" stroke="url(%23kcGold)" stroke-width="2"/>
      <polygon points="150,205 160,235 190,235 165,255 175,285 150,268 125,285 135,255 110,235 140,235" fill="url(%23kcGold)"/>
      <text x="150" y="315" font-family="sans-serif" font-size="10" font-weight="900" fill="%23fae084" text-anchor="middle">PATROL KEYCHAIN</text>
    </svg>`,
  },

  // 11. Tactical Poker Chip
  pokerChip: {
    front: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
      <defs>
        <radialGradient id="chipBlue" cx="40%" cy="40%" r="60%"><stop offset="0%" stop-color="%232563eb"/><stop offset="100%" stop-color="%231e3a8a"/></radialGradient>
      </defs>
      <!-- Heavy Ceramic Poker Chip with Edge Inserts -->
      <circle cx="180" cy="180" r="160" fill="url(%23chipBlue)" stroke="%23ffffff" stroke-width="2"/>
      <!-- Edge striped notches (6 positions) -->
      <rect x="165" y="20" width="30" height="25" rx="4" fill="%23f8fafc"/>
      <rect x="165" y="315" width="30" height="25" rx="4" fill="%23f8fafc"/>
      <rect x="20" y="165" width="25" height="30" rx="4" fill="%23f8fafc"/>
      <rect x="315" y="165" width="25" height="30" rx="4" fill="%23f8fafc"/>
      <!-- Inner Ring -->
      <circle cx="180" cy="180" r="110" fill="%230f172a" stroke="%2360a5fa" stroke-width="3"/>
      <circle cx="180" cy="180" r="95" fill="none" stroke="%2393c5fd" stroke-width="1.5" stroke-dasharray="4,4"/>
      <!-- Center Graphic -->
      <text x="180" y="165" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="%23f8fafc" text-anchor="middle">K-9 UNIT</text>
      <text x="180" y="190" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23fbbf24" text-anchor="middle">TACTICAL SEARCH</text>
      <text x="180" y="215" font-family="sans-serif" font-size="11" fill="%23cbd5e1" text-anchor="middle">CERAMIC 14g CHIP</text>
    </svg>`,
  },
}
