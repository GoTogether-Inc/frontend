import React from 'react';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Trash from '../../../../../design-system/icons/Trash.svg';
import DefaultTextField from '../../../../../design-system/ui/textFields/DefaultTextField';
import ToggleButton from '../../../../../design-system/ui/buttons/ToggleButton';
import IconButton from '../../../../../design-system/ui/buttons/IconButton';
import TertiaryButton from '../../../../../design-system/ui/buttons/TertiaryButton';
import ChoiceChip from '../../../../../design-system/ui/ChoiceChip';
import Button from '../../../../../design-system/ui/Button';
import { useTicketOptionForm } from '../../../../features/ticket/hooks/useTicketOptionForm';

const TicketOptionCreatePage = () => {
  const {
    state,
    dispatch,
    isEditing,
    editOption,
    getActiveOptions,
    handleAnswerToggled,
    handleLimitToggled,
    handleClearOption,
    handleAddOption,
    handleInputChange,
    handleQuantityChange,
    handleSave,
  } = useTicketOptionForm();

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
            className={`h-12 ${!state.warnings.questionWarning ? 'mb-5' : ''}`}
            detailClassName="px-0"
            value={state.question.title}
            onChange={e => dispatch({ type: 'SET_QUESTION_TITLE', payload: e.target.value })}
          />
          {state.warnings.questionWarning && (
            <p className="text-red-500 text-xs mt-1 mb-5">{state.warnings.questionWarning}</p>
          )}
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
                dispatch({ type: 'SET_RESPONSE_FORMAT', payload: selected });
                dispatch({ type: 'SET_WARNING', payload: { field: 'optionWarning', value: '' } });
                dispatch({ type: 'SET_WARNING', payload: { field: 'quantityWarning', value: '' } });
                dispatch({ type: 'SET_FOCUSED_INDEX', payload: null });
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
            <ToggleButton isChecked={state.question.answerToggled} onChange={handleAnswerToggled} />
          </div>
        </div>

        {/*옵션 입력란*/}
        <div>
          {(state.responseFormat === '객관식' || state.responseFormat === '여러개 선택') && (
            <>
              <p className="block text-m font-semibold text-gray-700">옵션</p>
              <p className="text-gray-400 text-xs">선택지를 여러개 만들 수 있습니다.</p>
              {state.warnings.optionWarning && (
                <p className="text-red-500 text-xs mb-2">{state.warnings.optionWarning}</p>
              )}
              {getActiveOptions().options.map((option, index) => (
                <React.Fragment key={index}>
                  <DefaultTextField
                    placeholder="이름을 입력해주세요."
                    className="h-12"
                    value={option}
                    onChange={e => handleInputChange(index, e.target.value)}
                    onFocus={() => dispatch({ type: 'SET_FOCUSED_INDEX', payload: index })}
                    rightContent={
                      <IconButton
                        size="medium"
                        iconPath={<img src={Trash} alt="TrashIcon" />}
                        onClick={() => handleClearOption(index)}
                      />
                    }
                  />
                  {state.focusedIndex === index && !option && (
                    <p className="mt-1 text-red-500 text-xs">이름을 입력해주세요.</p>
                  )}
                  {(state.focusedIndex === index || option || getActiveOptions().config[index].limitToggled) && (
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
                            isChecked={getActiveOptions().config[index].limitToggled}
                            onChange={() => handleLimitToggled(index)}
                          />
                        </div>
                        <div className="w-24">
                          <DefaultTextField
                            placeholder="0"
                            value={getActiveOptions().config[index].quantity}
                            disabled={!getActiveOptions().config[index].limitToggled}
                            onChange={e => handleQuantityChange(index, e.target.value)}
                            className="h-10 !w-24 mt-1"
                          />
                        </div>
                        {state.warnings.quantityWarning && (
                          <p className="text-red-500 text-xs mt-1">{state.warnings.quantityWarning}</p>
                        )}
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
          {state.responseFormat === '자유로운 텍스트' && <div></div>}
        </div>

        <div className="w-full mt-14 mb-20">
          <Button label="저장하기" onClick={handleSave} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionCreatePage;
