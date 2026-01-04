const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  // Basic Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 16,
    max: 30
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  university: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  
  // Location & Stay Preferences
  currentCity: {
    type: String,
    required: true,
    trim: true
  },
  preferredArea: {
    type: String,
    trim: true
  },
  moveInDate: {
    type: Date,
    default: Date.now
  },
  budgetRange: {
    type: String,
    required: true,
    enum: ['3k-5k', '5k-8k', '8k-12k', '12k+']
  },
  roomType: {
    type: String,
    required: true,
    enum: ['single', 'shared']
  },
  
  // Lifestyle Habits (CORE ML DATA)
  sleepSchedule: {
    type: String,
    required: true,
    enum: ['early-sleeper', 'late-sleeper']
  },
  smoking: {
    type: String,
    required: true,
    enum: ['yes', 'no']
  },
  drinking: {
    type: String,
    required: true,
    enum: ['yes', 'no']
  },
  foodPreference: {
    type: String,
    required: true,
    enum: ['veg', 'non-veg']
  },
  cleanlinessLevel: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  studyStyle: {
    type: String,
    required: true,
    enum: ['quiet', 'group', 'mixed']
  },
  
  // Personality Traits (ML-READY)
  introvertExtrovert: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  organizedEasygoing: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  silentTalkative: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  earlyRiserNightOwl: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  
  // Roommate Expectations
  preferredRoommateGender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'any']
  },
  noiseTolerance: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  guestFrequency: {
    type: String,
    required: true,
    enum: ['rare', 'sometimes', 'often']
  },
  maxRoommatesCount: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  
  // About Me
  bio: {
    type: String,
    maxlength: 250,
    trim: true
  },
  
  // ML Processing Fields
  mlProcessed: {
    type: Boolean,
    default: false
  },
  compatibilityScore: {
    type: Number,
    default: 0
  },
  matchedRoommates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
userDetailsSchema.index({ fullName: 1 });
userDetailsSchema.index({ university: 1 });
userDetailsSchema.index({ currentCity: 1 });
userDetailsSchema.index({ budgetRange: 1 });
userDetailsSchema.index({ roomType: 1 });
userDetailsSchema.index({ sleepSchedule: 1 });
userDetailsSchema.index({ foodPreference: 1 });
userDetailsSchema.index({ cleanlinessLevel: 1 });

module.exports = mongoose.model('UserDetails', userDetailsSchema);
