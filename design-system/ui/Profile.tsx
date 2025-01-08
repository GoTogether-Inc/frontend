import React from 'react';

interface ProfileProps {
  name: string;
  className?: string;
}

const ProfileCircle = ({ name, className }: ProfileProps) => {
  return (
    <div
      className={`flex items-center justify-center lg:w-10 lg:h-10 md:h-9 md:w-9 sm:h-8 sm:w-8 rounded-full bg-main ${className} `}
    >
      <span className="font-bold text-white lg:text-sm md:text-xs sm:text-xs">{name}</span>
    </div>
  );
};

export default ProfileCircle;
