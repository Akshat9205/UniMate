/**
 * Test data generator for roommate matching system
 * Creates diverse user profiles to test ML matching accuracy
 */

const mongoose = require('mongoose');
const UserDetails = require('../models/UserDetails');
require('dotenv').config();

const testUsers = [
  {
    fullName: "Rahul Sharma",
    age: 21,
    gender: "male",
    university: "IIT Delhi",
    course: "Computer Science",
    year: "3rd",
    currentCity: "Delhi",
    budgetRange: "8k-12k",
    roomType: "shared",
    sleepSchedule: "late-sleeper",
    smoking: "no",
    drinking: "no",
    foodPreference: "veg",
    cleanlinessLevel: "medium",
    studyStyle: "group",
    introvertExtrovert: 4,
    organizedEasygoing: 3,
    silentTalkative: 4,
    earlyRiserNightOwl: 2,
    preferredRoommateGender: "any",
    noiseTolerance: "medium",
    guestFrequency: "sometimes",
    maxRoommatesCount: 3,
    bio: "Looking for compatible roommates who enjoy group studies"
  },
  {
    fullName: "Priya Patel",
    age: 20,
    gender: "female",
    university: "IIT Delhi",
    course: "Electrical Engineering",
    year: "2nd",
    currentCity: "Delhi",
    budgetRange: "5k-8k",
    roomType: "shared",
    sleepSchedule: "early-sleeper",
    smoking: "no",
    drinking: "no",
    foodPreference: "veg",
    cleanlinessLevel: "high",
    studyStyle: "quiet",
    introvertExtrovert: 2,
    organizedEasygoing: 4,
    silentTalkative: 2,
    earlyRiserNightOwl: 5,
    preferredRoommateGender: "female",
    noiseTolerance: "low",
    guestFrequency: "rare",
    maxRoommatesCount: 2,
    bio: "Neat and organized, prefer quiet study environment"
  },
  {
    fullName: "Aman Kumar",
    age: 22,
    gender: "male",
    university: "IIT Delhi",
    course: "Mechanical Engineering",
    year: "4th",
    currentCity: "Delhi",
    budgetRange: "8k-12k",
    roomType: "shared",
    sleepSchedule: "late-sleeper",
    smoking: "yes",
    drinking: "yes",
    foodPreference: "non-veg",
    cleanlinessLevel: "low",
    studyStyle: "mixed",
    introvertExtrovert: 5,
    organizedEasygoing: 2,
    silentTalkative: 5,
    earlyRiserNightOwl: 1,
    preferredRoommateGender: "any",
    noiseTolerance: "high",
    guestFrequency: "often",
    maxRoommatesCount: 4,
    bio: "Social and outgoing, enjoy hosting friends"
  },
  {
    fullName: "Neha Gupta",
    age: 19,
    gender: "female",
    university: "IIT Delhi",
    course: "Chemical Engineering",
    year: "1st",
    currentCity: "Delhi",
    budgetRange: "3k-5k",
    roomType: "shared",
    sleepSchedule: "early-sleeper",
    smoking: "no",
    drinking: "no",
    foodPreference: "veg",
    cleanlinessLevel: "high",
    studyStyle: "quiet",
    introvertExtrovert: 1,
    organizedEasygoing: 5,
    silentTalkative: 1,
    earlyRiserNightOwl: 5,
    preferredRoommateGender: "female",
    noiseTolerance: "low",
    guestFrequency: "rare",
    maxRoommatesCount: 2,
    bio: "Focused student, need peaceful living environment"
  },
  {
    fullName: "Vikram Singh",
    age: 23,
    gender: "male",
    university: "IIT Delhi",
    course: "Civil Engineering",
    year: "4th",
    currentCity: "Delhi",
    budgetRange: "12k+",
    roomType: "single",
    sleepSchedule: "late-sleeper",
    smoking: "no",
    drinking: "yes",
    foodPreference: "non-veg",
    cleanlinessLevel: "medium",
    studyStyle: "mixed",
    introvertExtrovert: 3,
    organizedEasygoing: 3,
    silentTalkative: 3,
    earlyRiserNightOwl: 2,
    preferredRoommateGender: "any",
    noiseTolerance: "medium",
    guestFrequency: "sometimes",
    maxRoommatesCount: 3,
    bio: "Balanced lifestyle, flexible with roommate preferences"
  }
];

async function seedTestData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing test data (optional)
    await UserDetails.deleteMany({ fullName: { $in: testUsers.map(u => u.fullName) } });
    console.log('Cleared existing test data');

    // Insert test users
    const insertedUsers = await UserDetails.insertMany(testUsers);
    console.log(`Inserted ${insertedUsers.length} test users`);

    // Display inserted users with IDs
    insertedUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.fullName} (ID: ${user._id})`);
    });

    console.log('\nTest data seeded successfully!');
    console.log('You can now test the matching API with these user IDs.');

    await mongoose.connection.close();
    
  } catch (error) {
    console.error('Error seeding test data:', error);
    process.exit(1);
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  seedTestData();
}

module.exports = { testUsers, seedTestData };
