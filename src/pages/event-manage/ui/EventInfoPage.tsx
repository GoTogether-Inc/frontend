import FileUpload from '../../../features/event-manage/event-create/ui/FileUpload';
import TextEditor from '../../../features/event-manage/event-create/ui/TextEditor';
import LinkInput from '../../../features/event-manage/event-create/ui/LinkInput';

const EventInfoPage = () => {
  return (
    <div className="w-full px-5 space-y-8">
      <FileUpload useFunnel={true} />
      <TextEditor useFunnel={true} />
      <LinkInput useFunnel={true} />
    </div>
  );
};

export default EventInfoPage;
