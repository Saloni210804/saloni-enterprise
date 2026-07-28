const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

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
