import { PresignedUrlRequest, PresignedUrlResponse } from '../model/presignedUrl';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../../../../shared/types/api/apiResponse';

const getPresignedUrl = async (dto: PresignedUrlRequest) => {
  try {
    const { data } = await axios.get<ApiResponse<PresignedUrlResponse>>('/generate-presigned-url', {
      params: dto,
    });
    return data;
  } catch (error) {
    alert((error as AxiosError<ApiResponse<null>>).response?.data.message);
  }
};

export const putS3Image = async ({ url, file, type }: { url: string; file: File; type: string }) => {
  try {
    delete axios.defaults.headers.common.Authorization;
    await axios.put(url, file, {
      headers: {
        'Content-Type': type,
      },
    });
  } catch (error) {
    alert('이미지 업로드에 실패했습니다.');
    throw new Error('Failed to upload image');
  }
};

export const upuploadFile = async (file: File) => {
  const { name, type } = file;
  const presignedUrlResponse = await getPresignedUrl({ fileName: name });

  if (!presignedUrlResponse?.data?.result) {
    throw new Error('Failed to get presigned url');
  }

  const url = presignedUrlResponse.data.result;

  await putS3Image({ url, file, type });

  // S3 URL에서 presigned URL 파라미터를 제거하고 기본 URL 반환
  return url.split('?')[0];
};
