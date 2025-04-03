import { axiosClient } from "../../../shared/types/api/http-client"
import { OrderTicketRequest } from "../model/OrderCreation";

// 주문 티켓 전체 조회
export const readMyTickets = {
  get: async (page: number = 0, size: number = 10) => {
    const response = await axiosClient.get("/orders", {
      params: { page, size },
    });
    return response.data;
  },
}

// 티켓 구매
export const orderTickets = async (data: OrderTicketRequest) => {
  const response = await axiosClient.post("/orders", data);
  return response.data;
}

// 주문 티켓 상세 조회
export const readTicket = async(orderId: number) => {
  const response = await axiosClient.get(`/orders/${orderId}`);
  return response.data;
}