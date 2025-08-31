'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
const calculateTimeRemaining = (targetDate: Date) => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      hours: 0,
      days: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    hours,
    days,
    minutes,
    seconds,
    isExpired: false,
  };
};

const MusicSection = () => {
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }, []); 
  const [time, setTime] = useState(calculateTimeRemaining(targetDate));
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="container mx-auto py-8">
      <div className="relative bg-black text-white p-8 md:p-16 rounded flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left md:pr-10">
          <p className="text-green-500 font-semibold mb-2">Categories</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
            Enhance Your Music Experience
          </h1>
          
          {/* Countdown Timer */}
          <div className="flex justify-center md:justify-start space-x-4 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-semibold">{String(time.hours).padStart(2, '0')}</span>
              <span className="text-sm">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-semibold">{String(time.days).padStart(2, '0')}</span>
              <span className="text-sm">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-semibold">{String(time.minutes).padStart(2, '0')}</span>
              <span className="text-sm">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-semibold">{String(time.seconds).padStart(2, '0')}</span>
              <span className="text-sm">Seconds</span>
            </div>
          </div>
          
          {/* Buy Now Button */}
          <button className="bg-green-500 text-white py-3 px-8 rounded hover:bg-green-600 transition-colors duration-300">
            Buy Now!
          </button>
        </div>

        {/* Right Image */}
<div className="flex-1 mt-8 md:mt-0 flex items-center justify-center relative">
  {/* Blurred background circle */}
  <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[504px] md:h-[500px] rounded-full bg-[#badbf1] opacity-50 filter blur-[220px] -translate-x-1/2 -translate-y-1/2 z-10"></div>

  {/* Image container */}
  <div className="relative w-[350px] h-[350px] lg:w-[550px] lg:h-[500px] z-10">
    <Image
      src="/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png" 
      alt="JBL Speaker"
      layout="fill"
      objectFit="contain"
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default MusicSection;