import { useReducer } from 'react';
import { ticketOptionReducer, initialState, type State, type Action } from '../model/ticketOptionReducer';
import { useParams } from 'react-router-dom';
import {
  useCreateTicketOptionMutation,
  useModifyTicketOptionMutation,
  useGetTicketOptionDetail,
} from './useTicketOptionHook';
import { TicketOptionsType } from '../model/ticketOption';

export const useTicketOptionForm = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(ticketOptionReducer, initialState);
  const { id: eventId, optionId } = useParams();
  const { mutate: createTicketOptionMutation } = useCreateTicketOptionMutation();
  const { mutate: modifyTicketOptionMutation } = useModifyTicketOptionMutation();
  const { data: optionDetail, isLoading } = useGetTicketOptionDetail(Number(optionId));
  const isEditing = !!optionId;
  const editOption = optionDetail?.result;

  const getActiveOptions = () => {
    return state.question.responseFormat === '객관식' ? state.singleOptions : state.multiOptions;
  };

  // 필수 응답 여부 토글
  const handleAnswerToggled = () => {
    dispatch({ type: 'TOGGLE_ANSWER' });
  };

  // 옵션 삭제
  const handleClearOption = (index: number) => {
    const activeOptions = getActiveOptions();
    if (activeOptions.options.length < 1) {
      dispatch({
        type: 'SET_WARNING',
        payload: {
          field: 'optionWarning',
          value: '최소 한 개 이상의 선택지를 만들어주세요.',
        },
      });
      return;
    }

    dispatch({
      type: 'REMOVE_OPTION',
      payload: {
        index,
        isSingle: state.question.responseFormat === '객관식',
      },
    });
    dispatch({
      type: 'SET_WARNING',
      payload: {
        field: 'optionWarning',
        value: '',
      },
    });
  };

  // 옵션 추가
  const handleAddOption = () => {
    dispatch({
      type: 'ADD_OPTION',
      payload: {
        isSingle: state.question.responseFormat === '객관식',
      },
    });
    dispatch({
      type: 'SET_WARNING',
      payload: {
        field: 'optionWarning',
        value: '',
      },
    });
  };

  // 옵션 수정
  const handleInputChange = (index: number, value: string) => {
    const activeOptions = getActiveOptions();
    const hasValidOption = activeOptions.options.some(opt => opt.trim() !== '');

    dispatch({
      type: 'UPDATE_OPTION',
      payload: {
        index,
        value,
        isSingle: state.question.responseFormat === '객관식',
      },
    });

    dispatch({
      type: 'SET_WARNING',
      payload: {
        field: 'optionWarning',
        value: hasValidOption ? '' : '최소 한 개 이상의 선택지를 만들어주세요.',
      },
    });
  };

  const handleEditNavigater = (optionDetail: TicketOptionsType) => {
    dispatch({ type: 'SET_QUESTION_TITLE', payload: optionDetail.name });
    dispatch({ type: 'SET_DESCRIPTION', payload: optionDetail.description });

    // 응답 형식 세팅
    dispatch({ type: 'SET_RESPONSE_TOGGLE', payload: optionDetail.type });
    // 필수 여부 세팅
    if (optionDetail.isMandatory) {
      dispatch({ type: 'TOGGLE_ANSWER' });
    }

    // 옵션(choices) 세팅
    if (optionDetail.type === 'SINGLE' || optionDetail.type === 'MULTIPLE') {
      const isSingle = optionDetail.type === 'SINGLE';
      // 1. 배열 길이 맞추기
      for (
        let i = 0;
        i < optionDetail.choices.length - state[isSingle ? 'singleOptions' : 'multiOptions'].options.length;
        i++
      ) {
        dispatch({
          type: 'ADD_OPTION',
          payload: { isSingle },
        });
      }
      // 2. 값 세팅
      optionDetail.choices.forEach((choice, idx) => {
        dispatch({
          type: 'UPDATE_OPTION',
          payload: {
            index: idx,
            value: choice.name,
            isSingle,
          },
        });
      });
    }
  };

  // 생성 및 수정 내용 저장
  const handleSave = () => {
    let isValid = true;

    console.log('Clicked!');

    if (state.question.title.trim() === '') {
      dispatch({
        type: 'SET_WARNING',
        payload: {
          field: 'questionWarning',
          value: '질문을 입력해주세요.',
        },
      });
      isValid = false;
      document.querySelector('.질문-입력란')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      dispatch({
        type: 'SET_WARNING',
        payload: {
          field: 'questionWarning',
          value: '',
        },
      });
    }

    if (state.question.responseFormat === '객관식' || state.question.responseFormat === '여러개 선택') {
      const activeOptions = getActiveOptions();
      const hasValidOption = activeOptions.options.some(opt => opt.trim() !== '');

      if (!hasValidOption) {
        dispatch({
          type: 'SET_WARNING',
          payload: {
            field: 'optionWarning',
            value: '최소 한 개 이상의 선택지를 만들어주세요.',
          },
        });
        isValid = false;
      }
    }

    if (isValid) {
      const type =
        state.question.responseFormat === '객관식'
          ? 'SINGLE'
          : state.question.responseFormat === '여러개 선택'
          ? 'MULTIPLE'
          : 'TEXT';

      const choices =
        state.question.responseFormat === '객관식'
          ? state.singleOptions.options.filter(opt => opt.trim() !== '')
          : state.question.responseFormat === '여러개 선택'
          ? state.multiOptions.options.filter(opt => opt.trim() !== '')
          : [];

      if (isEditing && editOption) {
        modifyTicketOptionMutation({
          ticketOptionId: editOption.id,
          data: {
            eventId: Number(eventId),
            name: state.question.title,
            description: state.question.description,
            type,
            isMandatory: state.question.answerToggled,
            choices,
          },
        });
      } else {
        createTicketOptionMutation({
          eventId: Number(eventId),
          name: state.question.title,
          description: state.question.description,
          type,
          isMandatory: state.question.answerToggled,
          choices,
        });
      }
    } else {
      window.alert('필수 입력 사항을 확인해주세요.');
    }
  };

  const setAll = (option: TicketOptionsType) => {
    dispatch({ type: 'SET_ALL', payload: option });
  };

  return {
    state,
    dispatch,
    isEditing,
    editOption,
    isLoading,
    getActiveOptions,
    handleAnswerToggled,
    handleClearOption,
    handleAddOption,
    handleInputChange,
    handleSave,
    handleEditNavigater,
    setAll,
  };
};
