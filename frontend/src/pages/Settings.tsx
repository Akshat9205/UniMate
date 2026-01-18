import { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, ChevronRight, Moon, Sun, Save, X, Check, AlertCircle, Smartphone, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import PrivacySecurity from '../components/PrivacySecurity';

export default function Settings() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showBugForm, setShowBugForm] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [bugSubmitted, setBugSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    language: language,
    timezone: 'UTC-05:00'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });
  const [bugFormData, setBugFormData] = useState({
    bugType: '',
    bugTitle: '',
    bugDescription: '',
    stepsToReproduce: '',
    severity: 'Medium'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData(prev => ({
          ...prev,
          email: user.email || '',
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || ''
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Update formData.language when language context changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      language: language
    }));
  }, [language]);

  // Load saved profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        setFormData(prev => ({
          ...prev,
          firstName: profileData.firstName || prev.firstName,
          lastName: profileData.lastName || prev.lastName,
          email: profileData.email || prev.email,
          phone: profileData.phone || prev.phone,
          bio: profileData.bio || prev.bio,
          language: profileData.language || prev.language,
          timezone: profileData.timezone || prev.timezone
        }));
        
        if (profileData.notifications) {
          setNotifications(profileData.notifications);
        }
      } catch (error) {
        console.error('Error loading saved profile:', error);
      }
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus('saving');
    
    try {
      // Save to localStorage for persistence across sessions
      const profileData = {
        ...formData,
        notifications,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      // Update Firebase user profile if available
      const user = auth.currentUser;
      if (user) {
        // Note: In a real app, you would update the user profile in Firestore
        // For now, we'll just simulate the update
        console.log('Profile updated for user:', user.uid);
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setIsLoading(false);
      setSaveStatus('error');
      
      // Reset error status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'language') {
      setLanguage(value as any);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleBugFormChange = (field: string, value: string) => {
    setBugFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBugSubmit = async () => {
    if (!bugFormData.bugType || !bugFormData.bugTitle || !bugFormData.bugDescription) {
      alert(t('fillRequiredFields'));
      return;
    }

    try {
      const user = auth.currentUser;
      
      // Map bug types to backend format
      const typeMapping: { [key: string]: string } = {
        'ui-design': 'ui',
        'matching': 'functionality',
        'performance': 'performance',
        'auth': 'security',
        'data': 'functionality',
        'other': 'other'
      };

      const severityMapping: { [key: string]: string } = {
        'Low': 'low',
        'Medium': 'medium',
        'High': 'high'
      };

      const bugReportData = {
        title: bugFormData.bugTitle,
        description: bugFormData.bugDescription,
        type: typeMapping[bugFormData.bugType] || 'other',
        severity: severityMapping[bugFormData.severity] || 'medium',
        reporterName: formData.firstName && formData.lastName ? `${formData.firstName} ${formData.lastName}` : 'Anonymous User',
        reporterEmail: formData.email || 'anonymous@example.com',
        userId: user?.uid || null,
        browserInfo: navigator.userAgent,
        osInfo: navigator.platform,
        stepsToReproduce: bugFormData.stepsToReproduce,
        expectedBehavior: '',
        actualBehavior: bugFormData.bugDescription,
        screenshots: []
      };

      const response = await fetch('http://localhost:5000/api/bug-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bugReportData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit bug report');
      }

      const result = await response.json();
      
      setBugSubmitted(true);
      setBugFormData({
        bugType: '',
        bugTitle: '',
        bugDescription: '',
        stepsToReproduce: '',
        severity: 'Medium'
      });
      
      setTimeout(() => {
        setBugSubmitted(false);
        setShowBugForm(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting bug report:', error);
      alert('Error submitting bug report. Please try again.');
    }
  };

  const settingsTabs = [
    { id: 'profile', name: t('profileSettings'), icon: User, color: 'text-blue-600' },
    { id: 'notifications', name: t('notifications'), icon: Bell, color: 'text-green-600' },
    { id: 'privacy', name: t('privacySecurity'), icon: Shield, color: 'text-purple-600' },
    { id: 'appearance', name: t('appearance'), icon: Palette, color: 'text-pink-600' },
    { id: 'language', name: t('languageRegion'), icon: Globe, color: 'text-orange-600' },
    { id: 'help', name: t('helpSupport'), icon: HelpCircle, color: 'text-indigo-600' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Profile Information</h3>
              <p className="text-teal-50">Update your personal information and manage your profile</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="mr-2 text-teal-600" size={20} />
                  Personal Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Notification Preferences</h3>
              <p className="text-green-50">Choose how you want to stay updated</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Bell className="mr-2 text-green-600" size={20} />
                Notification Channels
              </h4>
              <div className="space-y-6">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive email updates about your account', icon: Mail, color: 'text-blue-600' },
                  { key: 'push', label: 'Push Notifications', desc: 'Get push notifications on your device', icon: Bell, color: 'text-green-600' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Receive text messages for important updates', icon: MessageSquare, color: 'text-purple-600' },
                  { key: 'marketing', label: 'Marketing Communications', desc: 'Get updates about new features and offers', icon: Mail, color: 'text-orange-600' }
                ].map(({ key, label, desc, icon: Icon, color }) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gray-50 ${color}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{label}</h4>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return <PrivacySecurity />;

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Appearance Settings</h3>
              <p className="text-pink-50">Customize your visual experience</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Palette className="mr-2 text-pink-600" size={20} />
                Theme Preferences
              </h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-gray-50">
                      {darkMode ? <Moon className="text-indigo-600" size={20} /> : <Sun className="text-yellow-500" size={20} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Dark Mode</h4>
                      <p className="text-sm text-gray-500">Toggle dark theme for better night viewing</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all hover:border-teal-300"
                  >
                    {darkMode ? <Moon className="text-gray-700" size={24} /> : <Sun className="text-yellow-500" size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Language & Region</h3>
              <p className="text-orange-50">Set your language and timezone preferences</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Globe className="mr-2 text-orange-600" size={20} />
                Regional Settings
              </h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Language</label>
                  <select 
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                    <option value="hindi">हिन्दी (Hindi)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Timezone</label>
                  <select 
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="UTC-05:00">UTC-05:00 Eastern Time</option>
                    <option value="UTC-06:00">UTC-06:00 Central Time</option>
                    <option value="UTC-07:00">UTC-07:00 Mountain Time</option>
                    <option value="UTC-08:00">UTC-08:00 Pacific Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Help & Support</h3>
              <p className="text-indigo-50">Get help when you need it</p>
            </div>

            {!showBugForm && !showFAQs && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-indigo-600" size={20} />
                  Support Options
                </h4>
                <div className="space-y-4">
                  <div 
                    onClick={() => setShowFAQs(true)}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gray-50 text-indigo-600">
                        <HelpCircle size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">FAQs</h4>
                        <p className="text-sm text-gray-500">Find answers to common questions</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                  
                  <div 
                    onClick={() => navigate('/contact')}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gray-50 text-indigo-600">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Contact Support</h4>
                        <p className="text-sm text-gray-500">Get help from our support team</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                  
                  <div 
                    onClick={() => setShowBugForm(true)}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gray-50 text-indigo-600">
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Report a Bug</h4>
                        <p className="text-sm text-gray-500">Help us improve by reporting issues</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                </div>
              </div>
            )}

            {/* Bug Report Form */}
            {showBugForm && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-red-100 mr-3">
                      <AlertCircle className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">🐞 Report a Bug</h3>
                      <p className="text-gray-600">Help us improve Unimate by reporting any issues you face.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowBugForm(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="text-gray-500" size={20} />
                  </button>
                </div>

                {bugSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="text-green-600" size={32} />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h4>
                    <p className="text-gray-600">Your bug report has been submitted successfully.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Bug Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={bugFormData.bugType}
                          onChange={(e) => handleBugFormChange('bugType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select bug type</option>
                          <option value="ui-design">UI / Design Issue</option>
                          <option value="matching">Matching Issue (Incorrect roommate suggestions)</option>
                          <option value="performance">Performance Issue (Slow loading, lag)</option>
                          <option value="auth">Login / Authentication Issue</option>
                          <option value="data">Data Issue (Incorrect or missing information)</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Bug Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bugFormData.bugTitle}
                          onChange={(e) => handleBugFormChange('bugTitle', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          placeholder="Short summary of issue (e.g., 'Matches not loading')"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Bug Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={bugFormData.bugDescription}
                        onChange={(e) => handleBugFormChange('bugDescription', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        rows={4}
                        placeholder="Describe what happened, what you expected to happen, and what actually happened."
                        required
                      />
                      <p className="text-sm text-gray-500">Clear details help us resolve issues faster.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Steps to Reproduce
                      </label>
                      <textarea
                        value={bugFormData.stepsToReproduce}
                        onChange={(e) => handleBugFormChange('stepsToReproduce', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        rows={4}
                        placeholder="1. Go to Match Preferences page&#10;2. Complete all steps&#10;3. Click 'Find My Matches'&#10;4. The page keeps loading"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Severity Level</label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { value: 'Low', label: 'Low (Minor UI issue)' },
                          { value: 'Medium', label: 'Medium (Feature partially broken)' },
                          { value: 'High', label: 'High (App crash / core feature not working)' }
                        ].map((severity) => (
                          <label key={severity.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="severity"
                              value={severity.value}
                              checked={bugFormData.severity === severity.value}
                              onChange={(e) => handleBugFormChange('severity', e.target.value)}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-700">{severity.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleBugSubmit}
                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
                      >
                        Submit Bug Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FAQs Section */}
            {showFAQs && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-blue-100 mr-3">
                      <HelpCircle className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
                      <p className="text-gray-600">Find answers to common questions about UniMate</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowFAQs(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="text-gray-500" size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      question: "How does UniMate's matching algorithm work?",
                      answer: "Our algorithm analyzes your lifestyle preferences, study habits, cleanliness standards, and other factors to find compatible roommates. The more detailed your profile, the better your matches will be."
                    },
                    {
                      question: "Is my personal information secure?",
                      answer: "Yes, we use bank-level encryption to protect your data. Only information relevant to roommate matching is shared with potential matches, and you have full control over what's visible."
                    },
                    {
                      question: "Can I change my preferences after signing up?",
                      answer: "Absolutely! You can update your profile and preferences at any time through the Settings page. Changes will be reflected in future matches."
                    },
                    {
                      question: "How do I report inappropriate behavior?",
                      answer: "If you encounter any inappropriate behavior, please use the 'Report a Bug' feature or contact our support team immediately. We take such matters very seriously."
                    },
                    {
                      question: "Is UniMate free to use?",
                      answer: "Basic matching is free for all students. We also offer a Premium plan with advanced features like detailed compatibility insights and priority matching."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="text-gray-600" size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600 text-lg">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 sticky top-8">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-teal-100' : 'bg-gray-50'}`}>
                      <Icon size={18} className={activeTab === tab.id ? 'text-teal-600' : tab.color} />
                    </div>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-span-3">
            {renderContent()}
            
            {activeTab !== 'help' && (
              <div className="mt-8 flex justify-between items-center bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-2">
                  {saveStatus === 'success' && (
                    <>
                      <Check className="text-green-600" size={20} />
                      <span className="text-green-600 font-medium">Changes saved successfully!</span>
                    </>
                  )}
                  {saveStatus === 'error' && (
                    <>
                      <X className="text-red-600" size={20} />
                      <span className="text-red-600 font-medium">Error saving changes</span>
                    </>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all font-medium flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
