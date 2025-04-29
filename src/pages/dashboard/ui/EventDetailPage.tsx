import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../design-system/ui/Button';
import FileUpload from '../../../features/event-manage/event-create/ui/FileUpload';
import LinkInput, { Link } from '../../../features/event-manage/event-create/ui/LinkInput';
import TextEditor from '../../../features/event-manage/event-create/ui/TextEditor';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import useEventDetail from '../../../entities/event/hook/useEventHook';
import { useEffect, useState } from 'react';

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useEventDetail();

  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [referenceLinks, setReferenceLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (data?.result) {
      setBannerImageUrl(data.result.bannerImageUrl || '');
      setDescription(data.result.description || '');
      setReferenceLinks(data.result.referenceLinks || []);
    }
  }, [data]);

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <h1 className="text-center text-xl font-bold mb-5">이벤트 상세 정보</h1>
        <FileUpload value={bannerImageUrl} onChange={setBannerImageUrl} />
        <TextEditor value={description} onChange={setDescription} />
        <LinkInput value={referenceLinks} onChange={setReferenceLinks} />
      </div>
      <div className="w-full p-7">
        <Button label="저장하기" onClick={() => navigate(`/dashboard/${id}`)} className="w-full h-12 rounded-full" />
      </div>
    </DashboardLayout>
  );
};
export default EventDetailPage;
