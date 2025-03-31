import React from 'react';
// import { DASHBOARD_ROUTES } from '../../../../app/routes/routes';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Trash from '../../../../../design-system/icons/Trash.svg';
import DefaultTextField from '../../../../../design-system/ui/textFields/DefaultTextField';
import ToggleButton from '../../../../../design-system/ui/buttons/ToggleButton';
import IconButton from '../../../../../design-system/ui/buttons/IconButton';
import TertiaryButton from '../../../../../design-system/ui/buttons/TertiaryButton';
import ChoiceChip from '../../../../../design-system/ui/ChoiceChip';
import Button from '../../../../../design-system/ui/Button';



const TicketOptionCreatePage = () => {
  const navigate = useNavigate();
  const [answerToggled, setAnswerToggled] = useState(false);

  const [optionsConfig, setOptionsConfig] = useState(
    Array(3)
      .fill(null)
      .map(() => ({
        limitToggled: false,
        numActivated: true,
        quantity: '',
      }))
  );

  const [options, setOptions] = useState<string[]>(Array(3).fill(''));
  const [warningMsg, setWarningMsg] = useState('');
  const [warningMsg2, setWarningMsg2] = useState('');
  const [selectedChip, setSelectedChip] = useState('객관식');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleAnswerToggled = () => {
    setAnswerToggled(prev => !prev);
  };

  const handleLimitToggled = (index: number) => {
    setOptionsConfig(prev => {
      const updated = [...prev];
      const option = updated[index];

      updated[index] = {
        ...option,
        limitToggled: !option.limitToggled,
        numActivated: !option.numActivated,
      };

      return updated;
    });
  };

  {
    /*선택지 삭제*/
  }
  const handleClearOption = (index: number) => {
    setOptions(prev => prev.filter((_, i) => i !== index));
    setOptionsConfig(prev => prev.filter((_, i) => i !== index));
  };

  {
    /*선택지 추가*/
  }
  const handleAddOption = () => {
    setOptions(prev => {
      const updated = [...prev, ''];

      if (updated.length > 1) {
        setWarningMsg('');
      }
      return updated;
    });

    setOptionsConfig(prev => [
      ...prev,
      {
        limitToggled: false,
        numActivated: true,
        quantity: '',
      },
    ]);
  };

  {
    /*선택지 입력 업데이트*/
  }
  const handleInputChange = (index: number, value: string) => {
    const updateOptions = [...options];
    updateOptions[index] = value;
    setOptions(updateOptions);
  };

  const handleQuantityChange = (index: number, value: string) => {
    setOptionsConfig(prev => {
      const updated = [...prev];

      // 토글 ON일 때만 수정 허용
      if (updated[index].limitToggled) {
        updated[index].quantity = value; // 문자열 그대로 저장
      }

      return updated;
    });
  };

  {
    /*선택지 입력 시 경고 메시지 제거*/
  }
  useEffect(() => {
    const hasValidOption = options.some(opt => opt.trim() !== '');

    if (!hasValidOption) {
      setWarningMsg('최소 한 개 이상의 선택지를 만들어주세요.');
    } else {
      setWarningMsg('');
    }
  }, [options]);

  {
    /*수량 입력 시 경고 메시지 제거*/
  }
  useEffect(() => {
    const hasEmptyQuantity = optionsConfig.some(config => config.limitToggled && config.quantity.trim() === '');

    if (hasEmptyQuantity) {
      setWarningMsg2('수량을 입력해주세요.');
    } else {
      setWarningMsg2('');
    }
  }, [optionsConfig]);

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓 옵션 생성</div>
        <p className="text-gray-400 text-sm mb-5">티켓 옵션을 생성할 수 있습니다.</p>

        {/*티켓 질문 입력란*/}
        <div>
          <p className="block text-m font-semibold text-gray-700">질문</p>
          <DefaultTextField
            placeholder="티셔츠 사이즈를 선택해주세요."
            detail="티켓을 잘 지어낼 수 있는 질문을 써보세요. (무료 입장권, 얼리버드, 학생 전용 등)"
            className="h-12 mb-5"
            detailClassName="px-0"
          />
        </div>

        {/*상세 설명 입력란*/}
        <div>
          <p className="block text-m font-semibold text-gray-700">상세 설명</p>
          <DefaultTextField
            placeholder="행사에서 티셔츠를 받고 싶으시면 사이즈를 선택해주세요!"
            detail="질문에 대한 부가 설명이 있다면 여기 적으면 돼요."
            className="h-12 mb-5"
            detailClassName="px-0"
          />
        </div>

        {/*응답 종류 선택란*/}
        <div>
          <div className="w-32 md:w-56 mb-5">
            <p className="block text-m font-semibold text-gray-700">응답을 어떤 형식으로 받을까요?</p>
            <p className="block mb-1 text-placeholderText text-11 md:text-13">한 개만 선택할 수 있습니다.</p>
            <ChoiceChip
              options={['객관식', '여러 개 선택', '자유로운 텍스트']}
              onSelect={selected => {
                setSelectedChip(selected);
              }}
              buttonClassName={"!text-xs"}
            />
          </div>
        </div>

        {/*필수 응답 토글*/}
        <div className="flex items-center justify-between mb-5">
          <div className="w-40 md:w-60">
            <p className="block text-sm font-semibold text-gray-700">필수로 선택하게 할까요?</p>
            <p className="text-gray-400 text-xs">
              이 옵션을 키면 해당 질문에 응답을 해야만 티켓을 결제 할 수 있습니다.
            </p>
          </div>
          <div className="mr-12">
            <ToggleButton isChecked={answerToggled} onChange={handleAnswerToggled} />
          </div>
        </div>

        {/*설문지 입력란*/}
        <div>
          {(selectedChip === '객관식' || selectedChip === '여러 개 선택') && (
            <>
              <p className="block text-m font-semibold text-gray-700">옵션</p>
              <p className="text-gray-400 text-xs">선택지를 여러개 만들 수 있습니다.</p>
              {warningMsg && <p className="text-red-500 text-xs mb-2">{warningMsg}</p>}
              {options.map((option, index) => (
                <React.Fragment key={index}>
                  {' '}
                  {/*index 값 공유*/}
                  <DefaultTextField
                    placeholder="이름을 입력해주세요."
                    className="h-12"
                    value={option}
                    onChange={e => handleInputChange(index, e.target.value)}
                    onFocus={() => setFocusedIndex(index)}
                    // onBlur={() => setFocusedIndex(null)}
                    rightContent={
                      <IconButton
                        size="medium"
                        iconPath={<img src={Trash} alt="TrashIcon" />}
                        onClick={() => handleClearOption(index)}
                      />
                    }
                  />
                  {/*인풋 박스 클릭했는데 입력된 내용도 없을 때*/}
                  {focusedIndex === index && !option && (
                    <p className="mt-1 text-red-500 text-xs">이름을 입력해주세요.</p>
                  )}
                  {/*인풋 박스 클릭하거나 입력된 내용이 있을 때*/}
                  {(focusedIndex === index || option || optionsConfig[index].limitToggled) && (
                    <>
                      <div className="block bg-gray-100 rounded-[3px] my-3 p-4">
                        <div className="flex items-center justify-between ">
                          <div className="w-60 md:w-90">
                            <p className="text-m font-semibold text-gray-700">선택지에 대한 수량 제한 걸기</p>
                            <p className="text-gray-400 text-xs">
                              특정 숫자의 사람만 선택하게 하고 싶다면 해당 선택지를 눌러주세요.
                            </p>
                          </div>
                          <ToggleButton
                            isChecked={optionsConfig[index].limitToggled}
                            onChange={() => handleLimitToggled(index)}
                          />
                        </div>
                        <div className="w-24">
                          <DefaultTextField
                            placeholder="0"
                            value={optionsConfig[index].quantity}
                            disabled={!optionsConfig[index].limitToggled} // 토글 OFF면 수정 불가
                            onChange={e => handleQuantityChange(index, e.target.value)}
                            className="h-10 !w-24 mt-1"
                          />
                        </div>
                        {warningMsg2 && <p className="text-red-500 text-xs mt-1">{warningMsg2}</p>}
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          {selectedChip === '자유로운 텍스트' && <div></div>} {/*수정해야할 부분*/}
        </div>

        <div className="w-full">
          <TertiaryButton
            label="+ 선택지 추가하기"
            type="button"
            color="black"
            size="large"
            onClick={handleAddOption}
            className="w-full border border-dashed border-gray-500 my-1.5"
          />
        </div>

        <div className="w-full mt-14 mb-20">
          <Button
            label="저장하기"
            onClick={() => navigate('/dashboard/ticket/option', { state: { answerToggled } })}
            className="w-full h-12 rounded-full"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionCreatePage;
