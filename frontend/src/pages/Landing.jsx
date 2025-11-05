import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Search, 
  MessageCircle,
  ChevronRight,
  CheckCircle,
  Globe
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-[#00000014] sticky top-0 z-50">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="flex justify-between items-center h-[52px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1">
              <div className="w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">in</span>
              </div>
              <span className="text-xl font-bold text-[#000000e6] hidden sm:block">LinkedIn</span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-[#00000099] hover:bg-[#0000000a] hover:text-[#000000e6] px-4 py-2 rounded-full text-base font-semibold transition-all"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-transparent border-2 border-[#0a66c2] text-[#0a66c2] px-5 py-2 rounded-full hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-all text-base font-semibold"
              >
                Join now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[#f3f2ef] py-16 sm:py-24">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#000000e6] leading-tight">
                Welcome to your professional community
              </h1>
              <p className="text-xl sm:text-2xl text-[#00000099] leading-relaxed">
                Connect with the right people, discover opportunities, and build your career
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/register"
                  className="bg-[#0a66c2] text-white px-8 py-3 rounded-full hover:bg-[#004182] transition-all font-semibold text-lg text-center shadow-md hover:shadow-lg"
                >
                  Get started - it's free
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-[#00000029] text-[#00000099] px-8 py-3 rounded-full hover:border-[#00000052] hover:bg-[#0000000a] transition-all font-semibold text-lg text-center"
                >
                  Sign in
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-6 text-sm text-[#00000099]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#5f9b41] rounded-full"></div>
                  <span>850M+ members worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0a66c2] rounded-full"></div>
                  <span>200+ countries & regions</span>
                </div>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#00000014]">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0a66c2] to-[#378fe9] rounded-full flex items-center justify-center mx-auto">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[#0a66c2] font-bold text-2xl">in</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-[#000000e6]">
                      Join professionals worldwide
                    </h3>
                    <p className="text-[#00000099]">
                      Start building your professional network today
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="p-4 bg-[#f3f2ef] rounded-lg">
                      <div className="text-2xl font-bold text-[#0a66c2]">850M+</div>
                      <div className="text-xs text-[#00000099] mt-1">Members</div>
                    </div>
                    <div className="p-4 bg-[#f3f2ef] rounded-lg">
                      <div className="text-2xl font-bold text-[#0a66c2]">200+</div>
                      <div className="text-xs text-[#00000099] mt-1">Countries</div>
                    </div>
                    <div className="p-4 bg-[#f3f2ef] rounded-lg">
                      <div className="text-2xl font-bold text-[#0a66c2]">58M+</div>
                      <div className="text-xs text-[#00000099] mt-1">Companies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#000000e6] mb-4">
              Explore collaborative articles
            </h2>
            <p className="text-xl text-[#00000099] max-w-3xl mx-auto">
              We're unlocking community knowledge in a new way. Experts add insights directly into each article, started with the help of AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group bg-white rounded-lg p-6 border border-[#00000014] hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#e7f3ff] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-[#0a66c2]" />
              </div>
              <h3 className="text-xl font-semibold text-[#000000e6] mb-3">
                Connect with people who can help
              </h3>
              <p className="text-[#00000099] leading-relaxed">
                Find people you know, discover new connections, and build your professional network.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-lg p-6 border border-[#00000014] hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#f0f8f0] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-[#5f9b41]" />
              </div>
              <h3 className="text-xl font-semibold text-[#000000e6] mb-3">
                Learn the skills you need to succeed
              </h3>
              <p className="text-[#00000099] leading-relaxed">
                Choose from thousands of courses with new additions published every month.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-lg p-6 border border-[#00000014] hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#fff5f0] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-[#e16745]" />
              </div>
              <h3 className="text-xl font-semibold text-[#000000e6] mb-3">
                Find the right job or internship
              </h3>
              <p className="text-[#00000099] leading-relaxed">
                Find roles that fit your interests and career goals with personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#f3f2ef]">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#000000e6]">
                Let the right people know you're open to work
              </h2>
              <p className="text-lg text-[#00000099] leading-relaxed">
                With the Open To Work feature, you can privately tell recruiters or publicly share with the LinkedIn community that you are looking for new job opportunities.
              </p>
              <div className="space-y-3">
                {[
                  'Get noticed by recruiters',
                  'Signal your interest privately or publicly',
                  'Control who sees your open to work status'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#057642] flex-shrink-0 mt-0.5" />
                    <span className="text-[#000000e6]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#00000014]">
              <div className="aspect-square bg-gradient-to-br from-[#0a66c2] to-[#378fe9] rounded-xl flex items-center justify-center">
                <Search className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a66c2] text-white">
        <div className="max-w-[1128px] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
            Join your colleagues, classmates, and friends on LinkedIn
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get started - it's free
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-[#0a66c2] px-10 py-3 rounded-full hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg"
          >
            Join now
          </Link>
          <div className="mt-8 flex items-center justify-center gap-2 text-blue-100">
            <Globe className="w-5 h-5" />
            <span className="text-sm">Available in over 200 countries and regions</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#00000014] py-8">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#0a66c2] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">in</span>
              </div>
              <span className="text-sm font-semibold text-[#000000e6]">LinkedIn Clone © 2024</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#00000099]">
              <a href="#" className="hover:text-[#0a66c2] hover:underline">About</a>
              <a href="#" className="hover:text-[#0a66c2] hover:underline">Accessibility</a>
              <a href="#" className="hover:text-[#0a66c2] hover:underline">Help Center</a>
              <a href="#" className="hover:text-[#0a66c2] hover:underline">Privacy & Terms</a>
              <a href="#" className="hover:text-[#0a66c2] hover:underline">Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;