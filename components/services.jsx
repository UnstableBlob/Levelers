import React from 'react';

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

const ServiceCard = ({ service }) => {
  return (
    <article 
      className={`
        relative overflow-hidden rounded-[50px] bg-white/2 border border-white/10 border-1
        transform transition-transform duration-300 hover:scale-105
        group cursor-pointer
        shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)]
      `}
      aria-label={`${service.title} service details`}
    >
      <div className={`
        relative h-50 bg-transparent
        flex items-center justify-center transition-all duration-300
      `}>
        <div>
          {service.icon}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0.5"></div>
      </div>

      {/* Card content */}
      <div className="p-6">
        {/* Service title */}
        <h3 className="text-xl font-bold text-white">
          {service.title}
        </h3>
        
        {/* Service description */}
        <p className="text-gray-200 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Key Features section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
            Key Features
          </h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {service.keyFeatures.map((feature, index) => (
              <li 
                key={index}
                className="flex items-center text-sm text-gray-200"
              >
                <div className={`
                  w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} 
                  mr-2 flex-shrink-0
                `}></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Hover effect border */}

      </div>
    </article>
  );
};

export default function Services() {
  return (
    <section className="relative min-h-screen  py-20 px-4 sm:px-6 lg:px-8">
      

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
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
    </section>
  );
}