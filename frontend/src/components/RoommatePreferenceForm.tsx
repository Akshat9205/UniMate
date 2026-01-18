import { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, MapPin, DollarSign, Moon, Users, Sparkles, Heart, Shield, Check, ChevronRight, User, Coffee, Volume2, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoommatePreferences {
  // Living Preferences
  preferredArea: string;
  budgetRange: string;
  roomType: string;
  
  // Lifestyle Habits
  sleepSchedule: string;
  smoking: string;
  guests: string;
  
  // Cleanliness & Routine
  cleanlinessLevel: number;
  chorePreference: string;
  noiseTolerance: number;
  
  // Personality & Social Style
  introvertExtrovert: number;
  socialFrequency: string;
  
  // Hard Preferences
  preferredRoommateGender: string;
  dealbreakers: string[];
  
  // Metadata
  moveInDate: string;
}

export default function RoommatePreferenceForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [preferences, setPreferences] = useState<RoommatePreferences>({
    preferredArea: '',
    budgetRange: '',
    roomType: '',
    sleepSchedule: '',
    smoking: '',
    guests: '',
    cleanlinessLevel: 5,
    chorePreference: '',
    noiseTolerance: 5,
    introvertExtrovert: 5,
    socialFrequency: '',
    preferredRoommateGender: '',
    dealbreakers: [],
    moveInDate: ''
  });

  const updatePreferences = (field: keyof RoommatePreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Roommate preferences submitted:', preferences);
    navigate('/match-results');
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step === currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-110'
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`w-12 h-1 mx-2 transition-all duration-300 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Step1LivingPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Living Preferences</h2>
        <p className="text-gray-600">Tell us about your ideal living situation</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Preferred Area
          </label>
          <input
            type="text"
            value={preferences.preferredArea}
            onChange={(e) => updatePreferences('preferredArea', e.target.value)}
            placeholder="e.g., Downtown, Near Campus, Quiet Suburbs"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">This helps us find roommates in your preferred location</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-2" />
            Monthly Budget Range
          </label>
          <select
            value={preferences.budgetRange}
            onChange={(e) => updatePreferences('budgetRange', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select budget range</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-800">$500 - $800</option>
            <option value="800-1200">$800 - $1,200</option>
            <option value="1200-1800">$1,200 - $1,800</option>
            <option value="1800+">$1,800+</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Find roommates with similar budget expectations</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Home className="w-4 h-4 inline mr-2" />
            Preferred Room Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Private Room', 'Shared Room', 'Studio', 'Entire Apartment'].map((type) => (
              <button
                key={type}
                onClick={() => updatePreferences('roomType', type)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.roomType === type
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Match with others seeking the same type of accommodation</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Move-in Date
          </label>
          <input
            type="date"
            value={preferences.moveInDate}
            onChange={(e) => updatePreferences('moveInDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Find roommates with similar timing</p>
        </div>
      </div>
    </div>
  );

  const Step2LifestyleHabits = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Coffee className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lifestyle Habits</h2>
        <p className="text-gray-600">Daily routines and lifestyle compatibility</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Moon className="w-4 h-4 inline mr-2" />
            Sleep Schedule
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Early Bird', 'Night Owl', 'Flexible'].map((schedule) => (
              <button
                key={schedule}
                onClick={() => updatePreferences('sleepSchedule', schedule)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.sleepSchedule === schedule
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {schedule}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Sleep schedule compatibility is crucial for harmony</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Smoking Preference
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Non-smoker', 'Smoker', 'Smoking Outside OK'].map((option) => (
              <button
                key={option}
                onClick={() => updatePreferences('smoking', option)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.smoking === option
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Important for health and comfort preferences</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Guest Frequency
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Rarely', 'Occasionally', 'Often'].map((frequency) => (
              <button
                key={frequency}
                onClick={() => updatePreferences('guests', frequency)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.guests === frequency
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {frequency}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Match with similar social preferences</p>
        </div>
      </div>
    </div>
  );

  const Step3CleanlinessRoutine = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cleanliness & Routine</h2>
        <p className="text-gray-600">Home maintenance and daily habits</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cleanliness Level
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="10"
              value={preferences.cleanlinessLevel}
              onChange={(e) => updatePreferences('cleanlinessLevel', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Very Relaxed</span>
              <span className="font-bold text-green-600">Level {preferences.cleanlinessLevel}</span>
              <span>Very Tidy</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Find roommates with similar cleanliness standards</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chore Preference
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Scheduled Cleaning', 'As-Needed', 'Professional Service'].map((preference) => (
              <button
                key={preference}
                onClick={() => updatePreferences('chorePreference', preference)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.chorePreference === preference
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {preference}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Align on housekeeping expectations</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Volume2 className="w-4 h-4 inline mr-2" />
            Noise Tolerance
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="10"
              value={preferences.noiseTolerance}
              onChange={(e) => updatePreferences('noiseTolerance', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Very Quiet</span>
              <span className="font-bold text-green-600">Level {preferences.noiseTolerance}</span>
              <span>Very Tolerant</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Match noise levels for peaceful coexistence</p>
        </div>
      </div>
    </div>
  );

  const Step4PersonalitySocial = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personality & Social Style</h2>
        <p className="text-gray-600">Find your social compatibility match</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Introvert - Extrovert Scale
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="10"
              value={preferences.introvertExtrovert}
              onChange={(e) => updatePreferences('introvertExtrovert', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Introvert</span>
              <span className="font-bold text-orange-600">Level {preferences.introvertExtrovert}</span>
              <span>Extrovert</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Balance social energy for better compatibility</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Social Frequency Preference
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Quiet Home', 'Balanced', 'Social Hub'].map((frequency) => (
              <button
                key={frequency}
                onClick={() => updatePreferences('socialFrequency', frequency)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.socialFrequency === frequency
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {frequency}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Match home social atmosphere preferences</p>
        </div>
      </div>
    </div>
  );

  const Step5HardPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hard Preferences</h2>
        <p className="text-gray-600">Your non-negotiable roommate criteria</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Preferred Roommate Gender
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Any'].map((gender) => (
              <button
                key={gender}
                onClick={() => updatePreferences('preferredRoommateGender', gender)}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  preferences.preferredRoommateGender === gender
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Specify your comfort preferences</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dealbreakers
          </label>
          <div className="space-y-2">
            {[
              'Smoking',
              'Pets',
              'Late Night Noise',
              'Frequent Guests',
              'Different Cleanliness Standards',
              'Early Morning Schedule'
            ].map((dealbreaker) => (
              <label key={dealbreaker} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.dealbreakers.includes(dealbreaker)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updatePreferences('dealbreakers', [...preferences.dealbreakers, dealbreaker]);
                    } else {
                      updatePreferences('dealbreakers', preferences.dealbreakers.filter(d => d !== dealbreaker));
                    }
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{dealbreaker}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Select your absolute dealbreakers</p>
        </div>
      </div>
    </div>
  );

  const Step6Review = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Preferences</h2>
        <p className="text-gray-600">Your AI-powered matching is ready</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-gray-800 mb-4">Your Roommate Preferences Summary:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Location:</span>
            <span className="ml-2 text-gray-800">{preferences.preferredArea || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Budget:</span>
            <span className="ml-2 text-gray-800">{preferences.budgetRange || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Room Type:</span>
            <span className="ml-2 text-gray-800">{preferences.roomType || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Sleep Schedule:</span>
            <span className="ml-2 text-gray-800">{preferences.sleepSchedule || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Cleanliness Level:</span>
            <span className="ml-2 text-gray-800">{preferences.cleanlinessLevel}/10</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Social Style:</span>
            <span className="ml-2 text-gray-800">{preferences.socialFrequency || 'Not specified'}</span>
          </div>
        </div>

        {preferences.dealbreakers.length > 0 && (
          <div className="mt-4">
            <span className="font-medium text-gray-600">Dealbreakers:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.dealbreakers.map((dealbreaker) => (
                <span key={dealbreaker} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                  {dealbreaker}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>AI Matching Ready!</strong> Our algorithm will analyze your preferences and find the most compatible roommates based on lifestyle, personality, and living habits.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1LivingPreferences />;
      case 2:
        return <Step2LifestyleHabits />;
      case 3:
        return <Step3CleanlinessRoutine />;
      case 4:
        return <Step4PersonalitySocial />;
      case 5:
        return <Step5HardPreferences />;
      case 6:
        return <Step6Review />;
      default:
        return <Step1LivingPreferences />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Roommate Preference Form
          </h1>
          <p className="text-gray-600 mt-2">Find your perfect roommate match</p>
        </div>

        {/* Progress Indicator */}
        {renderStepIndicator()}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 shadow-lg"
            >
              Find My Most Compatible Roommates
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 shadow-lg"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
