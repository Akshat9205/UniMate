/**
 * Training script for roommate matching ML model
 * 
 * This script:
 * 1. Connects to MongoDB
 * 2. Loads all user data from UserDetails collection
 * 3. Trains the ML model with user preferences
 * 4. Saves the trained model state for API use
 * 
 * Run this script when:
 * - Server starts for the first time
 * - New users are added to the system
 * - User preferences are updated
 */

const mongoose = require('mongoose');
const RoommateMatcher = require('./RoommateMatcher');
const UserDetails = require('../models/UserDetails');
require('dotenv').config();

async function trainModel() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Fetch all user details for training
    console.log('Fetching user data...');
    const users = await UserDetails.find({});
    console.log(`Found ${users.length} users for training`);

    if (users.length === 0) {
      console.log('No users found. Please add some user data first.');
      return;
    }

    // Initialize and train the model
    const matcher = new RoommateMatcher();
    await matcher.trainModel(users);

    // Display training results
    console.log('\n=== Training Complete ===');
    console.log(`Model trained with ${users.length} users`);
    console.log('Feature vector length:', 8);
    console.log('Model ready for matching!');

    // Test with a sample user (if available)
    if (users.length > 1) {
      const sampleUserId = users[0]._id.toString();
      console.log(`\n=== Testing with sample user: ${users[0].fullName} ===`);
      
      try {
        const matches = matcher.findMatches(sampleUserId, 3);
        console.log('Top 3 compatible roommates:');
        matches.forEach((match, index) => {
          console.log(`${index + 1}. ${match.name} - ${match.matchPercentage}% match`);
        });
      } catch (error) {
        console.log('Test matching failed:', error.message);
      }
    }

    // Close connection
    await mongoose.connection.close();
    console.log('\nTraining script completed successfully!');
    
  } catch (error) {
    console.error('Training failed:', error);
    process.exit(1);
  }
}

// Run training if this script is executed directly
if (require.main === module) {
  trainModel();
}

module.exports = trainModel;
