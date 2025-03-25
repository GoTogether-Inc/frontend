import { axiosClient } from '../../../shared/types/api/http-client';

export const getEventInfo = async (eventId: string) => {
  const response = await axiosClient.get('/host-channels/dashboard', {
    params: {
      eventId: eventId,
    },
  });
  return response.data.result;
};
