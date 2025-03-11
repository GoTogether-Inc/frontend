import { DASHBOARD_ROUTES } from '../../../../app/routes/routes';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Trash from '../../../../../design-system/icons/Trash.svg';
import { ThreeOptions } from '../../../../../design-system/stories/ChoiceChip.stories';
import DefaultTextField from '../../../../../design-system/ui/textFields/DefaultTextField';
import ToggleButton from '../../../../../design-system/ui/buttons/ToggleButton';
import IconButton from '../../../../../design-system/ui/buttons/IconButton';
import ChoiceChip from '../../../../../design-system/ui/ChoiceChip';
import Button from '../../../../../design-system/ui/Button';

const TicketOptionCreatePage = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [options, setOptions] = useState<string[]>(Array(3).fill(''));
  const [warningMsg, setWarningMsg] = useState('');

  const handleIsToggled = () => {
    setIsToggled(prev => !prev);
  };

  {/*선택지 삭제*/}
  const handleClearOption = (index: number) => {
    if (options.length === 1) {
      setWarningMsg('최소 한 개 이상의 선택지를 만들어주세요.');
    } else {
      const updateOptions = options.filter((_, i) => i !== index);
      setOptions(updateOptions);

      if (updateOptions.length > 1) {
        setWarningMsg('');
      }
    }
  };

  {/*선택지 추가*/}
  const handleAddOption = () => {
    const updateOptions = [...options, ''];
    setOptions(updateOptions);

    if (updateOptions.length > 1 ){
      setWarningMsg('');
    }
  };

  {/*선택지 입력 업데이트*/}
  const handleInputChange = (index: number, value: string) => {
    const updateOptions = [...options];
    updateOptions[index] = value;
    setOptions(updateOptions);
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓 옵션 생성</div>
        <p className="text-gray-400 text-sm mb-5">티켓 옵션을 생성할 수 있습니다.</p>

        {/*티켓 질문 입력란*/}
        <div>
          <p className="block px-1 text-m font-semibold text-gray-700">질문</p>
          <DefaultTextField
            placeholder="티셔츠 사이즈를 선택해주세요."
            detail="티켓을 잘 지어낼 수 있는 이름을 써보세요. (무료 입장권, 얼리버드, 학생 전용 등)"
            className="h-12"
          />
        </div>

        {/*상세 설명 입력란*/}
        <div>
          <p className="block px-1 text-m font-semibold text-gray-700">상세 설명</p>
          <DefaultTextField
            placeholder="행사에서 티셔츠를 받고 싶으시면 사이즈를 선택해주세요!"
            detail="질문에 대한 부가 설명이 있다면 여기 적으면 돼요."
            className="h-12"
          />
        </div>

        {/*응답 종류 선택란*/}
        <div>
          <div className="w-32 md:w-56 my-1">
            <p className="block px-1 text-m font-semibold text-gray-700">응답을 어떤 형식으로 받을까요?</p>
            <p className="block px-1 mb-1 text-placeholderText text-11 md:text-13">한 개만 선택할 수 있습니다.</p>
            <ChoiceChip {...ThreeOptions.args} />
          </div>
        </div>

        {/*필수 응답 토글*/}
        <div className="flex items-center justify-between mb-5">
          <div className="w-32 md:w-56 my-1">
            <p className="block px-1 text-sm font-semibold text-gray-700">필수로 선택하게 할까요?</p>
            <p className="text-gray-400 text-xs">
              이 옵션을 키면 해당 질문에 응답을 해야만 티켓을 결제 할 수 있습니다.
            </p>
          </div>
          <div className="mr-10">
            <ToggleButton isChecked={isToggled} onChange={handleIsToggled} />
          </div>
        </div>

        {/*설문지 입력란*/}
        <div>
          <p className="block px-1 text-m font-semibold text-gray-700">설문지</p>
          <p className="text-gray-400 text-xs">선택지를 여러개 만들 수 있습니다.</p>
          {warningMsg && <p className="text-red-500 text-xs mb-2">{warningMsg}</p>}
          {options.map((option, index) => (
            <DefaultTextField
              placeholder="이름을 입력해주세요."
              className="h-12"
              key={index}
              value={option}
              onChange={e => handleInputChange(index, e.target.value)}
              rightContent={
                <IconButton
                  size="medium"
                  iconPath={<img src={Trash} alt="TrashIcon" />}
                  onClick={() => handleClearOption(index)}
                />
              }
            />
          ))}
        </div>

        <div className="w-full ">
          <Button label="임시버튼" onClick={handleAddOption} className="w-full h-12 rounded-full mt-4" />
        </div>

        <div className="w-full ">
          <Button label="저장하기" onClick={() => console.log('post 요청')} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionCreatePage;
