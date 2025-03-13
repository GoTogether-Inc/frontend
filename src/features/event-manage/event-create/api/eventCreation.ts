import { axiosClient } from '../../../../shared/types/api/http-client';
import { CreateEventRequest } from '../model/eventCreation';

const createEvent = async (data: CreateEventRequest) => {
  const response = await axiosClient.post('/events', data);
  return response.data;
};
export default createEvent;
