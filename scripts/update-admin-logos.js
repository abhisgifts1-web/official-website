const fs = require('fs');
const path = require('path');

// 1. Update AdminLayout.tsx
const adminLayoutPath = path.join(__dirname, '../components/admin/AdminLayout.tsx');
let adminLayout = fs.readFileSync(adminLayoutPath, 'utf8');

// Replace desktop brand header
const desktopSearch = /<Link href="\/admin" className="flex items-center gap-2\.5">[\s\S]*?<\/Link>/;
const desktopReplace = `<Link href="/admin" className="flex items-center group">
            <Image
              src="/images/brand/logo.png"
              alt="Abhi's Gifts Admin"
              width={160}
              height={32}
              className="h-8 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform"
            />
          </Link>`;

if (desktopSearch.test(adminLayout)) {
  adminLayout = adminLayout.replace(desktopSearch, desktopReplace);
  console.log('AdminLayout desktop logo replaced');
} else {
  console.log('AdminLayout desktop logo pattern NOT found');
}

// Replace mobile drawer header text
const mobileSearch = /<span className="font-serif font-bold text-white text-base">Abhi Gifts Admin<\/span>/;
const mobileReplace = `<Image
                src="/images/brand/logo.png"
                alt="Abhi's Gifts Admin"
                width={140}
                height={28}
                className="h-7 w-auto object-contain brightness-110"
              />`;

if (mobileSearch.test(adminLayout)) {
  adminLayout = adminLayout.replace(mobileSearch, mobileReplace);
  console.log('AdminLayout mobile logo replaced');
} else {
  console.log('AdminLayout mobile logo pattern NOT found');
}

fs.writeFileSync(adminLayoutPath, adminLayout, 'utf8');

// 2. Update app/admin/login/page.tsx
const loginPagePath = path.join(__dirname, '../app/admin/login/page.tsx');
let loginPage = fs.readFileSync(loginPagePath, 'utf8');

// Add Image import if not present
if (!loginPage.includes("import Image from 'next/image'")) {
  loginPage = loginPage.replace("import React,", "import Image from 'next/image';\nimport React,");
}

// Replace login brand icon
const loginSearch = /<div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center font-serif font-bold text-2xl mx-auto shadow-md border border-amber-500\/30">\s*A\s*<\/div>/;
const loginReplace = `<div className="inline-flex items-center justify-center p-3 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-lg mx-auto">
            <Image
              src="/images/brand/logo.png"
              alt="Abhi's Gifts"
              width={180}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain brightness-105"
            />
          </div>`;

if (loginSearch.test(loginPage)) {
  loginPage = loginPage.replace(loginSearch, loginReplace);
  console.log('Admin login logo replaced');
} else {
  console.log('Admin login logo pattern NOT found');
}

fs.writeFileSync(loginPagePath, loginPage, 'utf8');

console.log('Admin updates complete');
