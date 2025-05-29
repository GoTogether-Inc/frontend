export interface ParticipantResponse {
    id: number;
    ticketId: number;
    orderId: number;
    participant: string;
    email: string;
    phoneNumber: string;
    purchaseDate: string;
    ticketName: string;
    orderStatus: 'COMPLETED' | 'CANCELLED' | 'PENDING';
    checkedIn: boolean;
    isApproved: boolean;
}