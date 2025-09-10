'use client';

import { useState, useEffect, useMemo } from 'react';

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
    <div className="flex container mx-auto items-center justify-center min-h-[60vh] bg-black relative">
      {/* Blurred background circle */}
      <div className="absolute w-[400px] h-[400px] md:w-[504px] md:h-[500px] rounded-full bg-[#badbf1] opacity-50 filter blur-[220px] -translate-x-1/2 -translate-y-1/2"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
        <span className="text-4xl md:text-6xl font-bold text-white">
          Coming Soon
        </span>
        <div className="flex justify-center space-x-6 text-white">
       
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-semibold">{String(time.days).padStart(2, '0')}</span>
            <span className="text-sm md:text-base">Days</span>
          </div>
             <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-semibold">{String(time.hours).padStart(2, '0')}</span>
            <span className="text-sm md:text-base">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-semibold">{String(time.minutes).padStart(2, '0')}</span>
            <span className="text-sm md:text-base">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-semibold">{String(time.seconds).padStart(2, '0')}</span>
            <span className="text-sm md:text-base">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicSection;
