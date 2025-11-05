import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  Home, 
  Bell, 
  Briefcase, 
  Users,
  Search,
  Grid
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavItem = ({ to, icon: Icon, label, badge }) => (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-3 py-2 rounded transition-colors relative group ${
        isActive(to)
          ? 'text-[#000000e6]'
          : 'text-[#00000099] hover:text-[#000000e6]'
      }`}
    >
      <div className="relative">
        <Icon className="w-6 h-6" />
        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs mt-1 font-normal">
        {label}
      </span>
      {isActive(to) && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000000e6]"></div>
      )}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#00000014] shadow-sm">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="flex items-center justify-between h-[52px]">
          {/* Left Side - Logo & Search */}
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-1">
              <div className="w-9 h-9 bg-[#0a66c2] rounded flex items-center justify-center hover:bg-[#004182] transition-colors">
                <span className="text-white font-bold text-sm">in</span>
              </div>
            </Link>
            
            {/* Search Bar */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#00000099] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-64 pl-8 pr-3 py-1.5 bg-[#eef3f8] text-sm rounded-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0a66c2] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Navigation */}
          {user ? (
            <div className="flex items-center">
              {/* Navigation Icons */}
              <div className="flex items-center">
                <NavItem to="/dashboard" icon={Home} label="Home" />
                
                <NavItem to="/network" icon={Users} label="My Network" />
                
                <NavItem to="/jobs" icon={Briefcase} label="Jobs" />
                
                <NavItem to="/chat" icon={MessageCircle} label="Messaging" badge={3} />
                
                <NavItem to="/notifications" icon={Bell} label="Notifications" badge={5} />
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-[#00000014] mx-2"></div>

              {/* User Profile & Dropdown */}
              <div className="relative group">
                <button className="flex flex-col items-center justify-center px-3 py-2 rounded transition-colors text-[#00000099] hover:text-[#000000e6]">
                  <img
                    src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a66c2&color=fff&size=64`}
                    alt={user?.name}
                    className="w-6 h-6 rounded-full border border-[#00000014]"
                  />
                  <div className="flex items-center gap-0.5 text-xs mt-1">
                    <span>Me</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-[#00000014] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-4 border-b border-[#00000014]">
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a66c2&color=fff&size=128`}
                        alt={user?.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-[#000000e6] truncate">
                          {user?.name}
                        </h3>
                        <p className="text-xs text-[#00000099] truncate">
                          {user?.headline || 'Add a headline'}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="mt-3 block text-center text-sm font-semibold text-[#0a66c2] hover:underline border border-[#0a66c2] rounded-full py-1 hover:bg-[#0a66c2] hover:text-white transition-all"
                    >
                      View Profile
                    </Link>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-[#000000e6] hover:bg-[#0000000a] transition-colors"
                    >
                      Settings & Privacy
                    </Link>
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-sm text-[#000000e6] hover:bg-[#0000000a] transition-colors"
                    >
                      Help
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[#000000e6] hover:bg-[#0000000a] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* For Business Dropdown */}
              <div className="hidden lg:block relative group">
                <button className="flex flex-col items-center justify-center px-3 py-2 rounded transition-colors text-[#00000099] hover:text-[#000000e6] border-l border-[#00000014]">
                  <Grid className="w-6 h-6" />
                  <div className="flex items-center gap-0.5 text-xs mt-1">
                    <span>For Business</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-72 bg-white rounded-lg shadow-lg border border-[#00000014] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-4">
                    <h3 className="text-xs font-semibold text-[#00000099] mb-2">FOR BUSINESS</h3>
                    <div className="space-y-1">
                      <a href="#" className="block px-3 py-2 text-sm text-[#000000e6] hover:bg-[#0000000a] rounded transition-colors">
                        Post a job
                      </a>
                      <a href="#" className="block px-3 py-2 text-sm text-[#000000e6] hover:bg-[#0000000a] rounded transition-colors">
                        Advertise
                      </a>
                      <a href="#" className="block px-3 py-2 text-sm text-[#000000e6] hover:bg-[#0000000a] rounded transition-colors">
                        Find leads
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-[#00000099] hover:bg-[#0000000a] hover:text-[#000000e6] px-4 py-2 rounded-full text-base font-semibold transition-all"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-transparent border-2 border-[#0a66c2] text-[#0a66c2] px-5 py-2 rounded-full hover:bg-[#0a66c2] hover:text-white transition-all text-base font-semibold"
              >
                Join now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;