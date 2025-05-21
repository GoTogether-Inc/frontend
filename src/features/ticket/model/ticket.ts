export interface CreateTicketRequest {
  eventId: number;
  ticketType: string;
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number;
  availableQuantity: number;
  startDate: string;
  endDate: string;
}

export interface ReadTicketResponse {
  ticketId: number;
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number;
  availableQuantity: number;
}
