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

export const downloadExcel = async (eventId:number): Promise<void> => {
  const response = await axiosClient.get(
    '/host-channels/dashboard/participant-management/excel',
    {
      responseType: 'blob',
      params: { eventId }, 
    }
  );

  //파일이름 추출
  const disposition = response.headers['content-disposition'];
  let filename = '같이가요_구매참가자목록.xlsx'; // 기본값
  if (disposition) {
    const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (match && match[1]) {
      filename = decodeURIComponent(match[1].replace(/['"]/g, ''));
    }
  }

  //저장
  const blob = new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename); 
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};