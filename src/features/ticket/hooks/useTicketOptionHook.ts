import { useMutation, useQuery } from "@tanstack/react-query";
import { TicketOptionAnswerRequest, TicketOptionResponse, TicketResponse } from "../model/ticketInformation";
import { createTicketOptionAnswers, readTicketOptions } from "../api/ticketOption";

export const useTicketOptions = (ticketId: number) => {
    return useQuery<{ isSuccess: boolean; result: TicketOptionResponse[] }>({
        queryKey: ['ticketOptions', ticketId],
        queryFn: () => readTicketOptions(ticketId),
        enabled: !!ticketId,
    });
};

export const useCreateTicketOptionAnswers = () => {
    return useMutation<TicketResponse,Error,TicketOptionAnswerRequest>({
        mutationFn: createTicketOptionAnswers,
        onSuccess: () => {
            console.log("티켓 옵션 응답 전송 성공");
        },
        onError: () => {
            alert("티켓 옵션 응답 전송 중 오류가 발생했습니다.");
        },
    });
};