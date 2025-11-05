import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  UserPlus, 
  UserCheck, 
  MapPin, 
  Briefcase, 
  Mail,
  MoreHorizontal,
  Filter,
  X
} from 'lucide-react';

const Network = () => {
  const [activeTab, setActiveTab] = useState('connections');
  const [searchQuery, setSearchQuery] = useState('');

  const connections = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Product Manager at TechCorp',
      mutual: 15,
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Chen',
      title: 'Full Stack Developer at StartupHub',
      mutual: 8,
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'UX Designer at DesignStudio',
      mutual: 12,
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Data Scientist at AI Labs',
      mutual: 6,
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      title: 'Engineering Manager at CloudTech',
      mutual: 20,
      location: 'Boston, MA',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const invitations = [
    {
      id: 1,
      name: 'Alex Turner',
      title: 'Marketing Director at BrandCo',
      mutual: 3,
      message: 'We worked together on the Global Campaign 2023'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      title: 'HR Business Partner at TalentFirst',
      mutual: 7,
      message: 'We both studied at Stanford University'
    }
  ];

  const suggested = [
    {
      id: 1,
      name: 'James Wilson',
      title: 'Frontend Developer at WebSolutions',
      mutual: 4,
      reason: 'Based on your profile and connections'
    },
    {
      id: 2,
      name: 'Sophie Brown',
      title: 'Product Designer at CreativeMinds',
      mutual: 9,
      reason: 'Works in similar companies'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f2ef] pt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-[#00000014] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-[#000000e6]">Manage your network</h1>
              <p className="text-sm text-[#00000099] mt-1">Grow and nurture your professional connections</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c2] hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#00000014]">
            {[
              { key: 'connections', label: 'Connections', count: connections.length },
              { key: 'invitations', label: 'Invitations', count: invitations.length },
              { key: 'suggested', label: 'Suggested', count: suggested.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.key
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

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'connections' && (
              <div className="space-y-4">
                {connections.map((connection) => (
                  <div key={connection.id} className="bg-white rounded-lg border border-[#00000014] p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <img
                          src={connection.avatar}
                          alt={connection.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-[#000000e6] hover:text-[#0a66c2] hover:underline cursor-pointer">
                            {connection.name}
                          </h3>
                          <p className="text-sm text-[#00000099] mt-1">{connection.title}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-[#00000099]">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {connection.mutual} mutual connections
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {connection.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c20a] transition-colors">
                          <Mail className="w-4 h-4" />
                          Message
                        </button>
                        <button className="p-1.5 text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'invitations' && (
              <div className="space-y-4">
                {invitations.map((invite) => (
                  <div key={invite.id} className="bg-white rounded-lg border border-[#00000014] p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(invite.name)}&background=0a66c2&color=fff&size=64`}
                          alt={invite.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-[#000000e6]">{invite.name}</h3>
                          <p className="text-sm text-[#00000099] mt-1">{invite.title}</p>
                          <p className="text-xs text-[#00000099] mt-2">{invite.message}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-[#00000099]">
                            <Users className="w-3 h-3" />
                            {invite.mutual} mutual connections
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 text-sm font-semibold text-white bg-[#0a66c2] rounded-full hover:bg-[#004182] transition-colors">
                          <UserCheck className="w-4 h-4" />
                          Accept
                        </button>
                        <button className="px-4 py-1.5 text-sm font-semibold text-[#00000099] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                          <X className="w-4 h-4" />
                          Ignore
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'suggested' && (
              <div className="space-y-4">
                {suggested.map((suggestion) => (
                  <div key={suggestion.id} className="bg-white rounded-lg border border-[#00000014] p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(suggestion.name)}&background=0a66c2&color=fff&size=64`}
                          alt={suggestion.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-[#000000e6]">{suggestion.name}</h3>
                          <p className="text-sm text-[#00000099] mt-1">{suggestion.title}</p>
                          <p className="text-xs text-[#00000099] mt-2">{suggestion.reason}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-[#00000099]">
                            <Users className="w-3 h-3" />
                            {suggestion.mutual} mutual connections
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-4 py-1.5 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c20a] transition-colors">
                          <UserPlus className="w-4 h-4" />
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Network Stats */}
            <div className="bg-white rounded-lg border border-[#00000014] p-4">
              <h3 className="font-semibold text-[#000000e6] mb-3">Your network</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#00000099]">Connections</span>
                  <span className="font-semibold text-[#000000e6]">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#00000099]">Following</span>
                  <span className="font-semibold text-[#000000e6]">245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#00000099]">Followers</span>
                  <span className="font-semibold text-[#000000e6]">312</span>
                </div>
              </div>
            </div>

            {/* Grow Your Network */}
            <div className="bg-white rounded-lg border border-[#00000014] p-4">
              <h3 className="font-semibold text-[#000000e6] mb-3">Grow your network</h3>
              <p className="text-sm text-[#00000099] mb-3">
                Connect with professionals who can help your career
              </p>
              <button className="w-full text-center py-2 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c20a] transition-colors">
                Find connections
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;