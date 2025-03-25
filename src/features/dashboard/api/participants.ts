import { axiosClient } from '../../../shared/types/api/http-client';

export const getParticipants = async ({ eventId = 1, tags = 'all', page = 1, size = 10 } = {}) => {
  const params = { eventId, tags, page, size };

  const { data } = await axiosClient.get('/host-channels/dashboard/participant-management', { params });
  return data.result;
};
