# 🔐 Admin Panel Setup Guide

Panduan lengkap untuk setup dan menggunakan Admin Panel untuk mengelola portfolio.

---

## 📋 Prerequisites

Sebelum mulai, pastikan sudah install:
- Node.js (v18 atau lebih baru)
- npm atau yarn

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install prisma @prisma/client jose
npm install -D prisma
```

### 2. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database and tables
npx prisma db push

# (Optional) Open Prisma Studio untuk lihat database
npx prisma studio
```

### 3. Create Admin User

Buat file `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@portfolio.com',
      password: 'admin123', // Change this!
      name: 'Admin'
    }
  })

  console.log('Admin user created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Jalankan seed:

```bash
npx tsx prisma/seed.ts
```

### 4. Update package.json

Tambahkan script:

```json
{
  "scripts": {
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

---

## 🎯 Cara Menggunakan Admin Panel

### 1. Login ke Admin Panel

1. Jalankan dev server: `npm run dev`
2. Buka browser: `http://localhost:3000/admin/login`
3. Login dengan credentials:
   - **Email:** `admin@portfolio.com`
   - **Password:** `admin123`

### 2. Dashboard Overview

Setelah login, kamu akan melihat:
- **Total Projects** - Jumlah project yang ada
- **Total Skills** - Jumlah skills yang ada
- **Total Experience** - Jumlah experience yang ada
- **Quick Actions** - Link cepat ke management pages

### 3. Manage Projects

**Akses:** `/admin/dashboard/projects`

**Fitur:**
- ✅ Lihat semua projects
- ✅ Tambah project baru
- ✅ Edit project
- ✅ Hapus project
- ✅ Set featured project
- ✅ Reorder projects

**Fields:**
- Title
- Description
- Image URL (Unsplash atau upload)
- Tags (comma separated)
- GitHub URL
- Demo URL
- Gradient (color scheme)
- Featured (yes/no)

### 4. Manage Skills

**Akses:** `/admin/dashboard/skills`

**Fitur:**
- ✅ Lihat semua skills
- ✅ Tambah skill baru
- ✅ Edit skill
- ✅ Hapus skill
- ✅ Set skill level (0-100)

**Fields:**
- Name
- Level (percentage)
- Category (Frontend/Backend/Tools/Design)
- Icon (lucide icon name)
- Color (gradient)

### 5. Manage Experience

**Akses:** `/admin/dashboard/experience`

**Fitur:**
- ✅ Lihat semua experience
- ✅ Tambah experience baru
- ✅ Edit experience
- ✅ Hapus experience
- ✅ Set type (work/education)

**Fields:**
- Type (work or education)
- Title (Job title or Degree)
- Company/University
- Location
- Period (e.g., "2020 - 2023")
- Description
- Tags (technologies used)
- Color (gradient)

---

## 🔒 Security Notes

### ⚠️ IMPORTANT - Before Production:

1. **Change Admin Password:**
   ```typescript
   // Update in .env
   ADMIN_PASSWORD="your-strong-password"
   ```

2. **Use bcrypt for Password Hashing:**
   ```bash
   npm install bcrypt
   npm install -D @types/bcrypt
   ```

   Update `lib/auth.ts`:
   ```typescript
   import bcrypt from 'bcrypt'

   export async function verifyPassword(email: string, password: string) {
     const user = await prisma.user.findUnique({ where: { email } })
     if (!user) return null
     
     const isValid = await bcrypt.compare(password, user.password)
     return isValid ? { id: user.id, email: user.email, name: user.name } : null
   }
   ```

3. **Change NEXTAUTH_SECRET:**
   ```bash
   # Generate random secret
   openssl rand -base64 32
   ```

4. **Use Environment Variables:**
   - Never commit `.env` file
   - Add `.env` to `.gitignore`

5. **Add Middleware Protection:**
   Create `middleware.ts` to protect admin routes

---

## 📊 Database Schema

### Tables:

1. **User** - Admin users
2. **Project** - Portfolio projects
3. **Skill** - Skills and expertise
4. **Experience** - Work history and education
5. **Settings** - Site settings (future use)

### Relationships:

- No relationships (simple flat structure)
- Easy to query and manage

---

## 🛠️ API Endpoints

### Authentication:
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Projects:
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Skills:
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill
- `PUT /api/skills/[id]` - Update skill
- `DELETE /api/skills/[id]` - Delete skill

### Experience:
- `GET /api/experience` - Get all experience
- `POST /api/experience` - Create experience
- `PUT /api/experience/[id]` - Update experience
- `DELETE /api/experience/[id]` - Delete experience

---

## 🎨 Customization

### Change Admin Panel Theme:

Edit `app/admin/dashboard/layout.tsx` untuk customize sidebar dan layout.

### Add New Sections:

1. Create new table in `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Create API routes in `app/api/[section]/`
4. Create admin page in `app/admin/dashboard/[section]/`

---

## 🐛 Troubleshooting

### Database Error:
```bash
# Reset database
npx prisma db push --force-reset

# Regenerate client
npx prisma generate
```

### Login Not Working:
- Check `.env` file exists
- Verify admin user exists in database
- Check browser console for errors

### API Errors:
- Check Prisma Client is generated
- Verify database connection
- Check API route syntax

---

## 📝 Next Steps

1. **Setup Production Database:**
   - Use PostgreSQL or MySQL
   - Update `DATABASE_URL` in `.env`

2. **Add Image Upload:**
   - Use Cloudinary or AWS S3
   - Create upload API endpoint

3. **Add More Features:**
   - Blog posts management
   - Contact form submissions
   - Analytics dashboard

4. **Deploy:**
   - Vercel (recommended)
   - Netlify
   - Your own server

---

## 🆘 Need Help?

- Check Prisma docs: https://www.prisma.io/docs
- Check Next.js docs: https://nextjs.org/docs
- Open an issue on GitHub

---

**Happy Managing! 🎉**
