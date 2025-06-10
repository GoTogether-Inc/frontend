export interface ParticipantResponse {
    id: number;
    ticketId: number;
    orderCode: number;
    participant: string;
    email: string;
    phoneNumber: string;
    purchaseDate: string;
    ticketName: string;
    orderStatus: 'COMPLETED' | 'CANCELLED' | 'PENDING';
    checkedIn: boolean;
    approved: boolean;
    ticketType: 'FIRST_COME' | 'SELECTION';
}