import { AxiosError } from 'axios';
import { ApiResponse } from '../../../../shared/types/api/apiResponse';
import createEvent from '../api/eventCreation';
import { CreateEventRequest } from '../model/eventCreation';
import { useMutation } from '@tanstack/react-query';

const useEventCreation = () => {
  return useMutation<ApiResponse<null>, AxiosError, CreateEventRequest>({
    mutationFn: async (requestBody: CreateEventRequest) => {
      return await createEvent(requestBody);
    },
    onSuccess: data => {
      console.log('이벤트 생성 성공:', data);
    },
    onError: error => {
      console.error('이벤트 생성 실패:', error.response?.data || error.message);
    },
  });
};
export default useEventCreation;
