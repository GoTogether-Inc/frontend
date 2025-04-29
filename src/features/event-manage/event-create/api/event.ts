import { axiosClient } from '../../../../shared/types/api/http-client';
import { CreateEventRequest } from '../model/eventCreation';

export const createEvent = async (data: CreateEventRequest) => {
  const response = await axiosClient.post('/events', data);
  return response.data;
};
