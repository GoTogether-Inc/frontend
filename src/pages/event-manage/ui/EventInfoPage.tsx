import FileUpload from '../../../features/event-manage/event-create/ui/FileUpload';
import TextEditor from '../../../features/event-manage/event-create/ui/TextEditor';
import LinkInput from '../../../features/event-manage/event-create/ui/LinkInput';
import { useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';

const EventInfoPage = () => {
  const { setEventState } = useFunnelState();
  return (
    <div className="w-full px-5 space-y-8">
      <FileUpload setEventState={setEventState} />
      <TextEditor setEventState={setEventState} />
      <LinkInput setEventState={setEventState} />
    </div>
  );
};

export default EventInfoPage;
