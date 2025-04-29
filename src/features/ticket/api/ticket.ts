import { axiosClient } from "../../../shared/types/api/http-client";
import { CreateTicketRequest, ReadTicketResponse } from "../model/ticketInformation";

export const createTicket = async (data: CreateTicketRequest) => {
    const response = await axiosClient.post('/tickets', data);
    return response.data;
}

export const readTicket = async (eventId: number): Promise<{ isSuccess: boolean; result: ReadTicketResponse[] }> => {
    const response = await axiosClient.get("/tickets", {
        params: { eventId },
    });
    return response.data;
}

export const deleteTicket = async (ticketId: number) => {
    const response = await axiosClient.delete(`/tickets/${ticketId}`);
    return response.data;
}