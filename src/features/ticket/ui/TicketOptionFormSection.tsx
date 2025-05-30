import { useTicketOptionForm } from '../hooks/useTicketOptionForm';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import ToggleButton from '../../../../design-system/ui/buttons/ToggleButton';
import ChoiceChip from '../../../../design-system/ui/ChoiceChip';

export const TicketOptionFormSection = ({ form }: { form: ReturnType<typeof useTicketOptionForm> }) => {
  const { state, dispatch, handleAnswerToggled } = form;
  return (
    <>
      {/*티켓 질문 입력란*/}
      <div>
        <p className="block text-m font-semibold text-gray-700">질문</p>
        <DefaultTextField
          placeholder="티셔츠 사이즈를 선택해주세요."
          detail="티켓을 잘 지어낼 수 있는 질문을 써보세요. (무료 입장권, 얼리버드, 학생 전용 등)"
          className={`h-12 ${!state.warnings.questionWarning ? 'mb-5' : ''}`}
          detailClassName="px-0"
          value={state.question.title ?? ''}
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
          value={state.question.description?? ''}
          onChange={e => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
        />
      </div>

      {/*응답 종류 선택란*/}
      <div>
        <div className="w-32 md:w-56 mb-5">
          <p className="block text-m font-semibold text-gray-700">응답을 어떤 형식으로 받을까요?</p>
          <p className="block mb-1 text-placeholderText text-11 md:text-13">한 개만 선택할 수 있습니다.</p>
          <ChoiceChip
            value={state.question.responseFormat} // 객관식
            options={[
              { label: '객관식', value: 'SINGLE' },
              { label: '여러개 선택', value: 'MULTIPLE' },
              { label: '자유로운 텍스트', value: 'TEXT' },
            ]}
            onSelect={selected => {
              dispatch({ type: 'SET_RESPONSE_TOGGLE', payload: selected });
              dispatch({ type: 'SET_WARNING', payload: { field: 'optionWarning', value: '' } });
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
          <p className="text-gray-400 text-xs">이 옵션을 키면 해당 질문에 응답을 해야만 티켓을 결제 할 수 있습니다.</p>
        </div>
        <div className="mr-12">
          <ToggleButton isChecked={state.question.answerToggled} onChange={handleAnswerToggled} />
        </div>
      </div>
    </>
  );
};
