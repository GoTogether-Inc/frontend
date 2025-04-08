import FileUploadImage from '../../../../../public/assets/event-manage/creation/FileUpload.svg';
import { useRef, useState } from 'react';
import { uploadFile } from '../hooks/usePresignedUrlHook';
import { useFunnelState } from '../model/FunnelContext';

interface FileUploadProps {
  useFunnel?: boolean;
}

const FileUpload = ({ useFunnel = false }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setEventState } = useFunnelState();

  const handleFileUpload = async (file: File) => {
    if (file.size > 500 * 1024) {
      alert('파일 크기는 500KB를 초과할 수 없습니다.');
      return;
    }

    if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
      alert('jpg, jpeg, png 파일만 업로드 가능합니다.');
      return;
    }

    try {
      const imageUrl = await uploadFile(file);
      setPreviewUrl(imageUrl);
      if (useFunnel) {
        setEventState(prev => ({ ...prev, bannerImageUrl: imageUrl }));
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="flex flex-col justify-start gap-1">
      <h1 className="font-bold text-black text-lg">배너 사진 첨부</h1>
      <h2 className="text-placeholderText text-xs md:text-sm">500kB 이하의 jpeg, png 파일만 등록할 수 있습니다.</h2>
      <div
        className={`flex flex-col items-center justify-center h-44 border border-dashed ${
          isDragging ? 'border-main bg-dropdown' : 'border-placeholderText bg-gray3'
        } rounded-[10px] mb-4 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
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
