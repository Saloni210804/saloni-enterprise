const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    // "service" is the new field (from the redesigned form)
    // "product" is kept for backward-compat
    service: {
      type: String,
      trim: true,
      default: 'General Enquiry',
    },
    product: {
      type: String,
      trim: true,
      default: 'General Enquiry',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    sourceButton: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
    pageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'lost'],
      default: 'new',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'leads',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

// Indexes for MongoDB Compass / queries
LeadSchema.index({ timestamp: -1 })
LeadSchema.index({ phone: 1 })
LeadSchema.index({ status: 1 })

module.exports = mongoose.model('Lead', LeadSchema)
