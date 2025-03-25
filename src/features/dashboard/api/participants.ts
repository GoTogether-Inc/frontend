import { axiosClient } from '../../../shared/types/api/http-client';

export const getParticipants = async ({ eventId = 1, tags = 'all', page = 0, size = 10 } = {}) => {
  const params = { eventId, tags, page, size };

  const response = await axiosClient.get('/host-channels/dashboard/participant-management', { params });
  return response.data.result;
};
