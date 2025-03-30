import { axiosClient } from "../../../shared/types/api/http-client"
export const readMyTickets = {
    get: async (page: number = 0, size: number = 10) => {
        try {
          const response = await axiosClient.get("/orders", {
            params: { page, size },
          });
          return response.data;
        } catch (error) {
          console.error("티켓 조회 중 오류 발생:", error);
          throw error;
        }
      },
}