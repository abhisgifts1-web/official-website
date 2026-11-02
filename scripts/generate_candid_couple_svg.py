import os

os.makedirs('public/images/custom-art', exist_ok=True)

# 9. CARTOON CANDID COUPLE (ROMANTIC SELFIE / POLAROID STYLE)
candid_couple_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="candid_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E0E2E"/>
      <stop offset="50%" stop-color="#38194E"/>
      <stop offset="100%" stop-color="#140620"/>
    </linearGradient>
    <radialGradient id="sun_glow" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#FFD54F" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#FF8A80" stop-opacity="0.45"/>
      <stop offset="80%" stop-color="#BA68C8" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_c" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="40%" stop-color="#FFCA28"/>
      <stop offset="100%" stop-color="#FF8F00"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#candid_bg)"/>
  <circle cx="400" cy="380" r="380" fill="url(#sun_glow)"/>

  <!-- Floating Cute Hearts & Sparkles -->
  <g opacity="0.85">
    <path d="M 160 220 C 160 200, 180 190, 190 205 C 200 190, 220 200, 220 220 C 220 240, 190 260, 190 260 C 190 260, 160 240, 160 220 Z" fill="#FF4081"/>
    <path d="M 600 180 C 600 160, 620 150, 630 165 C 640 150, 660 160, 660 180 C 660 200, 630 220, 630 220 C 630 220, 600 200, 600 180 Z" fill="#FF1744"/>
    <path d="M 390 180 C 390 155, 415 145, 425 165 C 435 145, 460 155, 460 180 C 460 210, 425 235, 425 235 C 425 235, 390 210, 390 180 Z" fill="#FF5252" filter="drop-shadow(0px 0px 8px #FF5252)"/>
    <circle cx="280" cy="160" r="6" fill="#FFF59D"/>
    <circle cx="520" cy="150" r="7" fill="#FFE082"/>
  </g>

  <!-- Animated Couple Taking Cute Photo -->
  <!-- Boy (Left) -->
  <g transform="translate(310, 480)">
    <path d="M -80 110 C -80 40, 30 30, 30 110 L 40 320 L -90 320 Z" fill="#2E7D32"/>
    <!-- Yellow Tee underneath -->
    <polygon points="-40,40 -5,40 -22,75" fill="#FFF176"/>
    <rect x="-45" y="0" width="50" height="50" rx="14" fill="#FFCC99"/>
    <ellipse cx="-20" cy="-40" rx="60" ry="70" fill="#FFD7AA"/>
    <!-- Boy Hair -->
    <path d="M -75 -50 C -75 -115, 35 -115, 35 -50 Z" fill="#212121"/>
    <!-- Boy Winking Eye -->
    <ellipse cx="-40" cy="-40" rx="14" ry="18" fill="#FFF"/>
    <circle cx="-38" cy="-38" r="8" fill="#212121"/>
    <circle cx="-42" cy="-42" r="3" fill="#FFF"/>
    <!-- Winking Eye (Right) -->
    <path d="M -5 -40 Q 10 -30 25 -40" stroke="#212121" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Big Happy Smile -->
    <path d="M -35 -10 Q -10 15 15 -10 Z" fill="#C2185B"/>
    <path d="M -25 -10 Q -10 2 5 -10" fill="#FFF"/>
    <!-- Rosy Cheek -->
    <ellipse cx="-55" cy="-20" rx="10" ry="6" fill="#FF8A80" opacity="0.6"/>
  </g>

  <!-- Girl (Right) Making Peace Sign -->
  <g transform="translate(490, 480)">
    <path d="M -30 110 C -30 30, 80 40, 80 110 L 90 320 L -20 320 Z" fill="#C2185B"/>
    <rect x="-10" y="0" width="50" height="50" rx="14" fill="#FFE0B2"/>
    <ellipse cx="15" cy="-40" rx="58" ry="68" fill="#FFE0B2"/>
    <!-- Long Brown Hair with Ponytail -->
    <path d="M -40 -50 C -40 -120, 70 -120, 70 -50 C 70 20, 50 80, 50 80" fill="#4E342E"/>
    <!-- Big Sparkling Anime Eyes -->
    <ellipse cx="-5" cy="-40" rx="15" ry="19" fill="#FFF"/>
    <ellipse cx="35" cy="-40" rx="15" ry="19" fill="#FFF"/>
    <circle cx="-3" cy="-38" r="9" fill="#4A148C"/>
    <circle cx="37" cy="-38" r="9" fill="#4A148C"/>
    <circle cx="-7" cy="-44" r="4" fill="#FFF"/>
    <circle cx="33" cy="-44" r="4" fill="#FFF"/>
    <!-- Eyelashes -->
    <path d="M -20 -55 Q -5 -62 10 -55" stroke="#1A0000" stroke-width="3" fill="none"/>
    <path d="M 20 -55 Q 35 -62 50 -55" stroke="#1A0000" stroke-width="3" fill="none"/>
    <!-- Sweet Open Smile -->
    <path d="M -2 -12 Q 15 12 32 -12 Z" fill="#E91E63"/>
    <!-- Rosy Cheeks -->
    <ellipse cx="-20" cy="-22" rx="10" ry="6" fill="#FF4081" opacity="0.6"/>
    <ellipse cx="50" cy="-22" rx="10" ry="6" fill="#FF4081" opacity="0.6"/>
  </g>

  <!-- Floating Instant Photo Frame Border Effect -->
  <rect x="140" y="70" width="520" height="740" rx="24" fill="none" stroke="url(#gold_c)" stroke-width="4" opacity="0.4"/>

  <!-- Bottom Keepsake Plaque -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#1E0E2E" stroke="url(#gold_c)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ YOU &amp; ME • ENDLESS SMILES ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      ROMANTIC COUPLE FLOATING FRAME • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-candid-couple.svg', 'w', encoding='utf-8') as f:
    f.write(candid_couple_svg)

print('Generated cartoon-candid-couple.svg')
