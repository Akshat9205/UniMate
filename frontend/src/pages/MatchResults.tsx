import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Heart, Clock, DollarSign, Utensils, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MatchFeatures {
  age: number;
  budget: string;
  sleep_schedule: string;
  smoking: string;
  drinking: string;
  cleanliness: number;
  study_habit: string;
  introvert_extrovert: number;
}

interface Match {
  userId: string;
  name: string;
  matchPercentage: number;
  features: MatchFeatures;
}

interface MatchResultsData {
  success: boolean;
  matches: Match[];
  totalMatches: number;
  dataSource: string;
}

export default function MatchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [matchData, setMatchData] = useState<MatchResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get userId from location state or URL params
    const stateUserId = location.state?.userId;
    const urlParams = new URLSearchParams(location.search);
    const urlUserId = urlParams.get('userId');
    
    const finalUserId = stateUserId || urlUserId;
    
    if (!finalUserId) {
      setError('No user ID provided. Please fill the form first.');
      setLoading(false);
      return;
    }

    setUserId(finalUserId);
    fetchMatches(finalUserId);
  }, [location]);

  const fetchMatches = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.status}`);
      }

      const data: MatchResultsData = await response.json();
      
      if (data.success && data.matches.length > 0) {
        setMatchData(data);
      } else {
        setError('No compatible roommates found. Try adjusting your preferences.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching matches.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (userId) {
      fetchMatches(userId);
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600 bg-green-100';
    if (percentage >= 85) return 'text-blue-600 bg-blue-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getCleanlinessIcon = (level: number) => {
    if (level >= 4) return '✨';
    if (level >= 3) return '🧹';
    return '🧽';
  };

  const getStudyIcon = (habit: string) => {
    switch (habit.toLowerCase()) {
      case 'high': return '📚';
      case 'medium': return '📖';
      case 'low': return '📝';
      default: return '📚';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Finding Your Perfect Roommates</h2>
          <p className="text-gray-600">Analyzing lifestyle compatibility...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-details')}
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Fill Form Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/user-details')}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Form
          </button>
          
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-4">
            <Sparkles className="w-6 h-6 text-teal-600" />
            <span className="text-lg font-semibold text-gray-800">Your Best Roommate Matches</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your lifestyle preferences, we found {matchData?.totalMatches} compatible roommates from our database of {matchData?.dataSource === 'CSV' ? '2000+' : 'real'} students
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {matchData?.matches.map((match) => (
            <div key={match.userId} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Match Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {match.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{match.name}</h3>
                      <p className="text-sm text-gray-500">Student {match.userId.replace('csv_', '')}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-bold text-sm ${getMatchColor(match.matchPercentage)}`}>
                    {match.matchPercentage}%
                  </div>
                </div>

                {/* Match Percentage Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      match.matchPercentage >= 95 ? 'bg-green-500' :
                      match.matchPercentage >= 85 ? 'bg-blue-500' :
                      match.matchPercentage >= 75 ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${match.matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Compatibility Features */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Compatibility Factors
                </h4>
                
                <div className="space-y-3">
                  {/* Age */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Age
                    </span>
                    <span className="font-semibold text-gray-800">{match.features.age} years</span>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Budget
                    </span>
                    <span className="font-semibold text-gray-800">{match.features.budget}</span>
                  </div>

                  {/* Sleep Schedule */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Sleep
                    </span>
                    <span className="font-semibold text-gray-800">
                      {match.features.sleep_schedule === 'Early' ? '🌅 Early' : '🌙 Late'} Sleeper
                    </span>
                  </div>

                  {/* Cleanliness */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-lg">{getCleanlinessIcon(match.features.cleanliness)}</span> Cleanliness
                    </span>
                    <span className="font-semibold text-gray-800">{match.features.cleanliness}/5</span>
                  </div>

                  {/* Study Habits */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-lg">{getStudyIcon(match.features.study_habit)}</span> Study Style
                    </span>
                    <span className="font-semibold text-gray-800 capitalize">{match.features.study_habit}</span>
                  </div>

                  {/* Habits */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Utensils className="w-4 h-4" /> Habits
                    </span>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        match.features.smoking === 'No' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {match.features.smoking}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        match.features.drinking === 'No' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {match.features.drinking}
                      </span>
                    </div>
                  </div>

                  {/* Personality */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Personality</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= match.features.introvert_extrovert ? 'bg-teal-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {match.features.introvert_extrovert <= 2 ? 'Introvert' : 
                         match.features.introvert_extrovert >= 4 ? 'Extrovert' : 'Ambivert'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                  Contact {match.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span className="text-gray-700">
              Data source: {matchData?.dataSource === 'CSV' ? '2000+ student profiles' : 'Real user data'}
            </span>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/user-details')}
              className="bg-white border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
            >
              Update Preferences
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
