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

export interface TicketResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string; // "ticketId: 2"
}

export interface ReadTicketResponse {
    ticketId: number;
    ticketName: string;
    ticketDescription: string;
    ticketPrice: number;
    availableQuantity: number;
}
