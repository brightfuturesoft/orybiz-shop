// src/app/page.tsx
import React from 'react';
import Image from 'next/image';
import { StatsSection } from '@/app/components/Ecommerce1';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
        
      <div className="mx-auto container px-4 py-8 sm:px-6 lg:px-8">
            <nav className="mt-10 text-sm text-gray-500">
              <a href="#" className="hover:underline">Home</a> / <span className="font-semibold">About</span>
            </nav>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 lg:space-x-12">

          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 py-4 md:py-10 lg:py-16">
            {/* Breadcrumbs */}
        

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-semibold text-gray-900 lg:text-5xl">
              Our Story
            </h1>

            {/* Paragraph 1 */}
            <p className="mb-4 text-base leading-relaxed text-gray-700 lg:text-lg">
              Launched in 2015, Exclusive is South Asia&apos;s premier online shopping
              marketplace with an active presence in Bangladesh. Supported
              by wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3
              millions customers across the region.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base leading-relaxed text-gray-700 lg:text-lg">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assortment in categories
              ranging. from consumer.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end py-4 md:py-10 lg:py-0">
            <div className="relative w-full max-w-md md:max-w-none md:w-[600px] h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]  overflow-hidden">
              <Image
                src="/about/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png" 
                alt="Two women smiling and holding shopping bags"
                layout="fill" 
                objectFit="cover" 
                className=" shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <StatsSection/>

    </div>
  );
};

export default AboutPage;