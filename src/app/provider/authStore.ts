import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  name: string | null;
  setName: (name: string) => void;

  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isModalOpen: false,

      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),

      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, name: null }),

      name: null,
      setName: (name) => set({ name }),
    }), { name: 'auth-storage' }
  )
);

export default useAuthStore;
