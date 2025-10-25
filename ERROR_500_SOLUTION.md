# ⚡ Error 500 - Quick Solution

Error: `POST http://localhost:3000/api/auth/login/ 500 (Internal Server Error)`

---

## 🎯 Penyebab Error

Error 500 pada login API biasanya disebabkan oleh:

1. ❌ Admin user belum dibuat di database
2. ❌ Prisma Client belum di-generate
3. ❌ Database connection error
4. ❌ Password tidak match

---

## ✅ Solusi Cepat (5 Menit)

### Step 1: Stop Server
```bash
Ctrl + C
```

### Step 2: Verify & Fix Database
```bash
# Check apakah admin user ada
npm run db:studio
```

**Jika tidak ada user:**
```bash
npm run db:seed
```

**Output yang benar:**
```
✅ Admin user created successfully!
Email: admin@portfolio.com
Password: admin123
```

### Step 3: Regenerate Prisma Client
```bash
npx prisma generate
```

### Step 4: Restart Server
```bash
npm run dev
```

### Step 5: Test Login
- URL: http://localhost:3000/admin/login
- Email: `admin@portfolio.com`
- Password: `admin123`

---

## 🔍 Check Terminal Logs

Setelah restart server dan coba login, lihat terminal output:

### ✅ Success Logs:
```
Login attempt: admin@portfolio.com
Verifying password for: admin@portfolio.com
User found, checking password...
Password match!
User verified: admin@portfolio.com
Login successful for: admin@portfolio.com
```

### ❌ Error Logs:

**"User not found"**
```bash
npm run db:seed
```

**"Password mismatch"**
```bash
# Buka Prisma Studio
npm run db:studio
# Edit password jadi: admin123
```

**"PrismaClient error"**
```bash
npx prisma generate
npm run dev
```

---

## 🔄 Complete Reset (Jika Masih Error)

```bash
# 1. Stop server
Ctrl + C

# 2. Delete database
rm prisma/dev.db

# 3. Recreate everything
npm run db:push
npm run db:seed

# 4. Restart
npm run dev
```

---

## 📊 Verify Database

Buka Prisma Studio untuk check:
```bash
npm run db:studio
```

**Check:**
- [ ] Table `User` exists
- [ ] 1 record dengan email: `admin@portfolio.com`
- [ ] Password field: `admin123`

---

## 🎯 Test API Langsung

Test dengan curl (optional):
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@portfolio.com\",\"password\":\"admin123\"}"
```

**Expected response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "admin@portfolio.com",
    "name": "Admin"
  }
}
```

---

## 🐛 Debug Checklist

- [ ] Server running (`npm run dev`)
- [ ] Database file exists (`prisma/dev.db`)
- [ ] Admin user exists (check with `npm run db:studio`)
- [ ] Password is exactly `admin123`
- [ ] No errors in terminal
- [ ] Browser console shows no errors

---

## 💡 Quick Commands Reference

```bash
# Create admin user
npm run db:seed

# View database
npm run db:studio

# Regenerate Prisma Client
npx prisma generate

# Reset database
npm run db:push

# Start server
npm run dev
```

---

## ✅ Success!

Jika berhasil, kamu akan:
- ✅ Bisa akses login page
- ✅ Bisa submit form tanpa error
- ✅ Auto redirect ke dashboard
- ✅ Dashboard shows statistics
- ✅ No console errors

---

**Masih error? Lihat file: `TROUBLESHOOT_LOGIN.md` untuk detailed guide!** 🚀
