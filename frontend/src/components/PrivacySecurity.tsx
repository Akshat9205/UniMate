import { useState } from 'react';
import { Shield, Lock, Smartphone, Eye, EyeOff, AlertTriangle, Trash2, X, Copy, LogOut, Mail } from 'lucide-react';

interface Session {
  id: string;
  deviceType: 'Mobile' | 'Desktop';
  browser: string;
  location: string;
  lastActive: string;
  current?: boolean;
}

export default function PrivacySecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswords, setShowPasswords] = useState<{
    current: boolean;
    new: boolean;
    confirm: boolean;
  }>({
    current: false,
    new: false,
    confirm: false
  });

  const [twoFAStep, setTwoFAStep] = useState<'password' | 'method' | 'setup' | 'success'>('password');
  const [selected2FAMethod, setSelected2FAMethod] = useState<'email' | 'authenticator'>('email');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Mock active sessions
  const [activeSessions, setActiveSessions] = useState<Session[]>([
    {
      id: '1',
      deviceType: 'Desktop',
      browser: 'Chrome on Windows',
      location: 'New York, USA',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      deviceType: 'Mobile',
      browser: 'Safari on iPhone',
      location: 'Los Angeles, USA',
      lastActive: '1 hour ago'
    }
  ]);

  const recoveryCodes = [
    'ABCD-1234-EFGH-5678',
    'IJKL-9012-MNOP-3456',
    'QRST-7890-UVWX-2345',
    'YZAB-6789-CDEF-1234'
  ];

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (field === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const handle2FAEnable = () => {
    if (passwordConfirmation) {
      setTwoFAStep('method');
    }
  };

  const handle2FASetup = () => {
    setTwoFAStep('setup');
  };

  const handle2FAComplete = () => {
    setTwoFactorEnabled(true);
    setShow2FAModal(false);
    setTwoFAStep('password');
    setPasswordConfirmation('');
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordStrength < 3) {
      alert('Password is too weak');
      return;
    }
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordStrength(0);
  };

  const handleLogoutSession = (sessionId: string) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleLogoutAllSessions = () => {
    setActiveSessions(prev => prev.filter(session => session.current));
  };

  const handleAccountDeactivation = () => {
    // Handle deactivation logic
    setShowDeactivateModal(false);
  };

  const handleAccountDeletion = () => {
    if (deleteConfirmation === 'DELETE') {
      // Handle deletion logic
      setShowDeleteModal(false);
      setDeleteConfirmation('');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Privacy & Security</h3>
        <p className="text-purple-50">Keep your account safe and secure</p>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="mr-2 text-purple-600" size={20} />
            Security Settings
          </h4>
          
          <div className="space-y-4">
            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 text-green-600">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShow2FAModal(true)}
                className="text-teal-600 hover:text-teal-700 font-medium px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>

            {/* Change Password */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 text-blue-600">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-500">Update your password regularly to stay secure</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-teal-600 hover:text-teal-700 font-medium px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
              >
                Update
              </button>
            </div>

            {/* Active Sessions */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 text-purple-600">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Active Sessions</h4>
                  <p className="text-sm text-gray-500">View and manage devices currently logged into your account</p>
                  <span className="text-xs text-gray-400 mt-1">{activeSessions.length} active sessions</span>
                </div>
              </div>
              <button
                onClick={() => setShowSessionsModal(true)}
                className="text-teal-600 hover:text-teal-700 font-medium px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {/* Account Protection */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="mr-2 text-red-600" size={20} />
            Account Protection
          </h4>
          
          <div className="space-y-4">
            {/* Account Deactivation */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 text-orange-600">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Deactivation</h4>
                  <p className="text-sm text-gray-500">Temporarily disable your account</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="text-orange-600 hover:text-orange-700 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Deactivate Account
              </button>
            </div>

            {/* Account Deletion */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 text-red-600">
                  <Trash2 size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Deletion</h4>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {twoFactorEnabled ? 'Disable 2FA' : 'Enable Two-Factor Authentication'}
              </h3>
              <button
                onClick={() => {
                  setShow2FAModal(false);
                  setTwoFAStep('password');
                  setPasswordConfirmation('');
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {!twoFactorEnabled && twoFAStep === 'password' && (
              <div className="space-y-4">
                <p className="text-gray-600">Enter your password to continue:</p>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  onClick={handle2FAEnable}
                  disabled={!passwordConfirmation}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {!twoFactorEnabled && twoFAStep === 'method' && (
              <div className="space-y-4">
                <p className="text-gray-600">Choose your verification method:</p>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="method"
                      value="email"
                      checked={selected2FAMethod === 'email'}
                      onChange={(e) => setSelected2FAMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <Mail size={20} className="mr-3 text-gray-600" />
                    <div>
                      <div className="font-medium">Email OTP</div>
                      <div className="text-sm text-gray-500">Receive codes via email</div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="method"
                      value="authenticator"
                      checked={selected2FAMethod === 'authenticator'}
                      onChange={(e) => setSelected2FAMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <Smartphone size={20} className="mr-3 text-gray-600" />
                    <div>
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-gray-500">Use Google Authenticator or similar</div>
                    </div>
                  </label>
                </div>
                <button
                  onClick={handle2FASetup}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {!twoFactorEnabled && twoFAStep === 'setup' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {selected2FAMethod === 'email' 
                    ? 'We\'ve sent a verification code to your email. Enter it below:'
                    : 'Scan the QR code with your authenticator app and enter the code:'
                  }
                </p>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter verification code"
                />
                <button
                  onClick={() => setShowRecoveryCodes(true)}
                  className="w-full py-2 text-purple-600 hover:text-purple-700 text-sm"
                >
                  Show backup recovery codes
                </button>
                {showRecoveryCodes && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-2">Save these recovery codes:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {recoveryCodes.map((code, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                          <span>{code}</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(code)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={handle2FAComplete}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Enable 2FA
                </button>
              </div>
            )}

            {twoFactorEnabled && (
              <div className="space-y-4">
                <p className="text-gray-600">Are you sure you want to disable two-factor authentication?</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setTwoFactorEnabled(false);
                      setShow2FAModal(false);
                    }}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Disable 2FA
                  </button>
                  <button
                    onClick={() => setShow2FAModal(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength <= 1 ? 'text-red-500' : 
                        passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>Password must contain:</p>
                <ul className="ml-4 space-y-1">
                  <li className={passwordData.newPassword.length >= 8 ? 'text-green-600' : ''}>
                    ✓ At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(passwordData.newPassword) ? 'text-green-600' : ''}>
                    ✓ At least 1 uppercase letter
                  </li>
                  <li className={/[0-9]/.test(passwordData.newPassword) ? 'text-green-600' : ''}>
                    ✓ At least 1 number
                  </li>
                </ul>
              </div>

              <button
                onClick={handlePasswordUpdate}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Sessions Modal */}
      {showSessionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Active Sessions</h3>
              <button
                onClick={() => setShowSessionsModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${session.deviceType === 'Mobile' ? 'bg-blue-50' : 'bg-green-50'}`}>
                      <Smartphone size={20} className={session.deviceType === 'Mobile' ? 'text-blue-600' : 'text-green-600'} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {session.deviceType} • {session.browser}
                        {session.current && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Current</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{session.location}</div>
                      <div className="text-xs text-gray-400">Last active: {session.lastActive}</div>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => handleLogoutSession(session.id)}
                      className="text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleLogoutAllSessions}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Logout from all other sessions
              </button>
              <button
                onClick={() => setShowSessionsModal(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Deactivation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Deactivate Account</h3>
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-xl">
                <p className="text-orange-800 text-sm">
                  Deactivating your account will temporarily disable your profile. You can reactivate it anytime by logging back in.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Reason (optional)</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Tell us why you're deactivating your account..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password Confirmation</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAccountDeactivation}
                  className="flex-1 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
                >
                  Deactivate Account
                </button>
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Deletion Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Delete Account</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-red-800 text-sm font-medium mb-2">⚠️ This action is irreversible</p>
                <p className="text-red-700 text-sm">
                  Deleting your account will permanently remove all your data, including:
                </p>
                <ul className="mt-2 ml-4 text-sm text-red-700 space-y-1">
                  <li>• Profile information</li>
                  <li>• Match history</li>
                  <li>• Messages and conversations</li>
                  <li>• Preferences and settings</li>
                </ul>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type "DELETE" to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="DELETE"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAccountDeletion}
                  disabled={deleteConfirmation !== 'DELETE'}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Permanently Delete Account
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
