import os

os.makedirs('public/images/custom-art', exist_ok=True)

# 5. CARTOON BIRTHDAY CELEBRATION
birthday_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bday_bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A0A2A"/>
      <stop offset="50%" stop-color="#2D114D"/>
      <stop offset="100%" stop-color="#120524"/>
    </linearGradient>
    <radialGradient id="cake_glow" cx="50%" cy="65%" r="50%">
      <stop offset="0%" stop-color="#FFE082" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#FF9800" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_bday" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF59D"/>
      <stop offset="50%" stop-color="#FBC02D"/>
      <stop offset="100%" stop-color="#F57F17"/>
    </linearGradient>
    <linearGradient id="cake_icing" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF4081"/>
      <stop offset="50%" stop-color="#F50057"/>
      <stop offset="100%" stop-color="#C51162"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#bday_bg)"/>
  <circle cx="400" cy="650" r="380" fill="url(#cake_glow)"/>

  <!-- Colorful Confetti Floating -->
  <g opacity="0.85">
    <rect x="120" y="100" width="14" height="24" rx="4" fill="#FF5252" transform="rotate(25 120 100)"/>
    <rect x="250" y="70" width="16" height="26" rx="4" fill="#448AFF" transform="rotate(-35 250 70)"/>
    <rect x="380" y="120" width="15" height="22" rx="4" fill="#69F0AE" transform="rotate(45 380 120)"/>
    <rect x="520" y="80" width="14" height="25" rx="4" fill="#FFD740" transform="rotate(-20 520 80)"/>
    <rect x="680" y="110" width="18" height="28" rx="4" fill="#E040FB" transform="rotate(15 680 110)"/>
    <rect x="180" y="240" width="12" height="20" rx="3" fill="#FFAB40" transform="rotate(55 180 240)"/>
    <rect x="620" y="220" width="15" height="22" rx="4" fill="#00E676" transform="rotate(-40 620 220)"/>
    <circle cx="90" cy="180" r="8" fill="#FF4081"/>
    <circle cx="710" cy="190" r="10" fill="#40C4FF"/>
    <circle cx="310" cy="160" r="7" fill="#FFD740"/>
    <circle cx="480" cy="170" r="9" fill="#FF5252"/>
  </g>

  <!-- Big Colorful Balloons at Corners -->
  <g>
    <!-- Left Balloon Bundle -->
    <path d="M 120 300 Q 140 460 200 520" stroke="#FFE082" stroke-width="2" fill="none" opacity="0.6"/>
    <ellipse cx="110" cy="220" rx="45" ry="58" fill="#FF1744" filter="drop-shadow(0px 8px 16px rgba(255,23,68,0.4))"/>
    <ellipse cx="100" cy="200" rx="14" ry="24" fill="#FFF" opacity="0.3"/>
    
    <path d="M 170 320 Q 180 460 200 520" stroke="#FFE082" stroke-width="2" fill="none" opacity="0.6"/>
    <ellipse cx="170" cy="260" rx="42" ry="54" fill="#00B0FF" filter="drop-shadow(0px 8px 16px rgba(0,176,255,0.4))"/>
    <ellipse cx="160" cy="242" rx="12" ry="20" fill="#FFF" opacity="0.3"/>

    <!-- Right Balloon Bundle -->
    <path d="M 680 300 Q 660 460 600 520" stroke="#FFE082" stroke-width="2" fill="none" opacity="0.6"/>
    <ellipse cx="690" cy="220" rx="45" ry="58" fill="#FFD600" filter="drop-shadow(0px 8px 16px rgba(255,214,0,0.4))"/>
    <ellipse cx="680" cy="200" rx="14" ry="24" fill="#FFF" opacity="0.4"/>

    <path d="M 630 320 Q 620 460 600 520" stroke="#FFE082" stroke-width="2" fill="none" opacity="0.6"/>
    <ellipse cx="630" cy="260" rx="42" ry="54" fill="#76FF03" filter="drop-shadow(0px 8px 16px rgba(118,255,3,0.4))"/>
    <ellipse cx="620" cy="242" rx="12" ry="20" fill="#FFF" opacity="0.3"/>
  </g>

  <!-- Happy Cartoon Birthday Child (Center) -->
  <g transform="translate(400, 420)">
    <!-- Body -->
    <path d="M -80 120 C -80 60, 80 60, 80 120 L 90 260 L -90 260 Z" fill="#2979FF"/>
    <!-- Yellow Shirt Collar -->
    <path d="M -30 65 L 0 110 L 30 65 Z" fill="#FFEA00"/>

    <!-- Head & Neck -->
    <rect x="-25" y="10" width="50" height="60" rx="15" fill="#FFCC99"/>
    <ellipse cx="0" cy="-20" rx="70" ry="80" fill="#FFD7AA"/>
    <!-- Cute Ears -->
    <ellipse cx="-72" cy="-20" rx="15" ry="20" fill="#FFCC99"/>
    <ellipse cx="72" cy="-20" rx="15" ry="20" fill="#FFCC99"/>

    <!-- Fluffy Cartoon Hair -->
    <path d="M -70 -40 C -70 -110, 70 -110, 70 -40 C 70 -10, 50 10, 50 10 C 20 -20, -20 -20, -50 10 C -50 10, -70 -10, -70 -40 Z" fill="#4E342E"/>

    <!-- Festive Colorful Party Hat with Pom-pom -->
    <polygon points="0,-180 -45,-85 45,-85" fill="#FF007F"/>
    <path d="M -35 -115 L 35 -115" stroke="#FFEA00" stroke-width="8"/>
    <path d="M -25 -145 L 25 -145" stroke="#00E5FF" stroke-width="8"/>
    <!-- Pom-pom on hat top -->
    <circle cx="0" cy="-185" r="16" fill="#FFD600" filter="drop-shadow(0px 0px 8px #FFD600)"/>

    <!-- Big Anime Eyes Smiling -->
    <ellipse cx="-26" cy="-30" rx="18" ry="22" fill="#FFF"/>
    <ellipse cx="26" cy="-30" rx="18" ry="22" fill="#FFF"/>
    <ellipse cx="-24" cy="-28" rx="12" ry="14" fill="#1A237E"/>
    <ellipse cx="28" cy="-28" rx="12" ry="14" fill="#1A237E"/>
    <circle cx="-28" cy="-34" r="5" fill="#FFF"/>
    <circle cx="24" cy="-34" r="5" fill="#FFF"/>

    <!-- Big Joyful Open Smile -->
    <path d="M -26 15 Q 0 52 26 15 Z" fill="#D50000"/>
    <path d="M -15 15 Q 0 30 15 15" fill="#FF80AB"/>
    <!-- Rosy Cheeks -->
    <ellipse cx="-50" cy="0" rx="14" ry="8" fill="#FF4081" opacity="0.6"/>
    <ellipse cx="50" cy="0" rx="14" ry="8" fill="#FF4081" opacity="0.6"/>
  </g>

  <!-- Large Multi-Tier Cartoon Birthday Cake with Glowing Candle -->
  <g transform="translate(400, 700)">
    <!-- Bottom Cake Tier -->
    <rect x="-180" y="30" width="360" height="90" rx="16" fill="#FFF8E1" stroke="#FFD54F" stroke-width="4"/>
    <path d="M -180 55 Q -140 70 -100 55 Q -60 70 -20 55 Q 20 70 60 55 Q 100 70 140 55 Q 160 65 180 55 L 180 30 L -180 30 Z" fill="url(#cake_icing)"/>
    <!-- Sprinkles on bottom tier -->
    <rect x="-120" y="80" width="10" height="4" rx="2" fill="#00E5FF"/>
    <rect x="-40" y="85" width="10" height="4" rx="2" fill="#76FF03"/>
    <rect x="60" y="80" width="10" height="4" rx="2" fill="#FFD600"/>
    <rect x="120" y="88" width="10" height="4" rx="2" fill="#FF1744"/>

    <!-- Top Cake Tier -->
    <rect x="-120" y="-40" width="240" height="70" rx="14" fill="#FFFDE7" stroke="#FFD54F" stroke-width="4"/>
    <path d="M -120 -20 Q -90 -10 -60 -20 Q -30 -10 0 -20 Q 30 -10 60 -20 Q 90 -10 120 -20 L 120 -40 L -120 -40 Z" fill="url(#cake_icing)"/>

    <!-- Birthday Candle with Glowing Flame -->
    <rect x="-8" y="-90" width="16" height="50" rx="4" fill="#00E5FF"/>
    <path d="M -8 -80 L 8 -70" stroke="#FFF" stroke-width="3"/>
    <path d="M -8 -60 L 8 -50" stroke="#FFF" stroke-width="3"/>
    <!-- Candle Wick -->
    <line x1="0" y1="-90" x2="0" y2="-100" stroke="#212121" stroke-width="3"/>
    <!-- Glowing Candle Flame -->
    <ellipse cx="0" cy="-115" rx="14" ry="22" fill="#FF6D00" filter="drop-shadow(0px 0px 14px #FFD600)"/>
    <ellipse cx="0" cy="-112" rx="8" ry="14" fill="#FFEA00"/>
    <ellipse cx="0" cy="-108" rx="4" ry="7" fill="#FFF"/>
  </g>

  <!-- Bottom Keepsake Plaque -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#1A0A2A" stroke="url(#gold_bday)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ HAPPY BIRTHDAY • WISHES & MEMORIES ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      PERSONALISED BIRTHDAY FRAME • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-birthday-celebration.svg', 'w', encoding='utf-8') as f:
    f.write(birthday_svg)

print('Generated cartoon-birthday-celebration.svg')

# 6. CARTOON ANNIVERSARY JUBILEE
anniversary_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="anni_bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#210515"/>
      <stop offset="50%" stop-color="#3D0C26"/>
      <stop offset="100%" stop-color="#14020C"/>
    </linearGradient>
    <radialGradient id="gold_radiance" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#FFF59D" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#FFD54F" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="#FF8F00" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_a" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDE7"/>
      <stop offset="30%" stop-color="#FFD54F"/>
      <stop offset="70%" stop-color="#C79100"/>
      <stop offset="100%" stop-color="#8C6500"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#anni_bg)"/>
  <circle cx="400" cy="450" r="380" fill="url(#gold_radiance)"/>

  <!-- Ornate 24K Gold Filigree Arch -->
  <path d="M 120 750 Q 120 180 400 180 Q 680 180 680 750" fill="none" stroke="url(#gold_a)" stroke-width="8" stroke-dasharray="16,8"/>
  <path d="M 140 750 Q 140 200 400 200 Q 660 200 660 750" fill="none" stroke="url(#gold_a)" stroke-width="3"/>

  <!-- Golden 25 / 50 Anniversary Ribbon Emblem at Top -->
  <g transform="translate(400, 150)">
    <circle cx="0" cy="0" r="48" fill="#5A0E38" stroke="url(#gold_a)" stroke-width="5"/>
    <text x="0" y="8" font-family="serif" font-size="34" font-weight="bold" fill="url(#gold_a)" text-anchor="middle">25</text>
    <text x="0" y="24" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="1">YEARS</text>
  </g>

  <!-- Golden Champagne Glasses Toasting -->
  <g opacity="0.9">
    <path d="M 360 280 L 375 330 L 365 370 L 390 370" stroke="url(#gold_a)" stroke-width="3" fill="none"/>
    <path d="M 440 280 L 425 330 L 435 370 L 410 370" stroke="url(#gold_a)" stroke-width="3" fill="none"/>
    <circle cx="400" cy="275" r="8" fill="#FFF59D" filter="drop-shadow(0px 0px 8px #FFD54F)"/>
  </g>

  <!-- Loving Couple (Animated Caricature) -->
  <!-- Husband (Left) -->
  <g transform="translate(300, 480)">
    <!-- Suit Body -->
    <path d="M -90 100 C -90 30, 20 20, 20 100 L 30 320 L -100 320 Z" fill="#1A237E"/>
    <!-- Crisp White Shirt & Red Bowtie -->
    <polygon points="-35,30 0,30 -18,70" fill="#FFF"/>
    <circle cx="-18" cy="50" r="7" fill="#D50000"/>
    <!-- Head & Neck -->
    <rect x="-45" y="-10" width="55" height="50" rx="14" fill="#FFCC99"/>
    <ellipse cx="-18" cy="-50" rx="60" ry="70" fill="#FFD7AA"/>
    <!-- Groom / Husband Smile & Glasses -->
    <ellipse cx="-38" cy="-55" rx="16" ry="16" fill="none" stroke="url(#gold_a)" stroke-width="4"/>
    <ellipse cx="2" cy="-55" rx="16" ry="16" fill="none" stroke="url(#gold_a)" stroke-width="4"/>
    <line x1="-22" y1="-55" x2="-14" y2="-55" stroke="url(#gold_a)" stroke-width="4"/>
    <circle cx="-38" cy="-55" r="5" fill="#212121"/>
    <circle cx="2" cy="-55" r="5" fill="#212121"/>
    <!-- Warm Smiling Mouth -->
    <path d="M -30 -25 Q -18 -8 -6 -25" stroke="#C2185B" stroke-width="3.5" fill="none"/>
    <!-- Distinguished Hair with Silver Strands -->
    <path d="M -75 -65 C -75 -125, 40 -125, 40 -65 Z" fill="#37474F"/>
    <path d="M -60 -105 Q -20 -115 20 -95" stroke="#CFD8DC" stroke-width="3" fill="none"/>
  </g>

  <!-- Wife (Right) -->
  <g transform="translate(500, 480)">
    <!-- Silk Saree Body -->
    <path d="M -20 100 C -20 20, 90 30, 90 100 L 100 320 L -30 320 Z" fill="#880E4F"/>
    <!-- Golden Pallu Drape -->
    <path d="M -10 50 Q 40 180 80 320" stroke="url(#gold_a)" stroke-width="14" fill="none"/>
    <!-- Pearl Necklace -->
    <path d="M 0 45 Q 18 70 36 45" fill="none" stroke="#FFFDE7" stroke-width="6" stroke-dasharray="6,6"/>
    <!-- Head & Neck -->
    <rect x="-10" y="-10" width="55" height="50" rx="14" fill="#FFE0B2"/>
    <ellipse cx="18" cy="-50" rx="58" ry="68" fill="#FFE0B2"/>
    <!-- Beautiful Anime Eyes Smiling -->
    <ellipse cx="0" cy="-55" rx="14" ry="18" fill="#FFF"/>
    <ellipse cx="36" cy="-55" rx="14" ry="18" fill="#FFF"/>
    <circle cx="2" cy="-53" r="8" fill="#3E2723"/>
    <circle cx="38" cy="-53" r="8" fill="#3E2723"/>
    <circle cx="-1" cy="-56" r="3" fill="#FFF"/>
    <circle cx="35" cy="-56" r="3" fill="#FFF"/>
    <!-- Red Auspicious Bindi -->
    <circle cx="18" cy="-80" r="5" fill="#D50000"/>
    <!-- Joyful Loving Smile -->
    <path d="M 4 -25 Q 18 -8 32 -25" fill="#C2185B" stroke="#880E4F" stroke-width="3"/>
    <!-- Elegant Hair Bun with Jasmine Flowers -->
    <path d="M -40 -65 C -40 -125, 75 -125, 75 -65 Z" fill="#263238"/>
    <circle cx="65" cy="-70" r="14" fill="#FFF9C4" filter="drop-shadow(0px 0px 4px #FFD54F)"/>
  </g>

  <!-- Big Floating Red & Gold Heart -->
  <path d="M 375 390 C 375 365, 395 355, 405 375 C 415 355, 435 365, 435 390 C 435 415, 405 435, 405 435 C 405 435, 375 415, 375 390 Z" fill="#FF1744" filter="drop-shadow(0px 0px 14px rgba(255,23,68,0.9))"/>

  <!-- Bottom Keepsake Plaque -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#210515" stroke="url(#gold_a)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ SILVER & GOLDEN JUBILEE • EST. 2001 ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      24K GOLD SCRIPT HEIRLOOM • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-anniversary-golden.svg', 'w', encoding='utf-8') as f:
    f.write(anniversary_svg)

print('Generated cartoon-anniversary-golden.svg')

# 7. CARTOON SACRED GANESHA (STYLIZED 3D DIVINE ART)
ganesha_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="sanctum_bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A0700"/>
      <stop offset="50%" stop-color="#3E1100"/>
      <stop offset="100%" stop-color="#120400"/>
    </linearGradient>
    <radialGradient id="divine_halo" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FFF9C4" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#FFD54F" stop-opacity="0.7"/>
      <stop offset="65%" stop-color="#FF6F00" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDE7"/>
      <stop offset="35%" stop-color="#FFD54F"/>
      <stop offset="70%" stop-color="#FFA000"/>
      <stop offset="100%" stop-color="#E65100"/>
    </linearGradient>
    <linearGradient id="ganesha_body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="50%" stop-color="#FFCA28"/>
      <stop offset="100%" stop-color="#FFB300"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#sanctum_bg)"/>
  
  <!-- Massive Radiant Golden Sanctum Halo (Backlit Effect) -->
  <circle cx="400" cy="420" r="380" fill="url(#divine_halo)"/>

  <!-- Ornate Sacred Temple Arch -->
  <path d="M 140 800 L 140 380 Q 140 140 400 140 Q 660 140 660 380 L 660 800" fill="none" stroke="url(#gold_g)" stroke-width="10"/>
  <path d="M 170 800 L 170 390 Q 170 170 400 170 Q 630 170 630 390 L 630 800" fill="none" stroke="url(#gold_g)" stroke-width="4" stroke-dasharray="14,10"/>

  <!-- Sacred Kalash with Coconut & Mango Leaves at Peak -->
  <g transform="translate(400, 120)">
    <circle cx="0" cy="0" r="22" fill="#E65100" stroke="url(#gold_g)" stroke-width="4"/>
    <polygon points="0,-36 -14,-15 14,-15" fill="#43A047"/>
    <circle cx="0" cy="-40" r="8" fill="#5D4037"/>
  </g>

  <!-- Glowing Brass Diya Lamps on Flanks -->
  <g transform="translate(180, 680)">
    <path d="M -30 20 Q 0 40 30 20 L 20 10 L -20 10 Z" fill="url(#gold_g)"/>
    <ellipse cx="0" cy="-5" rx="10" ry="18" fill="#FF5722" filter="drop-shadow(0px 0px 14px #FFD54F)"/>
    <ellipse cx="0" cy="-2" rx="5" ry="10" fill="#FFEB3B"/>
  </g>
  <g transform="translate(620, 680)">
    <path d="M -30 20 Q 0 40 30 20 L 20 10 L -20 10 Z" fill="url(#gold_g)"/>
    <ellipse cx="0" cy="-5" rx="10" ry="18" fill="#FF5722" filter="drop-shadow(0px 0px 14px #FFD54F)"/>
    <ellipse cx="0" cy="-2" rx="5" ry="10" fill="#FFEB3B"/>
  </g>

  <!-- Stylized Lotus Throne at Base -->
  <g transform="translate(400, 750)">
    <path d="M -240 40 Q 0 -60 240 40 Q 0 60 -240 40 Z" fill="#D81B60"/>
    <path d="M -180 30 Q 0 -40 180 30 Q 0 40 -180 30 Z" fill="#F48FB1"/>
    <path d="M -80 15 Q 0 -30 80 15 Q 0 30 -80 15 Z" fill="#FFEB3B"/>
  </g>

  <!-- ================= CARTOON / ANIMATED LORD GANESHA ================= -->
  <!-- Dhoti & Seated Body -->
  <g transform="translate(400, 520)">
    <!-- Round Cute Belly (Modak Priya) -->
    <ellipse cx="0" cy="110" rx="120" ry="110" fill="url(#ganesha_body)"/>
    <!-- Pitambar Yellow Silk Dhoti -->
    <path d="M -140 180 C -140 120, 140 120, 140 180 Q 0 240 -140 180 Z" fill="#FF8F00" stroke="url(#gold_g)" stroke-width="6"/>

    <!-- Left Hand Holding Sacred Modak Bowl -->
    <path d="M 80 80 Q 140 60 130 110" stroke="url(#ganesha_body)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <circle cx="135" cy="105" r="22" fill="url(#gold_g)"/>
    <!-- Golden Modak -->
    <path d="M 125 105 Q 135 80 145 105 Z" fill="#FFF59D" stroke="#FFA000" stroke-width="2"/>

    <!-- Right Hand in Abhaya Mudra (Blessing) -->
    <path d="M -80 80 Q -140 60 -130 100" stroke="url(#ganesha_body)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <circle cx="-135" cy="95" r="24" fill="url(#ganesha_body)"/>
    <text x="-135" y="103" font-family="sans-serif" font-size="20" font-weight="bold" fill="#D84315" text-anchor="middle">ॐ</text>

    <!-- Large Cute Animated Ganesha Ears -->
    <path d="M -90 -20 Q -220 -80 -180 40 Q -130 110 -80 40 Z" fill="url(#ganesha_body)" stroke="#FFA000" stroke-width="4"/>
    <path d="M 90 -20 Q 220 -80 180 40 Q 130 110 80 40 Z" fill="url(#ganesha_body)" stroke="#FFA000" stroke-width="4"/>

    <!-- Ganesha Head & Trunk -->
    <ellipse cx="0" cy="-20" rx="95" ry="90" fill="url(#ganesha_body)"/>
    <!-- Curved Cute Trunk -->
    <path d="M -20 20 Q -30 110 30 130 Q 70 130 70 90 Q 70 65 45 65 Q 25 65 25 90" fill="none" stroke="url(#ganesha_body)" stroke-width="36" stroke-linecap="round"/>

    <!-- Sacred Tilak / Trishul on Forehead -->
    <path d="M -20 -50 Q 0 -85 20 -50" stroke="#D50000" stroke-width="8" fill="none"/>
    <line x1="0" y1="-85" x2="0" y2="-45" stroke="#FFD600" stroke-width="6"/>
    <circle cx="0" cy="-45" r="5" fill="#D50000"/>

    <!-- Large Gentle Loving Eyes -->
    <ellipse cx="-45" cy="-25" rx="14" ry="18" fill="#FFF"/>
    <ellipse cx="45" cy="-25" rx="14" ry="18" fill="#FFF"/>
    <ellipse cx="-42" cy="-24" rx="9" ry="12" fill="#2E1C0C"/>
    <ellipse cx="42" cy="-24" rx="9" ry="12" fill="#2E1C0C"/>
    <circle cx="-45" cy="-28" r="4" fill="#FFF"/>
    <circle cx="40" cy="-28" r="4" fill="#FFF"/>

    <!-- Broken Tusk (Right) & Full Tusk (Left) -->
    <path d="M -30 35 L -55 45 L -30 45 Z" fill="#FFFDE7"/>
    <path d="M 30 35 L 45 42 L 30 45 Z" fill="#FFFDE7"/>

    <!-- Regal Golden Crown (Mukut) -->
    <path d="M -75 -85 L 0 -180 L 75 -85 Z" fill="url(#gold_g)" stroke="#FF6F00" stroke-width="4"/>
    <circle cx="0" cy="-140" r="16" fill="#D50000" stroke="url(#gold_g)" stroke-width="4"/>
    <circle cx="0" cy="-185" r="10" fill="#FFEB3B"/>
    <path d="M -50 -105 L 50 -105" stroke="#FFF" stroke-width="4"/>
  </g>

  <!-- Auspicious Mandir Mantras & Bottom Plaque -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#1A0700" stroke="url(#gold_g)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ VAKRATUNDA MAHAKAYA • SHUBH LABH ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      DEVOTIONAL POOJA SANCTUM • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-sacred-ganesha.svg', 'w', encoding='utf-8') as f:
    f.write(ganesha_svg)

print('Generated cartoon-sacred-ganesha.svg')

# 8. CARTOON ROUND CIRCULAR MEDALLION
round_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <radialGradient id="round_bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3A0D23"/>
      <stop offset="60%" stop-color="#230614"/>
      <stop offset="100%" stop-color="#100208"/>
    </radialGradient>
    <radialGradient id="round_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE082" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="#FFB300" stop-opacity="0.45"/>
      <stop offset="85%" stop-color="#FF6F00" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_circ" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="35%" stop-color="#FFD54F"/>
      <stop offset="70%" stop-color="#FF8F00"/>
      <stop offset="100%" stop-color="#B26A00"/>
    </linearGradient>
  </defs>

  <!-- Perfect Circular Medallion Boundary -->
  <circle cx="400" cy="400" r="395" fill="url(#round_bg)" stroke="url(#gold_circ)" stroke-width="10"/>
  <circle cx="400" cy="400" r="360" fill="url(#round_glow)"/>
  <circle cx="400" cy="400" r="350" fill="none" stroke="url(#gold_circ)" stroke-width="3" stroke-dasharray="12,8"/>

  <!-- Floral Garland Around Perimeter -->
  <g opacity="0.8">
    <circle cx="150" cy="200" r="14" fill="#FF4081"/>
    <circle cx="650" cy="200" r="14" fill="#FF4081"/>
    <circle cx="100" cy="400" r="16" fill="#FFD600"/>
    <circle cx="700" cy="400" r="16" fill="#FFD600"/>
    <circle cx="180" cy="620" r="14" fill="#FF4081"/>
    <circle cx="620" cy="620" r="14" fill="#FF4081"/>
    <circle cx="400" cy="80" r="18" fill="#FFAB00"/>
  </g>

  <!-- Stylized Cartoon Couple in Circular Portal -->
  <!-- Groom (Left) -->
  <g transform="translate(320, 420)">
    <path d="M -70 80 C -70 10, 0 10, 0 80 L 10 240 L -80 240 Z" fill="#FFF8E1"/>
    <path d="M -30 25 Q -45 100 -25 240" stroke="url(#gold_circ)" stroke-width="8" fill="none"/>
    <ellipse cx="-35" cy="-20" rx="55" ry="65" fill="#FFD7AA"/>
    <!-- Groom Pagdi -->
    <path d="M -85 -55 C -85 -115, 20 -115, 20 -55 Z" fill="#C2185B"/>
    <circle cx="-35" cy="-90" r="10" fill="#FFD600"/>
    <!-- Groom Eyes & Smile -->
    <ellipse cx="-50" cy="-25" rx="12" ry="16" fill="#FFF"/>
    <ellipse cx="-15" cy="-25" rx="12" ry="16" fill="#FFF"/>
    <circle cx="-48" cy="-25" r="7" fill="#212121"/>
    <circle cx="-13" cy="-25" r="7" fill="#212121"/>
    <path d="M -45 10 Q -32 25 -18 10" stroke="#C2185B" stroke-width="3" fill="none"/>
  </g>

  <!-- Bride (Right) -->
  <g transform="translate(480, 420)">
    <path d="M 0 80 C 0 10, 70 10, 70 80 L 80 240 L -10 240 Z" fill="#D50000"/>
    <path d="M 15 30 Q 55 100 45 240" stroke="url(#gold_circ)" stroke-width="10" fill="none"/>
    <ellipse cx="35" cy="-20" rx="52" ry="62" fill="#FFE0B2"/>
    <!-- Bride Dupatta & Hair -->
    <path d="M -15 -55 C -15 -115, 85 -115, 85 -55 Z" fill="#212121"/>
    <path d="M -15 -55 C -15 -125, 95 -115, 95 -35 C 95 60, 60 120, 60 120" stroke="url(#gold_circ)" stroke-width="8" fill="none"/>
    <circle cx="35" cy="-75" r="6" fill="#D50000"/>
    <!-- Bride Anime Eyes & Jhumkas -->
    <ellipse cx="18" cy="-25" rx="12" ry="16" fill="#FFF"/>
    <ellipse cx="52" cy="-25" rx="12" ry="16" fill="#FFF"/>
    <circle cx="20" cy="-24" r="7" fill="#3E2723"/>
    <circle cx="54" cy="-24" r="7" fill="#3E2723"/>
    <path d="M 22 10 Q 35 25 48 10" fill="#D81B60" stroke="#880E4F" stroke-width="2.5"/>
    <ellipse cx="5" cy="-2" rx="10" ry="6" fill="#FF4081" opacity="0.6"/>
    <ellipse cx="65" cy="-2" rx="10" ry="6" fill="#FF4081" opacity="0.6"/>
  </g>

  <!-- Golden Center Medallion Banner -->
  <g transform="translate(400, 640)">
    <rect x="-240" y="-30" width="480" height="60" rx="16" fill="#1C0512" stroke="url(#gold_circ)" stroke-width="3"/>
    <text x="0" y="8" font-family="serif" font-size="20" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="2">
      ✦ TOGETHER FOREVER • EST. 2026 ✦
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-round-portrait.svg', 'w', encoding='utf-8') as f:
    f.write(round_svg)

print('Generated cartoon-round-portrait.svg')
