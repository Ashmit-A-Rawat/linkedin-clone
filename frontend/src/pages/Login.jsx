import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-[#00000014]">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="flex justify-between items-center h-[52px]">
            <Link to="/" className="flex items-center gap-1">
              <div className="w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">in</span>
              </div>
              <span className="text-xl font-bold text-[#000000e6]">LinkedIn</span>
            </Link>
            <div className="text-sm text-[#00000099]">
              Not a member?{' '}
              <Link to="/register" className="font-semibold text-[#0a66c2] hover:underline">
                Join now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f3f2ef]">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-[#000000e6] mb-2">
              Sign in
            </h2>
            <p className="text-sm text-[#00000099]">
              Stay updated on your professional world
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md border border-[#00000014] p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">{error}</div>
                </div>
              )}
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#000000e6] mb-1">
                  Email or Phone
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#00000052] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#000000e6] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#00000052] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent transition-all pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00000099] hover:text-[#000000e6]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm font-semibold text-[#0a66c2] hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0a66c2] text-white py-3 rounded-full text-base font-semibold hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#00000014]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-[#00000099]">or</span>
              </div>
            </div>

            {/* Google Sign In (Placeholder) */}
            <button
              type="button"
              className="w-full border border-[#00000052] text-[#00000099] py-3 rounded-full text-base font-semibold hover:bg-[#0000000a] hover:border-[#000000e6] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-sm text-[#000000e6]">New to LinkedIn? </span>
              <Link to="/register" className="text-sm font-semibold text-[#0a66c2] hover:underline">
                Join now
              </Link>
            </div>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-[#00000099] leading-relaxed">
            By clicking Continue, you agree to LinkedIn's{' '}
            <a href="#" className="text-[#0a66c2] hover:underline">User Agreement</a>,{' '}
            <a href="#" className="text-[#0a66c2] hover:underline">Privacy Policy</a>, and{' '}
            <a href="#" className="text-[#0a66c2] hover:underline">Cookie Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;