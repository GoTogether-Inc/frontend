import { create } from 'zustand';
import { responsesData } from '../../../shared/types/responseType';

interface ResponseState {
    response: responsesData[];
    selectedField: string;
    selectedResponse: responsesData[]; 
    itemsPerPage: number;
    currentIndex: number;

    setResponses: (responses: responsesData[]) => void;
    setSelectedField: (field: string) => void;
    setSelectedResponse: (responseName: string, responseEmail: string) => void;
    setItemsPerPage: (items: number) => void;
    setCurrentIndex: (updateFn: (prevIndex: number) => number) => void;

    fieldMap: Record<string, 'name' | 'phone' | 'email'>;
    fieldMapToKorean: Record<string, string>;

}

export const useResponseStore = create<ResponseState>((set) => ({
    response: [],
    selectedField: '',
    selectedResponse: [],
    itemsPerPage: 4,
    currentIndex: 0,

    setResponses: (response) => { 
        set(() => ({ 
            response: response, 
            selectedField: response.length > 0 ? Object.keys(response[0])[1] : '' 
        }));
    },

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

    setSelectedField: (field) => {
        set((state) => {
            const mappedField = state.fieldMap[field];
            return { selectedField: mappedField };
        });
    },

    setSelectedResponse: (responseName, responseEmail) => {
        set((state) => {
            const filteredResponses = state.response.filter((res) => res.name === responseName && res.email === responseEmail);
            return {
                selectedResponse: filteredResponses,
                currentIndex: 0,
            };
        });
    },

    setItemsPerPage: (items) => set({ itemsPerPage: items }),
    setCurrentIndex: (updateFn) => set((state) => ({
        currentIndex: updateFn(state.currentIndex),
    })),

}));
