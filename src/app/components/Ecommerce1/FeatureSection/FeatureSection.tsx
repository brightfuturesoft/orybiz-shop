'use client';

import { useState, useEffect } from 'react';
import { TruckIcon, ShieldCheckIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { HeadphonesIcon } from 'lucide-react';
import FeatureIcon from '../FeatureIcon/FeatureIcon';

// Hard-coded data for the features
const features = [
  {
    icon: <TruckIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    title: 'FREE AND FAST DELIVERY',
    subtitle: 'Free delivery for all orders over $140',
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    title: '24/7 CUSTOMER SERVICE',
    subtitle: 'Friendly 24/7 customer support',
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    title: 'MONEY BACK GUARANTEE',
    subtitle: 'We return money within 30 days',
  },
];

const FeatureSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8">
        {features.map((feature, index) => (
          <FeatureIcon
            key={index}
            icon={feature.icon}
            title={feature.title}
            subtitle={feature.subtitle}
          />
        ))}
      </div>

      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-2 w-2" />
        </button>
      )}
    </div>
  );
};

export default FeatureSection;