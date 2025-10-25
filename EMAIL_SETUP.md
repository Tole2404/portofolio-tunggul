# 📧 Email Setup Guide

Contact form sekarang akan **kirim email langsung** ke inbox kamu (seperti PHPMailer di PHP)!

## 🚀 Setup Steps

### 1. **Copy `.env.example` ke `.env`**

```bash
cp .env.example .env
```

Atau buat file `.env` manual di root project.

---

### 2. **Pilih Email Provider**

#### **Option A: Gmail (Recommended)** ✅

1. **Buat App Password** (bukan password Gmail biasa):
   - Go to: https://myaccount.google.com/apppasswords
   - Login dengan akun Gmail kamu
   - Pilih "Mail" dan "Other (Custom name)"
   - Nama: "Portfolio Contact Form"
   - Click "Generate"
   - **Copy 16-digit password** yang muncul

2. **Update `.env`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop  # App password dari step 1
   CONTACT_EMAIL=your-email@gmail.com
   ```

#### **Option B: Outlook/Hotmail**

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
CONTACT_EMAIL=your-email@outlook.com
```

#### **Option C: Yahoo Mail**

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password  # Generate di Yahoo Account Security
CONTACT_EMAIL=your-email@yahoo.com
```

#### **Option D: Custom SMTP**

```env
SMTP_HOST=smtp.your-domain.com
SMTP_PORT=587
SMTP_USER=your-email@your-domain.com
SMTP_PASS=your-password
CONTACT_EMAIL=your-email@your-domain.com
```

---

### 3. **Restart Dev Server**

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## 🧪 Testing

### **1. Test Contact Form:**

1. Go to: `http://localhost:3000`
2. Scroll ke **Contact** section
3. Fill form:
   - Name: John Doe
   - Email: test@example.com
   - Subject: Test Message
   - Message: Hello, this is a test!
4. Click **"Send Message"**
5. Wait for success message ✅

### **2. Check Your Email:**

- Open email inbox (Gmail/Outlook/etc)
- Look for email dengan subject: **"Portfolio Contact: Test Message"**
- Email akan berisi:
  - Sender name & email
  - Subject
  - Message
  - Reply button

---

## 📧 Email Template

Email yang dikirim akan terlihat seperti ini:

```
┌─────────────────────────────────────┐
│ 📧 New Contact Message              │
│ From your portfolio website         │
├─────────────────────────────────────┤
│ Name: John Doe                      │
│ Email: test@example.com             │
│ Subject: Test Message               │
│ Date: 2025-10-25 02:00:00          │
│                                     │
│ Message:                            │
│ ┌─────────────────────────────┐   │
│ │ Hello, this is a test!      │   │
│ └─────────────────────────────┘   │
│                                     │
│ [Reply to John Doe]                 │
└─────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### **Error: "Invalid login"**
- ✅ Pastikan pakai **App Password**, bukan password Gmail biasa
- ✅ Enable "Less secure app access" (untuk Yahoo/Outlook)

### **Error: "Connection timeout"**
- ✅ Check firewall/antivirus
- ✅ Try port `465` dengan `secure: true`

### **Error: "Failed to send message"**
- ✅ Check `.env` file sudah benar
- ✅ Check internet connection
- ✅ Check SMTP credentials

### **Email tidak masuk**
- ✅ Check **Spam/Junk** folder
- ✅ Check `CONTACT_EMAIL` di `.env` sudah benar
- ✅ Wait 1-2 menit (kadang delay)

---

## 🎯 Production Deployment

Untuk production (Vercel/Netlify/etc):

1. **Add Environment Variables** di dashboard:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_EMAIL`

2. **Recommended:** Pakai email service seperti:
   - **SendGrid** (100 emails/day free)
   - **Resend** (3000 emails/month free)
   - **Mailgun** (5000 emails/month free)

---

## 📝 Notes

- ✅ Email dikirim **real-time** saat user submit form
- ✅ Email template **responsive** & beautiful
- ✅ Auto **reply-to** ke email sender
- ✅ Support **HTML & plain text**
- ✅ Error handling & validation

---

## 🚀 Next Steps

Setelah setup email berhasil, kamu bisa:

1. ✅ Customize email template di `lib/email.ts`
2. ✅ Add auto-reply ke sender
3. ✅ Add email notification sound
4. ✅ Integrate dengan CRM

---

**Happy coding! 🎉**
