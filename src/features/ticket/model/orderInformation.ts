export interface OrderTicketRequest {
    ticketId: number;
    eventId: number;
    ticketCnt: number;
}
export interface TicketConfirm {
    id: number;
    title: string;
    startDate: string;
    ticketName: string;
    hostChannelName: string;
    hostChannelDescription: string;
    organizerEmail: string;
    organizerPhoneNumber: string;
    eventAddress: string;
    locationLat: number;
    locationLng: number;
    orderStatus: "COMPLETED" | "PENDING" | "CANCELLED";
};
