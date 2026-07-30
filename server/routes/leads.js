const express  = require('express')
const nodemailer = require('nodemailer')
const Lead = require('../models/Lead')
const router = express.Router()

/* ─── WhatsApp number ─────────────────────────────────────── */
const WA_NUMBER = '918013363204'

/* ─── Build WhatsApp URL ──────────────────────────────────── */
function buildWAUrl(lead) {
  const lines = [
    `🔔 *New Quote Request — Saloni Enterprise*`,
    ``,
    `*Name:*    ${lead.name}`,
    `*Phone:*   ${lead.phone}`,
    lead.email   ? `*Email:*   ${lead.email}`   : null,
    lead.company ? `*Company:* ${lead.company}` : null,
    `*Service:* ${lead.service || lead.product || 'General Enquiry'}`,
    lead.message ? `*Details:* ${lead.message}` : null,
    ``,
    `_Submitted from: ${lead.pageUrl || 'Website'}_`,
  ].filter(Boolean).join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
}

/* ─── HTML email template ─────────────────────────────────── */
function buildEmailHTML(lead) {
  const serviceLabel = lead.service || lead.product || 'General Enquiry'
  const ts = lead.timestamp
    ? lead.timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:32px 40px 28px;">
            <div style="display:inline-block;background:rgba(200,162,77,0.15);border:1px solid rgba(200,162,77,0.3);border-radius:100px;padding:4px 14px;margin-bottom:14px;">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c8a24d;">NEW QUOTE REQUEST</span>
            </div>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
              Saloni Enterprise
            </h1>
            <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.5);">
              A new enquiry has been submitted via your website.
            </p>
          </td>
        </tr>

        <!-- Alert bar -->
        <tr>
          <td style="background:#c8a24d;padding:10px 40px;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;">
              ⚡ New lead for: <strong>${serviceLabel}</strong>
            </p>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:32px 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">

              ${buildRow('👤 Name',    lead.name)}
              ${buildRow('📞 Phone',   `<a href="tel:${lead.phone}" style="color:#c8a24d;text-decoration:none;font-weight:600;">${lead.phone}</a>`)}
              ${lead.email   ? buildRow('📧 Email',   `<a href="mailto:${lead.email}" style="color:#c8a24d;text-decoration:none;">${lead.email}</a>`) : ''}
              ${lead.company ? buildRow('🏢 Company', lead.company) : ''}
              ${buildRow('🔩 Service', `<strong style="color:#c8a24d;">${serviceLabel}</strong>`)}
              ${lead.message ? buildRow('📝 Details', lead.message) : ''}
              ${buildRow('⏰ Time',    ts)}

            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 40px 32px;">
            <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for your enquiry about ${serviceLabel}. We at Saloni Enterprise would be happy to help. Could you please share more details?`)}"
               style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-size:15px;font-weight:700;margin-right:12px;">
              💬 Reply on WhatsApp
            </a>
            ${lead.email ? `<a href="mailto:${lead.email}?subject=Re: Your Quote Request for ${serviceLabel}"
               style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-size:15px;font-weight:700;">
              ✉️ Reply by Email
            </a>` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">
              This notification was sent automatically by your Saloni Enterprise website.
              Lead is also saved in your MongoDB database.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}

function buildRow(label, value) {
  return `
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:130px;">
        <span style="font-size:13px;font-weight:600;color:#64748b;">${label}</span>
      </td>
      <td style="padding:8px 0 8px 16px;vertical-align:top;border-left:2px solid #e2e8f0;">
        <span style="font-size:14px;color:#111827;line-height:1.5;">${value}</span>
      </td>
    </tr>
  `
}

/* ─── Plain-text fallback ─────────────────────────────────── */
function buildEmailText(lead) {
  const serviceLabel = lead.service || lead.product || 'General Enquiry'
  return `
New Quote Enquiry — Saloni Enterprise
======================================

Name:     ${lead.name}
Phone:    ${lead.phone}
Email:    ${lead.email    || 'Not provided'}
Company:  ${lead.company  || 'Not provided'}
Service:  ${serviceLabel}
Details:  ${lead.message  || '(none)'}

Timestamp: ${lead.timestamp?.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) || 'N/A'}

WhatsApp: https://wa.me/${WA_NUMBER}
--
Auto-saved to MongoDB · saloni_enterprise database
  `.trim()
}

/* ─── POST /api/leads ─────────────────────────────────────── */
router.post('/', async (req, res) => {
  const {
    name, phone, email, company,
    service, product,           // "service" from new form, "product" from old
    message, sourceButton, pageUrl,
  } = req.body

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Name is required.' })
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ success: false, message: 'Phone number is required.' })
  }

  const serviceValue = (service || product || 'General Enquiry').trim()

  // 1 ── Save to MongoDB
  let savedLead
  try {
    savedLead = await Lead.create({
      name:         name.trim(),
      phone:        phone.trim(),
      email:        (email   || '').trim(),
      company:      (company || '').trim(),
      service:      serviceValue,
      product:      serviceValue,   // keep both in sync
      message:      (message || '').trim(),
      sourceButton: (sourceButton || 'Unknown').trim(),
      pageUrl:      (pageUrl  || '').trim(),
      timestamp:    new Date(),
    })
    console.log(`✅ Lead saved → ${savedLead._id} | ${savedLead.name} | ${serviceValue}`)
  } catch (dbErr) {
    console.error('MongoDB save error:', dbErr.message)
    return res.status(500).json({ success: false, message: 'Failed to save lead. Please try again.' })
  }

  // 2 ── Send email notification (non-blocking)
  // 2 ── Send email notification (non-blocking)
try {
  console.log("=== EMAIL DEBUG ===")
  console.log("SMTP_USER:", process.env.SMTP_USER)
  console.log("MAIL_TO:", process.env.MAIL_TO)
  console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.verify()
  console.log("✅ SMTP Connected")

  const info = await transporter.sendMail({
    from: `"Saloni Enterprise Website" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    subject: `🔔 New Quote: ${savedLead.name} — ${serviceValue}`,
    text: buildEmailText(savedLead),
    html: buildEmailHTML(savedLead),
    replyTo: savedLead.email || undefined,
  })

  console.log("✅ Email sent:", info.messageId)

} catch (err) {
  console.error("❌ EMAIL ERROR:")
  console.error(err)
}

  // 3 ── Return success + WhatsApp URL so client can redirect instantly
  return res.status(201).json({
    success:  true,
    message:  'Enquiry received. We will contact you shortly.',
    leadId:   savedLead._id,
    waUrl:    buildWAUrl(savedLead),
  })
})

/* ─── GET /api/leads — admin view ────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ timestamp: -1 }).limit(200)
    res.json({ success: true, count: leads.length, leads })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
