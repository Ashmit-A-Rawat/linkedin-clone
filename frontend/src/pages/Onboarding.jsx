import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    headline: '',
    industry: '',
    location: '',
    skills: [],
    currentSkill: '',
    bio: '',
    experienceLevel: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Marketing',
    'Sales',
    'Design',
    'Engineering',
    'Business Development',
    'Human Resources',
    'Operations',
    'Other'
  ];

  const experienceLevels = [
    'Student',
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Executive',
    'Founder'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSkill = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.currentSkill.trim()],
        currentSkill: ''
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to save onboarding data
    try {
      // Here you would typically save the onboarding data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = () => {
    return (step / 4) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of 4</span>
            <span className="text-sm text-gray-600">{getProgress().toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-linkedin-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-linkedin-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">in</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name}!
            </h2>
            <p className="text-gray-600">
              Let's set up your professional profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer at Tech Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin-blue focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin-blue focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin-blue focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Skills */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Your Skills
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.currentSkill}
                      onChange={(e) => setFormData({...formData, currentSkill: e.target.value})}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., JavaScript, React, Python"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin-blue focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {formData.skills.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Skills ({formData.skills.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-1 bg-blue-100 text-linkedin-blue px-3 py-1 rounded-full text-sm"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-linkedin-blue hover:text-linkedin-dark"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Experience & Bio */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin-blue focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select your experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your professional background, achievements, and goals..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin-blue focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Review Your Profile</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Headline:</span>
                      <p className="font-medium">{formData.headline}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Industry:</span>
                      <p className="font-medium">{formData.industry}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Location:</span>
                      <p className="font-medium">{formData.location}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-linkedin-blue px-2 py-1 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Experience Level:</span>
                      <p className="font-medium">{formData.experienceLevel}</p>
                    </div>
                    
                    {formData.bio && (
                      <div>
                        <span className="text-sm text-gray-600">Bio:</span>
                        <p className="font-medium mt-1">{formData.bio}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Your profile will be visible to other professionals. You can always update this information later.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-linkedin-blue text-white rounded-lg hover:bg-linkedin-dark transition duration-200"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-linkedin-blue text-white rounded-lg hover:bg-linkedin-dark disabled:opacity-50 transition duration-200"
                >
                  {loading ? 'Setting up...' : 'Complete Profile'}
                </button>
              )}
            </div>
          </form>

          {/* Skip for now */}
          {step === 1 && (
            <div className="text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-linkedin-blue hover:text-linkedin-dark text-sm"
              >
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;