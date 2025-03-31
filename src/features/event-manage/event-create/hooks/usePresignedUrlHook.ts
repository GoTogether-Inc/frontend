import { PresignedUrlRequest, PresignedUrlResponse } from '../model/presignedUrl';
import { axiosClient } from '../../../../shared/types/api/http-client';

import axios from 'axios';
import { ApiResponse } from '../../../../shared/types/api/apiResponse';

const getPresignedUrl = async (dto: PresignedUrlRequest) => {
  try {
    const response = await axiosClient.get<ApiResponse<PresignedUrlResponse>>('/generate-presigned-url', {
      params: dto,
    });
    console.log('Presigned URL 응답:', response.data.result?.preSignedUrl);

    return response.data.result?.preSignedUrl;
  } catch (error) {
    console.error('Presigned URL 요청 실패:', error);
    throw error;
  }
};

export const putS3Image = async ({ url, file }: { url: string; file: File }) => {
  try {
    delete axiosClient.defaults.headers.common.Authorization;
    console.log('업로드할 URL:', url);
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  } catch (error) {
    console.error('S3 업로드 실패:', error);
    alert('이미지 업로드에 실패했습니다.');
    throw new Error('Failed to upload image');
  }
};

export const uploadFile = async (file: File) => {
  const { name } = file;
  const presignedUrlResponse = await getPresignedUrl({ fileName: name });

  if (!presignedUrlResponse) {
    throw new Error('Failed to get presigned url');
  }

  const url = presignedUrlResponse;
  console.log('Presigned URL:', url);

  await putS3Image({ url, file });

  // S3 URL에서 presigned URL 파라미터를 제거하고 기본 URL 반환
  return url.split('?')[0];
};
