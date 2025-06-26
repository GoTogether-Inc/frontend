import { uploadFile } from '../../features/event/hooks/usePresignedUrlHook';
import { convertImageToWebP } from './convertImageToWebP';

const oldJpgUrls: string[] = [
  // ... 여기에 변환할 이미지 URL들
];

export const runImageMigration = async () => {
  for (const jpgUrl of oldJpgUrls) {
    try {
      const response = await fetch(jpgUrl);
      const blob = await response.blob();

      const file = new File([blob], extractFileName(jpgUrl), { type: blob.type });

      const webpFile = await convertImageToWebP(file);
      const webpUrl = await uploadFile(webpFile);

      console.log(`✅ ${jpgUrl} → ${webpUrl}`);
    } catch (error) {
      console.error(`❌ 변환 실패: ${jpgUrl}`, error);
    }
  }

  console.log('✅ 전체 마이그레이션 완료');
};

const extractFileName = (url: string) => {
  const baseName = url.split('/').pop()?.split('?')[0] ?? 'unknown.jpg';
  return baseName.replace(/\.(jpg|jpeg)$/i, '.webp');
};
