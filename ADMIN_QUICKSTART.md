# 🚀 Admin Panel - Quick Start

Panduan cepat untuk mulai menggunakan Admin Panel!

---

## ⚡ Setup dalam 5 Menit

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Create database
npm run db:push
```

### 3. Jalankan Development Server

```bash
npm run dev
```

### 4. Akses Admin Panel

Buka browser: **http://localhost:3000/admin/login**

**Login Credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

---

## 📋 Fitur Admin Panel

### ✅ Yang Sudah Dibuat:

1. **Authentication System**
   - Login page
   - JWT token authentication
   - Secure cookies
   - Logout functionality

2. **Dashboard**
   - Overview statistics
   - Quick actions
   - Navigation sidebar

3. **Database Schema**
   - Projects table
   - Skills table
   - Experience table
   - Users table
   - Settings table

4. **API Routes**
   - `/api/auth/login` - Login
   - `/api/auth/logout` - Logout
   - `/api/projects` - Projects CRUD
   - `/api/projects/[id]` - Update/Delete project

### 🚧 Yang Perlu Dilengkapi:

1. **Projects Management Page**
   - Form untuk add/edit project
   - List semua projects
   - Delete confirmation

2. **Skills Management Page**
   - Form untuk add/edit skill
   - List semua skills
   - Category management

3. **Experience Management Page**
   - Form untuk add/edit experience
   - List semua experience
   - Timeline preview

4. **API Routes untuk Skills & Experience**
   - `/api/skills` - Skills CRUD
   - `/api/experience` - Experience CRUD

---

## 🎯 Next Steps

### Untuk Melengkapi Admin Panel:

1. **Buat Skills API Routes:**
```bash
# Copy dari projects API dan sesuaikan
app/api/skills/route.ts
app/api/skills/[id]/route.ts
```

2. **Buat Experience API Routes:**
```bash
app/api/experience/route.ts
app/api/experience/[id]/route.ts
```

3. **Buat Management Pages:**
```bash
app/admin/dashboard/projects/page.tsx
app/admin/dashboard/skills/page.tsx
app/admin/dashboard/experience/page.tsx
```

4. **Tambah Image Upload:**
   - Gunakan Cloudinary atau AWS S3
   - Buat upload endpoint
   - Integrate dengan form

---

## 🔐 Security Checklist

Before Production:

- [ ] Change admin password
- [ ] Use bcrypt for password hashing
- [ ] Change NEXTAUTH_SECRET
- [ ] Add rate limiting
- [ ] Add CSRF protection
- [ ] Use HTTPS only
- [ ] Add middleware protection
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Add error logging

---

## 📊 Database Management

### View Database:

```bash
npm run db:studio
```

Ini akan buka Prisma Studio di browser untuk manage database secara visual.

### Reset Database:

```bash
npx prisma db push --force-reset
```

⚠️ **Warning:** Ini akan hapus semua data!

---

## 🛠️ Troubleshooting

### Error: Prisma Client not generated

```bash
npm run db:generate
```

### Error: Database not found

```bash
npm run db:push
```

### Error: Login not working

1. Check `.env` file exists
2. Verify database has admin user
3. Check browser console for errors

---

## 📝 File Structure

```
portfolio-website/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx          ✅ Login page
│   │   └── dashboard/
│   │       ├── layout.tsx         ✅ Admin layout
│   │       ├── page.tsx           ✅ Dashboard home
│   │       ├── projects/
│   │       │   └── page.tsx       🚧 To be created
│   │       ├── skills/
│   │       │   └── page.tsx       🚧 To be created
│   │       └── experience/
│   │           └── page.tsx       🚧 To be created
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts     ✅ Login API
│       │   └── logout/route.ts    ✅ Logout API
│       ├── projects/
│       │   ├── route.ts           ✅ Projects API
│       │   └── [id]/route.ts      ✅ Project CRUD
│       ├── skills/
│       │   └── route.ts           🚧 To be created
│       └── experience/
│           └── route.ts           🚧 To be created
├── lib/
│   ├── prisma.ts                  ✅ Prisma client
│   └── auth.ts                    ✅ Auth utilities
├── prisma/
│   └── schema.prisma              ✅ Database schema
├── .env                           ✅ Environment variables
└── ADMIN_SETUP.md                 ✅ Detailed guide
```

---

## 🎨 Customization

### Change Admin Theme:

Edit `app/admin/dashboard/layout.tsx`:
- Sidebar colors
- Logo
- Menu items

### Add New Section:

1. Add table to `prisma/schema.prisma`
2. Run `npm run db:push`
3. Create API routes
4. Create admin page
5. Add to sidebar menu

---

## 💡 Tips

1. **Use Prisma Studio** untuk quick database edits
2. **Check API responses** di browser DevTools
3. **Test CRUD operations** sebelum production
4. **Backup database** sebelum reset
5. **Use TypeScript** untuk type safety

---

## 🆘 Need Help?

Baca file lengkap: **ADMIN_SETUP.md**

---

**Ready to manage your portfolio! 🎉**
