import { useMutation, useQuery } from "@tanstack/react-query";
import { createTicket, deleteTicket, readTicket } from "../api/ticket";
import { CreateTicketRequest, ReadTicketResponse, TicketResponse } from "../model/ticketInformation";

export const useTickets = (eventId: number) => {
    return useQuery<{ isSuccess: boolean; result: ReadTicketResponse[] }>({
        queryKey: ['tickets', eventId],
        queryFn: () => readTicket(eventId),
        enabled: !!eventId,
    });
};

export const useCreateTicket = () => {
    return useMutation<TicketResponse, Error, CreateTicketRequest>({
        mutationFn: createTicket,
        onSuccess: () => {
            alert('티켓이 성공적으로 저장되었습니다.');
            window.location.reload();
        },
        onError: () => {
            alert('티켓 저장에 실패했습니다. 다시 시도해주세요.');
        },
    });
};

export const useDeleteTicket = () => {
    return useMutation<TicketResponse, Error, number>({
        mutationFn: deleteTicket,
        onSuccess: () => {
            alert("티켓이 삭제되었습니다.");
            window.location.reload();
        },
        onError: () => {
            alert('티켓 삭제 중 오류가 발생했습니다.');
        }
    });
};