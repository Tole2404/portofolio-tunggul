import nodemailer from 'nodemailer'

// Create transporter
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your email password or app password
  },
})

// Email template
export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`, // Sender
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Your email to receive messages
    replyTo: email, // Reply to sender's email
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .info {
              background: #f0f0f0;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .info-item {
              margin: 8px 0;
            }
            .label {
              font-weight: bold;
              color: #667eea;
            }
            .message-box {
              background: #f9f9f9;
              padding: 20px;
              border-left: 4px solid #667eea;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #888;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📧 New Contact Message</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
            </div>
            <div class="content">
              <div class="info">
                <div class="info-item">
                  <span class="label">Name:</span> ${name}
                </div>
                <div class="info-item">
                  <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                <div class="info-item">
                  <span class="label">Subject:</span> ${subject}
                </div>
                <div class="info-item">
                  <span class="label">Date:</span> ${new Date().toLocaleString()}
                </div>
              </div>

              <h3>Message:</h3>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>

              <p style="margin-top: 30px;">
                <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">
                  Reply to ${name}
                </a>
              </p>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Message from Portfolio

Name: ${name}
Email: ${email}
Subject: ${subject}
Date: ${new Date().toLocaleString()}

Message:
${message}

---
Reply to: ${email}
    `,
  }

  return await transporter.sendMail(mailOptions)
}
