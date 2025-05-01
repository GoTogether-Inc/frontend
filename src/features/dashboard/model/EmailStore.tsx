import { create } from 'zustand';

interface EmailState {
    reservationEmailId: number;
    title: string;
    content: string;
    recipients: string[];
    reservationDate: string; // 2025-05-01T14:00:00.000Z
    setReservationEmailId: (reservationEmailId: number) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setRecipients: (recipients: string[]) => void;
    setReservationDate: (date: string) => void;
    reset: () => void;
}

export const useEmailStore = create<EmailState>((set) => ({
    reservationEmailId: 0,
    title: '',
    content: '',
    recipients: [],
    reservationDate: '',
    setReservationEmailId: (reservationEmailId) => set({reservationEmailId}),
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setRecipients: (recipients) => set({ recipients }),
    setReservationDate: (date) => set({ reservationDate: date }),
    reset: () =>
        set({
            reservationEmailId: 0,
            title: '',
            content: '',
            recipients: [],
            reservationDate: '',
        }),
}));
