# 🌱 Seed Data Guide

Panduan untuk mengisi data portfolio secara manual menggunakan JSON file.

## 📝 Cara Menggunakan

### **1. Edit File `seed-data.json`**

Buka file `seed-data.json` dan isi dengan data kamu:

#### **A. Settings (Hero, About, Footer)**

```json
"settings": {
  "hero_name": "Nama Kamu",
  "hero_title": "Full Stack Developer",
  "hero_description": "Deskripsi singkat tentang kamu...",
  "hero_image": "/images/profile.jpg",
  "hero_github": "https://github.com/username",
  "hero_linkedin": "https://linkedin.com/in/username",
  "hero_email": "email@example.com",
  "hero_available": "true",
  
  "about_description": "Tentang kamu...",
  "about_years": "3",
  "about_projects": "50",
  "about_clients": "20",
  
  "footer_name": "Nama Kamu",
  "footer_tagline": "Tagline kamu",
  "footer_email": "email@example.com",
  "footer_phone": "+62 123 4567 8900",
  "footer_location": "Jakarta, Indonesia",
  "footer_github": "https://github.com/username",
  "footer_linkedin": "https://linkedin.com/in/username"
}
```

#### **B. Skills**

```json
"skills": [
  {
    "name": "React",
    "level": 90,              // 0-100
    "category": "Frontend",   // Frontend, Backend, Tools, Design
    "icon": "react",
    "color": "blue",
    "order": 1
  }
]
```

**Categories:**
- `Frontend` - React, Vue, Angular, etc.
- `Backend` - Node.js, PHP, Python, etc.
- `Tools` - Git, Docker, VS Code, etc.
- `Design` - Figma, Photoshop, etc.

#### **C. Projects**

```json
"projects": [
  {
    "title": "Project Name",
    "description": "Deskripsi project...",
    "image": "https://images.unsplash.com/photo-xxx?w=800",
    "tags": ["React", "Node.js", "MongoDB"],
    "github": "https://github.com/username/repo",
    "demo": "https://demo.vercel.app",
    "gradient": "from-blue-500 to-cyan-500",
    "featured": true,
    "order": 1
  }
]
```

**Gradient Options:**
- `from-blue-500 to-cyan-500` - Blue
- `from-purple-500 to-pink-500` - Purple
- `from-green-500 to-emerald-500` - Green
- `from-orange-500 to-red-500` - Orange

**Image Sources:**
- Unsplash: `https://images.unsplash.com/photo-xxx?w=800`
- Upload sendiri ke `/public/images/project-name.jpg`
- Atau pakai URL image lain

#### **D. Experience**

```json
"experience": [
  {
    "type": "work",           // work atau education
    "title": "Job Title",
    "company": "Company Name",
    "location": "Jakarta, Indonesia",
    "period": "2022 - Present",
    "description": "Deskripsi pekerjaan...",
    "tags": ["React", "Node.js", "AWS"],
    "color": "from-blue-500 to-cyan-500",
    "order": 1
  }
]
```

**Types:**
- `work` - Pengalaman kerja
- `education` - Pendidikan

---

### **2. Jalankan Seed Script**

Setelah edit `seed-data.json`, jalankan:

```bash
node seed-database.js
```

**Output:**
```
🌱 Starting database seeding...

📝 Seeding Settings...
  ✅ hero_name: Your Name
  ✅ hero_title: Full Stack Developer
  ...
✅ Settings seeded: 20 items

🎯 Seeding Skills...
  ✅ React (Frontend) - 90%
  ✅ Next.js (Frontend) - 85%
  ...
✅ Skills seeded: 12 items

🚀 Seeding Projects...
  ✅ E-Commerce Platform
  ✅ Task Management App
  ...
✅ Projects seeded: 4 items

💼 Seeding Experience...
  ✅ Senior Full Stack Developer at Tech Company Inc.
  ...
✅ Experience seeded: 4 items

🎉 Database seeding completed successfully!

📊 Summary:
  - Settings: 20
  - Skills: 12
  - Projects: 4
  - Experience: 4

✨ You can now view your portfolio at http://localhost:3000
```

---

### **3. Refresh Website**

Buka browser dan refresh:
```
http://localhost:3000
```

Semua data akan ter-update! ✨

---

## 🔄 Update Data

### **Cara 1: Edit JSON & Re-seed**

1. Edit `seed-data.json`
2. Run `node seed-database.js`
3. Refresh browser

⚠️ **Warning:** Ini akan **replace semua data** yang ada!

### **Cara 2: Edit via Admin Panel**

1. Login ke admin: `http://localhost:3000/admin/dashboard`
2. Edit data via UI
3. Data tersimpan otomatis

---

## 📸 Upload Images

### **Profile Image:**

1. Simpan foto di `/public/images/profile.jpg`
2. Update di JSON:
   ```json
   "hero_image": "/images/profile.jpg"
   ```

### **Project Images:**

**Option 1: Upload sendiri**
```json
"image": "/images/project-ecommerce.jpg"
```

**Option 2: Pakai Unsplash**
```json
"image": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800"
```

**Option 3: Pakai URL lain**
```json
"image": "https://your-cdn.com/image.jpg"
```

---

## 🎨 Customization Tips

### **Hero Section:**
- `hero_name` - Nama lengkap
- `hero_title` - Job title (max 50 karakter)
- `hero_description` - Deskripsi singkat (max 200 karakter)
- `hero_available` - "true" atau "false" (show badge)

### **Skills:**
- Level 80-100 = Expert
- Level 60-79 = Advanced
- Level 40-59 = Intermediate
- Level 0-39 = Beginner

### **Projects:**
- `featured: true` - Tampil di featured section
- `order` - Urutan tampil (1 = pertama)
- Minimal 3-4 projects untuk portfolio yang baik

### **Experience:**
- Urutkan dari yang terbaru (order: 1)
- Maksimal 5-6 experience untuk tidak terlalu panjang
- Gunakan bullet points di description

---

## 🚀 Quick Start Example

**Minimal data untuk mulai:**

```json
{
  "settings": {
    "hero_name": "John Doe",
    "hero_title": "Web Developer",
    "hero_description": "I build websites",
    "hero_image": "/images/profile.jpg",
    "hero_github": "https://github.com/johndoe",
    "hero_linkedin": "https://linkedin.com/in/johndoe",
    "hero_email": "john@example.com",
    "hero_available": "true",
    "about_description": "I'm a web developer...",
    "about_years": "2",
    "about_projects": "10",
    "about_clients": "5"
  },
  "skills": [
    {
      "name": "HTML",
      "level": 90,
      "category": "Frontend",
      "icon": "html",
      "color": "orange",
      "order": 1
    }
  ],
  "projects": [
    {
      "title": "My Website",
      "description": "Personal website",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "tags": ["HTML", "CSS"],
      "github": "https://github.com/johndoe/website",
      "demo": "https://johndoe.com",
      "gradient": "from-blue-500 to-cyan-500",
      "featured": true,
      "order": 1
    }
  ],
  "experience": [
    {
      "type": "work",
      "title": "Web Developer",
      "company": "Company",
      "location": "Jakarta",
      "period": "2023 - Present",
      "description": "Building websites",
      "tags": ["HTML", "CSS", "JavaScript"],
      "color": "from-blue-500 to-cyan-500",
      "order": 1
    }
  ]
}
```

Lalu run:
```bash
node seed-database.js
```

Done! 🎉

---

## 🆘 Troubleshooting

### **Error: Cannot find module '@prisma/client'**
```bash
npm install @prisma/client
npx prisma generate
```

### **Error: Database not found**
```bash
npx prisma db push
```

### **Error: JSON parse error**
- Check JSON syntax di `seed-data.json`
- Pastikan tidak ada trailing comma
- Gunakan JSON validator online

### **Data tidak muncul di website**
- Refresh browser (Ctrl+F5)
- Check console untuk error
- Restart dev server

---

## 📚 Resources

- **Unsplash Images:** https://unsplash.com
- **JSON Validator:** https://jsonlint.com
- **Gradient Generator:** https://uigradients.com
- **Icon Names:** https://lucide.dev

---

**Happy coding! 🚀**
