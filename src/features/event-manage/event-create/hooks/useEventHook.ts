import { AxiosError } from 'axios';
import { ApiResponse } from '../../../../shared/types/api/apiResponse';
import { createEvent } from '../api/event';
import { CreateEventRequest } from '../model/eventCreation';
import { useMutation } from '@tanstack/react-query';

export const useEventCreation = () => {
  return useMutation<ApiResponse<null>, AxiosError, CreateEventRequest>({
    mutationFn: async (requestBody: CreateEventRequest) => {
      return await createEvent(requestBody);
    },
  });
};
