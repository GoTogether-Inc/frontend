import { axiosClient } from '../../../shared/types/api/http-client';
import { UpdateEventRequest } from '../model/event';

export const getHostDashboard = async (eventId: number) => {
  const response = await axiosClient.get('/host-channels/dashboard', {
    params: {
      eventId: eventId,
    },
  });
  return response.data.result;
};

export const updateEventInfo = async (eventId: number, dto: Partial<UpdateEventRequest>) => {
  const response = await axiosClient.put(`/events/${eventId}`, dto);
  return response.data;
};
