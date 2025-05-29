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
export const readPurchaserAnswers = async (ticketId: number): Promise<{ isSuccess: boolean; result: TicketOptionAnswerResponse }> => {
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
import { TicketOptionRequest, TicketOptionResponse } from '../model/ticketOption';
import { ApiResponse } from '../../../shared/types/api/apiResponse';

// 티켓 옵션 생성
export const createTicketOption = async (data: TicketOptionRequest): Promise<TicketOptionResponse> => {
  const response = await axiosClient.post<TicketOptionResponse>('/ticket-options', data);
  return response.data;
};

// 티켓 옵션 수정
export const modifyTicketOption = async (
  ticketOptionId: number,
  data: TicketOptionRequest
): Promise<TicketOptionRequest> => {
  const response = await axiosClient.put<TicketOptionRequest>(`/ticket-options/${ticketOptionId}`, data);
  return response.data;
};

// 티켓 옵션 삭제 (UI 없음, 현재 호출되지 않고있는 상태)
export const deleteTicketOption = async (ticketOptionId: number): Promise<ApiResponse<{}>> => {
  const response = await axiosClient.delete<ApiResponse<{}>>(`/ticket-options/${ticketOptionId}`);
  return response.data;
};

// 티켓 옵션 목록 조회
export const getTicketOptions = async (eventId: number): Promise<TicketOptionResponse> => {
  const response = await axiosClient.get<TicketOptionResponse>(`/ticket-options/events/${eventId}`);
  return response.data;
};

// 티켓에 부착된 옵션 목록 조회
export const getAttachedTicketOptions = async (ticketId: number): Promise<TicketOptionResponse> => {
  const response = await axiosClient.get<TicketOptionResponse>(`ticket-options/tickets/${ticketId}`);
  return response.data;
};

// 티켓 옵션 상세 조회
export const getTicketOptionDetail = async (ticketOptionId: number): Promise<TicketOptionResponse> => {
  const response = await axiosClient.get<TicketOptionResponse>(`/ticket-options/${ticketOptionId}`);
  return response.data;
};

// 티켓 옵션 부착
export const attachTicketOption = async (ticketId: number, ticketOptionId: number): Promise<ApiResponse<string>> => {
  const response = await axiosClient.post<ApiResponse<string>>(
    '/ticket-option-assignments',
    null, // body 없음
    {
      params: { ticketId, ticketOptionId }, // 쿼리스트링으로 전달
    }
  );
  return response.data;
};

// 티켓에 부착된 티켓 옵션 부착 취소
export const detachTicketOption = async (
  ticketId: number,
  ticketOptionId: number
): Promise<ApiResponse<{}>> => {
  const response = await axiosClient.delete<ApiResponse<{}>>(`/ticket-option-assignments`, {
    params: {
      ticketId,
      ticketOptionId,
    },
  });
  return response.data;
};
