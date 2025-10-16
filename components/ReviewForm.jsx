'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ReviewForm({ onClose }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    rating: 5,
    review_text: ''
  });

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.review_text.trim()) {
      newErrors.review_text = 'Review text is required';
    } else if (formData.review_text.trim().length < 20) {
      newErrors.review_text = 'Review must be at least 20 characters';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to submit a review');
      router.push('/auth');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            user_id: user.id,
            user_email: user.email,
            name: formData.name.trim(),
            role: formData.role.trim() || null,
            company: formData.company.trim() || null,
            rating: formData.rating,
            review_text: formData.review_text.trim(),
            is_approved: false
          }
        ]);

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToAuth = () => {
    router.push('/auth');
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 border border-gray-600 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
            <p className="text-gray-300">
              Your review has been submitted and is pending approval. We appreciate your feedback!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl mt-5 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Leave a Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Login Warning */}
        {!user && (
          <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 mb-2">⚠️ You need to be logged in to submit a review</p>
            <button
              onClick={redirectToAuth}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login / Sign Up
            </button>
          </div>
        )}

        {user && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-400">✓ Logged in as {user.email}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-white mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!user}
              placeholder="John Doe"
              className={`
                w-full px-4 py-2.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                ${errors.name ? 'border-red-500' : 'border-gray-600'}
              `}
            />
            {errors.name && (
              <p className="mt-2 text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-base font-semibold text-white mb-2">
              Your Role <span className="text-gray-400 text-sm font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={!user}
              placeholder="CEO, Developer, Designer, etc."
              className="
                w-full px-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              "
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-base font-semibold text-white mb-2">
              Company <span className="text-gray-400 text-sm font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              disabled={!user}
              placeholder="Your Company Name"
              className="
                w-full px-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              "
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-base font-semibold text-white mb-2">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  disabled={!user}
                  className={`
                    text-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-600'}
                    hover:scale-110 focus:outline-none
                  `}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-2 text-red-400 text-sm">{errors.rating}</p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="review_text" className="block text-base font-semibold text-white mb-2">
              Your Review *
            </label>
            <textarea
              id="review_text"
              name="review_text"
              value={formData.review_text}
              onChange={handleInputChange}
              disabled={!user}
              placeholder="Tell us about your experience working with us..."
              rows="4"
              className={`
                w-full px-4 py-2.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed
                ${errors.review_text ? 'border-red-500' : 'border-gray-600'}
              `}
            />
            {errors.review_text && (
              <p className="mt-2 text-red-400 text-sm">{errors.review_text}</p>
            )}
            <p className="mt-2 text-gray-400 text-sm">Minimum 20 characters</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !user}
              className="
                flex-1 py-2.5 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold
                rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25
                transform transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700
                focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : user ? (
                'Submit Review'
              ) : (
                'Please Login to Submit'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                px-6 py-2.5 bg-gray-700/50 text-gray-300 font-semibold
                rounded-xl border border-gray-600 hover:bg-gray-600/50 hover:text-white
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
  );
}