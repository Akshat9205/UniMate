import { useState } from 'react';
import { ArrowLeft, User, MapPin, Moon, TrendingUp, Search, Save, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserDetailsData {
  // Basic Information
  fullName: string;
  age: string;
  gender: string;
  university: string;
  course: string;
  year: string;
  
  // Location & Stay Preferences
  currentCity: string;
  preferredArea: string;
  moveInDate: string;
  budgetRange: string;
  roomType: string;
  
  // Lifestyle Habits
  sleepSchedule: string;
  smoking: string;
  drinking: string;
  foodPreference: string;
  cleanlinessLevel: string;
  studyStyle: string;
  
  // Personality Traits
  introvertExtrovert: number;
  organizedEasygoing: number;
  silentTalkative: number;
  earlyRiserNightOwl: number;
  
  // Roommate Expectations
  preferredRoommateGender: string;
  noiseTolerance: string;
  guestFrequency: string;
  maxRoommatesCount: string;
  
  // About Me
  bio: string;
}

export default function UserDetails() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<UserDetailsData>({
    // Basic Information
    fullName: '',
    age: '',
    gender: '',
    university: '',
    course: '',
    year: '',
    
    // Location & Stay Preferences
    currentCity: '',
    preferredArea: '',
    moveInDate: '',
    budgetRange: '5k-8k',
    roomType: 'shared',
    
    // Lifestyle Habits
    sleepSchedule: '',
    smoking: '',
    drinking: '',
    foodPreference: '',
    cleanlinessLevel: '',
    studyStyle: '',
    
    // Personality Traits
    introvertExtrovert: 3,
    organizedEasygoing: 3,
    silentTalkative: 3,
    earlyRiserNightOwl: 3,
    
    // Roommate Expectations
    preferredRoommateGender: '',
    noiseTolerance: '',
    guestFrequency: '',
    maxRoommatesCount: '',
    
    // About Me
    bio: ''
  });

  const [mlPreview] = useState({
    cleanlinessScore: 'Medium',
    lifestyleType: 'Balanced',
    compatibilityCluster: 'Type-B Student'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSavePreferences = async () => {
    // Check if at least some basic info is filled
    if (!formData.fullName.trim()) {
      alert('Please enter your full name to save preferences.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Preferences saved successfully:', data);
        alert('Your preferences have been saved! You can continue filling the form later.');
      } else {
        const errorData = await response.json();
        console.error('Save error:', errorData);
        alert('Failed to save preferences. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const requiredFields = [
      'fullName', 'age', 'gender', 'university', 'course', 'year',
      'currentCity', 'budgetRange', 'roomType',
      'sleepSchedule', 'smoking', 'drinking', 'foodPreference', 'cleanlinessLevel', 'studyStyle',
      'preferredRoommateGender', 'noiseTolerance', 'guestFrequency', 'maxRoommatesCount'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof UserDetailsData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields before submitting. Missing: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User Details submitted successfully:', data);
        alert('User details submitted successfully! We will find compatible roommates for you.');
        
        // Reset form after successful submission
        setFormData({
          // Basic Information
          fullName: '',
          age: '',
          gender: '',
          university: '',
          course: '',
          year: '',
          
          // Location & Stay Preferences
          currentCity: '',
          preferredArea: '',
          moveInDate: '',
          budgetRange: '5k-8k',
          roomType: 'shared',
          
          // Lifestyle Habits
          sleepSchedule: '',
          smoking: '',
          drinking: '',
          foodPreference: '',
          cleanlinessLevel: '',
          studyStyle: '',
          
          // Personality Traits
          introvertExtrovert: 3,
          organizedEasygoing: 3,
          silentTalkative: 3,
          earlyRiserNightOwl: 3,
          
          // Roommate Expectations
          preferredRoommateGender: '',
          noiseTolerance: '',
          guestFrequency: '',
          maxRoommatesCount: '',
          
          // About Me
          bio: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Submission error:', errorData);
        alert('Failed to submit user details. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const getPersonalityLabel = (value: number, labels: string[]) => {
    const index = Math.round(value) - 1;
    return labels[index] || labels[1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-600 hover:text-teal-600 hover:bg-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Main Form Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">User Details Form</h1>
              <p className="text-teal-100 text-sm mt-1">Help us find your perfect roommate match</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="16"
                  max="30"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your age"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your university name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course / Degree *</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Computer Science, Engineering"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Stay Preferences */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Location & Stay Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current City *</label>
                <input
                  type="text"
                  name="currentCity"
                  value={formData.currentCity}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Mumbai, Delhi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Area / Locality</label>
                <input
                  type="text"
                  name="preferredArea"
                  value={formData.preferredArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Andheri, Connaught Place"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Move-in Date</label>
                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="3k-5k">₹3,000 - ₹5,000</option>
                  <option value="5k-8k">₹5,000 - ₹8,000</option>
                  <option value="8k-12k">₹8,000 - ₹12,000</option>
                  <option value="12k+">₹12,000+</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type *</label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="roomType"
                      value="single"
                      checked={formData.roomType === 'single'}
                      onChange={handleInputChange}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Single</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="roomType"
                      value="shared"
                      checked={formData.roomType === 'shared'}
                      onChange={handleInputChange}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Shared</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Lifestyle Habits */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Moon className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Lifestyle Habits</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Schedule *</label>
                <select
                  name="sleepSchedule"
                  value={formData.sleepSchedule}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Schedule</option>
                  <option value="early-sleeper">Early Sleeper</option>
                  <option value="late-sleeper">Late Sleeper</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Smoking *</label>
                <select
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drinking *</label>
                <select
                  name="drinking"
                  value={formData.drinking}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Preference *</label>
                <select
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Preference</option>
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cleanliness Level *</label>
                <select
                  name="cleanlinessLevel"
                  value={formData.cleanlinessLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Study Style *</label>
                <select
                  name="studyStyle"
                  value={formData.studyStyle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Style</option>
                  <option value="quiet">Quiet</option>
                  <option value="group">Group</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Personality Traits */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Personality Traits</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introvert ↔ Extrovert: {getPersonalityLabel(formData.introvertExtrovert, ['Introvert', 'Balanced', 'Extrovert'])}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.introvertExtrovert}
                  onChange={(e) => handleSliderChange('introvertExtrovert', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organized ↔ Easy-going: {getPersonalityLabel(formData.organizedEasygoing, ['Organized', 'Balanced', 'Easy-going'])}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.organizedEasygoing}
                  onChange={(e) => handleSliderChange('organizedEasygoing', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Silent ↔ Talkative: {getPersonalityLabel(formData.silentTalkative, ['Silent', 'Balanced', 'Talkative'])}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.silentTalkative}
                  onChange={(e) => handleSliderChange('silentTalkative', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Early Riser ↔ Night Owl: {getPersonalityLabel(formData.earlyRiserNightOwl, ['Early Riser', 'Balanced', 'Night Owl'])}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.earlyRiserNightOwl}
                  onChange={(e) => handleSliderChange('earlyRiserNightOwl', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Roommate Expectations */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Roommate Expectations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Roommate Gender *</label>
                <select
                  name="preferredRoommateGender"
                  value={formData.preferredRoommateGender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Any</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Noise Tolerance *</label>
                <select
                  name="noiseTolerance"
                  value={formData.noiseTolerance}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guest Frequency *</label>
                <select
                  name="guestFrequency"
                  value={formData.guestFrequency}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Frequency</option>
                  <option value="rare">Rare</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="often">Often</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Roommates Count</label>
                <input
                  type="number"
                  name="maxRoommatesCount"
                  value={formData.maxRoommatesCount}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="Maximum number of roommates"
                />
              </div>
            </div>
          </div>

          {/* Section 6: About Me */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Bio (max 250 characters)</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                maxLength={250}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="e.g., CS student who prefers quiet nights, clean rooms, and gym sessions."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.bio.length}/250
              </div>
            </div>
          </div>

          {/* ML Output Preview */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">ML Compatibility Preview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Cleanliness Score</div>
                <div className="text-lg font-bold text-teal-600">{mlPreview.cleanlinessScore}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Lifestyle Type</div>
                <div className="text-lg font-bold text-blue-600">{mlPreview.lifestyleType}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Compatibility Cluster</div>
                <div className="text-lg font-bold text-purple-600">{mlPreview.compatibilityCluster}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find Compatible Roommates
            </button>
            
            <button
              type="button"
              onClick={handleSavePreferences}
              className="bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
