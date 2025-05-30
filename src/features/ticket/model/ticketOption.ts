import { ApiResponse } from '../../../shared/types/api/apiResponse';

export type TicketOptionType = 'SINGLE' | 'MULTIPLE' | 'TEXT';

// 상태 인터페이스 정의
export interface State {
  warnings: {
    questionWarning: string; // 질문 경고 메시지
    optionWarning: string; // 옵션 경고 메시지
  };
  question: {
    title: string; // 질문 제목
    description: string; // 질문 설명
    responseFormat: TicketOptionType; // 응답 형식 (SINGLE, MULTIPLE, TEXT)
    answerToggled: boolean; // 필수 응답 여부
  };
  focusedIndex: number | null; // 포커싱된 옵션 인덱스
  singleOptions: {
    options: string[]; // 단일 선택 옵션 문자열 배열
  };
  multiOptions: {
    options: string[]; // 여러개 선택 옵션 문자열 배열
  };
}

// Action 타입 정의 (Reducer 함수에서 사용, OptionConfig 타입 참조)
export type Action =
  | { type: 'SET_WARNING'; payload: { field: keyof State['warnings']; value: string } } // 경고 메시지
  | { type: 'SET_QUESTION_TITLE'; payload: string } // 질문 제목 업데이트
  | { type: 'SET_DESCRIPTION'; payload: string } // 질문 설명 업데이트
  | { type: 'SET_RESPONSE_TOGGLE'; payload: string } // 응답 형식 토글
  | { type: 'TOGGLE_ANSWER' } // 필수 응답 여부 토글
  | { type: 'SET_FOCUSED_INDEX'; payload: number | null } // 포커싱된 옵션 인덱스 변경
  | { type: 'UPDATE_OPTION'; payload: { index: number; value: string; isSingle: boolean } } // 추가 옵션의 텍스트를 수정
  | { type: 'ADD_OPTION'; payload: { isSingle: boolean } } // 추가 옵션 추가
  | { type: 'REMOVE_OPTION'; payload: { index: number; isSingle: boolean } } // 옵션 삭제
  | { type: 'SET_ALL'; payload: TicketOptionsType }; // 전체 값 세팅

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
  type: TicketOptionType;
  isMandatory: boolean;
  choices: {
    id: number;
    name: string;
  }[];
}

export interface TicketOptionResponse extends ApiResponse<TicketOptionsType> {}
