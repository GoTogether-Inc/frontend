import { useNavigate } from 'react-router-dom';
import Button from '../../../../design-system/ui/Button';
import FileUpload from '../../../features/event-manage/ui/FileUpload';
import LinkInput from '../../../features/event-manage/ui/LinkInput';
import TextEditor from '../../../features/event-manage/ui/TextEditor';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';

const EventDetailPage = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/dashbord/eventDetail');
  };
  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <h1 className="text-center text-xl font-bold mb-5">이벤트 상세 정보</h1>
        <FileUpload />
        <TextEditor />
        <LinkInput />
      </div>
      <div className="w-full p-7">
        <Button label="저장하기" onClick={handleNextClick} className="w-full h-12 rounded-full" />
      </div>
    </DashboardLayout>
  );
};
export default EventDetailPage;
