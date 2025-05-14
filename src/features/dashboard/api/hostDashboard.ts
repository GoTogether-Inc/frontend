import { axiosClient } from '../../../shared/types/api/http-client';

export const getHostDashboard = async (eventId: number) => {
  const response = await axiosClient.get('/host-channels/dashboard', {
    params: {
      eventId: eventId,
    },
  });
  return response.data.result;
};
