import { create } from 'zustand';

interface AuthStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useAuthStore;
