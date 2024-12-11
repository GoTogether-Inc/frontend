import { ReactNode } from 'react';
import Button from '../../../../design-system/ui/Button';
import Header from '../../../../design-system/ui/Header';

interface EventRegisterLayoutProps {
  children: ReactNode;
  title: string;
  className?: string;
}

const EventRegisterLayout = ({ children, title, className }: EventRegisterLayoutProps) => {
  const onBack = () => {};
  const handleButtonClick = () => {};
  return (
    <div className="flex flex-col justify-center items-center">
      {/* 헤더 영역 */}
      <div className="w-full h-36 md:h-40 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px]">
        <Header title="이벤트 등록" onBack={onBack} className="text-white" />
      </div>

      {/* 레이아웃 내용 */}
      <div className="relative flex flex-col justify-between -translate-y-16 w-[85%] min-h-[81vh] bg-white rounded-[20px]">
        <div>
          <div className="text-center w-full my-8 text-2xl font-bold">{title}</div>
          <div className={`relative ${className}`}>{children}</div>
        </div>
        <div className="sticky bottom-0 left-0 w-full p-5">
          <Button label="다음" onClick={handleButtonClick} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};
export default EventRegisterLayout;
