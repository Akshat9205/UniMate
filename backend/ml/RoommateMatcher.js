/**
 * ML-Based Roommate Matching System
 * 
 * Why similarity-based ML is used:
 * - Cosine similarity is perfect for finding users with similar lifestyle preferences
 * - It's interpretable and explainable (unlike black-box models)
 * - Works well with normalized feature vectors
 * - Computationally efficient for real-time matching
 * 
 * How feature encoding works:
 * - Age: Normalized to 0-1 range (age-16)/(30-16)
 * - Budget: Encoded as ordinal values (3k-5k=1, 5k-8k=2, 8k-12k=3, 12k+=4)
 * - Sleep Schedule: Early-sleeper=1, Late-sleeper=0
 * - Smoking/Drinking: Yes=1, No=0
 * - Cleanliness: Low=1, Medium=2, High=3
 * - Study Habit: Quiet=1, Group=2, Mixed=3
 * - Introvert-Extrovert: Already numeric (1-5)
 * 
 * How compatibility score is calculated:
 * - Convert user preferences to feature vectors
 * - Apply cosine similarity: (A·B) / (|A| × |B|)
 * - Convert to percentage: similarity × 100
 * - Higher percentage = more compatible roommate
 */

const fs = require('fs');
const path = require('path');

class RoommateMatcher {
  constructor() {
    this.userVectors = new Map(); // userId -> feature vector
    this.userData = new Map();   // userId -> user data
    this.isTrained = false;
  }

  /**
   * Encode categorical variables to numerical values
   * This ensures ML algorithm can process the data
   */
  encodeFeatures(user) {
    const vector = [];
    
    // 1. Age (normalized to 0-1 range)
    const normalizedAge = (user.age - 16) / (30 - 16);
    vector.push(normalizedAge);
    
    // 2. Budget (ordinal encoding)
    const budgetMap = { '3k-5k': 1, '5k-8k': 2, '8k-12k': 3, '12k+': 4 };
    const budget = budgetMap[user.budgetRange] || 2;
    vector.push(budget / 4); // Normalize to 0-1
    
    // 3. Sleep Schedule (binary encoding)
    const sleepSchedule = user.sleepSchedule === 'early-sleeper' ? 1 : 0;
    vector.push(sleepSchedule);
    
    // 4. Smoking (binary encoding)
    const smoking = user.smoking === 'yes' ? 1 : 0;
    vector.push(smoking);
    
    // 5. Drinking (binary encoding)
    const drinking = user.drinking === 'yes' ? 1 : 0;
    vector.push(drinking);
    
    // 6. Cleanliness Level (ordinal encoding)
    const cleanlinessMap = { 'low': 1, 'medium': 2, 'high': 3 };
    const cleanliness = cleanlinessMap[user.cleanlinessLevel] || 2;
    vector.push(cleanliness / 3); // Normalize to 0-1
    
    // 7. Study Habit (ordinal encoding)
    const studyMap = { 'quiet': 1, 'group': 2, 'mixed': 3 };
    const studyHabit = studyMap[user.studyStyle] || 2;
    vector.push(studyHabit / 3); // Normalize to 0-1
    
    // 8. Introvert-Extrovert (already numeric, normalize to 0-1)
    const introvertExtrovert = (user.introvertExtrovert - 1) / 4;
    vector.push(introvertExtrovert);
    
    return vector;
  }

  /**
   * Calculate cosine similarity between two vectors
   * Formula: (A·B) / (|A| × |B|)
   * Returns value between -1 and 1, where 1 is most similar
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
   * Train the model with user data from MongoDB
   * This should be called when server starts or when data changes
   */
  async trainModel(users) {
    console.log('Training ML model with user data...');
    
    this.userVectors.clear();
    this.userData.clear();

    for (const user of users) {
      try {
        const vector = this.encodeFeatures(user);
        this.userVectors.set(user._id.toString(), vector);
        this.userData.set(user._id.toString(), {
          userId: user._id.toString(),
          name: user.fullName,
          age: user.age,
          university: user.university
        });
      } catch (error) {
        console.error(`Error processing user ${user._id}:`, error.message);
      }
    }

    this.isTrained = true;
    console.log(`Model trained with ${this.userVectors.size} users`);
  }

  /**
   * Find compatible roommates for a given user
   * Returns top 5 most compatible users (excluding self)
   */
  findMatches(userId, limit = 5) {
    if (!this.isTrained) {
      throw new Error('Model not trained. Call trainModel() first.');
    }

    const userVector = this.userVectors.get(userId);
    if (!userVector) {
      throw new Error(`User ${userId} not found in training data`);
    }

    const similarities = [];

    // Compare with all other users
    for (const [otherUserId, otherVector] of this.userVectors) {
      if (otherUserId === userId) continue; // Skip self

      const similarity = this.cosineSimilarity(userVector, otherVector);
      const matchPercentage = Math.round(similarity * 100);

      similarities.push({
        userId: otherUserId,
        name: this.userData.get(otherUserId)?.name || 'Unknown',
        matchPercentage: matchPercentage
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
      featureCount: 8
    };
  }
}

module.exports = RoommateMatcher;
