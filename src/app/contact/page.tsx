'use client';

import React from 'react';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Using Heroicons for a clean look
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const ContactPage = () => {
  return (
   <section>
    <Navbar/>
     <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Breadcrumb / Navigation */}
      <div className="mb-8 md:mb-16 text-gray-600 text-sm md:text-base">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span>Contact</span>
      </div>

      {/* Main Content: Contact Info & Form */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Section: Contact Info */}
        <div className="bg-white p-6 md:p-8 rounded shadow-sm w-full lg:w-1/3 flex flex-col justify-start">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-red-500 rounded-full p-2">
              <PhoneIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Call To Us</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            We are available 24/7, 7 days a week.
          </p>
          <p className="text-gray-600 text-sm mb-6">
            Phone: +8801611112222
          </p>
          <hr className="border-gray-200 mb-6" />
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-red-500 rounded-full p-2">
              <EnvelopeIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Write To Us</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <p className="text-gray-600 text-sm">
            Emails: customer@exclusive.com
          </p>
          <p className="text-gray-600 text-sm">
            Emails: support@exclusive.com
          </p>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded shadow-sm w-full lg:w-2/3">
          <form className="flex flex-col space-y-4">
            {/* First Row: Name, Email, Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full bg-gray-100 p-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full bg-gray-100 p-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                className="w-full bg-gray-100 p-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            
            {/* Second Row: Your Message */}
            <textarea
              placeholder="Your Message"
              rows={8}
              className="w-full bg-gray-100 p-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
            ></textarea>
            
            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-red-500 text-white font-semibold py-4 px-12 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
   </section>
  );
};

export default ContactPage;