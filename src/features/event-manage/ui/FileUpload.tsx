import FileUploadImage from '../../../../public/assets/FileUpload.svg';

const FileUpload = () => {
  return (
    <div className="flex flex-col justify-start gap-1">
      <h1 className="font-bold text-black text-lg">배너 사진 첨부</h1>
      <h2 className="text-placeholderText text-sm">500kB 이하의 jpg, png 파일만 등록할 수 있습니다.</h2>
      <div className="flex flex-col items-center justify-center h-44 border border-dashed border-placeholderText bg-gray3 rounded-[10px] mb-4">
        <img src={FileUploadImage} alt="파일 업로드" className="w-10 h-10" />
        <span className="mt-1 text-black text-sm">이미지를 끌어서 올리거나 클릭해서 업로드 하세요.</span>
      </div>
    </div>
  );
};
export default FileUpload;
