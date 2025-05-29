import { axiosClient } from '../../../shared/types/api/http-client';

export const getParticipants = async (
  eventId: number,
  tags: string = 'all',
  page: number = 0,
  size: number = 10
) => {
  const params = { eventId, tags, page, size };
  const response = await axiosClient.get('/host-channels/dashboard/participant-management', { params });
  return response.data.result;
};

export const approveParticipants = async ({ orderId }: { orderId: number }) => {
  try {
    const response = await axiosClient.patch('/host-channels/dashboard/participant-management/approve', { orderId });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
