import { create } from 'zustand';

interface EmailState {
    title: string;
    content: string;
    recipients: string[];
    reservationDate: string; // 'YYYY-MM-DD'
    reservationTime: string; // 'HH:mm'
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setRecipients: (recipients: string[]) => void;
    setReservationDate: (date: string) => void;
    setReservationTime: (time: string) => void;
    reset: () => void;
}

export const useEmailStore = create<EmailState>((set) => ({
    title: '',
    content: '',
    recipients: [],
    reservationDate: '',
    reservationTime: '', // 추후 2개 통합 예정
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setRecipients: (recipients) => set({ recipients }),
    setReservationDate: (date) => set({ reservationDate: date }),
    setReservationTime: (time) => set({ reservationTime: time }),
    reset: () =>
        set({
            title: '',
            content: '',
            recipients: [],
            reservationDate: '',
            reservationTime: '',
        }),
}));
