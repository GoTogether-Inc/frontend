import React from 'react';

interface ProfileImageProps {
  width: string;
  height: string;
  name: string;
  textSize: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ width, height, name, textSize }) => {
  return (
    <div className={`relative ${width} ${height} ${textSize}`}>
      <div className="flex items-center justify-center w-full h-full text-white rounded-full bg-main">
        <div>{name}</div>
      </div>
    </div>
  );
};
export default ProfileImage;
