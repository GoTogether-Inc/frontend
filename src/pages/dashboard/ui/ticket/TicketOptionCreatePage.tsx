import React from 'react';
// import { DASHBOARD_ROUTES } from '../../../../app/routes/routes';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Trash from '../../../../../design-system/icons/Trash.svg';
import DefaultTextField from '../../../../../design-system/ui/textFields/DefaultTextField';
import ToggleButton from '../../../../../design-system/ui/buttons/ToggleButton';
import IconButton from '../../../../../design-system/ui/buttons/IconButton';
import TertiaryButton from '../../../../../design-system/ui/buttons/TertiaryButton';
import ChoiceChip from '../../../../../design-system/ui/ChoiceChip';
import Button from '../../../../../design-system/ui/Button';

// 인터페이스 정의 추가
interface OptionConfig {
  limitToggled: boolean;
  numActivated: boolean;
  quantity: string;
}

const TicketOptionCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = location.state?.isEditing || false;
  const editOption = location.state?.editOption;

  const [warningMsg, setWarningMsg] = useState('');
  const [warningMsg2, setWarningMsg2] = useState('');
  const [warningMsg3, setWarningMsg3] = useState('');

  const [questionTitle, setQuestionTitle] = useState(editOption?.content || '');
  const [answerToggled, setAnswerToggled] = useState(editOption?.answerToggled || false);
  const [selectedChip, setSelectedChip] = useState(editOption?.responseFormat || '객관식');

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // 객관식 옵션
  const [singleOptions, setSingleOptions] = useState<string[]>(Array(3).fill(''));
  const [singleOptionsConfig, setSingleOptionsConfig] = useState(
    Array(3)
      .fill(null)
      .map(() => ({
        limitToggled: false,
        numActivated: true,
        quantity: '',
      }))
  );

  // 여러개 선택 옵션
  const [multiOptions, setMultiOptions] = useState<string[]>(Array(3).fill(''));
  const [multiOptionsConfig, setMultiOptionsConfig] = useState(
    Array(3)
      .fill(null)
      .map(() => ({
        limitToggled: false,
        numActivated: true,
        quantity: '',
      }))
  );

  // 현재 활성화된 옵션과 설정 가져오기 (선택된 타입에 따라)
  /*get function*/
  const getActiveOptions = () => {
    return selectedChip === '객관식' ? singleOptions : multiOptions;
  };

  const getActiveOptionsConfig = () => {
    return selectedChip === '객관식' ? singleOptionsConfig : multiOptionsConfig;
  };

  /*set function*/
  const setActiveOptions = (newOptionsOrUpdater: string[] | ((prev: string[]) => string[])) => {
    if (typeof newOptionsOrUpdater === 'function') {
      // 함수가 전달된 경우 (updater function)
      const updaterFn = newOptionsOrUpdater;
      if (selectedChip === '객관식') {
        setSingleOptions(prev => updaterFn(prev));
      } else {
        setMultiOptions(prev => updaterFn(prev));
      }
    } else {
      // 직접 값이 전달된 경우
      if (selectedChip === '객관식') {
        setSingleOptions(newOptionsOrUpdater);
      } else {
        setMultiOptions(newOptionsOrUpdater);
      }
    }
  };

  const setActiveOptionsConfig = (newConfigOrUpdater: OptionConfig[] | ((prev: OptionConfig[]) => OptionConfig[])) => {
    if (typeof newConfigOrUpdater === 'function') {
      // 함수가 전달된 경우 (updater function)
      const updaterFn = newConfigOrUpdater;
      if (selectedChip === '객관식') {
        setSingleOptionsConfig(prev => updaterFn(prev));
      } else {
        setMultiOptionsConfig(prev => updaterFn(prev));
      }
    } else {
      // 직접 값이 전달된 경우
      if (selectedChip === '객관식') {
        setSingleOptionsConfig(newConfigOrUpdater);
      } else {
        setMultiOptionsConfig(newConfigOrUpdater);
      }
    }
  };

  /*handler function*/
  const handleAnswerToggled = () => {
    setAnswerToggled((prev: boolean) => !prev);
  };

  const handleLimitToggled = (index: number) => {
    setActiveOptionsConfig((prev: OptionConfig[]) => {
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
    const activeOptions = getActiveOptions();

    // 선택지가 1개일 때는 삭제 불가하고 경고 메시지 표시
    if (activeOptions.length <= 1) {
      setWarningMsg('최소 한 개 이상의 선택지를 만들어주세요.');
      return;
    }

    setActiveOptions((prev: string[]) => {
      const updated = prev.filter((_, i) => i !== index);
      setWarningMsg(''); // 삭제 후 경고 메시지 제거
      return updated;
    });

    setActiveOptionsConfig((prev: OptionConfig[]) => prev.filter((_, i) => i !== index));
  };

  {
    /*선택지 추가*/
  }
  const handleAddOption = () => {
    setActiveOptions((prev: string[]) => {
      const updated = [...prev, ''];

      if (updated.length > 1) {
        setWarningMsg('');
      }
      return updated;
    });

    setActiveOptionsConfig((prev: OptionConfig[]) => [
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
    setActiveOptions((prev: string[]) => {
      const updated = [...prev];
      updated[index] = value;

      // 모든 선택지가 비어있는지 확인
      const hasValidOption = updated.some(opt => opt.trim() !== '');
      if (!hasValidOption) {
        setWarningMsg('최소 한 개 이상의 선택지를 만들어주세요.');
      } else {
        setWarningMsg('');
      }

      return updated;
    });
  };

  const handleQuantityChange = (index: number, value: string) => {
    setActiveOptionsConfig((prev: OptionConfig[]) => {
      const updated = [...prev];

      // 토글 ON일 때만 수정 허용
      if (updated[index].limitToggled) {
        updated[index].quantity = value; // 문자열 그대로 저장
      }

      return updated;
    });
  };

  const handleSave = () => {
    let isValid = true;

    // 질문 유효성 검사
    if (questionTitle.trim() === '') {
      setWarningMsg3('질문을 입력해주세요.');
      isValid = false;
      document.querySelector('.질문-입력란')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setWarningMsg3('');
    }

    // 객관식 & 여러개 선택 옵션 유효성 검사
    if (selectedChip === '객관식' || selectedChip === '여러개 선택') {
      const activeOptions = getActiveOptions();
      const hasValidOption = activeOptions.some(opt => opt.trim() !== '');
      if (!hasValidOption) {
        setWarningMsg('최소 한 개 이상의 선택지를 만들어주세요.');
        isValid = false;
      } else {
        setWarningMsg('');
      }
    }

    if (isValid) {
      const newOptionId = isEditing ? editOption.id : `option-${Date.now()}`;

      const newOption = {
        id: newOptionId,
        content: questionTitle,
        answerToggled,
        responseFormat: selectedChip,
        options: selectedChip === '객관식' ? singleOptions : selectedChip === '여러개 선택' ? multiOptions : [],
        optionsConfig:
          selectedChip === '객관식' ? singleOptionsConfig : selectedChip === '여러개 선택' ? multiOptionsConfig : [],
      };

      navigate('/dashboard/ticket/option', {
        state: {
          answerToggled,
          responseFormat: selectedChip,
          newOption: newOption,
          isEditing: isEditing,
        },
      });
    } else {
      window.alert('필수 입력 사항을 확인해주세요');
    }
  };

  {
    /*선택지 입력 시 경고 메시지 제거*/
  }
  useEffect(() => {
    const activeOptions = getActiveOptions();
    const hasValidOption = activeOptions.some(opt => opt.trim() !== '');

    if (!hasValidOption) {
      setWarningMsg('최소 한 개 이상의 선택지를 만들어주세요.');
    } else {
      setWarningMsg('');
    }
  }, [singleOptions, multiOptions, selectedChip]);

  {
    /*수량 입력 시 경고 메시지 제거*/
  }
  useEffect(() => {
    const activeOptionsConfig = getActiveOptionsConfig();
    const hasEmptyQuantity = activeOptionsConfig.some(config => config.limitToggled && config.quantity.trim() === '');

    if (hasEmptyQuantity) {
      setWarningMsg2('수량을 입력해주세요.');
    } else {
      setWarningMsg2('');
    }
  }, [singleOptionsConfig, multiOptionsConfig, selectedChip]);

  /*질문 입력시 경고 메시지 제거*/
  useEffect(() => {
    if (questionTitle.trim() !== '') {
      setWarningMsg3('');
    }
  }, [questionTitle]);

  // 옵션 리스트 수정 시 초기 설정
  useEffect(() => {
    if (isEditing && editOption) {
      console.log('Editing mode:', editOption);

      // 기본 필드 설정
      setQuestionTitle(editOption.content);
      setAnswerToggled(editOption.answerToggled);
      setSelectedChip(editOption.responseFormat);

      // localStorage에서 전체 데이터 가져오기
      const savedData = localStorage.getItem('ticketOptions');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const option = parsedData.options[editOption.id];

        if (option) {
          // 옵션 타입에 따라 적절한 상태 업데이트
          if (option.responseFormat === '객관식') {
            // 저장된 옵션이 있으면 사용하고, 없으면 3개의 빈 옵션으로 초기화
            setSingleOptions(option.options?.length > 0 ? option.options : Array(3).fill(''));
            setSingleOptionsConfig(
              option.optionsConfig?.length > 0
                ? option.optionsConfig
                : Array(3).fill({
                    limitToggled: false,
                    numActivated: true,
                    quantity: '',
                  })
            );
          } else if (option.responseFormat === '여러개 선택') {
            setMultiOptions(option.options?.length > 0 ? option.options : Array(3).fill(''));
            setMultiOptionsConfig(
              option.optionsConfig?.length > 0
                ? option.optionsConfig
                : Array(3).fill({
                    limitToggled: false,
                    numActivated: true,
                    quantity: '',
                  })
            );
          }
        }
      }
    }
  }, [isEditing, editOption]);

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
            className={`h-12 ${!warningMsg3 ? 'mb-5' : ''}`}
            detailClassName="px-0"
            value={questionTitle}
            onChange={e => setQuestionTitle(e.target.value)}
          />
          {warningMsg3 && <p className="text-red-500 text-xs mt-1 mb-5">{warningMsg3}</p>}
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
              options={['객관식', '여러개 선택', '자유로운 텍스트']}
              onSelect={selected => {
                setSelectedChip(selected);
                // 선택 변경 시 에러 메시지 초기화
                setWarningMsg('');
                setWarningMsg2('');
                setFocusedIndex(null);
              }}
              buttonClassName={'!text-xs'}
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

        {/*옵션 입력란*/}
        <div>
          {(selectedChip === '객관식' || selectedChip === '여러개 선택') && (
            <>
              <p className="block text-m font-semibold text-gray-700">옵션</p>
              <p className="text-gray-400 text-xs">선택지를 여러개 만들 수 있습니다.</p>
              {warningMsg && <p className="text-red-500 text-xs mb-2">{warningMsg}</p>}
              {getActiveOptions().map((option, index) => (
                <React.Fragment key={index}>
                  {' '}
                  {/*index 값 공유*/}
                  <DefaultTextField
                    placeholder="이름을 입력해주세요."
                    className="h-12"
                    value={option}
                    onChange={e => handleInputChange(index, e.target.value)}
                    onFocus={() => setFocusedIndex(index)}
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
                  {(focusedIndex === index || option || getActiveOptionsConfig()[index].limitToggled) && (
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
                            isChecked={getActiveOptionsConfig()[index].limitToggled}
                            onChange={() => handleLimitToggled(index)}
                          />
                        </div>
                        <div className="w-24">
                          <DefaultTextField
                            placeholder="0"
                            value={getActiveOptionsConfig()[index].quantity}
                            disabled={!getActiveOptionsConfig()[index].limitToggled} // 토글 OFF면 수정 불가
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
            </>
          )}
          {selectedChip === '자유로운 텍스트' && <div></div>} {/*수정해야할 부분*/}
        </div>

        <div className="w-full mt-14 mb-20">
          <Button
            label="저장하기"
            onClick={() => {
              handleSave();
            }}
            className="w-full h-12 rounded-full"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionCreatePage;
