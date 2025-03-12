import { create } from 'zustand';
import { responsesData } from '../../../shared/types/responseType';

interface ResponseState {
    response: responsesData[]; 
    selectedField: 'name' | 'phone' | 'email'; 
    selectedResponse: responsesData[]; //선택된 응답자의 데이터
    uniqueResponseNames: string[]; //응답자 이름 배열 중복x 
    itemsPerPage: number;
    currentIndex: number;

    setResponses: (responses: responsesData[]) => void; 
    setSelectedField: (field: 'name' | 'phone' | 'email') => void; 
    setSelectedResponse: (responses: responsesData[]) => void; 
    setItemsPerPage: (items: number) => void; 
    setCurrentIndex: (updateFn: (prevIndex: number) => number) => void; 

    queryOptions: string[]; 
    fieldMap: Record<string, 'name' | 'phone' | 'email'>; 
    fieldMapToKorean: Record<string, string>; 
}

export const useResponseStore = create<ResponseState>((set) => ({
    response: [],
    selectedField: 'name', 
    selectedResponse: [], 
    uniqueResponseNames: [],
    itemsPerPage: 4, 
    currentIndex: 0, 

    setResponses: (response) => {
        set({
            response, 
            uniqueResponseNames: [
                ...new Set(response.map((response) => response.name)), 
            ],
        });
    },

    queryOptions: ['이름', '전화번호', '이메일'],
    fieldMap: {
        '이름': 'name',
        '전화번호': 'phone',
        '이메일': 'email',
    },
    fieldMapToKorean: {
        'name': '이름',
        'phone': '전화번호',
        'email': '이메일',
    },

    setSelectedField: (field) => set({ selectedField: field }),

    setSelectedResponse: (responses: responsesData[]) => {
        set({ selectedResponse: responses });
    },

    setItemsPerPage: (items) => set({ itemsPerPage: items }),
    setCurrentIndex: (updateFn) => set((state) => ({
        currentIndex: updateFn(state.currentIndex),
    })),
}));
