import { create } from "zustand";

interface TicketOptionState {
    currentPage: number;
    setCurrentPage: (page: number) => void;

    selectedOptions: { [page: number]: { [optionId: number]: string | number | number[] } };
    setOption: (page: number, optionId: number, value: string | number | number[]) => void;
    resetOptions: () => void;
}

export const useTicketOptionStore = create<TicketOptionState>((set) => ({
    currentPage: 1,
    setCurrentPage: (page: number) => set({ currentPage: page }),

    selectedOptions: {},
    setOption: (index, optionId, value) => {
        set((state) => {
            const updatedSelectedOptions = { ...state.selectedOptions };
            if (!updatedSelectedOptions[index]) {
                updatedSelectedOptions[index] = {};
            }
            updatedSelectedOptions[index][optionId] = value;
            return { selectedOptions: updatedSelectedOptions };
        });
    },
    resetOptions: () => set({ selectedOptions: {}, currentPage: 1 }),
}));
