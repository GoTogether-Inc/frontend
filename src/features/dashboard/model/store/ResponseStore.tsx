import { create } from 'zustand';
import { responsesData } from '../../../../shared/types/responseType';

interface ResponseState {
  response: responsesData[];
  selectedField: string;
  selectedResponse: responsesData[];
  currentIndex: number;
  isModalOpen: boolean;
  selectedTicketId: number | null;

  setResponses: (responses: responsesData[]) => void;
  setSelectedField: (field: string) => void;
  setSelectedResponse: (responseName: string, responseEmail: string) => void;
  setCurrentIndex: (updateFn: (prevIndex: number) => number) => void;
  openModal: () => void;
  closeModal: () => void;
  setSelectedTicketId: (id: number) => void;
}

export const useResponseStore = create<ResponseState>(set => ({
  response: [],
  selectedField: '',
  selectedResponse: [],
  currentIndex: 0,
  isModalOpen: false,
  selectedTicketId: 0,

  setResponses: response => {
    set(() => ({
      response: response,
      selectedField: response.length > 0 ? Object.keys(response[0])[1] : '',
    }));
  },

  setSelectedField: field => {
    set({ selectedField: field });
  },

  setSelectedResponse: (responseName, responseEmail) => {
    set(state => {
      const filteredResponses = state.response.filter(res => res.name === responseName && res.email === responseEmail);
      return {
        selectedResponse: filteredResponses,
        currentIndex: 0,
      };
    });
  },

  setCurrentIndex: updateFn =>
    set(state => ({
      currentIndex: updateFn(state.currentIndex),
    })),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setSelectedTicketId: (ticketId) => {
    set({selectedTicketId: ticketId})
  }
}));
