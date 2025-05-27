import { axiosClient } from "../../../shared/types/api/http-client";
import { TicketOptionAnswerRequest, TicketOptionResponse } from "../model/ticketInformation";

export const readTicketOptions = async (ticketId: number): Promise<{ isSuccess: boolean; result: TicketOptionResponse[] }> => {
    const response = await axiosClient.get(`/ticket-options/tickets/${ticketId}`);
    return response.data;
};

export const createTicketOptionAnswers = async (answers: TicketOptionAnswerRequest) => {
  const response = await axiosClient.post("/ticket-option-answers", answers);
  return response.data;
};