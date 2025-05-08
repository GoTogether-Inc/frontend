import { axiosClient } from '../../../shared/types/api/http-client';
import { EventDetailRequest } from '../model/event';

export const eventDetail = async (dto: EventDetailRequest) => {
  const response = await axiosClient.get(`/events/${dto.eventId}`, {
    params: { userId: dto.userId },
  });
  return response.data.result;
};
