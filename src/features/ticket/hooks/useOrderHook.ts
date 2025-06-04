import { useMutation, useQuery } from '@tanstack/react-query';
import { cancelTickets, orderTickets, readTicket } from '../api/order';
import { OrderTicketRequest } from '../model/orderInformation';

// 주문 전체 조회
export const useTicketOrders = (page: number = 0, size: number = 10) => {
  return useQuery({
    queryKey: ['ticketOrders', page, size],
    queryFn: () => readTicket.getAll(page, size),
  });
};

// 주문 상세 조회
export const useTicketOrderDetail = (orderId: number) => {
  return useQuery({
    queryKey: ['ticketOrderDetail', orderId],
    queryFn: () => readTicket.getDetail(orderId),
    enabled: !!orderId,
  });
};

// 주문 취소
export const useCancelTicket = () => {
  return useMutation({
    mutationFn: (orderIds: number[]) => cancelTickets(orderIds),
    onSuccess: () => {
      alert('티켓이 성공적으로 취소되었습니다.');
    },
    onError: () => {
      alert('티켓 취소에 실패하였습니다.');
    },
  });
};

// 티켓 구매
export const useOrderTicket = () => {
  return useMutation({
    mutationFn: (data: OrderTicketRequest) => orderTickets(data),
    onError: () => {
      alert('티켓 구매 중 오류가 발생했습니다.');
    },
  });
};
