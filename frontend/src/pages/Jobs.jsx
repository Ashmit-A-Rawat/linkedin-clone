import React, { useState } from 'react';
import { 
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  Building,
  DollarSign,
  Star,
  Bookmark,
  Share2,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState('recommended');

  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechInnovation Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      posted: '2 days ago',
      applicants: 24,
      easyApply: true,
      featured: true,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=center',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS']
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupHub',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      posted: '1 week ago',
      applicants: 18,
      easyApply: true,
      featured: false,
      logo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=64&h=64&fit=crop&crop=center',
      skills: ['JavaScript', 'Python', 'React', 'MongoDB']
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'CreativeMinds',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      posted: '3 days ago',
      applicants: 32,
      easyApply: false,
      featured: true,
      logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=64&h=64&fit=crop&crop=center',
      skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping']
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '5 days ago',
      applicants: 15,
      easyApply: true,
      featured: false,
      logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD']
    }
  ];

  const savedJobs = [
    {
      id: 5,
      title: 'Product Manager',
      company: 'ProductLabs',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      posted: '1 week ago',
      applicants: 28,
      easyApply: false,
      featured: false
    }
  ];

  const displayedJobs = activeFilter === 'recommended' ? recommendedJobs : savedJobs;

  return (
    <div className="min-h-screen bg-[#f3f2ef] pt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-[#00000014] p-6 mb-6">
          <h1 className="text-2xl font-semibold text-[#000000e6] mb-2">Find your next opportunity</h1>
          <p className="text-sm text-[#00000099] mb-6">Discover jobs that match your skills and interests</p>

          {/* Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, skill, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0a66c2] rounded-lg hover:bg-[#004182] transition-colors">
              <Search className="w-4 h-4" />
              Search jobs
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#00000099]">Quick filters:</span>
            <div className="flex gap-2">
              {['Remote', 'Easy Apply', 'Featured', 'Urgent'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 text-xs font-semibold text-[#00000099] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-[#00000014] p-4">
              <h3 className="font-semibold text-[#000000e6] mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#000000e6] mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm text-[#00000099]">
                        <input type="checkbox" className="rounded border-gray-300" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000000e6] mb-2">Experience Level</label>
                  <div className="space-y-2">
                    {['Entry level', 'Mid level', 'Senior level', 'Executive'].map((level) => (
                      <label key={level} className="flex items-center gap-2 text-sm text-[#00000099]">
                        <input type="checkbox" className="rounded border-gray-300" />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000000e6] mb-2">Salary Range</label>
                  <div className="space-y-2">
                    {['$50K+', '$80K+', '$100K+', '$150K+'].map((range) => (
                      <label key={range} className="flex items-center gap-2 text-sm text-[#00000099]">
                        <input type="checkbox" className="rounded border-gray-300" />
                        {range}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Alerts */}
            <div className="bg-white rounded-lg border border-[#00000014] p-4">
              <h3 className="font-semibold text-[#000000e6] mb-2">Job alerts</h3>
              <p className="text-sm text-[#00000099] mb-3">
                Get notified about new jobs that match your criteria
              </p>
              <button className="w-full text-center py-2 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c20a] transition-colors">
                Create alert
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-lg border border-[#00000014] p-4 mb-6">
              <div className="flex gap-6">
                {[
                  { key: 'recommended', label: 'Recommended for you', count: recommendedJobs.length },
                  { key: 'saved', label: 'Saved jobs', count: savedJobs.length },
                  { key: 'applied', label: 'Applied', count: 0 }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFilter(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                      activeFilter === tab.key
                        ? 'border-[#0a66c2] text-[#0a66c2]'
                        : 'border-transparent text-[#00000099] hover:text-[#000000e6]'
                    }`}
                  >
                    {tab.label}
                    <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {displayedJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg border border-[#00000014] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-4">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-[#000000e6] hover:text-[#0a66c2] hover:underline cursor-pointer">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#000000e6] font-medium">{job.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-[#00000099]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors" title="Save job">
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors" title="Share job">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[#00000099]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicants} applicants
                      </span>
                    </div>

                    <div className="flex gap-3">
                      {job.easyApply ? (
                        <button className="px-6 py-2 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c20a] transition-colors">
                          Easy Apply
                        </button>
                      ) : (
                        <button className="px-6 py-2 text-sm font-semibold text-white bg-[#0a66c2] rounded-full hover:bg-[#004182] transition-colors">
                          Apply
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  {job.skills && (
                    <div className="mt-4 pt-4 border-t border-[#00000014]">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-2 text-sm font-semibold text-[#00000099] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Load more jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;