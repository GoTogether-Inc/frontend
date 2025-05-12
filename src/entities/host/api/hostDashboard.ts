import { axiosClient } from '../../../shared/types/api/http-client';
import { HostDashboardResponse } from '../model/hostDashboard';
import { ApiResponse } from '../../../shared/types/api/apiResponse';

const hostDashboard = async (eventId: number) => {
  const response = await axiosClient.get<ApiResponse<HostDashboardResponse>>(`/host-channels/dashboard`, {
    params: { eventId },
  });

  return response.data.result;
};

export default hostDashboard;
