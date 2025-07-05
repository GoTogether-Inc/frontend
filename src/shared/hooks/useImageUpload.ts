import { useRef, useState, useCallback, useEffect } from 'react';
import { uploadFile } from '../../features/event/hooks/usePresignedUrlHook';
import { convertImageToWebP } from '../lib/convertImageToWebP';
import basicProfile from '../../../public/assets/event-manage/creation/BasicProfile.png';

const useImageUpload = ({
  value,
  onSuccess,
  useDefaultImage = true,
}: {
  value?: string;
  onSuccess?: (url: string) => void;
  useDefaultImage?: boolean;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setPreviewUrl(value);
    } else if (useDefaultImage && previewUrl !== basicProfile) {
      setPreviewUrl(basicProfile);
      onSuccess?.(basicProfile);
    }
  }, [value, onSuccess, useDefaultImage, previewUrl]);

  const validateFile = (file: File) => {
    if (file.size > 4 * 1024 * 1024) {
      alert('파일 크기는 4MB를 초과할 수 없습니다.');
      return false;
    }
    if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
      alert('jpg, jpeg, png 파일만 업로드 가능합니다.');
      return false;
    }
    return true;
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!validateFile(file)) return;

      try {
        const webpFile = await convertImageToWebP(file);
        const imageUrl = await uploadFile(webpFile);
        setPreviewUrl(imageUrl);
        onSuccess?.(imageUrl);
      } catch (error) {
        console.error('파일 업로드 실패:', error);
      }
    },
    [onSuccess]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  return {
    previewUrl,
    isDragging,
    setIsDragging,
    fileInputRef,
    handleFileUpload,
    handleFileChange,
    handleDrop,
  };
};

export default useImageUpload;
