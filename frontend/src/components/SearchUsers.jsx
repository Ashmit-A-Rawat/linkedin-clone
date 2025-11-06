import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, X, User, MapPin, Briefcase, Code, Users, Filter } from 'lucide-react';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchInfo, setSearchInfo] = useState(null);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Get API URL from environment or default to localhost
  const API_URL = import.meta.env.BACKEND_URL || 'http://localhost:5001';

  const filters = [
    { key: 'all', label: 'All', icon: Users },
    { key: 'people', label: 'People', icon: User },
    { key: 'skills', label: 'Skills', icon: Code },
    { key: 'companies', label: 'Companies', icon: Briefcase },
  ];

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSearchInfo(null);
      setShowResults(false);
      setError(null);
      return;
    }

    const searchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const searchUrl = `${API_URL}/api/users/search`;
        console.log('🔍 Search URL:', searchUrl);
        console.log('🔍 Searching for:', query, 'with filter:', activeFilter);
        
        const response = await axios.get(searchUrl, {
          params: {
            q: query,
            filter: activeFilter,
            limit: 8
          }
        });
        
        console.log('✅ Search response:', response.data);
        console.log('✅ Found users:', response.data.users);
        
        if (response.data.success) {
          setResults(response.data.users || []);
          setSearchInfo(response.data.searchInfo);
          setShowResults(true);
        } else {
          setError('Search failed');
          setResults([]);
        }
      } catch (error) {
        console.error('❌ Search error:', error);
        console.error('Error response:', error.response?.data);
        setError(error.response?.data?.message || 'Search failed');
        setResults([]);
        setSearchInfo(null);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [query, activeFilter, API_URL]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearchInfo(null);
    setShowResults(false);
    setError(null);
  };

  const handleUserClick = (user) => {
    console.log('Selected user:', user);
    setShowResults(false);
    setQuery('');
    
    // Navigate to user profile
    if (user._id) {
      navigate(`/profile/${user._id}`);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for people, skills, or industries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Search Info */}
          {searchInfo && (
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  {results.length} results for "{searchInfo.query}"
                </span>
                <div className="flex items-center gap-1">
                  <Filter className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600 capitalize">
                    {searchInfo.filter}
                  </span>
                </div>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex gap-1 mt-2">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                        activeFilter === filter.key
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 text-center text-red-500">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  onClick={() => handleUserClick(user)}
                >
                  <img
                    src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0a66c2&color=fff&size=64`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {user.name}
                    </h4>
                    {user.headline && (
                      <p className="text-xs text-gray-600 truncate flex items-center gap-1 mt-0.5">
                        <Briefcase className="w-3 h-3" />
                        {user.headline}
                      </p>
                    )}
                    {user.industry && (
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {user.industry}
                      </p>
                    )}
                    {user.skills && user.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.skills.slice(0, 3).map((skill, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {user.skills.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{user.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : query && !loading && !error ? (
            <div className="p-4 text-center text-gray-500">
              <User className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No users found</p>
              <p className="text-xs">Try different keywords or filters</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchUsers;