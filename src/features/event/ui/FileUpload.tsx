import FileUploadImage from '../../../../public/assets/event-manage/creation/FileUpload.svg';
import { FunnelState } from '../model/FunnelContext';
import useImageUpload from '../../../shared/hooks/useImageUpload';
import { useEffect } from 'react';

interface FileUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  setEventState?: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
  useDefaultImage?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const FileUpload = ({ value, onChange, setEventState, useDefaultImage, onValidationChange }: FileUploadProps) => {
  const { previewUrl, fileInputRef, handleFileChange, handleDrop, setIsDragging, isDragging } = useImageUpload({
    value, // 서버에서 받아온 기본 이미지
    onSuccess: url => {
      onChange?.(url);
      setEventState?.(prev => ({ ...prev, bannerImageUrl: url }));
    },
    useDefaultImage,
  });

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(!!previewUrl);
    }
  }, [previewUrl, onValidationChange]);

  return (
    <div className="flex flex-col justify-start gap-1">
      <h1 className="font-bold text-black text-lg">배너 사진 첨부</h1>
      <h2 className="text-placeholderText text-xs md:text-sm">500kB 이하의 jpeg, png 파일만 등록할 수 있습니다.</h2>
      <div
        className={`flex flex-col items-center justify-center h-44 border border-dashed ${
          isDragging ? 'border-main bg-dropdown' : 'border-placeholderText bg-gray3'
        } rounded-[10px] mb-4 cursor-pointer`}
        onDragOver={e => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={e => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
        {previewUrl ? (
          <img src={previewUrl} alt="업로드된 이미지" className="w-full h-full object-cover rounded-[10px]" />
        ) : (
          <>
            <img src={FileUploadImage} alt="파일 업로드" className="w-10 h-10" />
            <span className="mt-1 text-black text-sm">이미지를 끌어서 올리거나 클릭해서 업로드 하세요.</span>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
