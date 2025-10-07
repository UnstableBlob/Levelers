'use client';

import React, { useEffect } from 'react';

export default function Reviews() {

  const testimonials = [
    {
      id: 1,
      quote: "Working with Lvlrs was a game-changer. Our new web app launched 3 weeks early and reduced customer churn by 25%. Highly recommend their professionalism.",
      name: "Priya Mehta",
      role: "Founder",
      company: "Bloom Analytics"
    },
    {
      id: 2,
      quote: "Their UI/UX team completely revamped our online store. Our conversion rate doubled within two months!",
      name: "Daniel Rivera",
      role: "E-commerce Lead",
      company: "UrbanKnit"
    },
    {
      id: 3,
      quote: "From concept to delivery, the process was smooth and collaborative. The final website perfectly captures our brand.",
      name: "Sofia Kim",
      role: "Creative Director",
      company: "Horizon Studio"
    },
    {
      id: 4,
      quote: "The social media campaign Lvlrs built brought in 50% more engagement than our previous strategy.",
      name: "Aaron Patel",
      role: "Marketing Head",
      company: "NextGen Motors"
    },
    {
      id: 5,
      quote: "Fast communication, flawless execution, and amazing design sense. Can't wait to work with them again.",
      name: "Lina D'Souza",
      role: "Product Manager",
      company: "AlphaWare"
    }
  ];

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-70%vh py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">


      <div className="relative max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-center min-h-[70vh]">
          {/* Left Side - Header Section */}
          <div className="lg:col-span-2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Client
              <br />
              Success
              <br />
              Stories
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed font-light mb-8">
              Hear from our partners who trusted us to bring their vision to life.
            </p>
            
            {/* Leave a Review Button - Desktop */}
            <div className="hidden lg:block">
              <button 
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Leave a Review
              </button>
            </div>
          </div>

          {/* Right Side - Testimonials */}
          <div className="lg:col-span-3 flex items-center">
            {/* Horizontal Scrolling Carousel */}
            <div className="relative overflow-hidden w-full">
              <div className="scrolling-testimonials flex gap-6">
                {/* First set of testimonials */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`first-${testimonial.id}`}
                    className="testimonial-card flex-shrink-0 w-80 p-6 rounded-2xl shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1 hover:shadow-xl hover:shadow-blue-500/10 "
                  >
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <svg 
                        className="w-6 h-6 text-blue-400 opacity-60" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"/>
                      </svg>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-gray-200 text-sm leading-relaxed italic mb-6 min-h-[100px]">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Reviewer Info */}
                    <div className="border-t border-white/10 pt-4">
                      <div className="font-bold text-white text-sm mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-blue-400 text-xs font-medium mb-1">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-400 text-xs font-light">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for infinite scroll */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`second-${testimonial.id}`}
                    className="testimonial-card flex-shrink-0 w-80 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-xl hover:shadow-blue-500/10 transform transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/20"
                  >
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <svg 
                        className="w-6 h-6 text-blue-400 opacity-60" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"/>
                      </svg>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-gray-200 text-sm leading-relaxed italic mb-6 min-h-[100px]">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Reviewer Info */}
                    <div className="border-t border-white/10 pt-4">
                      <div className="font-bold text-white text-sm mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-blue-400 text-xs font-medium mb-1">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-400 text-xs font-light">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Leave a Review Button */}
        <div className="lg:hidden text-center mt-12">
          <button 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Leave a Review
          </button>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrolling-testimonials {
          animation: scroll 5s linear infinite;
        }
        
        .scrolling-testimonials:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}