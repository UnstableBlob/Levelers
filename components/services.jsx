'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Frame1 from '../images/Frame 1.png';
import Frame2 from '../images/Frame2.png';
import Frame3 from '../images/Frame 3.png';
import Frame4 from '../images/Frame 4.png';
import Frame5 from '../images/Frame 5.png';
import Frame6 from '../images/Frame 6.png';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

// Map service titles to their respective images
const serviceImages = {
  "UI/UX Design": Frame1,
  "Web Development": Frame2,
  "Mobile App Development": Frame3,
  "Cloud Solutions": Frame4,
  "E-commerce Solutions": Frame5,
  "Digital Marketing": Frame6
};

// Map service categories to gradient colors
const categoryGradients = {
  "Design": { gradient: "from-blue-500 to-purple-600", hoverGradient: "hover:from-blue-600 hover:to-purple-700" },
  "Development": { gradient: "from-green-500 to-teal-600", hoverGradient: "hover:from-green-600 hover:to-teal-700" },
  "Infrastructure": { gradient: "from-cyan-500 to-blue-600", hoverGradient: "hover:from-cyan-600 hover:to-blue-700" },
  "Commerce": { gradient: "from-orange-500 to-red-600", hoverGradient: "hover:from-orange-600 hover:to-red-700" },
  "Marketing": { gradient: "from-indigo-500 to-purple-600", hoverGradient: "hover:from-indigo-600 hover:to-purple-700" }
};

const ServiceCard = ({ service, isExpanded, onToggle, expandedId, style }) => {
  const handleClick = () => {
    onToggle(isExpanded ? null : service.id);
  };

  const router = useRouter();

  return (
    <article 
      className={`
        relative overflow-hidden rounded-[50px] 
        transform transition-all duration-500 ease-in-out cursor-pointer
        backdrop-blur-lg
        group
        shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1
        ${
          isExpanded 
            ? 'row-span-2' 
            : 'col-span-1 hover:scale-105'
        }
        ${expandedId && !isExpanded ? 'scale-95 opacity-75' : ''}
      `}
      aria-label={`${service.title} service details`}
      onClick={handleClick}
      style={style}
    >
      <div className={`
        relative bg-transperent
        flex items-center justify-center transition-all duration-500
        ${isExpanded ? 'h-32' : 'h-50'}
      `}>
        <div className={`transform transition-all duration-500 ${isExpanded ? 'scale-125' : ''}`}>
          {service.icon}
        </div>
      </div>

      {/* Card content */}
      <div className={`p-6 transition-all duration-500 ${isExpanded ? 'p-8' : ''}`}>
        {/* Service title */}
        <h3 className={`font-bold text-white transition-all duration-500 ${isExpanded ? 'text-3xl mb-4' : 'text-xl'}`}>
          {service.title}
        </h3>
        
        {/* Service description */}
        <p className={`text-gray-200 leading-relaxed transition-all duration-500 ${isExpanded ? 'text-lg mb-6' : 'text-sm'}`}>
          {service.tagline || service.description}
        </p>

        {/* Expanded content */}
        {isExpanded && (
          <div className="animate-pulse">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Detailed Overview
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {service.detailed_overview || `Our ${service.title.toLowerCase()} services are designed to deliver exceptional results 
                through innovative approaches and cutting-edge technologies. We focus on creating 
                solutions that not only meet your current needs but also scale with your business growth.`}
              </p>
            </div>
          </div>
        )}

        {/* Key Features section */}
        <div className="space-y-3">
          <h4 className={`font-semibold text-white uppercase tracking-wide transition-all duration-500 ${isExpanded ? 'text-base' : 'text-sm'}`}>
            Key Features
          </h4>
          <ul className={`gap-x-4 gap-y-2 transition-all duration-500 ${
            isExpanded ? 'grid-cols-3' : 'grid-cols-2'
          } grid`}>
            {service.key_features?.map((feature, index) => (
              <li 
                key={index}
                className={`flex items-center text-gray-200 transition-all duration-500 ${
                  isExpanded ? 'text-base' : 'text-sm'
                }`}
              >
                <div className={`
                  rounded-full bg-gradient-to-r ${service.gradient} 
                  mr-2 flex-shrink-0 transition-all duration-500
                  ${isExpanded ? 'w-3 h-3' : 'w-2 h-2'}
                `}></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Expanded additional features */}
        {isExpanded && (
          <div className="mt-8 opacity-0 animate-pulse" style={{animation: 'fadeIn 0.5s ease-in-out 0.3s forwards'}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies_used?.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Delivery Timeline
                </h4>
                <p className="text-gray-300">
                  {service.delivery_timeline || 'Typical project completion: 2-6 weeks depending on complexity and requirements.'}
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push('/commission')}>
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* Close indicator for expanded cards */}
        {isExpanded && (
          <div className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
    </article>
  );
};

export default function Services() {
  const [expandedId, setExpandedId] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transform data to match component structure
      const transformedData = data.map((service) => {
        const gradients = categoryGradients[service.category] || categoryGradients["Design"];
        const imageSource = serviceImages[service.title] || Frame1;

        return {
          id: service.id,
          title: service.title,
          description: service.tagline,
          tagline: service.tagline,
          detailed_overview: service.detailed_overview,
          key_features: service.key_features || [],
          technologies_used: service.technologies_used || [],
          delivery_timeline: service.delivery_timeline,
          category: service.category,
          gradient: gradients.gradient,
          hoverGradient: gradients.hoverGradient,
          icon: (
            <Image 
              src={imageSource} 
              alt={`${service.title} Icon`} 
              className="rounded-[40px] mx-2 my-2 text-white" 
            />
          )
        };
      });

      setServices(transformedData);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (id) => {
    setExpandedId(id);
  };

  // Custom layout logic for reorganizing cards
  const getReorganizedCards = () => {
    if (!expandedId) {
      return services.map((service, index) => ({ ...service, order: index }));
    }

    const expandedIndex = services.findIndex(service => service.id === expandedId);
    const expandedCard = services[expandedIndex];
    const otherCards = services.filter(service => service.id !== expandedId);

    // Calculate the row of the expanded card (3 cards per row on desktop)
    const expandedRow = Math.floor(expandedIndex / 3);
    
    return [
      // Place expanded card first with its original order
      { ...expandedCard, order: expandedIndex },
      // All other cards come after, maintaining their relative order
      ...otherCards.map((service, index) => ({ 
        ...service, 
        order: expandedIndex + 1 + index 
      }))
    ];
  };

  const reorganizedCards = getReorganizedCards();

  if (loading) {
    return (
      <section id="services" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-300">Loading services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading services: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            Our <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We excel in almost every domain you ask.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-auto">
          {reorganizedCards.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              isExpanded={expandedId === service.id}
              expandedId={expandedId}
              onToggle={handleToggle}
              style={{
                order: service.order,
                gridColumn: expandedId === service.id ? '1 / -1' : 'auto'
              }}
            />
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
            <span>Ready to transform your ideas into reality?</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}