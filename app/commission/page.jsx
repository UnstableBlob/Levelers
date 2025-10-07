'use client';

import { useState } from 'react';
import BackgroundStatic from '@/components/BackgroundStatic.jsx';

export default function CommissionPage() {
  const [formData, setFormData] = useState({
    service: '',
    projectName: '',
    budget: '',
    deadline: '',
    description: ''
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

  const services = [
    "App Development",
    "Website Design", 
    "Social Media Marketing",
    "Branding",
    "UI/UX Design",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        service: '',
        projectName: '',
        budget: '',
        deadline: '',
        description: ''
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      service: '',
      projectName: '',
      budget: '',
      deadline: '',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <BackgroundStatic />

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Amazing
            </span>{' '}
            Together
          </h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto">
            Tell us about your project and we'll get in touch soon.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1 rounded-3xl p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-lg font-semibold text-white mb-3">
                Service in which you are interested
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70
                  ${errors.service ? 'border-red-500' : 'border-gray-600'}
                `}
              >
                <option value="">Select a service...</option>
                {services.map(service => (
                  <option key={service} value={service} className="bg-gray-800">
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-2 text-red-400 text-sm">{errors.service}</p>
              )}
            </div>

            {/* Project Name */}
            <div>
              <label htmlFor="projectName" className="block text-lg font-semibold text-white mb-3">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter your project name..."
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70
                  ${errors.projectName ? 'border-red-500' : 'border-gray-600'}
                `}
              />
              {errors.projectName && (
                <p className="mt-2 text-red-400 text-sm">{errors.projectName}</p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-lg font-semibold text-white mb-3">
                Budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400 text-lg">$</span>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="10,000"
                  min="0"
                  step="100"
                  className={`
                    w-full pl-8 pr-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300 hover:bg-gray-800/70
                    ${errors.budget ? 'border-red-500' : 'border-gray-600'}
                  `}
                />
              </div>
              {errors.budget && (
                <p className="mt-2 text-red-400 text-sm">{errors.budget}</p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-lg font-semibold text-white mb-3">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70
                  ${errors.deadline ? 'border-red-500' : 'border-gray-600'}
                `}
              />
              {errors.deadline && (
                <p className="mt-2 text-red-400 text-sm">{errors.deadline}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-lg font-semibold text-white mb-3">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your project vision, goals, and any specific requirements..."
                rows="6"
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70 resize-none
                  ${errors.description ? 'border-red-500' : 'border-gray-600'}
                `}
              />
              {errors.description && (
                <p className="mt-2 text-red-400 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4 pt-6">
              <button
                type="submit"
                className="
                  w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg
                  rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25
                  transform transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700
                  focus:outline-none focus:ring-4 focus:ring-blue-500/50
                  relative overflow-hidden group
                "
              >
                <span className="relative z-10">Submit Request</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="
                  w-full py-4 px-8 bg-gray-700/50 text-gray-300 font-semibold text-lg
                  rounded-2xl border border-gray-600 hover:bg-gray-600/50 hover:text-white
                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500
                "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-600 rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
              <p className="text-gray-300 mb-8">
                We've received your project request and will reach out shortly to discuss the details.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="
                  px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold
                  rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}