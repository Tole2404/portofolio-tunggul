# 🎨 Panduan Kustomisasi Portfolio

Panduan lengkap untuk mengkustomisasi website portfolio sesuai kebutuhan kamu.

---

## 📝 1. Informasi Personal

### Hero Section (`components/Hero.tsx`)

**Ganti nama dan title:**
```tsx
// Line 37
Your Name  // Ganti dengan nama kamu

// Line 43-44
Full Stack Developer & UI/UX Enthusiast  // Ganti dengan title kamu
```

**Ganti deskripsi:**
```tsx
// Line 47-49
I craft beautiful, functional, and user-centered digital experiences.
// Ganti dengan deskripsi singkat tentang kamu
```

**Update social media links:**
```tsx
// Line 76, 85, 94
href="https://github.com/yourusername"
href="https://linkedin.com/in/yourusername"
href="mailto:your.email@example.com"
```

---

## 🖼️ 2. Foto Profil

### Menambahkan Foto di Hero Section

1. **Simpan foto** di folder `public/images/profile.jpg`

2. **Uncomment code di `components/Hero.tsx`** (line 127-133):
```tsx
<Image
  src="/images/profile.jpg"
  alt="Profile"
  fill
  className="object-cover"
  priority
/>
```

3. **Hapus placeholder** (line 121-125)

### Ukuran Foto yang Disarankan:
- **Format:** JPG atau PNG
- **Ukuran:** 800x800px (square)
- **File size:** < 500KB (compress dulu)

---

## 📊 3. About Section (`components/About.tsx`)

**Update bio:**
```tsx
// Line 54-62
I'm a Full Stack Developer with a passion for...
// Ganti dengan cerita kamu
```

**Update statistik:**
```tsx
// Line 13-15
{ number: '50+', label: 'Projects Completed' }  // Sesuaikan angka
{ number: '3+', label: 'Years Experience' }     // Sesuaikan angka
{ number: '∞', label: 'Cups of Coffee' }        // Bisa diganti
```

**Update tech stack:**
```tsx
// Line 141
['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS']
// Tambah/hapus sesuai skill kamu
```

---

## 💪 4. Skills Section (`components/Skills.tsx`)

**Update skills dengan level:**
```tsx
// Line 11-17
const skills = [
  { name: 'React & Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  // Tambah/edit sesuai skill kamu
]
```

**Update tech stack:**
```tsx
// Line 20-32
{ name: 'React', color: 'from-cyan-500 to-blue-500' },
// Tambah teknologi yang kamu kuasai
```

**Tips:** Level skill harus realistis (70-95% untuk yang dikuasai)

---

## 🚀 5. Projects Section (`components/Projects.tsx`)

**Tambah/edit project:**
```tsx
// Line 12-48
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack online store...',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe'],
    github: 'https://github.com/yourusername/project',
    demo: 'https://project-demo.com',
    gradient: 'from-blue-600 via-cyan-500 to-teal-400',
    featured: true,  // true untuk project unggulan
  },
  // Tambah project lain
]
```

**Gradient colors yang bagus:**
- `from-blue-600 via-cyan-500 to-teal-400` (Blue)
- `from-purple-600 via-pink-500 to-rose-400` (Purple-Pink)
- `from-orange-600 via-amber-500 to-yellow-400` (Warm)
- `from-green-600 via-emerald-500 to-teal-400` (Green)
- `from-indigo-600 via-purple-500 to-pink-400` (Cool)

---

## 💼 6. Experience Section (`components/Experience.tsx`)

**Tambah/edit pengalaman:**
```tsx
// Line 12-60
const experiences = [
  {
    type: 'work',  // atau 'education'
    title: 'Senior Full Stack Developer',
    company: 'Tech Company Inc.',
    period: '2022 - Present',
    description: 'Leading development of web applications...',
    achievements: [
      'Improved application performance by 40%',
      'Led a team of 5 developers',
    ],
  },
]
```

---

## 📧 7. Contact Section (`components/Contact.tsx`)

**Update info kontak:**
```tsx
// Line 36-51
const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email',
    value: 'your.email@example.com',  // Ganti email
    link: 'mailto:your.email@example.com',
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Phone',
    value: '+62 123 4567 8900',  // Ganti nomor
    link: 'tel:+621234567890',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Location',
    value: 'Jakarta, Indonesia',  // Ganti lokasi
    link: '#',
  },
]
```

---

## 🎨 8. Warna & Tema

### Mengubah Warna Primary

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... ubah semua nilai
    600: '#0284c7',  // Warna utama
    700: '#0369a1',
  },
}
```

**Color palette generator:** [Tailwind Color Generator](https://uicolors.app/create)

### Preset Warna yang Bagus:
- **Blue:** `#0284c7` (Default)
- **Purple:** `#9333ea`
- **Green:** `#10b981`
- **Orange:** `#f97316`
- **Pink:** `#ec4899`

---

## 🔗 9. Navbar & Footer

### Navbar (`components/Navbar.tsx`)

**Ganti logo:**
```tsx
// Line 42-43
YourName<span className="text-primary-600">.</span>
// Ganti dengan nama/brand kamu
```

### Footer (`components/Footer.tsx`)

**Update informasi:**
```tsx
// Line 29-30
YourName<span className="text-primary-400">.</span>

// Line 90-91
© {currentYear} YourName. All rights reserved.
```

---

## 🔍 10. SEO & Metadata

### Update Metadata (`app/layout.tsx`)

```tsx
// Line 8-41
export const metadata: Metadata = {
  title: 'Your Name - Full Stack Developer | Portfolio',
  description: 'Full Stack Developer specializing in...',
  keywords: ['Full Stack Developer', 'Web Developer', ...],
  openGraph: {
    url: 'https://yourwebsite.com',  // Ganti URL
    title: 'Your Name - Full Stack Developer',
  },
  twitter: {
    creator: '@yourusername',  // Ganti username Twitter
  },
}
```

### Update Sitemap (`app/sitemap.ts`)

```tsx
// Line 4
const baseUrl = 'https://yourwebsite.com'  // Ganti dengan domain kamu
```

---

## 📄 11. Resume/CV

1. **Simpan file PDF** di `public/resume.pdf`
2. **Atau ganti nama file** dan update link:

```tsx
// Di Hero.tsx (line 62)
href="/resume.pdf"  // Ganti dengan nama file kamu

// Di Experience.tsx (line 169)
href="/resume.pdf"
```

---

## 🖼️ 12. Favicon & Logo

### Menambahkan Favicon

1. **Generate favicon** di [Favicon Generator](https://favicon.io/)
2. **Simpan file** di folder `public/`
3. **Tambahkan di `app/layout.tsx`:**

```tsx
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
```

---

## 🎭 13. Animasi & Transisi

### Mengubah Durasi Animasi

Semua animasi menggunakan Framer Motion. Cari dan edit:

```tsx
transition={{ duration: 0.6 }}  // Ubah angka (dalam detik)
```

### Disable Animasi (Jika Perlu)

Hapus atau comment `initial`, `animate`, dan `transition` props.

---

## 📱 14. Responsive Design

Website sudah responsive, tapi jika mau adjust:

### Breakpoints Tailwind:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

Contoh:
```tsx
className="text-base md:text-lg lg:text-xl"
```

---

## 🚀 15. Performance Tips

### Optimize Images:
1. Compress dengan [TinyPNG](https://tinypng.com/)
2. Gunakan WebP format
3. Ukuran maksimal 500KB per image

### Lazy Loading:
Sudah otomatis dengan Next.js Image component.

---

## ✅ Checklist Sebelum Deploy

- [ ] Ganti semua "Your Name" dengan nama kamu
- [ ] Update semua link social media
- [ ] Ganti email dan nomor telepon
- [ ] Upload foto profil
- [ ] Upload resume/CV PDF
- [ ] Update semua project dengan link real
- [ ] Ganti URL di metadata & sitemap
- [ ] Test di berbagai device
- [ ] Test dark/light mode
- [ ] Check semua link berfungsi
- [ ] Compress semua images

---

## 🆘 Troubleshooting

### Image tidak muncul?
- Check path: `/images/filename.jpg`
- File harus di folder `public/`
- Restart dev server

### Warna tidak berubah?
- Clear cache browser (Ctrl + Shift + R)
- Restart dev server
- Check `tailwind.config.ts`

### Build error?
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

**Happy Customizing! 🎉**

Jika ada pertanyaan, jangan ragu untuk bertanya!
