import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // Force Node.js runtime for Nodemailer

// POST new message - Send email
export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email
    await sendContactEmail({
      name,
      email,
      subject,
      message
    })

    return NextResponse.json({ 
      success: true,
      message: 'Message sent successfully! I will get back to you soon.'
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
