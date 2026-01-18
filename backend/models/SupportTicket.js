const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['account', 'matching', 'payment', 'technical', 'other']
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  attachment: {
    filename: String,
    path: String,
    size: Number,
    mimetype: String
  },
  chatHistory: [{
    sender: {
      type: String,
      enum: ['user', 'agent', 'bot']
    },
    content: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  assignedAgent: {
    type: String,
    default: null
  },
  resolution: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date,
    default: null
  }
});

// Update the updatedAt field before saving
supportTicketSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Generate unique ticket ID
supportTicketSchema.pre('save', async function(next) {
  if (this.isNew && !this.ticketId) {
    const count = await this.constructor.countDocuments();
    this.ticketId = `#${String(10000 + count + 1).slice(-5)}`;
  }
  next();
});

// Static method to get ticket statistics
supportTicketSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  return {
    open: stats.find(s => s._id === 'open')?.count || 0,
    inProgress: stats.find(s => s._id === 'in-progress')?.count || 0,
    resolved: stats.find(s => s._id === 'resolved')?.count || 0,
    total: stats.reduce((acc, s) => acc + s.count, 0)
  };
};

// Instance method to add chat message
supportTicketSchema.methods.addChatMessage = function(sender, content) {
  this.chatHistory.push({
    sender,
    content,
    timestamp: new Date()
  });
  return this.save();
};

// Instance method to resolve ticket
supportTicketSchema.methods.resolve = function(resolution) {
  this.status = 'resolved';
  this.resolution = resolution;
  this.resolvedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
