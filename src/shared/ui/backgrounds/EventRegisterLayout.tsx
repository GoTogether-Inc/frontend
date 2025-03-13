import { ReactNode, useState, Children, isValidElement, cloneElement } from 'react';
import Button from '../../../../design-system/ui/Button';
import Header from '../../../../design-system/ui/Header';

interface EventRegisterLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onNext: () => void;
  onPrev: () => void;
  requireValidation?: boolean;
}

interface ValidationChildProps {
  onValidationChange: (isValid: boolean) => void;
}

const EventRegisterLayout = ({
  children,
  title,
  className = '',
  onNext,
  onPrev,
  requireValidation = false,
}: EventRegisterLayoutProps) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const childrenWithValidation = Children.map(children, child => {
    if (requireValidation && isValidElement<ValidationChildProps>(child)) {
      return cloneElement(child, { onValidationChange: handleValidationChange });
    }
    return child;
  });

  return (
    <div className="relative flex">
      {/* 헤더 영역 */}
      <div className="absolute top-0 w-full h-36 md:h-40 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px] z-10">
        <Header
          centerContent="이벤트 등록"
          leftButtonLabel="<"
          leftButtonClick={onPrev}
          color="white"
          leftButtonClassName="text-xl z-30"
        />
      </div>

      {/* 레이아웃 내용 */}
      <div className="flex flex-col justify-between w-[85%] min-h-[calc(100vh-6rem)] bg-white rounded-[20px] mt-24 mx-auto z-20">
        <div>
          <div className="text-center w-full my-8 text-xl  md:text-2xl font-bold">{title}</div>
          <div className={`${className}`}>{childrenWithValidation}</div>
        </div>
        <div className="w-full p-5">
          <Button
            label="다음"
            onClick={onNext}
            className="w-full h-12 rounded-full"
            disabled={requireValidation && !isFormValid}
          />
        </div>
      </div>
    </div>
  );
};
export default EventRegisterLayout;
