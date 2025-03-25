export interface CreateTicketRequest {
    eventId: number;
    ticketType: string;
    ticketName: string;
    ticketDescription: string;
    ticketPrice: number;
    availableQuantity: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}