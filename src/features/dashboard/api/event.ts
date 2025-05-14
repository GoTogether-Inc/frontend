import { axiosClient } from '../../../shared/types/api/http-client';
import { UpdateEventRequest } from '../model/event';

export const updateEventInfo = async (eventId: number, dto: Partial<UpdateEventRequest>) => {
  const response = await axiosClient.put(`/events/${eventId}`, dto);
  return response.data;
};
