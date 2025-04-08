import { axiosClient } from "../../../shared/types/api/http-client"
import { OrderTicketRequest } from "../model/OrderCreation";

export const readTicket = {
  // 주문 티켓 전체 조회
  getAll: async (page: number = 0, size: number = 10) => {
    const response = await axiosClient.get("/orders", {
      params: { page, size },
    });
    return response.data;
  },
  // 주문 상세 조회
  getDetail: async(ticketId: number, eventId: number) => {
    const response = await axiosClient.get('/orders/purchase-confirmation',{
      params: {ticketId, eventId}
    });
    return response.data;
  }
}

// 티켓 구매
export const orderTickets = async (data: OrderTicketRequest) => {
  const response = await axiosClient.post("/orders", data);
  return response.data;
}

// 티켓 취소
export const cancelTickets = async (orderId: number) => {
  const response = await axiosClient.post(`/orders/cancel?orderId=${orderId}`);
  return response.data;
}


