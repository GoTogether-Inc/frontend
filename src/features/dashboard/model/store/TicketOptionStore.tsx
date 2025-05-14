import { create } from "zustand";

export interface TOption {
    type: string;
    optionName: string;
    required: boolean;
    choices: string[];
}

interface TicketOptionState {
    currentPage: number;
    setCurrentPage: (page: number) => void;

    selectedOptions: { [index: number]: { [key: string]: string | string[] } };
    setOption: (index: number, optionName: string, value: string | string[]) => void;
}

export const useTicketOptionStore = create<TicketOptionState>((set) => ({
    currentPage: 1,
    setCurrentPage: (page: number) => set({ currentPage: page }),

    selectedOptions: {},
    setOption: (index, optionName, value) => {
        set((state) => {
            const updatedSelectedOptions = { ...state.selectedOptions };
            if (!updatedSelectedOptions[index]) {
                updatedSelectedOptions[index] = {};
            }
            updatedSelectedOptions[index][optionName] = value;
            return { selectedOptions: updatedSelectedOptions };
        });
    },
}));
