import { axiosClient } from '../../../../shared/types/api/http-client';
import { CreateEventRequest } from '../model/eventCreation';

export const createEvent = async (data: CreateEventRequest) => {
  const response = await axiosClient.post('/events', data);
  return response.data;
};

export const readEventDetail = async (eventId: number) => {
  const response = await axiosClient.get(`/events/${eventId}`);
  return response.data;
};
