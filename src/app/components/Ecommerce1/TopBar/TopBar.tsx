import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="w-full h-[48px] bg-black flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16">
      <p className="text-white text-center text-sm sm:text-base md:text-base lg:text-base truncate md:truncate-none">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
      </p>
    </div>
  );
};

export default TopBar;
