import React from 'react';

// Defining the props type for clarity
interface FeatureIconProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-gray-300 rounded-full p-2 md:p-3 flex items-center justify-center mb-4">
        <div className="bg-black rounded-full p-2 md:p-2">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-xl mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default FeatureIcon;