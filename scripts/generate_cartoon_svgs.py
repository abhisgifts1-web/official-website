import os

os.makedirs('public/images/custom-art', exist_ok=True)

# 1. CARTOON WEDDING COUPLE
wedding_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D0B16"/>
      <stop offset="40%" stop-color="#4A1525"/>
      <stop offset="75%" stop-color="#2B0A15"/>
      <stop offset="100%" stop-color="#140309"/>
    </linearGradient>
    <radialGradient id="golden_halo" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FFE082" stop-opacity="0.85"/>
      <stop offset="35%" stop-color="#FFB300" stop-opacity="0.45"/>
      <stop offset="70%" stop-color="#E65100" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_metallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2A3"/>
      <stop offset="30%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#AA771C"/>
      <stop offset="100%" stop-color="#805A10"/>
    </linearGradient>
    <linearGradient id="lehenga_red" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E53935"/>
      <stop offset="60%" stop-color="#B71C1C"/>
      <stop offset="100%" stop-color="#7F0000"/>
    </linearGradient>
    <linearGradient id="sherwani_cream" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E1"/>
      <stop offset="50%" stop-color="#FFE082"/>
      <stop offset="100%" stop-color="#FFD54F"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Rich Festive Background -->
  <rect width="800" height="1000" fill="url(#bg_grad)"/>
  <circle cx="400" cy="420" r="380" fill="url(#golden_halo)"/>

  <!-- Fairy lights & Bokeh Sparkles -->
  <g opacity="0.6">
    <circle cx="120" cy="180" r="16" fill="#FFE082" filter="url(#glow)"/>
    <circle cx="280" cy="100" r="22" fill="#FFD54F" filter="url(#glow)"/>
    <circle cx="520" cy="90" r="18" fill="#FFE082" filter="url(#glow)"/>
    <circle cx="680" cy="160" r="24" fill="#FFCA28" filter="url(#glow)"/>
    <circle cx="720" cy="300" r="14" fill="#FFE082" filter="url(#glow)"/>
    <circle cx="90" cy="340" r="16" fill="#FFD54F" filter="url(#glow)"/>
    <circle cx="400" cy="150" r="28" fill="#FFF8E1" filter="url(#glow)" opacity="0.8"/>
  </g>

  <!-- Hanging Marigold & Jasmine Toran at top -->
  <g>
    <path d="M 0 50 Q 200 120 400 50 Q 600 120 800 50" fill="none" stroke="#FF8F00" stroke-width="12" stroke-dasharray="14,14"/>
    <path d="M 0 70 Q 200 140 400 70 Q 600 140 800 70" fill="none" stroke="#FFF9C4" stroke-width="8" stroke-dasharray="10,10"/>
  </g>

  <!-- ================= GROOM (LEFT) ================= -->
  <!-- Groom Sherwani Body -->
  <path d="M 180 500 C 180 430, 260 400, 310 400 C 360 400, 390 430, 390 500 L 400 820 L 170 820 Z" fill="url(#sherwani_cream)"/>
  <!-- Gold Stole / Dupatta -->
  <path d="M 230 460 Q 200 620 220 820 L 260 820 Q 240 620 270 460 Z" fill="url(#gold_metallic)"/>
  <path d="M 310 400 L 310 820" stroke="#D4AF37" stroke-width="6"/>
  <!-- Gold Buttons -->
  <circle cx="310" cy="460" r="5" fill="#805A10"/>
  <circle cx="310" cy="510" r="5" fill="#805A10"/>
  <circle cx="310" cy="560" r="5" fill="#805A10"/>
  <circle cx="310" cy="610" r="5" fill="#805A10"/>
  <circle cx="310" cy="660" r="5" fill="#805A10"/>

  <!-- Groom Neck & Head -->
  <rect x="280" y="360" width="60" height="60" rx="15" fill="#FFCC99"/>
  <!-- Groom Face -->
  <ellipse cx="310" cy="330" rx="65" ry="75" fill="#FFD7AA"/>
  <!-- Groom Ears -->
  <ellipse cx="240" cy="335" rx="14" ry="20" fill="#FFC999"/>
  <ellipse cx="380" cy="335" rx="14" ry="20" fill="#FFC999"/>
  <!-- Groom Big Expressive Cartoon Eyes -->
  <ellipse cx="285" cy="320" rx="16" ry="20" fill="#FFFFFF"/>
  <ellipse cx="335" cy="320" rx="16" ry="20" fill="#FFFFFF"/>
  <ellipse cx="288" cy="320" rx="10" ry="12" fill="#2E1C0C"/>
  <ellipse cx="338" cy="320" rx="10" ry="12" fill="#2E1C0C"/>
  <circle cx="285" cy="315" r="4" fill="#FFFFFF"/>
  <circle cx="335" cy="315" r="4" fill="#FFFFFF"/>
  <!-- Smiling Mouth -->
  <path d="M 292 360 Q 312 385 332 360" fill="#C2185B" stroke="#880E4F" stroke-width="3"/>
  <path d="M 295 362 Q 312 375 329 362" fill="#FFFFFF"/>
  <!-- Eyebrows -->
  <path d="M 270 295 Q 288 285 305 295" stroke="#3E2723" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 320 295 Q 338 285 355 295" stroke="#3E2723" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Rosy Cheeks -->
  <ellipse cx="265" cy="345" rx="12" ry="7" fill="#FF8A80" opacity="0.6"/>
  <ellipse cx="355" cy="345" rx="12" ry="7" fill="#FF8A80" opacity="0.6"/>

  <!-- Groom Royal Pagdi / Turban -->
  <path d="M 235 290 C 235 210, 385 210, 385 290 Z" fill="url(#lehenga_red)"/>
  <path d="M 240 285 Q 310 240 380 285" fill="none" stroke="url(#gold_metallic)" stroke-width="12"/>
  <path d="M 245 265 Q 310 220 375 265" fill="none" stroke="url(#gold_metallic)" stroke-width="10"/>
  <!-- Golden Kalgi Feather -->
  <path d="M 310 240 Q 315 150 285 130 Q 325 160 320 240 Z" fill="url(#gold_metallic)"/>
  <circle cx="310" cy="245" r="10" fill="#E53935" stroke="url(#gold_metallic)" stroke-width="4"/>

  <!-- ================= BRIDE (RIGHT) ================= -->
  <!-- Bride Bridal Lehenga Body -->
  <path d="M 410 490 C 410 420, 500 395, 550 395 C 600 395, 650 420, 650 490 L 670 820 L 390 820 Z" fill="url(#lehenga_red)"/>
  <!-- Gold Zari Embroidery on Lehenga -->
  <path d="M 400 780 L 660 780" stroke="url(#gold_metallic)" stroke-width="14"/>
  <path d="M 410 740 L 650 740" stroke="url(#gold_metallic)" stroke-width="8"/>
  <path d="M 420 700 L 640 700" stroke="url(#gold_metallic)" stroke-width="6"/>
  <!-- Gold Bridal Dupatta Draped -->
  <path d="M 430 450 Q 550 560 620 470 L 650 820 L 590 820 Z" fill="url(#gold_metallic)" opacity="0.9"/>

  <!-- Bride Neck & Face -->
  <rect x="520" y="360" width="55" height="55" rx="14" fill="#FFE0B2"/>
  <ellipse cx="548" cy="330" rx="60" ry="70" fill="#FFE0B2"/>
  <!-- Bride Ears with Jhumkas -->
  <ellipse cx="484" cy="335" rx="12" ry="18" fill="#FFD199"/>
  <ellipse cx="612" cy="335" rx="12" ry="18" fill="#FFD199"/>
  <!-- Golden Jhumkas -->
  <path d="M 480 355 L 488 375 L 472 375 Z" fill="url(#gold_metallic)"/>
  <path d="M 616 355 L 624 375 L 608 375 Z" fill="url(#gold_metallic)"/>

  <!-- Bride Gorgeous Big Anime Eyes -->
  <ellipse cx="522" cy="320" rx="15" ry="19" fill="#FFFFFF"/>
  <ellipse cx="572" cy="320" rx="15" ry="19" fill="#FFFFFF"/>
  <ellipse cx="525" cy="320" rx="10" ry="13" fill="#3E2723"/>
  <ellipse cx="575" cy="320" rx="10" ry="13" fill="#3E2723"/>
  <circle cx="522" cy="314" r="5" fill="#FFFFFF"/>
  <circle cx="572" cy="314" r="5" fill="#FFFFFF"/>
  <!-- Eyelashes -->
  <path d="M 505 305 Q 520 298 540 305" stroke="#1A0000" stroke-width="4" fill="none"/>
  <path d="M 555 305 Q 570 298 590 305" stroke="#1A0000" stroke-width="4" fill="none"/>
  <path d="M 536 302 L 544 294" stroke="#1A0000" stroke-width="3"/>
  <path d="M 586 302 L 594 294" stroke="#1A0000" stroke-width="3"/>
  <!-- Red Bridal Bindi -->
  <circle cx="548" cy="288" r="5" fill="#D50000" stroke="url(#gold_metallic)" stroke-width="2"/>
  <!-- Bridal Smile -->
  <path d="M 532 358 Q 548 382 566 358" fill="#D81B60" stroke="#880E4F" stroke-width="3"/>
  <path d="M 535 360 Q 548 372 563 360" fill="#FFFFFF"/>
  <!-- Rosy Cheeks -->
  <ellipse cx="505" cy="342" rx="12" ry="7" fill="#FF4081" opacity="0.6"/>
  <ellipse cx="590" cy="342" rx="12" ry="7" fill="#FF4081" opacity="0.6"/>

  <!-- Bride Hair & Maang Tikka -->
  <path d="M 488 285 Q 548 240 608 285 Q 548 270 488 285 Z" fill="#212121"/>
  <!-- Maang Tikka -->
  <line x1="548" y1="230" x2="548" y2="280" stroke="url(#gold_metallic)" stroke-width="4"/>
  <circle cx="548" cy="280" r="8" fill="url(#gold_metallic)"/>
  <circle cx="548" cy="280" r="4" fill="#D50000"/>

  <!-- Bridal Odhani / Veil covering head with Gold Lace -->
  <path d="M 465 260 C 465 180, 630 180, 630 260 C 640 400, 620 540, 620 540" fill="none" stroke="url(#gold_metallic)" stroke-width="12" opacity="0.95"/>
  <path d="M 470 260 C 470 190, 625 190, 625 260" fill="none" stroke="#D50000" stroke-width="8"/>

  <!-- Varmala (Garland of Red Roses and Jasmine connecting couple) -->
  <g>
    <!-- Groom Garland -->
    <path d="M 230 430 Q 310 650 350 560" fill="none" stroke="#E53935" stroke-width="20" stroke-linecap="round" stroke-dasharray="20,10"/>
    <path d="M 230 430 Q 310 650 350 560" fill="none" stroke="#FFF59D" stroke-width="10" stroke-linecap="round" stroke-dasharray="14,14"/>
    <!-- Bride Garland -->
    <path d="M 620 430 Q 530 650 490 560" fill="none" stroke="#E53935" stroke-width="20" stroke-linecap="round" stroke-dasharray="20,10"/>
    <path d="M 620 430 Q 530 650 490 560" fill="none" stroke="#FFF59D" stroke-width="10" stroke-linecap="round" stroke-dasharray="14,14"/>
    <!-- Intertwined Hearts in Center -->
    <path d="M 425 550 C 425 530, 445 520, 455 535 C 465 520, 485 530, 485 550 C 485 570, 455 590, 455 590 C 455 590, 425 570, 425 550 Z" fill="#FF1744" stroke="url(#gold_metallic)" stroke-width="3"/>
  </g>

  <!-- Golden Plaque at bottom -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#1C0912" stroke="url(#gold_metallic)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ WEDDING SAGA • EST. 2026 ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      24K GOLD SCRIPT • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-wedding-couple.svg', 'w', encoding='utf-8') as f:
    f.write(wedding_svg)

print('Generated cartoon-wedding-couple.svg')

# 2. CARTOON FAMILY PORTRAIT
family_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="fam_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B263B"/>
      <stop offset="50%" stop-color="#2D3A54"/>
      <stop offset="100%" stop-color="#0D1B2A"/>
    </linearGradient>
    <radialGradient id="sun_glow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FFE082" stop-opacity="0.8"/>
      <stop offset="40%" stop-color="#FFB300" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_metallic2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2A3"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA771C"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#fam_bg)"/>
  <circle cx="400" cy="420" r="380" fill="url(#sun_glow)"/>

  <!-- Animated Sparkles & Hearts -->
  <g fill="#FFD54F" opacity="0.6">
    <circle cx="150" cy="180" r="14"/>
    <circle cx="650" cy="190" r="18"/>
    <circle cx="200" cy="300" r="10"/>
    <circle cx="620" cy="320" r="12"/>
    <circle cx="400" cy="120" r="22"/>
  </g>

  <!-- ================= FATHER (LEFT) ================= -->
  <path d="M 170 520 C 170 440, 250 410, 300 410 C 350 410, 380 440, 380 520 L 390 840 L 160 840 Z" fill="#1E3A8A"/>
  <rect x="270" y="380" width="60" height="60" rx="14" fill="#FFCC99"/>
  <ellipse cx="300" cy="340" rx="60" ry="70" fill="#FFD7AA"/>
  <!-- Glasses -->
  <rect x="260" y="325" width="35" height="25" rx="6" fill="none" stroke="#D4AF37" stroke-width="4"/>
  <rect x="305" y="325" width="35" height="25" rx="6" fill="none" stroke="#D4AF37" stroke-width="4"/>
  <line x1="295" y1="337" x2="305" y2="337" stroke="#D4AF37" stroke-width="4"/>
  <!-- Father Eyes -->
  <circle cx="277" cy="337" r="7" fill="#1E1E1E"/>
  <circle cx="322" cy="337" r="7" fill="#1E1E1E"/>
  <circle cx="275" cy="334" r="2.5" fill="#FFFFFF"/>
  <circle cx="320" cy="334" r="2.5" fill="#FFFFFF"/>
  <!-- Smile -->
  <path d="M 285 375 Q 300 395 315 375" fill="#C2185B" stroke="#880E4F" stroke-width="3"/>
  <!-- Hair -->
  <path d="M 240 310 C 240 250, 360 250, 360 310 Z" fill="#263238"/>

  <!-- ================= MOTHER (RIGHT) ================= -->
  <path d="M 430 520 C 430 440, 510 410, 560 410 C 610 410, 650 440, 650 520 L 670 840 L 410 840 Z" fill="#9C27B0"/>
  <rect x="530" y="380" width="55" height="55" rx="14" fill="#FFE0B2"/>
  <ellipse cx="558" cy="340" rx="58" ry="68" fill="#FFE0B2"/>
  <!-- Mother Eyes -->
  <ellipse cx="535" cy="332" rx="12" ry="15" fill="#FFFFFF"/>
  <ellipse cx="578" cy="332" rx="12" ry="15" fill="#FFFFFF"/>
  <circle cx="537" cy="332" r="8" fill="#3E2723"/>
  <circle cx="580" cy="332" r="8" fill="#3E2723"/>
  <circle cx="534" cy="328" r="3" fill="#FFFFFF"/>
  <circle cx="577" cy="328" r="3" fill="#FFFFFF"/>
  <!-- Bindi & Smile -->
  <circle cx="558" cy="305" r="4.5" fill="#C2185B"/>
  <path d="M 545 375 Q 558 395 572 375" fill="#E91E63" stroke="#880E4F" stroke-width="3"/>
  <!-- Mother Hair -->
  <path d="M 495 320 C 495 240, 620 240, 620 320 Z" fill="#212121"/>
  <!-- Gold Jhumkas -->
  <circle cx="496" cy="360" r="6" fill="#FFD54F"/>
  <circle cx="620" cy="360" r="6" fill="#FFD54F"/>

  <!-- ================= CUTE CHILD (CENTER) ================= -->
  <!-- Child Body -->
  <path d="M 330 620 C 330 550, 470 550, 470 620 L 485 840 L 315 840 Z" fill="#E65100"/>
  <!-- Child Face -->
  <rect x="380" y="520" width="40" height="40" rx="10" fill="#FFD7AA"/>
  <ellipse cx="400" cy="490" rx="55" ry="60" fill="#FFD7AA"/>
  <!-- Child Big Sparkling Anime Eyes -->
  <ellipse cx="378" cy="485" rx="14" ry="17" fill="#FFFFFF"/>
  <ellipse cx="422" cy="485" rx="14" ry="17" fill="#FFFFFF"/>
  <ellipse cx="380" cy="485" rx="9" ry="12" fill="#212121"/>
  <ellipse cx="424" cy="485" rx="9" ry="12" fill="#212121"/>
  <circle cx="377" cy="480" r="4" fill="#FFFFFF"/>
  <circle cx="421" cy="480" r="4" fill="#FFFFFF"/>
  <!-- Big Laughing Smile -->
  <path d="M 382 515 Q 400 545 418 515 Z" fill="#D81B60"/>
  <path d="M 386 517 Q 400 527 414 517" fill="#FFFFFF"/>
  <!-- Rosy Cheeks -->
  <ellipse cx="360" cy="505" rx="10" ry="6" fill="#FF8A80"/>
  <ellipse cx="440" cy="505" rx="10" ry="6" fill="#FF8A80"/>
  <!-- Cute Hair with Tuft -->
  <path d="M 350 460 C 350 410, 450 410, 450 460 Z" fill="#37474F"/>
  <path d="M 395 420 Q 400 390 415 410" stroke="#37474F" stroke-width="6" fill="none" stroke-linecap="round"/>

  <!-- Child Holding Gold Balloon -->
  <line x1="430" y1="620" x2="490" y2="400" stroke="#FFE082" stroke-width="3"/>
  <ellipse cx="500" cy="380" rx="35" ry="45" fill="url(#gold_metallic2)"/>
  <path d="M 495 425 L 505 425 L 500 435 Z" fill="#AA771C"/>

  <!-- Bottom Gold Plaque -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#0D1B2A" stroke="url(#gold_metallic2)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ THE LOVING FAMILY • EST. 2026 ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      PERSONALIZED HEIRLOOM • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-family-portrait.svg', 'w', encoding='utf-8') as f:
    f.write(family_svg)

print('Generated cartoon-family-portrait.svg')

# 3. CARTOON BABY MILESTONE
baby_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="baby_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A102F"/>
      <stop offset="50%" stop-color="#3A1C52"/>
      <stop offset="100%" stop-color="#150826"/>
    </linearGradient>
    <radialGradient id="moon_glow" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#FFF9C4" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#FFE082" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cloud_grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E1BEE7"/>
    </linearGradient>
    <linearGradient id="gold_b" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF59D"/>
      <stop offset="50%" stop-color="#FBC02D"/>
      <stop offset="100%" stop-color="#F57F17"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#baby_bg)"/>
  <circle cx="400" cy="400" r="380" fill="url(#moon_glow)"/>

  <!-- Smiling Crescent Moon -->
  <g transform="translate(180, 160)">
    <path d="M 120 0 A 120 120 0 1 0 120 240 A 90 90 0 1 1 120 0 Z" fill="url(#gold_b)"/>
    <circle cx="160" cy="110" r="6" fill="#795548"/>
    <path d="M 150 140 Q 165 155 180 140" stroke="#795548" stroke-width="4" fill="none"/>
    <!-- Sleeping Cap on Moon -->
    <path d="M 130 10 Q 180 -30 240 -10 Q 180 30 140 30 Z" fill="#AB47BC"/>
    <circle cx="240" cy="-10" r="10" fill="#FFF"/>
  </g>

  <!-- Twinkling Stars -->
  <g fill="#FFF59D">
    <polygon points="560,180 565,195 580,200 565,205 560,220 555,205 540,200 555,195"/>
    <polygon points="660,300 663,310 675,313 663,316 660,326 657,316 645,313 657,310"/>
    <polygon points="120,380 123,390 135,393 123,396 120,406 117,396 105,393 117,390"/>
    <polygon points="680,120 683,130 695,133 683,136 680,146 677,136 665,133 677,130"/>
  </g>

  <!-- Big Dreamy Cloud Platform -->
  <g fill="url(#cloud_grad)" opacity="0.95">
    <ellipse cx="400" cy="650" rx="260" ry="90"/>
    <circle cx="280" cy="610" r="85"/>
    <circle cx="520" cy="610" r="85"/>
    <circle cx="400" cy="570" r="95"/>
  </g>

  <!-- ================= ADORABLE CARTOON BABY ================= -->
  <!-- Baby Body (Pastel Onesie) -->
  <ellipse cx="400" cy="530" rx="90" ry="80" fill="#B3E5FC"/>
  <circle cx="400" cy="500" r="5" fill="#0288D1"/>
  <circle cx="400" cy="530" r="5" fill="#0288D1"/>

  <!-- Baby Head -->
  <circle cx="400" cy="420" r="85" fill="#FFD7AA"/>
  <!-- Baby Ears -->
  <circle cx="315" cy="420" r="18" fill="#FFCC99"/>
  <circle cx="485" cy="420" r="18" fill="#FFCC99"/>

  <!-- Big Giant Cute Sparkling Eyes -->
  <ellipse cx="365" cy="415" rx="22" ry="26" fill="#FFFFFF"/>
  <ellipse cx="435" cy="415" rx="22" ry="26" fill="#FFFFFF"/>
  <ellipse cx="368" cy="415" rx="14" ry="18" fill="#2E1C0C"/>
  <ellipse cx="438" cy="415" rx="14" ry="18" fill="#2E1C0C"/>
  <circle cx="363" cy="406" r="6" fill="#FFFFFF"/>
  <circle cx="433" cy="406" r="6" fill="#FFFFFF"/>
  <circle cx="372" cy="422" r="3" fill="#FFFFFF"/>
  <circle cx="442" cy="422" r="3" fill="#FFFFFF"/>

  <!-- Flushed Baby Cheeks -->
  <ellipse cx="340" cy="445" rx="16" ry="10" fill="#FF80AB" opacity="0.7"/>
  <ellipse cx="460" cy="445" rx="16" ry="10" fill="#FF80AB" opacity="0.7"/>

  <!-- Sweet Open Mouth with Tiny Tooth -->
  <path d="M 388 455 Q 400 480 412 455 Z" fill="#D81B60"/>
  <rect x="397" y="455" width="6" height="5" rx="2" fill="#FFFFFF"/>

  <!-- Baby Golden Crown -->
  <path d="M 370 345 L 380 320 L 400 335 L 420 320 L 430 345 Z" fill="url(#gold_b)" stroke="#E65100" stroke-width="2"/>
  <circle cx="380" cy="320" r="3" fill="#E91E63"/>
  <circle cx="400" cy="335" r="4" fill="#00E676"/>
  <circle cx="420" cy="320" r="3" fill="#2979FF"/>

  <!-- Floating Baby Milestone Blocks -->
  <g transform="translate(160, 680)">
    <rect width="60" height="60" rx="12" fill="#FF80AB" stroke="#FFF" stroke-width="3"/>
    <text x="30" y="42" font-family="sans-serif" font-size="32" font-weight="bold" fill="#FFF" text-anchor="middle">A</text>
  </g>
  <g transform="translate(580, 670)">
    <rect width="60" height="60" rx="12" fill="#80D8FF" stroke="#FFF" stroke-width="3"/>
    <text x="30" y="42" font-family="sans-serif" font-size="32" font-weight="bold" fill="#FFF" text-anchor="middle">1</text>
  </g>

  <!-- Bottom Gold Plaque -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#150826" stroke="url(#gold_b)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ WELCOME LITTLE ANGEL • BORN 2026 ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      BABY MILESTONE KEEPSAKE • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-baby-milestone.svg', 'w', encoding='utf-8') as f:
    f.write(baby_svg)

print('Generated cartoon-baby-milestone.svg')

# 4. CARTOON COUPLE NIGHTGLOW (FAIRY LIGHTS)
nightglow_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="night_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#08020F"/>
      <stop offset="45%" stop-color="#190A2E"/>
      <stop offset="85%" stop-color="#311247"/>
      <stop offset="100%" stop-color="#0D0317"/>
    </linearGradient>
    <radialGradient id="lamp_glow" cx="50%" cy="52%" r="50%">
      <stop offset="0%" stop-color="#FFE082" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="#FFB300" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#FF6F00" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold_n" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="50%" stop-color="#FFC107"/>
      <stop offset="100%" stop-color="#FFA000"/>
    </linearGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#night_sky)"/>
  
  <!-- Massive 3000K Golden Backlight Radiation (Simulating LED Night-Glow Frame) -->
  <circle cx="400" cy="520" r="390" fill="url(#lamp_glow)"/>

  <!-- Constellations & Starlight -->
  <g fill="#FFF" opacity="0.75">
    <circle cx="100" cy="100" r="2.5"/><circle cx="180" cy="140" r="3"/><circle cx="240" cy="80" r="2"/>
    <circle cx="560" cy="90" r="3"/><circle cx="680" cy="130" r="2.5"/><circle cx="730" cy="220" r="2"/>
    <circle cx="340" cy="70" r="3.5"/><circle cx="470" cy="120" r="2"/>
  </g>

  <!-- Glowing Crescent Moon -->
  <path d="M 620 90 A 60 60 0 1 0 620 210 A 45 45 0 1 1 620 90 Z" fill="#FFF9C4" filter="drop-shadow(0px 0px 15px rgba(255,249,196,0.8))"/>

  <!-- Stylized Hilltop Silhouette -->
  <path d="M 0 760 Q 400 680 800 760 L 800 1000 L 0 1000 Z" fill="#0B0314"/>

  <!-- Romantic Wooden Park Bench -->
  <rect x="240" y="660" width="320" height="16" rx="6" fill="#5D4037"/>
  <rect x="250" y="685" width="300" height="14" rx="5" fill="#4E342E"/>
  <rect x="280" y="676" width="14" height="60" fill="#3E2723"/>
  <rect x="506" y="676" width="14" height="60" fill="#3E2723"/>

  <!-- ================= CARTOON COUPLE CUDDLING ================= -->
  <!-- Boy (Left) -->
  <path d="M 280 540 C 280 470, 360 450, 400 450 L 400 720 L 270 720 Z" fill="#283593"/>
  <ellipse cx="340" cy="420" rx="50" ry="58" fill="#FFCC99"/>
  <!-- Boy Hair -->
  <path d="M 290 400 C 290 350, 390 350, 390 400 Z" fill="#212121"/>
  <!-- Boy Eye & Smile looking right -->
  <ellipse cx="355" cy="415" rx="8" ry="11" fill="#FFFFFF"/>
  <circle cx="358" cy="415" r="5" fill="#212121"/>
  <circle cx="356" cy="412" r="2" fill="#FFFFFF"/>
  <path d="M 345 445 Q 360 460 375 445" stroke="#C2185B" stroke-width="3" fill="none"/>

  <!-- Girl (Right) resting head on Boy's shoulder -->
  <path d="M 380 540 C 380 470, 480 450, 520 540 L 530 720 L 380 720 Z" fill="#AD1457"/>
  <!-- Girl Head tilted left -->
  <g transform="rotate(-15 440 430)">
    <ellipse cx="440" cy="430" rx="48" ry="56" fill="#FFE0B2"/>
    <!-- Girl Long Flowing Hair -->
    <path d="M 390 420 C 390 350, 490 350, 490 450 C 490 530, 470 560, 470 560" fill="#3E2723"/>
    <!-- Girl Eye closed in happy smile -->
    <path d="M 425 430 Q 438 440 450 430" stroke="#212121" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="420" cy="442" rx="8" ry="5" fill="#FF4081" opacity="0.6"/>
  </g>

  <!-- Glowing Heart Floating Above Couple -->
  <path d="M 390 340 C 390 320, 405 310, 415 325 C 425 310, 440 320, 440 340 C 440 360, 415 375, 415 375 C 415 375, 390 360, 390 340 Z" fill="#FF1744" filter="drop-shadow(0px 0px 10px rgba(255,23,68,0.9))"/>

  <!-- Twinkling Fairy Lights String Woven Across Bench -->
  <path d="M 160 520 Q 300 680 400 580 Q 500 700 640 540" fill="none" stroke="#FFE082" stroke-width="3" opacity="0.6"/>
  <!-- Glowing Bulbs along the string -->
  <circle cx="210" cy="580" r="10" fill="#FFD54F" filter="drop-shadow(0px 0px 8px #FFD54F)"/>
  <circle cx="280" cy="635" r="12" fill="#FFF59D" filter="drop-shadow(0px 0px 10px #FFD54F)"/>
  <circle cx="340" cy="620" r="11" fill="#FFCA28" filter="drop-shadow(0px 0px 8px #FFD54F)"/>
  <circle cx="450" cy="630" r="13" fill="#FFF9C4" filter="drop-shadow(0px 0px 12px #FFD54F)"/>
  <circle cx="530" cy="640" r="11" fill="#FFD54F" filter="drop-shadow(0px 0px 8px #FFD54F)"/>
  <circle cx="590" cy="580" r="12" fill="#FFF59D" filter="drop-shadow(0px 0px 10px #FFD54F)"/>

  <!-- Bottom Gold Plaque -->
  <g transform="translate(100, 880)">
    <rect width="600" height="80" rx="20" fill="#08020F" stroke="url(#gold_n)" stroke-width="3"/>
    <text x="300" y="44" font-family="serif" font-size="24" font-weight="bold" fill="#FFE082" text-anchor="middle" letter-spacing="3">
      ✦ UNDER THE STARS • ETERNAL GLOW ✦
    </text>
    <text x="300" y="66" font-family="sans-serif" font-size="13" font-weight="bold" fill="#E8D1A5" text-anchor="middle" letter-spacing="4">
      3000K LED NIGHT-GLOW • ABHI'S GIFTS
    </text>
  </g>
</svg>'''

with open('public/images/custom-art/cartoon-couple-nightglow.svg', 'w', encoding='utf-8') as f:
    f.write(nightglow_svg)

print('Generated cartoon-couple-nightglow.svg')
