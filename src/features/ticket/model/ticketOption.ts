import { ApiResponse } from '../../../shared/types/api/apiResponse';

// 인터페이스 정의
export interface OptionConfig {
  limitToggled: boolean;
  numActivated: boolean;
  quantity: string;
}

// 상태 인터페이스 정의
export interface State {
  warnings: {
    optionWarning: string;
    quantityWarning: string;
    questionWarning: string;
  };
  question: {
    title: string;
    answerToggled: boolean;
  };
  responseFormat: string; // 단일 선택 or 여러개 선택 or 자유로운 텍스트
  focusedIndex: number | null;
  singleOptions: {
    options: string[]; // 옵션 문자열 배열
    config: OptionConfig[]; // 각 옵션에 대한 설정 배열
  };
  multiOptions: {
    options: string[];
    config: OptionConfig[];
  };
}

// Action 타입 정의 (Reducer 함수에서 사용, OptionConfig 타입 참조)
export type Action =
  | { type: 'SET_WARNING'; payload: { field: keyof State['warnings']; value: string } } // 경고 메시지
  | { type: 'SET_QUESTION_TITLE'; payload: string } // 질문 제목 업데이트
  | { type: 'TOGGLE_ANSWER' } // answerToggled 값 반전
  | { type: 'SET_RESPONSE_FORMAT'; payload: string } // 응답 포멧 변경
  | { type: 'SET_FOCUSED_INDEX'; payload: number | null } // 포커싱된 옵션 인덱스 변경
  | { type: 'UPDATE_OPTION'; payload: { index: number; value: string; isSingle: boolean } } // 옵션 텍스트를 수정
  | { type: 'UPDATE_OPTION_CONFIG'; payload: { index: number; config: Partial<OptionConfig>; isSingle: boolean } } // 특정 옵션 설정 업데이트 (config -> optional)
  | { type: 'ADD_OPTION'; payload: { isSingle: boolean } } // 옵션 추가
  | { type: 'REMOVE_OPTION'; payload: { index: number; isSingle: boolean } }; // 옵션 삭제

export interface TicketOptionRequest {
  eventId: number;
  name: string;
  description: string;
  type: string;
  isMandatory: boolean;
  choices: string[];
}

export interface TicketOptionsType {
  id: number;
  name: string;
  description: string;
  type: 'SINGLE' | 'MULTIPLE' | 'TEXT';
  isMandatory: boolean;
  choices: {
    id: number;
    content: string;
  }[];
}

export interface TicketOptionResponse extends ApiResponse<TicketOptionsType> {}
