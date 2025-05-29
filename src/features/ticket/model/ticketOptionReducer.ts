import { State, Action } from './ticketOption';

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
    responseFormat: '객관식',
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
          responseFormat: action.payload,
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
      return {
        ...state,
        [optionsKey]: {
          options: state[optionsKey].options.filter((_, i) => i !== index),
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
      return {
        ...state,
        [optionsKey]: {
          ...state[optionsKey],
          options: state[optionsKey].options.map((opt, i) => (i === index ? value : opt)),
        },
      };
    }
    case 'SET_ALL': {
      const { name, description, type, isMandatory, choices } = action.payload;
      // type에 따라 responseFormat 한글로 변환
      let responseFormat = '객관식';
      if (type === 'MULTIPLE') responseFormat = '여러개 선택';
      if (type === 'TEXT') responseFormat = '자유로운 텍스트';

      // choices를 string[]로 변환
      const optionStrings = choices.map(choice => choice.name);
      return {
        ...state,
        question: {
          ...state.question,
          title: name,
          description: description,
          responseFormat,
          answerToggled: isMandatory,
        },
        singleOptions: {
          options: type === 'SINGLE' ? optionStrings : Array(3).fill(''),
        },
        multiOptions: {
          options: type === 'MULTIPLE' ? optionStrings : Array(3).fill(''),
        },
      };
    }
    default:
      return state;
  }
}
// Reducer 관련 타입 한번에 관리 및 내보내기
export type { State, Action };
