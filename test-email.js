// Test SMTP Connection
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function testConnection() {
  try {
    console.log('Testing SMTP connection...')
    console.log('SMTP_HOST:', process.env.SMTP_HOST)
    console.log('SMTP_PORT:', process.env.SMTP_PORT)
    console.log('SMTP_USER:', process.env.SMTP_USER)
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'NOT SET')
    
    await transporter.verify()
    console.log('✅ SMTP connection successful!')
    
    // Send test email
    console.log('\nSending test email...')
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: 'Test Email from Portfolio',
      text: 'This is a test email from your portfolio contact form.',
      html: '<b>This is a test email from your portfolio contact form.</b>',
    })
    
    console.log('✅ Email sent successfully!')
    console.log('Message ID:', info.messageId)
    console.log('\nCheck your email:', process.env.CONTACT_EMAIL)
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.code) console.error('Error code:', error.code)
    if (error.response) console.error('Response:', error.response)
  }
}

testConnection()
