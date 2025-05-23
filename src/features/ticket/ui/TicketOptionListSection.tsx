import React from 'react';
import { useTicketOptionForm } from '../hooks/useTicketOptionForm';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import ToggleButton from '../../../../design-system/ui/buttons/ToggleButton';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import Trash from '../../../../design-system/icons/Trash.svg';
import IconButton from '../../../../design-system/ui/buttons/IconButton';

export const TicketOptionListSection = ({ form }: { form: ReturnType<typeof useTicketOptionForm> }) => {
  const {
    state,
    dispatch,
    handleInputChange,
    handleClearOption,
    handleLimitToggled,
    handleQuantityChange,
    handleAddOption,
    getActiveOptions,
  } = form;

  return (
    <>
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
    </>
  );
};
