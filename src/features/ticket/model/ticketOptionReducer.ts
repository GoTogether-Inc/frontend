import { State, Action, TicketOptionType } from './ticketOption';

// 초기 값
export const initialState: State = {
  warnings: {
    optionWarning: '',
    questionWarning: '',
  },
  question: {
    title: '',
    description: '',
    answerToggled: false,
    responseFormat: 'SINGLE',
  },
  focusedIndex: null,
  singleOptions: {
    options: Array(3).fill(''),
  },
  multiOptions: {
    options: Array(3).fill(''),
  },
};

// 각 케이스는 동작하는 함수 정의. 세부 작동은 dispatch
export function ticketOptionReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_WARNING':
      return {
        ...state,
        warnings: {
          ...state.warnings,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'SET_QUESTION_TITLE':
      return {
        ...state,
        question: {
          ...state.question,
          title: action.payload,
        },
      };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        question: {
          ...state.question,
          description: action.payload,
        },
      };

    case 'SET_RESPONSE_TOGGLE':
      return {
        ...state,
        question: {
          ...state.question,
          responseFormat: action.payload as TicketOptionType,
        },
      };
    case 'TOGGLE_ANSWER':
      return {
        ...state,
        question: {
          ...state.question,
          answerToggled: !state.question.answerToggled,
        },
      };
    case 'ADD_OPTION': {
      const { isSingle } = action.payload;
      const optionsKey = isSingle ? 'singleOptions' : 'multiOptions';
      return {
        ...state,
        [optionsKey]: {
          options: [...state[optionsKey].options, ''],
        },
      };
    }
    case 'REMOVE_OPTION': {
      const { index, isSingle } = action.payload;
      const optionsKey = isSingle ? 'singleOptions' : 'multiOptions';
      const optionsArr = state[optionsKey].options;
      if (index < 0 || index >= optionsArr.length) {
        return state;
      }
      return {
        ...state,
        [optionsKey]: {
          options: optionsArr.filter((_, i) => i !== index),
        },
      };
    }
    case 'SET_FOCUSED_INDEX':
      return {
        ...state,
        focusedIndex: action.payload,
      };
    case 'UPDATE_OPTION': {
      const { index, value, isSingle } = action.payload;
      const optionsKey = isSingle ? 'singleOptions' : 'multiOptions';
      const optionsArr = state[optionsKey].options;
      if (index < 0 || index >= optionsArr.length) {
        return state;
      }
      return {
        ...state,
        [optionsKey]: {
          ...state[optionsKey],
          options: optionsArr.map((opt, i) => (i === index ? value : opt)),
        },
      };
    }
    case 'SET_ALL': {
      const { name, description, type, isMandatory, choices } = action.payload;
      // type에 따라 responseFormat 한글로 변환
      let responseFormat = 'SINGLE';
      if (type === 'MULTIPLE') responseFormat = 'MULTIPLE';
      if (type === 'TEXT') responseFormat = 'TEXT';

      // choices를 string[]로 변환 (choices가 배열이 아닐 경우 빈 배열 처리)
      const optionStrings = Array.isArray(choices) ? choices.map(choice => choice.name) : [];
      return {
        ...state,
        question: {
          ...state.question,
          title: name,
          description: description,
          responseFormat: responseFormat as TicketOptionType,
          answerToggled: isMandatory,
        },
        singleOptions: {
          options: type === 'SINGLE' && optionStrings.length > 0 ? optionStrings : Array(3).fill(''),
        },
        multiOptions: {
          options: type === 'MULTIPLE' && optionStrings.length > 0 ? optionStrings : Array(3).fill(''),
        },
      };
    }
    default:
      return state;
  }
}
// Reducer 관련 타입 한번에 관리 및 내보내기
export type { State, Action };
