import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, service, budget } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const mailData = {
      from: `"2timeweb Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `[${service || 'Contact'}] ${subject || 'New message'}`,
      html: `
        <h2>New Contact from 2timeweb</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }

    await transporter.sendMail(mailData)
    return NextResponse.json({ success: true, message: 'Message sent' }, { status: 200 })
  } catch (error: any) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send', details: error.message }, { status: 500 })
  }
}
