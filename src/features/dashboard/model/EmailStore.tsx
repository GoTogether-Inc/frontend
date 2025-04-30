import { create } from 'zustand';

interface EmailState {
    reservationEmailId: number;
    title: string;
    content: string;
    recipients: string[];
    reservationDate: string; // 'YYYY-MM-DD'
    reservationTime: string; // 'HH:mm'
    setReservationEmailId: (reservationEmailId: number) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setRecipients: (recipients: string[]) => void;
    setReservationDate: (date: string) => void;
    setReservationTime: (time: string) => void;
    reset: () => void;
}

export const useEmailStore = create<EmailState>((set) => ({
    reservationEmailId: 0,
    title: '',
    content: '',
    recipients: [],
    reservationDate: '',
    reservationTime: '', // 추후 2개 통합 예정
    setReservationEmailId: (reservationEmailId) => set({reservationEmailId}),
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setRecipients: (recipients) => set({ recipients }),
    setReservationDate: (date) => set({ reservationDate: date }),
    setReservationTime: (time) => set({ reservationTime: time }),
    reset: () =>
        set({
            reservationEmailId: 0,
            title: '',
            content: '',
            recipients: [],
            reservationDate: '',
            reservationTime: '',
        }),
}));
