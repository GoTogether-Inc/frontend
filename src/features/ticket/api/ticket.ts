import { axiosClient } from "../../../shared/types/api/http-client";
import { CreateTicketRequest } from "../model/ticketCreation";

export const createTicket = async (data: CreateTicketRequest) => {
    const response = await axiosClient.post('/tickets', data);
    return response.data;
}

export const readTicket = {
    getAll: async (eventId: number) => {
        const response = await axiosClient.get("/tickets", {
            params: { eventId },
        });
        return response.data;
    },
}