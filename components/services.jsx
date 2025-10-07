

import React, { useState } from 'react';

// Service card data with comprehensive information
const services = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Sleek, human-first interactions that invite interaction and prioritize users.",
    keyFeatures: [
      "Responsive Design",
      "Interactions & Animations", 
      "Wireframes & Prototypes",
      "User Research",
      "Usability Testing",
      "Interactive Mockups"
    ],
    gradient: "from-blue-500 to-purple-600",
    hoverGradient: "hover:from-blue-600 hover:to-purple-700",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Web Development",
    description: "Modern, scalable web applications built with cutting-edge technologies.",
    keyFeatures: [
      "React & Next.js",
      "Full-Stack Solutions",
      "API Development",
      "Database Integration",
      "Performance Optimization",
      "SEO Implementation"
    ],
    gradient: "from-green-500 to-teal-600",
    hoverGradient: "hover:from-green-600 hover:to-teal-700",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile solutions for iOS and Android.",
    keyFeatures: [
      "React Native",
      "iOS & Android",
      "Cross-Platform Solutions",
      "App Store Deployment",
      "Push Notifications",
      "Offline Functionality"
    ],
    gradient: "from-purple-500 to-pink-600",
    hoverGradient: "hover:from-purple-600 hover:to-pink-700",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 19H7V5h10v14zM7 3C5.9 3 5 3.9 5 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H7z"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment strategies for modern applications.",
    keyFeatures: [
      "AWS & Azure",
      "Serverless Architecture",
      "Container Orchestration",
      "Auto-scaling Solutions",
      "CI/CD Pipelines",
      "Monitoring & Analytics"
    ],
    gradient: "from-cyan-500 to-blue-600",
    hoverGradient: "hover:from-cyan-600 hover:to-blue-700",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "E-commerce Solutions",
    description: "Complete online store development with payment integration and inventory management.",
    keyFeatures: [
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Processing",
      "Customer Analytics",
      "Multi-vendor Support",
      "Mobile Commerce"
    ],
    gradient: "from-orange-500 to-red-600",
    hoverGradient: "hover:from-orange-600 hover:to-red-700",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    )
  },
  {
    id: 6,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies to boost your online presence and conversions.",
    keyFeatures: [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "PPC Campaigns",
      "Analytics & Reporting",
      "Brand Development"
    ],
    gradient: "from-indigo-500 to-purple-600",
    hoverGradient: "hover:from-indigo-600 hover:to-purple-700",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
      </svg>
    )
  }
];

const ServiceCard = ({ service, isExpanded, onToggle, expandedId, style }) => {
  const handleClick = () => {
    onToggle(isExpanded ? null : service.id);
  };

  return (
    <article 
      className={`
        relative overflow-hidden rounded-[50px] bg-white/2 border border-white/10 border-1
        transform transition-all duration-500 ease-in-out cursor-pointer
        group
        shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)]
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
        relative bg-transparent
        flex items-center justify-center transition-all duration-500
        ${isExpanded ? 'h-32' : 'h-50'}
      `}>
        <div className={`transform transition-all duration-500 ${isExpanded ? 'scale-125' : ''}`}>
          {service.icon}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0.5"></div>
      </div>

      {/* Card content */}
      <div className={`p-6 transition-all duration-500 ${isExpanded ? 'p-8' : ''}`}>
        {/* Service title */}
        <h3 className={`font-bold text-white transition-all duration-500 ${isExpanded ? 'text-3xl mb-4' : 'text-xl'}`}>
          {service.title}
        </h3>
        
        {/* Service description */}
        <p className={`text-gray-200 leading-relaxed transition-all duration-500 ${isExpanded ? 'text-lg mb-6' : 'text-sm'}`}>
          {service.description}
        </p>

        {/* Expanded content */}
        {isExpanded && (
          <div className="animate-pulse">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Detailed Overview
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Our {service.title.toLowerCase()} services are designed to deliver exceptional results 
                through innovative approaches and cutting-edge technologies. We focus on creating 
                solutions that not only meet your current needs but also scale with your business growth.
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
            {service.keyFeatures.map((feature, index) => (
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
                  {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech, index) => (
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
                  Typical project completion: 2-6 weeks depending on complexity and requirements.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
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

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
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