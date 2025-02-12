import FileUpload from '../../../features/event-manage/ui/FileUpload';
import TextEditor from '../../../features/event-manage/ui/TextEditor';
import LinkInput from '../../../features/event-manage/ui/LinkInput';
import { useFunnelState } from '../../../features/event-manage/model/FunnelContext';

const EventInfoPage = () => {
  const { formState, setFormState } = useFunnelState();
  return (
    <div className="w-full px-5 space-y-8">
      <FileUpload />
      <TextEditor />
      <LinkInput formState={formState} setFormState={setFormState} />
    </div>
  );
};

export default EventInfoPage;
