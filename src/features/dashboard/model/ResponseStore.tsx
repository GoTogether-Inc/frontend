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

    setSelectedField: (field) => {
        set({ selectedField: field });
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
