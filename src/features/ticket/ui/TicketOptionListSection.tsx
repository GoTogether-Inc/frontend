import React from 'react';
import { useTicketOptionForm } from '../hooks/useTicketOptionForm';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import Trash from '../../../../design-system/icons/Trash.svg';
import IconButton from '../../../../design-system/ui/buttons/IconButton';

export const TicketOptionListSection = ({ form }: { form: ReturnType<typeof useTicketOptionForm> }) => {
  const { state, dispatch, handleInputChange, handleClearOption, handleAddOption, getActiveOptions } = form;

  return (
    <>
      {/*옵션 입력란*/}
      <div>
        {(state.question.responseFormat === 'SINGLE' || state.question.responseFormat === 'MULTIPLE') && (
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
                  value={option ?? ''}
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
        {state.question.responseFormat === 'TEXT' && <div></div>}
      </div>
    </>
  );
};
