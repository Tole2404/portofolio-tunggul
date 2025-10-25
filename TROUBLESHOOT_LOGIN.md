# 🔧 Troubleshoot Login Error 500

Error 500 pada `/api/auth/login` - Panduan lengkap untuk fix!

---

## 🎯 Quick Fix Steps

### 1. Stop Server
Tekan `Ctrl + C` di terminal untuk stop server

### 2. Verify Database
```bash
npm run db:studio
```

Check di Prisma Studio:
- [ ] Table `User` ada
- [ ] Ada 1 record dengan email `admin@portfolio.com`
- [ ] Password field = `admin123`

### 3. Regenerate Prisma Client
```bash
# Hapus node_modules prisma client
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma

# Install ulang
npm install

# Generate ulang
npx prisma generate
```

### 4. Restart Server
```bash
npm run dev
```

### 5. Test Login
- Buka: http://localhost:3000/admin/login
- Email: `admin@portfolio.com`
- Password: `admin123`

---

## 🐛 Debug Mode

### Check Console Logs

Setelah restart server, coba login dan lihat terminal output:

**Expected logs:**
```
Login attempt: admin@portfolio.com
Verifying password for: admin@portfolio.com
User found, checking password...
Password match!
User verified: admin@portfolio.com
Login successful for: admin@portfolio.com
```

**If you see error:**
```
Error in verifyPassword: [error details]
```
→ Ada masalah dengan database connection

---

## 🔍 Common Issues

### Issue 1: "User not found"

**Cause:** Admin user belum dibuat

**Fix:**
```bash
npm run db:seed
```

### Issue 2: "Password mismatch"

**Cause:** Password di database bukan `admin123`

**Fix:**
```bash
# Buka Prisma Studio
npm run db:studio

# Edit user password jadi: admin123
# Save
```

### Issue 3: "Cannot connect to database"

**Cause:** Database file tidak ada atau corrupt

**Fix:**
```bash
# Backup database (jika ada data penting)
cp prisma/dev.db prisma/dev.db.backup

# Recreate database
npm run db:push

# Create admin
npm run db:seed
```

### Issue 4: "Prisma Client not initialized"

**Cause:** Prisma Client belum di-generate

**Fix:**
```bash
# Clean install
rm -rf node_modules
npm install

# Generate client
npx prisma generate

# Push schema
npm run db:push

# Create admin
npm run db:seed
```

---

## 🧪 Test Database Connection

Buat file test: `test-db.js`

```javascript
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const users = await prisma.user.findMany()
    console.log('✅ Database connected!')
    console.log('Users:', users)
  } catch (error) {
    console.error('❌ Database error:', error)
  }
}

main()
  .finally(() => prisma.$disconnect())
```

Run:
```bash
node test-db.js
```

Expected output:
```
✅ Database connected!
Users: [
  {
    id: 'xxx',
    email: 'admin@portfolio.com',
    password: 'admin123',
    name: 'Admin',
    createdAt: ...
  }
]
```

---

## 🔄 Complete Reset

Jika semua gagal, reset semuanya:

```bash
# 1. Stop server (Ctrl + C)

# 2. Delete database
rm prisma/dev.db
rm prisma/dev.db-journal

# 3. Delete node_modules
rm -rf node_modules
rm -rf .next

# 4. Clean install
npm install

# 5. Generate Prisma Client
npx prisma generate

# 6. Create database
npm run db:push

# 7. Create admin user
npm run db:seed

# 8. Start server
npm run dev
```

---

## 📊 Verify Everything

### Checklist:

- [ ] `.env` file exists
- [ ] `DATABASE_URL="file:./dev.db"` in .env
- [ ] `prisma/dev.db` file exists
- [ ] `node_modules/@prisma/client` folder exists
- [ ] Admin user exists in database
- [ ] Server running on port 3000
- [ ] No errors in terminal

---

## 🎯 Alternative: Manual Database Setup

Jika script tidak jalan, setup manual:

### Step 1: Buka Prisma Studio
```bash
npm run db:studio
```

### Step 2: Create User
1. Click on `User` table
2. Click "Add record"
3. Fill in:
   - **id:** (auto-generated)
   - **email:** `admin@portfolio.com`
   - **password:** `admin123`
   - **name:** `Admin`
   - **createdAt:** (auto-generated)
   - **updatedAt:** (auto-generated)
4. Click "Save 1 change"

### Step 3: Verify
Refresh page, should see 1 record

### Step 4: Test Login
- Restart server
- Go to http://localhost:3000/admin/login
- Login with credentials

---

## 🆘 Still Not Working?

### Get Detailed Error:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try login
4. Copy error message
5. Check Network tab
6. Click on failed request
7. Check Response tab
8. Look for `details` field

### Common Error Messages:

**"PrismaClient is unable to run in the browser"**
→ Prisma being imported in client component
→ Make sure API route is in `app/api/` folder

**"Invalid `prisma.user.findUnique()` invocation"**
→ Database schema mismatch
→ Run `npm run db:push`

**"Can't reach database server"**
→ Database file missing
→ Run `npm run db:push`

---

## 💡 Pro Tips

### 1. Always Check Logs
Server logs akan show exact error

### 2. Use Prisma Studio
Visual way to manage database

### 3. Test API Directly
Use Postman or curl:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "user": {
    "id": "xxx",
    "email": "admin@portfolio.com",
    "name": "Admin"
  }
}
```

---

## ✅ Success Indicators

When everything works:

- ✅ No errors in terminal
- ✅ Login page loads
- ✅ Can submit login form
- ✅ Redirects to dashboard
- ✅ Dashboard shows stats
- ✅ No 500 errors in console

---

**Need more help? Check the logs and share the exact error message!** 🚀
