import { State, Action } from './ticketOption';

export const initialState: State = {
  warnings: {
    optionWarning: '',
    quantityWarning: '',
    questionWarning: '',
  },
  question: {
    title: '',
    answerToggled: false,
  },
  responseFormat: '객관식',
  focusedIndex: null,
  singleOptions: {
    options: Array(3).fill(''),
    config: Array(3).fill({
      limitToggled: false,
      numActivated: true,
      quantity: '',
    }),
  },
  multiOptions: {
    options: Array(3).fill(''),
    config: Array(3).fill({
      limitToggled: false,
      numActivated: true,
      quantity: '',
    }),
  },
};

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
    case 'TOGGLE_ANSWER':
      return {
        ...state,
        question: {
          ...state.question,
          answerToggled: !state.question.answerToggled,
        },
      };
    case 'SET_RESPONSE_FORMAT':
      return {
        ...state,
        responseFormat: action.payload,
      };
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
    case 'UPDATE_OPTION_CONFIG': {
      const { index, config, isSingle } = action.payload;
      const optionsKey = isSingle ? 'singleOptions' : 'multiOptions';
      return {
        ...state,
        [optionsKey]: {
          ...state[optionsKey],
          config: state[optionsKey].config.map((cfg, i) => (i === index ? { ...cfg, ...config } : cfg)),
        },
      };
    }
    case 'ADD_OPTION': {
      const { isSingle } = action.payload;
      const optionsKey = isSingle ? 'singleOptions' : 'multiOptions';
      return {
        ...state,
        [optionsKey]: {
          options: [...state[optionsKey].options, ''],
          config: [
            ...state[optionsKey].config,
            {
              limitToggled: false,
              numActivated: true,
              quantity: '',
            },
          ],
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
          config: state[optionsKey].config.filter((_, i) => i !== index),
        },
      };
    }
    default:
      return state;
  }
}

// Reducer 관련 타입 한번에 관리 및 내보내기
export type { State, Action };
