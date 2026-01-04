import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebase';
import heroImage from '../assets/images.jpg';

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreed) {
      setError('Please accept the Terms & Condition.');
      return;
    }

    try {
      setLoading(true);
      
      // Firebase authentication
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: fullName.trim() });
      }

      // Also store in MongoDB
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          firebaseUid: cred.user?.uid
        }),
      });

      const data = await response.json();
      console.log('User created in MongoDB:', data.user);

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      setLoading(true);
      
      // Firebase Google signup
      const result = await signInWithPopup(auth, googleProvider);
      
      // Also store in MongoDB
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: result.user.displayName || 'Google User',
          email: result.user.email,
          password: 'google-auth-' + Date.now(),
          firebaseUid: result.user.uid
        }),
      });

      const data = await response.json();
      console.log('Google user created in MongoDB:', data.user);

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setError(null);
    try {
      setLoading(true);
      
      // Firebase GitHub signup
      const result = await signInWithPopup(auth, githubProvider);
      
      // Also store in MongoDB
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: result.user.displayName || 'GitHub User',
          email: result.user.email,
          password: 'github-auth-' + Date.now(),
          firebaseUid: result.user.uid
        }),
      });

      const data = await response.json();
      console.log('GitHub user created in MongoDB:', data.user);

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'GitHub signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4 py-6 relative">
      {/* Back Button - Top Left */}
      <button
        onClick={handleBackClick}
        className="absolute top-8 left-8 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-600 hover:text-teal-600 hover:bg-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative hidden md:block">
            <img
              src={heroImage}
              alt="UniMate"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute left-8 right-8 bottom-10 text-white">
              <div className="text-3xl font-bold">UniMate</div>
              <div className="mt-2 text-white/90">Connect with your compatible RoomMate</div>
              <div className="mt-6 flex gap-2">
                <span className="h-1.5 w-8 rounded-full bg-white" />
                <span className="h-1.5 w-2 rounded-full bg-white/60" />
                <span className="h-1.5 w-2 rounded-full bg-white/60" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center">
              <div className="text-teal-600 font-bold text-xl">UniMate</div>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 text-center">Create your account</h1>
            <form className="mt-6 space-y-3" onSubmit={handleSignup}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 outline-none focus:ring-2 focus:ring-teal-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 outline-none focus:ring-2 focus:ring-teal-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span>
                  I agree with the{' '}
                  <a href="#" className="text-teal-700 font-medium hover:underline">
                    Terms &amp; Condition
                  </a>
                </span>
              </label>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-60 disabled:hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                {loading ? 'Please wait...' : 'Continue'}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-sm text-gray-400">or</div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={handleGithubSignup}
                  disabled={loading}
                  className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              <div className="text-sm text-gray-600 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-teal-700 font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
