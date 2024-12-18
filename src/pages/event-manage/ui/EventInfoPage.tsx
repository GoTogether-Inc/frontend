import FileUpload from '../../../features/event-manage/ui/FileUpload';
import TextEditor from '../../../features/event-manage/ui/TextEditor';
import LinkInput from '../../../features/event-manage/ui/LinkInput';

const EventInfoPage = () => {
  return (
    <div className="w-full px-5 space-y-8">
      <FileUpload />
      <TextEditor />
      <LinkInput />
    </div>
  );
};

export default EventInfoPage;
