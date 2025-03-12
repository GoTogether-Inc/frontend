import { create } from 'zustand';
import { responsesData } from '../../../shared/types/responseType';

interface ResponseState {
    response: responsesData[]; // 전체 응답 데이터
    selectedField: 'name' | 'phone' | 'email'; // 선택된 필드 (질문)
    selectedResponse: responsesData[]; // 선택된 응답자의 데이터
    uniqueResponseNames: string[]; // 응답자 이름 배열 중복x (개별)
    itemsPerPage: number;
    currentIndex: number;

    setResponses: (responses: responsesData[]) => void; // 응답 데이터 설정
    setSelectedField: (field: 'name' | 'phone' | 'email') => void; // 필드 설정 함수
    setSelectedResponse: (responses: responsesData[]) => void; // 응답자 선택 함수
    setItemsPerPage: (items: number) => void; // 페이지당 항목 수 설정 함수
    setCurrentIndex: (updateFn: (prevIndex: number) => number) => void; 
}

export const useResponseStore = create<ResponseState>((set) => ({
    response: [],
    selectedField: 'name', // 기본적으로 선택된 필드 (이름)
    selectedResponse: [], // 기본적으로 선택된 응답자 없음
    uniqueResponseNames: [],
    itemsPerPage: 4, 
    currentIndex: 0, 

    // 응답 데이터 설정 함수
    setResponses: (response) => {
        set({
            response, // 응답 데이터 업데이트
            uniqueResponseNames: [
                ...new Set(response.map((response) => response.name)), // 응답자 이름 배열 중복 제거
            ],
        });
    },

    // 필드 설정 함수
    setSelectedField: (field) => set({ selectedField: field }),

    // 응답자 선택 함수
    setSelectedResponse: (responses: responsesData[]) => {
        set({ selectedResponse: responses });
    },

    setItemsPerPage: (items) => set({ itemsPerPage: items }),
    setCurrentIndex: (updateFn) => set((state) => ({
        currentIndex: updateFn(state.currentIndex),
    })),
}));
