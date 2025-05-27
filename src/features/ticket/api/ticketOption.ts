import { axiosClient } from "../../../shared/types/api/http-client";
import { PersonalTicketOptionAnswerResponse, TicketOptionAnswerRequest, TicketOptionAnswerResponse, TicketOptionResponse } from "../model/ticketInformation";

// 티켓 옵션 조회
export const readTicketOptions = async (ticketId: number): Promise<{ isSuccess: boolean; result: TicketOptionResponse[] }> => {
  const response = await axiosClient.get(`/ticket-options/tickets/${ticketId}`);
  return response.data;
};

// 티켓 옵션 응답 전송
export const createTicketOptionAnswers = async (answers: TicketOptionAnswerRequest) => {
  const response = await axiosClient.post("/ticket-option-answers", answers);
  return response.data;
};

// 티켓 옵션 응답 전체 조회
export const readPurchaserAnswers = async (ticketId: number): Promise<{ isSuccess: boolean; result: TicketOptionAnswerResponse[] }> => {
  const response = await axiosClient.get("/ticket-option-answers/purchaser-answer", {
    params: { ticketId },
  });
  return response.data;
};

// 티켓 옵션 응답 개별 조회
export const readPersonalTicketOptionAnswers = async (ticketId: number): Promise<{ isSuccess: boolean; result: PersonalTicketOptionAnswerResponse[] }> => {
  const response = await axiosClient.get("/ticket-option-answers", {
    params: { ticketId },
  });
  return response.data;
};