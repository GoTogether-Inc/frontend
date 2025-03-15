import { useMutation } from '@tanstack/react-query';
import createHost from '../api/hostCreation';
import { HostCreationRequest } from '../model/hostCreation';
import { ApiResponse } from '../../../../shared/types/api/apiResponse';

const useHostCreation = () => {
  return useMutation<ApiResponse<null>, Error, HostCreationRequest>({
    mutationFn: async (requestBody: HostCreationRequest) => {
      return await createHost(requestBody);
    },
  });
};

export default useHostCreation;
