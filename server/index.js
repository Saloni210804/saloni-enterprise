const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.join(__dirname, '.env'),
})
console.log("===== ENV CHECK =====");
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("MAIL_TO:", process.env.MAIL_TO);
console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);
console.log("=====================");
const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/steel_business'

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)

// Routes
const contactRoute = require('./routes/contact')
const leadsRoute = require('./routes/leads')

app.use('/api/contact', contactRoute)
app.use('/api/leads', leadsRoute)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
})

// Connect to MongoDB then start server
async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`✅ MongoDB connected → ${MONGO_URI}`)
  } catch (err) {
    console.error(`⚠️  MongoDB connection failed: ${err.message}`)
    console.error('   Leads will NOT be saved. Check MONGODB_URI in server/.env')
  }

  app.listen(PORT, () => {
    console.log(`\n✅ Steel Business API running at http://localhost:${PORT}`)
    console.log(`   POST /api/leads    — save quote enquiry to MongoDB`)
    console.log(`   POST /api/contact  — send email via Nodemailer`)
    console.log(`   GET  /api/health   — server health check\n`)
  })
}

start()
