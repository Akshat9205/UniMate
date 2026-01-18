/**
 * Test CSV-based matching system
 * This script tests the CSV data mapping and matching functionality
 */

const mongoose = require('mongoose');
const CSVRoommateMatcher = require('./CSVRoommateMatcher');
const UserDetails = require('../models/UserDetails');
require('dotenv').config();

async function testCSVMatching() {
  try {
    console.log('🧪 Testing CSV-based Matching System');
    console.log('=' .repeat(50));

    // 1. Initialize CSV matcher
    const csvMatcher = new CSVRoommateMatcher();
    csvMatcher.trainModel();

    console.log(`✅ CSV Model trained with ${csvMatcher.userVectors.size} records\n`);

    // 2. Show sample CSV data mapping
    console.log('📊 Sample CSV Data Mapping:');
    console.log('-' .repeat(30));
    const sampleData = csvMatcher.getSampleData(3);
    
    sampleData.forEach((sample, index) => {
      console.log(`\n${index + 1}. Student ${sample.original.Student_ID}:`);
      console.log(`   Original CSV: GPA=${sample.original.GPA}, Sleep=${sample.original.Sleep_Hours_Per_Day}h, Social=${sample.original.Social_Hours_Per_Day}h`);
      console.log(`   Mapped Features: Age=${sample.mapped.age}, Budget=${sample.mapped.budget}, Sleep=${sample.mapped.sleep_schedule}`);
      console.log(`   Cleanliness=${sample.mapped.cleanliness}/5, Study=${sample.mapped.study_habit}, Introvert=${sample.mapped.introvert_extrovert}/5`);
    });

    // 3. Connect to MongoDB to get real user data
    console.log('\n🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    const users = await UserDetails.find({}).limit(3);
    console.log(`Found ${users.length} users in MongoDB\n`);

    // 4. Test matching for each user
    console.log('💝 Matching Results:');
    console.log('-' .repeat(30));
    
    for (const user of users) {
      console.log(`\n👤 Testing matches for: ${user.fullName}`);
      console.log(`   User Details: Age=${user.age}, Budget=${user.budgetRange}, Sleep=${user.sleepSchedule}`);
      console.log(`   Cleanliness=${user.cleanlinessLevel}, Study=${user.studyStyle}, Introvert=${user.introvertExtrovert}/5`);
      
      try {
        const matches = csvMatcher.findMatchesForUser(user, 3);
        console.log(`   Top 3 CSV matches:`);
        matches.forEach((match, index) => {
          console.log(`     ${index + 1}. ${match.name} - ${match.matchPercentage}%`);
          console.log(`        Features: Age=${match.features.age}, Budget=${match.features.budget}, Sleep=${match.features.sleep_schedule}`);
        });
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }

    // 5. Show feature vector comparison
    console.log('\n🔍 Feature Vector Analysis:');
    console.log('-' .repeat(30));
    
    if (users.length > 0) {
      const testUser = users[0];
      const userFeatures = {
        age: testUser.age,
        budget: testUser.budgetRange,
        sleep_schedule: testUser.sleepSchedule === 'early-sleeper' ? 'Early' : 'Late',
        smoking: testUser.smoking === 'yes' ? 'Yes' : 'No',
        drinking: testUser.drinking === 'yes' ? 'Yes' : 'No',
        cleanliness: testUser.cleanlinessLevel === 'high' ? 5 : testUser.cleanlinessLevel === 'medium' ? 3 : 1,
        study_habit: testUser.studyStyle === 'quiet' ? 'High' : testUser.studyStyle === 'group' ? 'Medium' : 'Low',
        introvert_extrovert: testUser.introvertExtrovert
      };

      const userVector = csvMatcher.encodeFeatures(userFeatures);
      console.log(`${testUser.fullName} Feature Vector:`);
      console.log(`[${userVector.map(v => v.toFixed(3)).join(', ')}]`);

      // Show a few CSV vectors for comparison
      let count = 0;
      for (const [userId, csvVector] of csvMatcher.userVectors) {
        if (count >= 3) break;
        const csvUserData = csvMatcher.userData.get(userId);
        console.log(`\n${csvUserData.name} Feature Vector:`);
        console.log(`[${csvVector.map(v => v.toFixed(3)).join(', ')}]`);
        
        const similarity = csvMatcher.cosineSimilarity(userVector, csvVector);
        console.log(`Similarity: ${(similarity * 100).toFixed(1)}%`);
        count++;
      }
    }

    console.log('\n🎉 CSV Matching Test Complete!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
  }
}

// Run test if this script is executed directly
if (require.main === module) {
  testCSVMatching();
}

module.exports = testCSVMatching;
