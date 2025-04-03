import { axiosClient } from "../../../shared/types/api/http-client"
import { OrderTicketRequest } from "../model/OrderCreation";
export const readMyTickets = {
  get: async (page: number = 0, size: number = 10) => {
    const response = await axiosClient.get("/orders", {
      params: { page, size },
    });
    return response.data;
  },
}
export const orderTickets = async (data: OrderTicketRequest) => {
  const response = await axiosClient.post("/orders", data);
  return response.data;
}