# 🚀 Professional Portfolio Website

Portfolio website modern dan profesional yang dibangun dengan **Next.js 14**, **TypeScript**, dan **TailwindCSS**. Desain unik yang tidak terlihat seperti template AI, dengan animasi smooth dan layout yang profesional.

## ✨ Fitur Utama

- ⚡ **Lightning Fast** - Optimized dengan Next.js 14 dan static export
- 🎨 **Unique Design** - Layout asimetris dan tidak generic
- 🌓 **Dark/Light Mode** - Smooth theme switching
- 📱 **Fully Responsive** - Perfect di semua device (mobile, tablet, desktop)
- 🎭 **Smooth Animations** - Framer Motion untuk transisi yang halus
- 📊 **Scroll Progress** - Progress bar di navbar
- 🎯 **SEO Optimized** - Meta tags, sitemap, robots.txt
- 📦 **Static Export Ready** - Deploy ke cPanel, Vercel, Netlify
- 🎨 **Easy Customization** - Dokumentasi lengkap untuk kustomisasi
- 🔒 **Security Headers** - .htaccess dengan security best practices

## 🛠️ Teknologi yang Digunakan

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animasi library
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

## 📋 Prerequisites

Pastikan sudah terinstall:
- **Node.js** (versi 18 atau lebih baru)
- **npm** atau **yarn** atau **pnpm**

## 🚀 Cara Install & Menjalankan

### 1. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 2. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000)

## 🎨 Kustomisasi

**Lihat panduan lengkap di:** [`CUSTOMIZATION_GUIDE.md`](./CUSTOMIZATION_GUIDE.md)

### Quick Start Customization:

1. **Ganti Nama & Info:**
   - `components/Hero.tsx` - Nama, title, deskripsi
   - `components/Navbar.tsx` - Logo
   - `components/Footer.tsx` - Footer info
   - `app/layout.tsx` - SEO metadata

2. **Tambah Foto Profil:**
   - Simpan di `public/images/profile.jpg`
   - Uncomment code di `components/Hero.tsx` line 127-133

3. **Update Projects:**
   - Edit `components/Projects.tsx`
   - Ganti dengan project kamu

4. **Update Skills:**
   - Edit `components/Skills.tsx`
   - Sesuaikan dengan keahlian kamu

5. **Upload Resume:**
   - Simpan PDF di `public/resume.pdf`

**📖 Untuk panduan detail, baca:** [`CUSTOMIZATION_GUIDE.md`](./CUSTOMIZATION_GUIDE.md)

## 📦 Build & Export untuk Production

### Build untuk Static Export (cPanel/Hosting Biasa)

```bash
npm run build
```

Hasil build akan ada di folder `out/`. Upload semua isi folder `out/` ke cPanel atau hosting.

### Build untuk Vercel/Netlify

Tidak perlu build manual, cukup:

1. Push code ke GitHub
2. Connect repository ke Vercel/Netlify
3. Deploy otomatis!

## 🌐 Cara Deploy

### Deploy ke Vercel (Recommended - GRATIS)

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository
4. Deploy! (otomatis)

### Deploy ke Netlify (GRATIS)

1. Push code ke GitHub
2. Buka [netlify.com](https://netlify.com)
3. Import repository
4. Build command: `npm run build`
5. Publish directory: `out`
6. Deploy!

### Deploy ke cPanel

1. Build project:
   ```bash
   npm run build
   ```

2. Upload semua file dari folder `out/` ke public_html di cPanel

3. Done! Website sudah live

### Deploy ke GitHub Pages (GRATIS)

1. Edit `next.config.js`, tambahkan:
   ```javascript
   basePath: '/nama-repository',
   ```

2. Build dan deploy:
   ```bash
   npm run build
   ```

3. Push folder `out/` ke branch `gh-pages`

## 📁 Struktur Folder

```
portfolio-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Skills.tsx          # Skills section
│   ├── Projects.tsx        # Projects section
│   ├── Experience.tsx      # Experience timeline
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Footer
│   └── ThemeProvider.tsx   # Theme context
├── public/                 # Static files
├── next.config.js          # Next.js config
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## 🎯 Tips Optimasi

1. **Compress Images** - Gunakan tools seperti TinyPNG
2. **Add Meta Tags** - Update di `app/layout.tsx`
3. **Add Google Analytics** - Tambahkan tracking code
4. **Add Sitemap** - Generate sitemap untuk SEO
5. **Test Performance** - Gunakan Lighthouse di Chrome DevTools

## 🐛 Troubleshooting

### Error saat npm install
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json
npm install
```

### Error saat build
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Dark mode tidak berfungsi
Pastikan `ThemeProvider` sudah di-wrap di `layout.tsx`

## 📝 License

Free to use untuk personal dan commercial projects.

## 🤝 Support

Jika ada pertanyaan atau butuh bantuan, silakan buat issue di GitHub repository.

---

**Made with ❤️ using Next.js & TailwindCSS**

Happy Coding! 🚀
