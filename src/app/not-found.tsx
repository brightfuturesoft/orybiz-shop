import Link from 'next/link';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const NotFoundPage = () => {
  return (
    <div >
        <Navbar/>
         <div className="container mx-auto my-5">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span>404 Error</span>
      </div>
         <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-white text-center px-4">
      {/* Breadcrumb / Navigation */}
     

      {/* Main Content */}
      <h1 className="text-4xl md:text-[110px] font-semibold text-gray-800 mb-5">
        404 Not Found
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-3  max-w-lg mx-auto">
        Your visited page not found. You may go home page.
      </p>
      
      {/* Back to Home Button */}
      <Link href="/">
        <button className="bg-red-500 text-white px-5 py-2 rounded  cursor-pointer text-base md:text-lg hover:bg-red-600 transition-colors duration-300">
          Back to home page
        </button>
      </Link>
    </div>
    <Footer/>
    </div>
   
  );
};

export default NotFoundPage;