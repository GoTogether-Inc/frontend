import { axiosClient } from '../../../../shared/types/api/http-client';
import { PresignedUrlRequest, PresignedUrlResponse } from '../model/presignedUrl';

const presignedUrl = async (dto: PresignedUrlRequest) => {
  const response = await axiosClient.get<PresignedUrlResponse>('/generate-presigned-url', { params: dto });
  return response.data;
};

export default presignedUrl;
