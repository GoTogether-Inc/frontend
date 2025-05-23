import { useReducer, useEffect } from 'react';
import { ticketOptionReducer, initialState, type State, type Action } from '../model/ticketOptionReducer';
import { useLocation, useNavigate } from 'react-router-dom';

export const useTicketOptionForm = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(ticketOptionReducer, initialState);
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const editOption = location.state?.editOption;
  const navigate = useNavigate();

  const getActiveOptions = () => {
    return state.responseFormat === '객관식' ? state.singleOptions : state.multiOptions;
  };

  const handleAnswerToggled = () => {
    dispatch({ type: 'TOGGLE_ANSWER' });
  };

  const handleLimitToggled = (index: number) => {
    const isSingle = state.responseFormat === '객관식';
    const currentConfig = getActiveOptions().config[index];
    dispatch({
      type: 'UPDATE_OPTION_CONFIG',
      payload: {
        index,
        isSingle,
        config: {
          limitToggled: !currentConfig.limitToggled,
          numActivated: !currentConfig.numActivated,
        },
      },
    });
  };

  const handleClearOption = (index: number) => {
    const activeOptions = getActiveOptions();
    if (activeOptions.options.length <= 1) {
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
        isSingle: state.responseFormat === '객관식',
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

  const handleAddOption = () => {
    dispatch({
      type: 'ADD_OPTION',
      payload: {
        isSingle: state.responseFormat === '객관식',
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

  const handleInputChange = (index: number, value: string) => {
    const activeOptions = getActiveOptions();
    const hasValidOption = activeOptions.options.some(opt => opt.trim() !== '');

    dispatch({
      type: 'UPDATE_OPTION',
      payload: {
        index,
        value,
        isSingle: state.responseFormat === '객관식',
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

  const handleQuantityChange = (index: number, value: string) => {
    const isSingle = state.responseFormat === '객관식';
    const currentConfig = getActiveOptions().config[index];

    if (currentConfig.limitToggled) {
      dispatch({
        type: 'UPDATE_OPTION_CONFIG',
        payload: {
          index,
          isSingle,
          config: { quantity: value },
        },
      });
    }
  };

  const handleSave = () => {
    let isValid = true;

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

    if (state.responseFormat === '객관식' || state.responseFormat === '여러개 선택') {
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
      const newOptionId = isEditing ? editOption.id : `option-${Date.now()}`;
      const newOption = {
        id: newOptionId,
        content: state.question.title,
        answerToggled: state.question.answerToggled,
        responseFormat: state.responseFormat,
        options: state.responseFormat === '객관식' ? state.singleOptions.options : state.multiOptions.options,
        optionsConfig:
          state.responseFormat === '객관식'
            ? state.singleOptions.config
            : state.responseFormat === '여러개 선택'
            ? state.multiOptions.config
            : [],
      };

      navigate(`/dashboard/:id/ticket/option`, {
        state: {
          answerToggled: state.question.answerToggled,
          responseFormat: state.responseFormat,
          newOption: newOption,
          isEditing: isEditing,
        },
      });
    } else {
      window.alert('필수 입력 사항을 확인해주세요.');
    }
  };

  useEffect(() => {
    if (isEditing && editOption) {
      dispatch({ type: 'SET_QUESTION_TITLE', payload: editOption.content });
      dispatch({ type: 'TOGGLE_ANSWER' });
      dispatch({ type: 'SET_RESPONSE_FORMAT', payload: editOption.responseFormat });

      // localStorage에서 저장된 데이터 가져오기 (수정 모드에서만 사용)
      const savedData = localStorage.getItem('ticketOptions');
      if (savedData) {
        const parsedData = JSON.parse(savedData); // JS로 파싱된 데이터 가져오기
        const option = parsedData.options[editOption.id];

        if (option) {
          if (option.responseFormat === '객관식') {
            dispatch({
              type: 'UPDATE_OPTION',
              payload: {
                index: 0,
                value: option.options?.length > 0 ? option.options[0] : '',
                isSingle: true,
              },
            });
            dispatch({
              type: 'UPDATE_OPTION_CONFIG',
              payload: {
                index: 0,
                config:
                  option.optionsConfig?.length > 0 ? option.optionsConfig[0] : initialState.singleOptions.config[0],
                isSingle: true,
              },
            });
          } else if (option.responseFormat === '여러개 선택') {
            dispatch({
              type: 'UPDATE_OPTION',
              payload: {
                index: 0,
                value: option.options?.length > 0 ? option.options[0] : '',
                isSingle: false,
              },
            });
            dispatch({
              type: 'UPDATE_OPTION_CONFIG',
              payload: {
                index: 0,
                config:
                  option.optionsConfig?.length > 0 ? option.optionsConfig[0] : initialState.singleOptions.config[0],
                isSingle: true,
              },
            });
          }
        }
      }
    }
  }, [isEditing, editOption]);

  return {
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
  };
};
