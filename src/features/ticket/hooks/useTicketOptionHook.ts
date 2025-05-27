import { useMutation, useQuery } from "@tanstack/react-query";
import { PersonalTicketOptionAnswerResponse, TicketOptionAnswerRequest, TicketOptionAnswerResponse, TicketOptionResponse, TicketResponse } from "../model/ticketInformation";
import { createTicketOptionAnswers, readPersonalTicketOptionAnswers, readPurchaserAnswers, readTicketOptions } from "../api/ticketOption";

// 티켓 옵션 조회
export const useTicketOptions = (ticketId: number) => {
    return useQuery<{ isSuccess: boolean; result: TicketOptionResponse[] }>({
        queryKey: ['ticketOptions', ticketId],
        queryFn: () => readTicketOptions(ticketId),
        enabled: !!ticketId,
    });
};

// 티켓 옵션 응답 전송
export const useCreateTicketOptionAnswers = () => {
    return useMutation<TicketResponse, Error, TicketOptionAnswerRequest>({
        mutationFn: createTicketOptionAnswers,
        onSuccess: () => {
            console.log("티켓 옵션 응답 전송 성공");
        },
        onError: () => {
            alert("티켓 옵션 응답 전송 중 오류가 발생했습니다.");
        },
    });
};

// 티켓 옵션 응답 전체 조회
export const usePurchaserAnswers = (ticketId: number | null) => {
    return useQuery<{ isSuccess: boolean; result: TicketOptionAnswerResponse[] }>({
        queryKey: ['purchaserAnswers', ticketId],
        queryFn: () => {
            if (ticketId === null) {
                throw new Error("ticketId is required");
            }
            return readPurchaserAnswers(ticketId);
        },
        enabled: !!ticketId,
    });
};

// 티켓 옵션 응답 개별 조회
export const usePersonalTicketOptionAnswers = (ticketId: number | null) => {
    return useQuery<{ isSuccess: boolean; result: PersonalTicketOptionAnswerResponse[] }>({
        queryKey: ['personalTicketOptionAnswers', ticketId],
        queryFn: () => {
            if (ticketId === null) {
                throw new Error("ticketId is required");
            }
            return readPersonalTicketOptionAnswers(ticketId);
        },
        enabled: !!ticketId,
    });
};