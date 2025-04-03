import { axiosClient } from "../../../shared/types/api/http-client"
export const readMyTickets = {
  get: async (page: number = 0, size: number = 10) => {
    const response = await axiosClient.get("/orders", {
      params: { page, size },
    });
    return response.data;
  },
}