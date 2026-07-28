const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, phone, email, product, message } = req.body

  // Basic validation
  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, and message are required.',
    })
  }

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailBody = `
New Quote Request — Steel Business Website
==========================================

Name:    ${name}
Phone:   ${phone}
Email:   ${email || 'Not provided'}
Product: ${product || 'Not specified'}

Message:
${message}

--
Sent from the website contact form.
  `.trim()

  const mailOptions = {
    from: `"Website Contact" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    subject: `New Quote Request from ${name} — ${product || 'General Enquiry'}`,
    text: mailBody,
    replyTo: email || undefined,
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.json({
      success: true,
      message: 'Your message has been sent. We will get back to you shortly.',
    })
  } catch (err) {
    console.error('Nodemailer error:', err.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again or contact us directly.',
    })
  }
})

module.exports = router
