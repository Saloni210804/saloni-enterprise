/**
 * Vercel Serverless Function — POST /api/leads
 * Saves quote enquiry to MongoDB Atlas + sends Gmail notification
 */

const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

/* ─── MongoDB connection cache (reuse across warm invocations) ─────────── */
let cachedConn = null
async function connectMongo() {
  if (cachedConn && mongoose.connection.readyState === 1) return cachedConn
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI env variable is not set')
  cachedConn = await mongoose.connect(uri)
  return cachedConn
}

/* ─── Lead Schema ──────────────────────────────────────────────────────── */
const leadSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    phone:        { type: String, required: true, trim: true },
    email:        { type: String, trim: true, default: '' },
    company:      { type: String, trim: true, default: '' },
    service:      { type: String, trim: true, default: 'General Enquiry' },
    product:      { type: String, trim: true, default: '' },
    message:      { type: String, trim: true, default: '' },
    sourceButton: { type: String, trim: true, default: 'Quote Form' },
    pageUrl:      { type: String, trim: true, default: '' },
    status:       { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
    timestamp:    { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema)

/* ─── WhatsApp URL builder ─────────────────────────────────────────────── */
const WA_NUMBER = '918013363204'
function buildWAUrl(lead) {
  const serviceLabel = lead.service || lead.product || 'General Enquiry'
  const lines = [
    `🔔 *New Quote Request — Saloni Enterprise*`,
    `*Name:*    ${lead.name}`,
    `*Phone:*   ${lead.phone}`,
    lead.email   ? `*Email:*   ${lead.email}`   : '',
    lead.company ? `*Company:* ${lead.company}` : '',
    `*Service:* ${serviceLabel}`,
    lead.message ? `*Details:* ${lead.message}` : '',
    `_Submitted from: ${lead.pageUrl}_`,
  ].filter(Boolean).join('\n')
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
}

/* ─── Email HTML builder ───────────────────────────────────────────────── */
function buildEmailHTML(lead) {
  const serviceLabel = lead.service || lead.product || 'General Enquiry'
  const ts = lead.timestamp
    ? new Date(lead.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  const row = (label, value) => `
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:120px;">
        <span style="font-size:13px;font-weight:600;color:#64748b;">${label}</span>
      </td>
      <td style="padding:8px 0 8px 16px;vertical-align:top;border-left:2px solid #e2e8f0;">
        <span style="font-size:14px;color:#111827;line-height:1.5;">${value}</span>
      </td>
    </tr>`

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;">
        <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:28px 40px;">
          <p style="margin:0;font-size:22px;font-weight:800;color:#c8a24d;letter-spacing:-0.5px;">Saloni Enterprise</p>
          <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.5);">New enquiry from your website.</p>
        </td></tr>
        <tr><td style="background:#c8a24d;padding:10px 40px;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;">🔔 New lead for: <strong>${serviceLabel}</strong></p>
        </td></tr>
        <tr><td style="padding:32px 40px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row('Name',    lead.name)}
            ${row('Phone',   `<a href="tel:${lead.phone}" style="color:#c8a24d;font-weight:600;">${lead.phone}</a>`)}
            ${lead.email   ? row('Email',   `<a href="mailto:${lead.email}" style="color:#c8a24d;">${lead.email}</a>`) : ''}
            ${lead.company ? row('Company', lead.company) : ''}
            ${row('Service', `<strong style="color:#c8a24d;">${serviceLabel}</strong>`)}
            ${lead.message ? row('Details', lead.message) : ''}
            ${row('Time',    ts)}
          </table>
        </td></tr>
        <tr><td style="padding:0 40px 32px;">
          <a href="https://wa.me/${WA_NUMBER}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:700;margin-right:10px;">
            💬 Reply on WhatsApp
          </a>
          ${lead.email ? `<a href="mailto:${lead.email}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:700;">📧 Reply by Email</a>` : ''}
        </td></tr>
        <tr><td style="background:#f8fafc;padding:16px 40px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">Auto-sent by Saloni Enterprise website · Lead saved in MongoDB</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

/* ─── Main handler ─────────────────────────────────────────────────────── */
module.exports = async function handler(req, res) {
  // CORS pre-flight
  res.setHeader('Access-Control-Allow-Origin',  '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  /* ── GET /api/leads — list all leads (admin) ── */
  if (req.method === 'GET') {
    try {
      await connectMongo()
      const leads = await Lead.find().sort({ timestamp: -1 }).limit(200)
      return res.status(200).json({ success: true, count: leads.length, leads })
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message })
    }
  }

  /* ── POST /api/leads — save new enquiry ── */
  if (req.method === 'POST') {
    const { name, phone, email, company, service, product, message, sourceButton, pageUrl } = req.body || {}

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' })
    }
    if (!phone || !String(phone).trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' })
    }

    const serviceValue = (service || product || 'General Enquiry').trim()

    /* 1 — Save to MongoDB */
    let savedLead
    try {
      await connectMongo()
      savedLead = await Lead.create({
        name:         String(name).trim(),
        phone:        String(phone).trim(),
        email:        String(email   || '').trim(),
        company:      String(company || '').trim(),
        service:      serviceValue,
        product:      serviceValue,
        message:      String(message || '').trim(),
        sourceButton: String(sourceButton || 'Quote Form').trim(),
        pageUrl:      String(pageUrl  || '').trim(),
        timestamp:    new Date(),
      })
      console.log(`✅ Lead saved → ${savedLead._id} | ${savedLead.name} | ${serviceValue}`)
    } catch (dbErr) {
      console.error('MongoDB error:', dbErr.message)
      return res.status(500).json({ success: false, message: 'Failed to save lead. Please try again.' })
    }

    /* 2 — Send Gmail notification (non-blocking, won't fail the response) */
    try {
      const smtpUser = process.env.SMTP_USER
      const smtpPass = process.env.SMTP_PASS
      const mailTo   = process.env.MAIL_TO

      if (smtpUser && smtpPass && mailTo) {
        const transporter = nodemailer.createTransport({
          host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
          port:   parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true',
          auth:   { user: smtpUser, pass: smtpPass },
        })

        await transporter.sendMail({
          from:    `"Saloni Enterprise Website" <${smtpUser}>`,
          to:      mailTo,
          subject: `🔔 New Quote: ${savedLead.name} — ${serviceValue}`,
          text:    `New enquiry from ${savedLead.name} (${savedLead.phone}) for ${serviceValue}. Check MongoDB for full details.`,
          html:    buildEmailHTML(savedLead),
          replyTo: savedLead.email || undefined,
        })
        console.log(`📧 Email sent → ${mailTo}`)
      } else {
        console.log('📧 Email skipped — SMTP env vars not configured on Vercel')
      }
    } catch (emailErr) {
      // Non-fatal — lead already saved to DB
      console.warn('Email error (non-fatal):', emailErr.message)
    }

    /* 3 — Return success */
    return res.status(201).json({
      success: true,
      message: 'Enquiry received. We will contact you shortly.',
      leadId:  savedLead._id,
      waUrl:   buildWAUrl(savedLead),
    })
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' })
}
