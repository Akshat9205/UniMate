import { Mail, Phone, MapPin, Calendar, User, BookOpen, Home, Moon, Coffee, Utensils, Volume2, Sparkles, Edit, Users, Eye, CheckCircle, DollarSign, BedDouble, Volume1 } from 'lucide-react';
import { useState } from 'react';

// TypeScript interface for user profile data
interface UserProfile {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    age: number;
    city: string;
    preferredMoveInDate: string;
    avatar: string;
    isVerified: boolean;
  };
  academic: {
    university: string;
    course: string;
    branch: string;
    year: string;
    studentType: 'Hostel' | 'Day Scholar';
  };
  lifestyle: {
    sleepSchedule: 'Early' | 'Late';
    smoking: boolean;
    drinking: boolean;
    foodPreference: 'Veg' | 'Non-Veg';
    studyStyle: 'Quiet' | 'Group';
    cleanlinessLevel: 'Low' | 'Medium' | 'High';
  };
  about: string;
  isLookingForRoommate: boolean;
  roommatePreferences: {
    preferredGender: string;
    budgetRange: string;
    roomType: 'Single' | 'Shared';
    noiseTolerance: 'Low' | 'Medium' | 'High';
  };
  compatibility: {
    cleanliness: number;
    sleepSchedule: string;
    studyStyle: string;
  };
}

export default function Profile() {
  // Enhanced dummy data for demonstration
  const [profile] = useState<UserProfile>({
    personal: {
      fullName: 'Priya Sharma',
      email: 'priya.sharma@university.edu',
      phone: '+91 98765 43210',
      gender: 'Female',
      age: 21,
      city: 'Mumbai',
      preferredMoveInDate: '2024-02-01',
      avatar: 'PS',
      isVerified: true
    },
    academic: {
      university: 'University of Mumbai',
      course: 'B.Tech',
      branch: 'Computer Science',
      year: '3rd Year',
      studentType: 'Hostel'
    },
    lifestyle: {
      sleepSchedule: 'Early',
      smoking: false,
      drinking: false,
      foodPreference: 'Veg',
      studyStyle: 'Quiet',
      cleanlinessLevel: 'High'
    },
    about: 'Computer Science student who enjoys late-night coding, fitness, and calm roommates. I maintain a clean living space and prefer peaceful study environment. Looking for someone who shares similar values and lifestyle.',
    isLookingForRoommate: true,
    roommatePreferences: {
      preferredGender: 'Female',
      budgetRange: '₹8,000 - ₹12,000',
      roomType: 'Shared',
      noiseTolerance: 'Low'
    },
    compatibility: {
      cleanliness: 90,
      sleepSchedule: 'High',
      studyStyle: 'Medium'
    }
  });

  const getLifestyleTagColor = (value: string, type: string) => {
    if (type === 'boolean') {
      return value === 'true' || value === 'Yes' 
        ? 'bg-red-100 text-red-700 border-red-200' 
        : 'bg-green-100 text-green-700 border-green-200';
    }
    
    switch (value) {
      case 'Early':
      case 'Veg':
      case 'Quiet':
      case 'Low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Late':
      case 'Non-Veg':
      case 'Group':
      case 'High':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCompatibilityColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-6xl">
        {/* Profile Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative">
                {profile.personal.avatar}
                {profile.personal.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile.personal.fullName}</h1>
                {profile.personal.isVerified && (
                  <CheckCircle size={20} className="text-green-500" />
                )}
              </div>
              <p className="text-lg text-gray-600 mb-1">{profile.academic.university}</p>
              <p className="text-gray-600 mb-4">{profile.academic.course} • {profile.academic.branch} • {profile.academic.year}</p>
              
              {/* Status Badge */}
              <div className="inline-flex items-center">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  profile.isLookingForRoommate 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    profile.isLookingForRoommate ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                  {profile.isLookingForRoommate ? 'Looking for a Roommate' : 'Not Looking'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-teal-600" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <div className="flex items-center text-gray-900">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{profile.personal.email}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <div className="flex items-center text-gray-900">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{profile.personal.phone}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-gray-900 text-sm">{profile.personal.gender}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-gray-900 text-sm">{profile.personal.age} years</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">City</p>
                <div className="flex items-center text-gray-900">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{profile.personal.city}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Preferred Move-in Date</p>
                <div className="flex items-center text-gray-900">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{profile.personal.preferredMoveInDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-teal-600" />
              Academic Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">University Name</p>
                <p className="text-gray-900 text-sm">{profile.academic.university}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Degree / Course</p>
                <p className="text-gray-900 text-sm">{profile.academic.course}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Branch / Stream</p>
                <p className="text-gray-900 text-sm">{profile.academic.branch}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Year of Study</p>
                <p className="text-gray-900 text-sm">{profile.academic.year}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Student Type</p>
                <div className="flex items-center text-gray-900">
                  <Home className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{profile.academic.studentType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility Snapshot */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-teal-600" />
              Compatibility Snapshot
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Cleanliness Match</span>
                  <span className="text-sm font-bold text-teal-600">{profile.compatibility.cleanliness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${profile.compatibility.cleanliness}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Sleep Schedule Match</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCompatibilityColor(profile.compatibility.sleepSchedule)}`}>
                    {profile.compatibility.sleepSchedule}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Study Style Match</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCompatibilityColor(profile.compatibility.studyStyle)}`}>
                    {profile.compatibility.studyStyle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Preferences Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-teal-600" />
            Lifestyle Preferences
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <Moon className="w-4 h-4 mr-2 text-gray-400" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLifestyleTagColor(profile.lifestyle.sleepSchedule, 'schedule')}`}>
                Sleep: {profile.lifestyle.sleepSchedule}
              </span>
            </div>
            
            <div className="flex items-center">
              <Coffee className="w-4 h-4 mr-2 text-gray-400" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLifestyleTagColor(profile.lifestyle.smoking.toString(), 'boolean')}`}>
                Smoking: {profile.lifestyle.smoking ? 'Yes' : 'No'}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLifestyleTagColor(profile.lifestyle.drinking.toString(), 'boolean')}`}>
                Drinking: {profile.lifestyle.drinking ? 'Yes' : 'No'}
              </span>
            </div>
            
            <div className="flex items-center">
              <Utensils className="w-4 h-4 mr-2 text-gray-400" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLifestyleTagColor(profile.lifestyle.foodPreference, 'food')}`}>
                Food: {profile.lifestyle.foodPreference}
              </span>
            </div>
            
            <div className="flex items-center">
              <Volume2 className="w-4 h-4 mr-2 text-gray-400" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLifestyleTagColor(profile.lifestyle.studyStyle, 'study')}`}>
                Study: {profile.lifestyle.studyStyle}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLifestyleTagColor(profile.lifestyle.cleanlinessLevel, 'cleanliness')}`}>
                Cleanliness: {profile.lifestyle.cleanlinessLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Roommate Preferences Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2 text-teal-600" />
            Roommate Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Preferred Gender</p>
              <p className="text-gray-900 text-sm font-medium">{profile.roommatePreferences.preferredGender}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Budget Range</p>
              <div className="flex items-center text-gray-900">
                <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-sm font-medium">{profile.roommatePreferences.budgetRange}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Room Type</p>
              <div className="flex items-center text-gray-900">
                <BedDouble className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm font-medium">{profile.roommatePreferences.roomType}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Noise Tolerance</p>
              <div className="flex items-center text-gray-900">
                <Volume1 className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm font-medium">{profile.roommatePreferences.noiseTolerance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-700 leading-relaxed">
            {profile.about}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
          <button className="flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors shadow-lg">
            <Users className="w-4 h-4 mr-2" />
            Find Matches
          </button>
          <button className="flex items-center justify-center px-6 py-3 border border-teal-600 text-teal-600 hover:bg-teal-50 font-medium rounded-lg transition-colors">
            <Eye className="w-4 h-4 mr-2" />
            Preview Public Profile
          </button>
        </div>
      </div>
    </div>
  );
}
