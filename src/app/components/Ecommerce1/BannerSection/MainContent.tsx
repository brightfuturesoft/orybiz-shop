'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import aple from "../../../../../public/hero_endframe__cvklg0xk3w6e_large 2.png"
import appleLogo from "../../../../../public/1200px-Apple_gray_logo 1.png"

const data = [
  {
    title: 'iPhone 14 Series',
    subtitle: 'Up to 10% off Voucher',
    buttonText: 'Shop Now',
    imageUrl: '/images/iphone-promo.png',
  },

];

const MainContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    handleSwipe(touchEndX - touchStartX.current);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    handleSwipe(e.clientX - touchStartX.current);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    handleSwipe(e.clientX - touchStartX.current);
  };

  const handleSwipe = (distance: number) => {
    if (distance > 50) {
      setActiveIndex((current) => (current - 1 + data.length) % data.length);
    } else if (distance < -50) {
      setActiveIndex((current) => (current + 1) % data.length);
    }
  };

  const promo = data[activeIndex];

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-grab"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-black text-white p-8 md:p-12 lg:p-16 h-full flex items-center transition-all duration-500">
        <div className="flex-1 space-y-4">
            <div className="flex  items-center">
                    <div className='w-20'> <Image
              src={appleLogo}
              alt={promo.title}
              objectFit="contain"
              quality={100}
            /></div>
             <h2 className="text-xl md:text-2xl font-semibold"> 
             {promo?.title}</h2>
            </div>
         
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">{promo?.subtitle}</h1>
      <button className="flex flex-col items-start cursor-pointer  space-x-2 text-sm md:text-base font-medium  border-white px-4 py-2  mt-4 transition-colors  ">
<div className='flex gap-2 items-center'>  <span>{promo.buttonText}</span>
  
  {/* Divider / line */}

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M3.5 12H20M20 12L13 5M20 12L13 19" stroke="#FAFAFA"/>
  </svg></div>
    <div className="w-[81px] h-[1px] mt-1" style={{ backgroundColor: '#FAFAFA' }}></div>



</button>


        </div>
        <div className="flex-1 flex justify-end">
          <div className="relative w-full max-w-[400px] h-[300px]">
            <Image
              src={aple}
              alt={promo.title}
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
        </div>
      </div>

      {/* Slider dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === index ? 'bg-red-500 w-4' : 'bg-white opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
