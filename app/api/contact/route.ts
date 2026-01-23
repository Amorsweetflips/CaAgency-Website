import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface ContactFormData {
  formType: 'brand' | 'talent'
  fullName: string
  email: string
  phone: string
  company?: string
  budget?: string
  message: string
  socialLink?: string
  subject?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    let emailSubject: string
    let emailHtml: string

    if (data.formType === 'talent') {
      // Talent Submission Email
      emailSubject = `🎭 New Talent Submission: ${data.fullName}`
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #e53935; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #eee; }
            a { color: #e53935; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🎭 New Talent Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${escapeHtml(data.fullName)}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
              </div>
              <div class="field">
                <div class="label">Social Media</div>
                <div class="value"><a href="${escapeHtml(data.socialLink || '')}" target="_blank">${escapeHtml(data.socialLink || 'Not provided')}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${escapeHtml(data.subject || 'Not provided')}</div>
              </div>
              <div class="message-box">
                <div class="label" style="margin-bottom: 10px;">Message</div>
                <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    } else {
      // Brand/Business Inquiry Email
      emailSubject = data.company
        ? `🏢 New Brand Inquiry: ${data.company}`
        : `🏢 New Contact Form Submission: ${data.fullName}`
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #e53935; }
            .budget-badge { display: inline-block; background: #e53935; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #eee; }
            a { color: #e53935; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🏢 New Brand Inquiry</h1>
              ${data.budget ? `<div style="margin-top: 15px;"><span class="budget-badge">Budget: ${escapeHtml(data.budget)}</span></div>` : ''}
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${escapeHtml(data.fullName)}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
              </div>
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${escapeHtml(data.company || 'Not provided')}</div>
              </div>
              <div class="field">
                <div class="label">Estimated Budget</div>
                <div class="value">${escapeHtml(data.budget || 'Not provided')}</div>
              </div>
              <div class="message-box">
                <div class="label" style="margin-bottom: 10px;">Message</div>
                <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Send email
    await transporter.sendMail({
      from: `"CA Agency Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: 'info@caagency.com',
      replyTo: data.email,
      subject: emailSubject,
      html: emailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
