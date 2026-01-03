import { Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import heroImage from '../assets/images.jpg';

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!agreed) {
      setError('Please accept the Terms & Condition.');
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: fullName.trim() });
      }
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
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4 py-10">
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
              <div className="text-3xl font-bold">Easy to Find Client</div>
              <div className="mt-2 text-white/90">Find client from all around the world</div>
              <div className="mt-6 flex gap-2">
                <span className="h-1.5 w-8 rounded-full bg-white" />
                <span className="h-1.5 w-2 rounded-full bg-white/60" />
                <span className="h-1.5 w-2 rounded-full bg-white/60" />
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="flex items-center justify-center">
              <div className="text-teal-600 font-bold text-xl">UniMate</div>
            </div>

            <h1 className="mt-8 text-3xl font-bold text-gray-900 text-center">Create your account</h1>
            <p className="mt-2 text-gray-500 text-center">start for free</p>

            <form className="mt-8 space-y-4" onSubmit={handleSignup}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-teal-200"
                />
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
                className="w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-60 disabled:hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Please wait...' : 'Continue'}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-sm text-gray-400">or</div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="h-5 w-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm font-bold">
                  G
                </span>
                Sign up with Google
              </button>

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
