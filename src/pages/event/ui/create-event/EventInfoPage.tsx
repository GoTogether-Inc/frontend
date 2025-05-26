import FileUpload from '../../../../features/event/ui/FileUpload';
import TextEditor from '../../../../features/event/ui/TextEditor';
import LinkInput from '../../../../features/event/ui/LinkInput';
import { useFunnelState } from '../../../../features/event/model/FunnelContext';

interface EventInfoPageProps {
  onValidationChange?: (isValid: boolean) => void;
}

const EventInfoPage = ({ onValidationChange }: EventInfoPageProps) => {
  const { setEventState } = useFunnelState();
  return (
    <div className="w-full px-5 space-y-8">
      <FileUpload setEventState={setEventState} useDefaultImage={false} onValidationChange={onValidationChange} />
      <TextEditor setEventState={setEventState} />
      <LinkInput setEventState={setEventState} />
    </div>
  );
};

export default EventInfoPage;
