# 🚀 Deploy ke Vercel - GRATIS!

Panduan lengkap deploy portfolio + admin panel ke Vercel secara gratis!

---

## ✅ Yang Gratis di Vercel:

- ✅ Hosting unlimited
- ✅ SSL Certificate (HTTPS)
- ✅ Custom domain
- ✅ Automatic deployments
- ✅ Preview deployments
- ✅ Analytics
- ✅ Edge Functions
- ✅ 100GB Bandwidth/month

---

## ⚠️ Penting: Database Setup

**SQLite TIDAK BISA** di Vercel (serverless environment).

### Pilihan Database Gratis:

#### **Option 1: Vercel Postgres (Recommended)** ✅
- **Gratis:** 256 MB storage
- **Setup:** Super mudah
- **Integration:** Built-in di Vercel

#### **Option 2: Supabase** ✅
- **Gratis:** 500 MB storage
- **Features:** PostgreSQL + Auth + Storage
- **Setup:** Mudah

#### **Option 3: PlanetScale** ✅
- **Gratis:** 5 GB storage
- **Features:** MySQL serverless
- **Setup:** Mudah

#### **Option 4: MongoDB Atlas** ✅
- **Gratis:** 512 MB storage
- **Features:** NoSQL database
- **Setup:** Mudah

---

## 🚀 Deploy dengan Vercel Postgres (Recommended)

### Step 1: Prepare Project

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Ganti dari sqlite
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### Step 2: Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

### Step 3: Deploy ke Vercel

1. **Buka:** https://vercel.com
2. **Sign Up/Login** dengan GitHub
3. **Import Project:**
   - Click "Add New Project"
   - Select repository
   - Click "Import"

4. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Database:**
   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Click "Create"

6. **Environment Variables:**
   
   Vercel akan auto-add database variables. Tambahkan:

   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   ```

   Generate secret:
   ```bash
   openssl rand -base64 32
   ```

7. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! 🎉

### Step 4: Setup Database

Setelah deploy, jalankan migration:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Link Project:**
   ```bash
   vercel link
   ```

4. **Pull Environment Variables:**
   ```bash
   vercel env pull
   ```

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

6. **Push Database Schema:**
   ```bash
   npx prisma db push
   ```

7. **Create Admin User:**
   
   Buat file `scripts/create-admin.ts`:

   ```typescript
   import { PrismaClient } from '@prisma/client'

   const prisma = new PrismaClient()

   async function main() {
     await prisma.user.create({
       data: {
         email: 'admin@portfolio.com',
         password: 'admin123', // Change this!
         name: 'Admin'
       }
     })
     console.log('Admin created!')
   }

   main()
     .catch(console.error)
     .finally(() => prisma.$disconnect())
   ```

   Run:
   ```bash
   npx tsx scripts/create-admin.ts
   ```

---

## 🎯 Deploy dengan Supabase (Alternative)

### Step 1: Create Supabase Project

1. **Buka:** https://supabase.com
2. **Sign Up** (gratis)
3. **Create New Project:**
   - Name: portfolio-db
   - Database Password: (simpan ini!)
   - Region: Southeast Asia (Singapore)

### Step 2: Get Connection String

1. Go to **Settings** → **Database**
2. Copy **Connection String** (URI)
3. Replace `[YOUR-PASSWORD]` dengan password kamu

### Step 3: Update Prisma Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 4: Add to Vercel

1. Go to Vercel project settings
2. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-secret-key
   ```

3. **Redeploy** project

---

## 📝 Update package.json untuk Vercel

Tambahkan postinstall script:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

---

## 🔧 Vercel Configuration

Buat file `vercel.json`:

```json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"]
}
```

---

## 🌐 Custom Domain (Gratis)

### Option 1: Vercel Subdomain (Gratis)
- `your-portfolio.vercel.app`
- Langsung aktif setelah deploy

### Option 2: Custom Domain
1. Beli domain (Namecheap, GoDaddy, dll)
2. Di Vercel: Settings → Domains
3. Add domain
4. Update DNS records
5. Wait 24-48 hours

---

## 🔒 Security Checklist

Before deploying:

- [ ] Change admin password
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Enable HTTPS only
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Add CORS headers
- [ ] Use environment variables
- [ ] Never commit .env file

---

## 🚀 Automatic Deployments

Setelah setup, setiap push ke GitHub akan auto-deploy:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel akan:
1. Detect changes
2. Build project
3. Run tests
4. Deploy to production
5. Send notification

---

## 📊 Monitor Your Site

### Vercel Dashboard:

- **Analytics:** Visitor stats
- **Logs:** Error tracking
- **Performance:** Speed insights
- **Deployments:** History & rollback

---

## 🐛 Troubleshooting

### Build Error: Prisma Client not generated

**Fix:**
```json
// package.json
"scripts": {
  "build": "prisma generate && next build"
}
```

### Database Connection Error

**Fix:**
1. Check DATABASE_URL is correct
2. Verify database is running
3. Check firewall settings
4. Test connection locally

### Admin Login Not Working

**Fix:**
1. Verify admin user exists in database
2. Check NEXTAUTH_SECRET is set
3. Clear cookies and try again

---

## 💰 Cost Breakdown

### Vercel Free Tier:
- ✅ Unlimited projects
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Edge network
- ✅ SSL certificate
- ✅ Custom domains

### Vercel Postgres Free Tier:
- ✅ 256 MB storage
- ✅ 60 hours compute/month
- ✅ Enough for portfolio!

### Upgrade Only If:
- Need more storage
- High traffic (>100GB/month)
- Team collaboration
- Advanced analytics

**For portfolio: FREE tier is enough!** ✅

---

## 🎯 Post-Deployment

### 1. Test Everything:
- [ ] Homepage loads
- [ ] All sections work
- [ ] Admin login works
- [ ] CRUD operations work
- [ ] Mobile responsive
- [ ] Dark mode works

### 2. SEO Setup:
- [ ] Add sitemap
- [ ] Submit to Google Search Console
- [ ] Add meta tags
- [ ] Add Open Graph images

### 3. Performance:
- [ ] Run Lighthouse test
- [ ] Optimize images
- [ ] Enable caching
- [ ] Minimize JavaScript

---

## 📱 Preview Deployments

Setiap Pull Request akan dapat preview URL:
- Test changes sebelum merge
- Share dengan client
- QA testing

---

## 🔄 Rollback

Jika ada masalah:
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find working version
4. Click "Promote to Production"

---

## 📈 Analytics (Gratis)

Vercel Analytics shows:
- Page views
- Unique visitors
- Top pages
- Referrers
- Devices
- Countries

Enable di: Settings → Analytics

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Discord:** https://vercel.com/discord
- **Prisma Docs:** https://www.prisma.io/docs

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Database setup (Vercel Postgres/Supabase)
- [ ] Environment variables added
- [ ] Prisma schema updated
- [ ] Build script updated
- [ ] Admin user created
- [ ] Test deployment
- [ ] Custom domain (optional)
- [ ] SSL enabled (auto)
- [ ] Analytics enabled

---

**Ready to deploy! Your portfolio will be live in minutes! 🚀**

Total Cost: **$0/month** 💰
