import { ReactNode } from 'react';
import Button from '../../../../design-system/ui/buttons/Button';
import Header from '../../../../design-system/ui/Header';

interface EventRegisterLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onNext: () => void;
  onPrev?: () => void;
}

const EventRegisterLayout = ({ children, title, className = '', onNext, onPrev }: EventRegisterLayoutProps) => {
  return (
    <div className="relative flex">
      {/* 헤더 영역 */}
      <div className="absolute top-0 w-full h-36 md:h-40 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px] z-10">
        <Header title="이벤트 등록" onBack={onPrev} textColor="text-white" />
      </div>

      {/* 레이아웃 내용 */}
      <div className="flex flex-col justify-between w-[85%] min-h-[calc(100vh-6rem)] bg-white rounded-[20px] mt-24 mx-auto z-20">
        <div>
          <div className="text-center w-full my-8 text-xl md:text-2xl font-bold">{title}</div>
          <div className={`${className}`}>{children}</div>
        </div>
        <div className="w-full p-5">
          <Button label="다음" onClick={onNext} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};
export default EventRegisterLayout;
