import React from 'react';
import { Link } from 'react-router-dom';

type Profile = 'userProfile' | 'HostProfile';

interface ProfileProps {
  id?: number;
  name?: string;
  profile?: Profile;
  className: string;
  onClick?: (id: number) => void;
  children?: React.ReactNode;
}

const ProfileCircle = ({ id, name, profile = 'userProfile', className = '', onClick, children }: ProfileProps) => {
  const profileClassName = profile === 'userProfile' ? `bg-main ${className}` : `bg-gray4 ${className}`;

  // 기존 userProfile 크기: lg:w-10 lg:h-10 md:h-9 md:w-9 sm:h-8 sm:w-8 lg:text-sm md:text-xs sm:text-xs
  return (
    <div
      id={id ? `${id}` : undefined}
      onClick={() => {
        if (id !== undefined && onClick) {
          onClick(id);
        }
      }}
      className={`${
        profile === 'HostProfile' ? 'flex flex-col items-center hover:text-main' : 'flex items-center justify-center'
      }`}
    >
      <div className="flex items-center">
        <div className={`${profileClassName}  flex items-center justify-center rounded-full`}>
          {profile === 'userProfile' && name && <span className="font-bold text-white">{name}</span>}
        </div>
        {children && <span className="ml-2 text-black">{children}</span>}
      </div>
      {profile === 'HostProfile' && name && (
        <span className="mt-2 text-sm text-center">
          <Link to={`/menu/hostDetail/${id}`}>{name} &gt;</Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCircle;
