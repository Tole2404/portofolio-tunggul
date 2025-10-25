# 📦 Panduan Lengkap Deployment Portfolio Website

Panduan lengkap untuk deploy website portfolio ke berbagai platform hosting.

## 🎯 Pilihan Hosting

### 1. Vercel (GRATIS & Recommended) ⭐

**Kelebihan:**
- ✅ Gratis selamanya
- ✅ Deploy otomatis dari GitHub
- ✅ SSL/HTTPS gratis
- ✅ CDN global
- ✅ Perfect untuk Next.js
- ✅ Custom domain gratis

**Cara Deploy:**

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/portfolio.git
   git push -u origin main
   ```

2. **Deploy ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Sign in dengan GitHub
   - Click "New Project"
   - Import repository portfolio
   - Click "Deploy"
   - Done! Website live dalam 1 menit

3. **Custom Domain (Opsional)**
   - Buka project settings di Vercel
   - Tambahkan custom domain
   - Update DNS di domain provider

---

### 2. Netlify (GRATIS) ⭐

**Kelebihan:**
- ✅ Gratis selamanya
- ✅ Deploy otomatis dari GitHub
- ✅ SSL/HTTPS gratis
- ✅ Form handling gratis
- ✅ Custom domain gratis

**Cara Deploy:**

1. **Push ke GitHub** (sama seperti di atas)

2. **Deploy ke Netlify**
   - Buka [netlify.com](https://netlify.com)
   - Sign in dengan GitHub
   - Click "Add new site" → "Import an existing project"
   - Pilih repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Click "Deploy"

---

### 3. cPanel / Shared Hosting

**Cocok untuk:**
- Hosting yang sudah ada
- Shared hosting murah
- Tidak perlu Node.js

**Cara Deploy:**

1. **Build Project**
   ```bash
   npm install
   npm run build
   ```

2. **Upload ke cPanel**
   - Buka cPanel File Manager
   - Navigate ke `public_html`
   - Upload semua file dari folder `out/`
   - Done!

3. **Via FTP (Alternative)**
   - Gunakan FileZilla atau FTP client lain
   - Connect ke hosting
   - Upload folder `out/` ke `public_html`

**Catatan Penting untuk cPanel:**
- File `.htaccess` mungkin perlu ditambahkan untuk routing
- Pastikan semua file di folder `out/` ter-upload

**File .htaccess untuk cPanel:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### 4. GitHub Pages (GRATIS)

**Kelebihan:**
- ✅ Gratis selamanya
- ✅ Hosting langsung dari GitHub
- ✅ SSL/HTTPS gratis

**Cara Deploy:**

1. **Update next.config.js**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     basePath: '/nama-repository', // Ganti dengan nama repo
     images: {
       unoptimized: true,
     },
     trailingSlash: true,
   }
   
   module.exports = nextConfig
   ```

2. **Build & Deploy**
   ```bash
   npm run build
   ```

3. **Push ke GitHub Pages**
   - Install gh-pages: `npm install --save-dev gh-pages`
   - Tambahkan script di package.json:
     ```json
     "deploy": "gh-pages -d out"
     ```
   - Run: `npm run deploy`

4. **Enable GitHub Pages**
   - Buka Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

---

### 5. Cloudflare Pages (GRATIS)

**Kelebihan:**
- ✅ Gratis unlimited
- ✅ CDN super cepat
- ✅ Deploy otomatis

**Cara Deploy:**

1. **Push ke GitHub**

2. **Deploy ke Cloudflare Pages**
   - Buka [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connect GitHub
   - Select repository
   - Build settings:
     - Build command: `npm run build`
     - Build output: `out`
   - Deploy

---

## 🔧 Konfigurasi Tambahan

### Environment Variables

Jika butuh environment variables (API keys, dll):

**Vercel:**
- Settings → Environment Variables
- Tambahkan variable

**Netlify:**
- Site settings → Environment variables
- Tambahkan variable

**cPanel:**
- Tidak bisa pakai environment variables
- Hardcode atau gunakan config file

### Custom Domain

**Vercel/Netlify:**
1. Tambahkan domain di dashboard
2. Update DNS:
   - Type: A
   - Name: @
   - Value: (IP dari platform)
   - Type: CNAME
   - Name: www
   - Value: (domain dari platform)

**cPanel:**
- Domain sudah otomatis terhubung

### SSL/HTTPS

- **Vercel/Netlify/Cloudflare:** Otomatis gratis
- **cPanel:** Aktifkan Let's Encrypt di cPanel

---

## 🚀 Optimasi Sebelum Deploy

### 1. Compress Images
```bash
# Install sharp untuk optimasi image
npm install sharp
```

### 2. Update Meta Tags
Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Nama Kamu - Portfolio',
  description: 'Deskripsi portfolio kamu',
  keywords: 'web developer, portfolio, next.js',
  authors: [{ name: 'Nama Kamu' }],
  openGraph: {
    title: 'Nama Kamu - Portfolio',
    description: 'Deskripsi portfolio kamu',
    url: 'https://domain-kamu.com',
    siteName: 'Portfolio',
    images: ['/og-image.jpg'],
  },
}
```

### 3. Add Sitemap
Buat file `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://domain-kamu.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

### 4. Add Robots.txt
Buat file `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://domain-kamu.com/sitemap.xml',
  }
}
```

---

## 📊 Testing & Monitoring

### Performance Testing
1. **Lighthouse** (Chrome DevTools)
   - Buka DevTools → Lighthouse
   - Run audit
   - Target: 90+ score

2. **PageSpeed Insights**
   - [pagespeed.web.dev](https://pagespeed.web.dev)
   - Test URL
   - Optimize berdasarkan saran

### Analytics

**Google Analytics:**
1. Buat account di [analytics.google.com](https://analytics.google.com)
2. Tambahkan tracking code di `app/layout.tsx`

**Vercel Analytics:**
- Gratis untuk Vercel users
- Enable di dashboard

---

## 🐛 Troubleshooting

### Build Error
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### 404 Error di cPanel
- Pastikan file `.htaccess` sudah ada
- Check file permissions (755 untuk folder, 644 untuk file)

### Images Tidak Muncul
- Pastikan path image benar
- Gunakan `/images/...` bukan `./images/...`
- Check folder `public/`

### Dark Mode Tidak Berfungsi
- Clear browser cache
- Check `ThemeProvider` di layout

---

## 📝 Checklist Sebelum Deploy

- [ ] Update semua informasi personal
- [ ] Ganti placeholder images
- [ ] Test di berbagai device
- [ ] Test dark/light mode
- [ ] Update meta tags & SEO
- [ ] Compress images
- [ ] Test form contact
- [ ] Update social media links
- [ ] Add resume PDF
- [ ] Test build locally
- [ ] Check console untuk errors

---

## 🎉 Setelah Deploy

1. **Test Website**
   - Buka di berbagai browser
   - Test di mobile
   - Check semua links
   - Test form

2. **Share!**
   - Update LinkedIn
   - Share di social media
   - Add ke CV/Resume

3. **Monitor**
   - Check analytics
   - Monitor performance
   - Update content regularly

---

**Good luck dengan portfolio website kamu! 🚀**

Jika ada pertanyaan, jangan ragu untuk bertanya!
