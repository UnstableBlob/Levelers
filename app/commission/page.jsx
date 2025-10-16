'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import BackgroundStatic from '@/components/BackgroundStatic.jsx';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CommissionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service_type: '',
    project_name: '',
    budget: '',
    deadline: '',
    description: ''
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const services = [
    "App Development",
    "Website Design", 
    "Social Media Marketing",
    "Branding",
    "UI/UX Design",
    "Other"
  ];

  // Check authentication on component mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setAuthLoading(false);
      }
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setAuthLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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
    
    if (!formData.service_type) newErrors.service_type = 'Please select a service';
    if (!formData.project_name.trim()) newErrors.project_name = 'Project name is required';
    if (!formData.budget || formData.budget <= 0) newErrors.budget = 'Please enter a valid budget';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to submit an application. Redirecting to login page...');
      // You can redirect to login page here
      window.location.href = '/auth';
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_type: formData.service_type,
          project_name: formData.project_name,
          budget: formData.budget,
          deadline: formData.deadline,
          description: formData.description,
          user_id: user.id
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Send thank you email
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: user.email,
              userName: formData.project_name, // or use a separate name field if you have one
              projectName: formData.project_name,
              serviceType: formData.service_type,
            }),
          });
        } catch (emailError) {
          console.error('Failed to send email, but application was submitted:', emailError);
          // Don't show error to user, application was successful
        }

        setShowSuccessModal(true);
        
        // Reset form
        setFormData({
          service_type: '',
          project_name: '',
          budget: '',
          deadline: '',
          description: ''
        });
        setErrors({});
      } else {
        alert(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      service_type: '',
      project_name: '',
      budget: '',
      deadline: '',
      description: ''
    });
    setErrors({});
  };

  const redirectToAuth = () => {
    window.location.href = '/auth';
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <BackgroundStatic />
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

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
          
          {/* Authentication Status */}
          {user ? (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400">✓ Logged in as {user.email}</p>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 mb-2">⚠️ You need to be logged in to submit an application</p>
              <button
                onClick={redirectToAuth}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login / Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Main Form Card */}
        <div className="shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1 rounded-3xl p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Service Selection */}
            <div>
              <label htmlFor="service_type" className="block text-lg font-semibold text-white mb-3">
                Service in which you are interested
              </label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleInputChange}
                disabled={!user}
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70 disabled:opacity-50 disabled:cursor-not-allowed
                  ${errors.service_type ? 'border-red-500' : 'border-gray-600'}
                `}
              >
                <option value="">Select a service...</option>
                {services.map(service => (
                  <option key={service} value={service} className="bg-gray-800">
                    {service}
                  </option>
                ))}
              </select>
              {errors.service_type && (
                <p className="mt-2 text-red-400 text-sm">{errors.service_type}</p>
              )}
            </div>

            {/* Project Name */}
            <div>
              <label htmlFor="project_name" className="block text-lg font-semibold text-white mb-3">
                Project Name
              </label>
              <input
                type="text"
                id="project_name"
                name="project_name"
                value={formData.project_name}
                onChange={handleInputChange}
                placeholder="Enter your project name..."
                disabled={!user}
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70 disabled:opacity-50 disabled:cursor-not-allowed
                  ${errors.project_name ? 'border-red-500' : 'border-gray-600'}
                `}
              />
              {errors.project_name && (
                <p className="mt-2 text-red-400 text-sm">{errors.project_name}</p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-lg font-semibold text-white mb-2">
                Budget
              </label>
              <h1 className='text-white/200 mb-2'>
                  Please mention you estimated budget so we can tailor our services to fit your needs.
              </h1>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400 text-lg">₹</span>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="10,000"
                  min="0"
                  step="100"
                  disabled={!user}
                  className={`
                    w-full pl-8 pr-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300 hover:bg-gray-800/70 disabled:opacity-50 disabled:cursor-not-allowed
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
                disabled={!user}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70 disabled:opacity-50 disabled:cursor-not-allowed
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
                disabled={!user}
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border rounded-2xl text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 hover:bg-gray-800/70 resize-none disabled:opacity-50 disabled:cursor-not-allowed
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
                disabled={isSubmitting || !user}
                className="
                  w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg
                  rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25
                  transform transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700
                  focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed
                  relative overflow-hidden group
                "
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : user ? (
                    'Submit Request'
                  ) : (
                    'Please Login to Submit'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  handleCancel();
                  router.push('/');
                }}
                disabled={isSubmitting}
                className="
                  w-full py-4 px-8 bg-gray-700/50 text-gray-300 font-semibold text-lg
                  rounded-2xl border border-gray-600 hover:bg-gray-600/50 hover:text-white
                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500
                  disabled:opacity-50 disabled:cursor-not-allowed
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
                We've received your project request and stored it in our database. Our team will reach out shortly to discuss the details.
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