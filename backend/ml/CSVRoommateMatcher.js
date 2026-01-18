/**
 * CSV-Based Roommate Matching System
 * 
 * This system uses your student_lifestyle_dataset.csv for training
 * and maps CSV data to match the ML model requirements.
 * 
 * CSV Fields Mapping:
 * - Sleep_Hours_Per_Day → sleep_schedule (Early/Late sleeper)
 * - Physical_Activity_Hours_Per_Day → cleanliness_level (1-5)
 * - Study_Hours_Per_Day → study_habit (Low/Medium/High)
 * - Social_Hours_Per_Day → introvert_extrovert (1-5)
 * - Stress_Level → smoking/drinking (derived from stress patterns)
 * - GPA → budget (derived from academic performance)
 * - Age → Generated based on student year
 */

const fs = require('fs');
const path = require('path');

class CSVRoommateMatcher {
  constructor() {
    this.csvData = [];
    this.userVectors = new Map(); // userId -> feature vector
    this.userData = new Map();   // userId -> user data
    this.isTrained = false;
  }

  /**
   * Load CSV data from file
   */
  loadCSVData() {
    try {
      const csvPath = path.join(__dirname, 'student_lifestyle_dataset.csv');
      const csvContent = fs.readFileSync(csvPath, 'utf8');
      const lines = csvContent.split('\n').filter(line => line.trim());
      
      // Skip header and parse data
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= 8) {
          this.csvData.push({
            Student_ID: parseInt(values[0]),
            Study_Hours_Per_Day: parseFloat(values[1]),
            Extracurricular_Hours_Per_Day: parseFloat(values[2]),
            Sleep_Hours_Per_Day: parseFloat(values[3]),
            Social_Hours_Per_Day: parseFloat(values[4]),
            Physical_Activity_Hours_Per_Day: parseFloat(values[5]),
            GPA: parseFloat(values[6]),
            Stress_Level: values[7].trim()
          });
        }
      }
      
      console.log(`Loaded ${this.csvData.length} records from CSV`);
      return this.csvData;
    } catch (error) {
      console.error('Error loading CSV data:', error);
      return [];
    }
  }

  /**
   * Map CSV data to ML features
   * This creates realistic student profiles from CSV data
   */
  mapCSVToFeatures(csvRecord) {
    const features = {};
    
    // 1. Age: Generate realistic age (18-24) based on student ID
    features.age = 18 + (csvRecord.Student_ID % 7);
    
    // 2. Budget: Map GPA to budget range (higher GPA = higher budget)
    if (csvRecord.GPA >= 3.5) features.budget = '12k+';
    else if (csvRecord.GPA >= 3.0) features.budget = '8k-12k';
    else if (csvRecord.GPA >= 2.5) features.budget = '5k-8k';
    else features.budget = '3k-5k';
    
    // 3. Sleep Schedule: Based on sleep hours
    features.sleep_schedule = csvRecord.Sleep_Hours_Per_Day >= 8 ? 'Early' : 'Late';
    
    // 4. Smoking: High stress students more likely to smoke
    features.smoking = csvRecord.Stress_Level === 'High' ? 'Yes' : 'No';
    
    // 5. Drinking: Social hours + stress level
    features.drinking = (csvRecord.Social_Hours_Per_Day > 3 && csvRecord.Stress_Level !== 'Low') ? 'Yes' : 'No';
    
    // 6. Cleanliness: Physical activity correlates with cleanliness
    if (csvRecord.Physical_Activity_Hours_Per_Day >= 6) features.cleanliness = 5;
    else if (csvRecord.Physical_Activity_Hours_Per_Day >= 4) features.cleanliness = 4;
    else if (csvRecord.Physical_Activity_Hours_Per_Day >= 2) features.cleanliness = 3;
    else if (csvRecord.Physical_Activity_Hours_Per_Day >= 1) features.cleanliness = 2;
    else features.cleanliness = 1;
    
    // 7. Study Habit: Based on study hours
    if (csvRecord.Study_Hours_Per_Day >= 8) features.study_habit = 'High';
    else if (csvRecord.Study_Hours_Per_Day >= 5) features.study_habit = 'Medium';
    else features.study_habit = 'Low';
    
    // 8. Introvert/Extrovert: Based on social hours
    if (csvRecord.Social_Hours_Per_Day >= 5) features.introvert_extrovert = 5;
    else if (csvRecord.Social_Hours_Per_Day >= 4) features.introvert_extrovert = 4;
    else if (csvRecord.Social_Hours_Per_Day >= 3) features.introvert_extrovert = 3;
    else if (csvRecord.Social_Hours_Per_Day >= 2) features.introvert_extrovert = 2;
    else features.introvert_extrovert = 1;
    
    return features;
  }

  /**
   * Encode features to numerical vector for ML processing
   */
  encodeFeatures(features) {
    const vector = [];
    
    // 1. Age (normalized to 0-1 range)
    const normalizedAge = (features.age - 16) / (30 - 16);
    vector.push(normalizedAge);
    
    // 2. Budget (ordinal encoding)
    const budgetMap = { '3k-5k': 1, '5k-8k': 2, '8k-12k': 3, '12k+': 4 };
    const budget = budgetMap[features.budget] || 2;
    vector.push(budget / 4); // Normalize to 0-1
    
    // 3. Sleep Schedule (binary encoding)
    const sleepSchedule = features.sleep_schedule === 'Early' ? 1 : 0;
    vector.push(sleepSchedule);
    
    // 4. Smoking (binary encoding)
    const smoking = features.smoking === 'Yes' ? 1 : 0;
    vector.push(smoking);
    
    // 5. Drinking (binary encoding)
    const drinking = features.drinking === 'Yes' ? 1 : 0;
    vector.push(drinking);
    
    // 6. Cleanliness Level (already numeric, normalize to 0-1)
    vector.push(features.cleanliness / 5);
    
    // 7. Study Habit (ordinal encoding)
    const studyMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
    const studyHabit = studyMap[features.study_habit] || 2;
    vector.push(studyHabit / 3); // Normalize to 0-1
    
    // 8. Introvert-Extrovert (already numeric, normalize to 0-1)
    const introvertExtrovert = (features.introvert_extrovert - 1) / 4;
    vector.push(introvertExtrovert);
    
    return vector;
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  cosineSimilarity(vectorA, vectorB) {
    if (vectorA.length !== vectorB.length) {
      throw new Error('Vectors must have same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += vectorA[i] * vectorA[i];
      normB += vectorB[i] * vectorB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (normA * normB);
  }

  /**
   * Train the model with CSV data
   */
  trainModel() {
    console.log('Training ML model with CSV data...');
    
    // Load CSV data
    this.loadCSVData();
    
    // Clear previous data
    this.userVectors.clear();
    this.userData.clear();

    // Process each CSV record
    for (const csvRecord of this.csvData) {
      try {
        // Map CSV to features
        const features = this.mapCSVToFeatures(csvRecord);
        
        // Encode to vector
        const vector = this.encodeFeatures(features);
        
        // Store with generated user ID
        const userId = `csv_${csvRecord.Student_ID}`;
        this.userVectors.set(userId, vector);
        this.userData.set(userId, {
          userId: userId,
          name: `Student ${csvRecord.Student_ID}`,
          age: features.age,
          originalData: csvRecord,
          features: features
        });
      } catch (error) {
        console.error(`Error processing CSV record ${csvRecord.Student_ID}:`, error.message);
      }
    }

    this.isTrained = true;
    console.log(`Model trained with ${this.userVectors.size} CSV records`);
  }

  /**
   * Find compatible roommates for a user (from UserDetails)
   */
  findMatchesForUser(userDetails, limit = 5) {
    if (!this.isTrained) {
      throw new Error('Model not trained. Call trainModel() first.');
    }

    // Convert UserDetails to features
    const userFeatures = {
      age: userDetails.age,
      budget: userDetails.budgetRange,
      sleep_schedule: userDetails.sleepSchedule === 'early-sleeper' ? 'Early' : 'Late',
      smoking: userDetails.smoking === 'yes' ? 'Yes' : 'No',
      drinking: userDetails.drinking === 'yes' ? 'Yes' : 'No',
      cleanliness: userDetails.cleanlinessLevel === 'high' ? 5 : userDetails.cleanlinessLevel === 'medium' ? 3 : 1,
      study_habit: userDetails.studyStyle === 'quiet' ? 'High' : userDetails.studyStyle === 'group' ? 'Medium' : 'Low',
      introvert_extrovert: userDetails.introvertExtrovert
    };

    const userVector = this.encodeFeatures(userFeatures);
    const similarities = [];

    // Compare with all CSV users
    for (const [csvUserId, csvVector] of this.userVectors) {
      const similarity = this.cosineSimilarity(userVector, csvVector);
      const matchPercentage = Math.round(similarity * 100);

      similarities.push({
        userId: csvUserId,
        name: this.userData.get(csvUserId).name,
        matchPercentage: matchPercentage,
        features: this.userData.get(csvUserId).features
      });
    }

    // Sort by match percentage (descending) and return top matches
    similarities.sort((a, b) => b.matchPercentage - a.matchPercentage);
    return similarities.slice(0, limit);
  }

  /**
   * Get model statistics
   */
  getStats() {
    return {
      isTrained: this.isTrained,
      totalUsers: this.userVectors.size,
      featureCount: 8,
      dataSource: 'CSV'
    };
  }

  /**
   * Get sample CSV data for verification
   */
  getSampleData(count = 5) {
    return this.csvData.slice(0, count).map(record => ({
      original: record,
      mapped: this.mapCSVToFeatures(record)
    }));
  }
}

module.exports = CSVRoommateMatcher;
