# 🔧 Fix Error 500 - Admin Panel

Error 500 berarti ada masalah di server. Ini biasanya karena **admin user belum dibuat** di database.

---

## ⚡ Quick Fix (3 Langkah)

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Admin User

```bash
npm run db:seed
```

Output yang benar:
```
✅ Admin user created successfully!
Email: admin@portfolio.com
Password: admin123

🔐 Login at: http://localhost:3000/admin/login
```

### 3. Restart Server

```bash
# Stop server (Ctrl + C)
npm run dev
```

---

## ✅ Test Admin Panel

1. Buka: **http://localhost:3000/admin/login**
2. Login dengan:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
3. Jika berhasil → Dashboard muncul! 🎉

---

## 🐛 Masih Error?

### Error: "Admin user already exists"

Artinya admin sudah ada, tapi password mungkin salah.

**Fix:**
```bash
# Buka Prisma Studio
npm run db:studio

# Edit user password jadi: admin123
```

### Error: "Cannot find module '@prisma/client'"

**Fix:**
```bash
npm run db:generate
npm install
```

### Error: "Database not found"

**Fix:**
```bash
npm run db:push
npm run db:seed
```

### Error: "tsx command not found"

**Fix:**
```bash
npm install tsx --save-dev
npm run db:seed
```

---

## 📊 Verify Database

Buka Prisma Studio untuk lihat database:

```bash
npm run db:studio
```

Check:
- [ ] User table ada
- [ ] Admin user ada
- [ ] Email: admin@portfolio.com
- [ ] Password: admin123

---

## 🔍 Debug Mode

Jika masih error, check console browser:

1. Buka browser DevTools (F12)
2. Go to Console tab
3. Refresh page
4. Lihat error message
5. Screenshot dan share

---

## ✅ Checklist

- [ ] npm install done
- [ ] npm run db:push done
- [ ] npm run db:generate done
- [ ] npm run db:seed done
- [ ] Admin user created
- [ ] npm run dev running
- [ ] Can access /admin/login
- [ ] Can login successfully

---

## 🎯 Alternative: Manual Create Admin

Jika script tidak jalan, buat manual:

```bash
# 1. Buka Prisma Studio
npm run db:studio

# 2. Go to User table
# 3. Click "Add record"
# 4. Fill:
#    - email: admin@portfolio.com
#    - password: admin123
#    - name: Admin
# 5. Click "Save"
```

---

## 📝 Common Errors & Solutions

### 1. Error 500 on Login

**Cause:** Admin user tidak ada

**Fix:**
```bash
npm run db:seed
```

### 2. Error: Invalid credentials

**Cause:** Password salah

**Fix:** Check password = `admin123` (case sensitive)

### 3. Error: Cannot connect to database

**Cause:** Database file tidak ada

**Fix:**
```bash
npm run db:push
npm run db:seed
```

### 4. Error: Prisma Client not initialized

**Cause:** Prisma Client belum di-generate

**Fix:**
```bash
npm run db:generate
```

---

## 🚀 Fresh Start

Jika semua gagal, reset database:

```bash
# 1. Delete database
rm prisma/dev.db

# 2. Recreate
npm run db:push

# 3. Create admin
npm run db:seed

# 4. Restart server
npm run dev
```

---

## ✨ Success!

Jika berhasil, kamu akan lihat:
- ✅ Login page loads
- ✅ Can login with admin credentials
- ✅ Dashboard shows statistics
- ✅ Sidebar menu works
- ✅ No console errors

---

**Error fixed! Admin panel ready to use! 🎉**
