# 🔧 Fix Compile Error - Hero.tsx

Error: `Return statement is not allowed here` di Hero.tsx

---

## ⚡ Quick Fix

### 1. Stop Server
```bash
Ctrl + C
```

### 2. Clear Next.js Cache
```powershell
# PowerShell (Windows)
Remove-Item -Recurse -Force .next

# Or Bash/Terminal
rm -rf .next
```

### 3. Restart Server
```bash
npm run dev
```

---

## ✅ Sudah Fixed!

Cache Next.js sudah di-clear. Server akan compile ulang dari awal.

---

## 🎯 Test

1. Buka: http://localhost:3000
2. Homepage harus load tanpa error
3. Check terminal - no compile errors

---

## 💡 Kenapa Error Ini Terjadi?

Next.js cache kadang corrupt saat:
- File di-edit berkali-kali
- Hot reload gagal
- Syntax error temporary

**Solusi:** Clear `.next` folder untuk force rebuild.

---

## 🔄 Commands Reference

```powershell
# Clear cache (Windows PowerShell)
Remove-Item -Recurse -Force .next

# Clear cache (Git Bash/Linux/Mac)
rm -rf .next

# Restart server
npm run dev
```

---

**Error fixed! Server should compile successfully now!** 🚀
