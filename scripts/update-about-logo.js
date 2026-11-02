const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../app/about/page.tsx');
let content = fs.readFileSync(file, 'utf8');

if (!content.includes("import Image from 'next/image'")) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Image from 'next/image';");
}

const target = '{/* Overline Badge */}';
const addition = `{/* Official Brand Logo */}
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2F0B18] via-[#481223] to-[#2F0B18] border border-[#D6AA55]/60 shadow-xl mx-auto mb-2">
            <Image
              src="/images/brand/logo.png"
              alt="Abhi's Gifts - We Create Memorable Movements"
              width={260}
              height={51}
              priority
              className="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-105"
            />
          </div>

          `;

if (content.includes(target) && !content.includes('/images/brand/logo.png')) {
  content = content.replace(target, addition + target);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Added brand logo to About page');
} else {
  console.log('Target not found or already added');
}
