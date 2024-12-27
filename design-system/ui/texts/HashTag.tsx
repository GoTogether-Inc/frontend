import React from 'react';
import { flexCenter } from '../../styles/flex';

interface HashTagProps {
  children: string;
  onClick: () => void;
}

export default function HashTag({ children, onClick }: HashTagProps) {
  return (
    <div className={`${flexCenter} text-main border border-main rounded-[2px] px-2 py-1 bg-dropdown`}>
      <h6 className="mr-2 text-sm font-normal">{children}</h6>
      <span onClick={onClick} className="text-xs font-light cursor-pointer">
        X
      </span>
    </div>
  );
}
