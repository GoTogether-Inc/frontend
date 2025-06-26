import FileUpload from '../../../../features/event/ui/FileUpload';
import TextEditor from '../../../../features/event/ui/TextEditor';
import LinkInput from '../../../../features/event/ui/LinkInput';
import { useFunnelState } from '../../../../features/event/model/FunnelContext';
import { useEffect, useState } from 'react';

interface EventInfoPageProps {
  onValidationChange?: (isValid: boolean) => void;
}

const EventInfoPage = ({ onValidationChange }: EventInfoPageProps) => {
  const { eventState, setEventState } = useFunnelState();
  const [isFileValid, setIsFileValid] = useState(false);
  const [isTextValid, setIsTextValid] = useState(false);

  const handleFileValidation = (valid: boolean) => {
    setIsFileValid(valid);
  };

  const handleTextValidation = (valid: boolean) => {
    setIsTextValid(valid);
  };
  useEffect(() => {
    const allValid = isFileValid && isTextValid;
    onValidationChange?.(allValid);
  }, [isFileValid, isTextValid, onValidationChange]);

  return (
    <div className="w-full px-5 space-y-8">
      <FileUpload
        eventState={eventState}
        setEventState={setEventState}
        useDefaultImage={false}
        onValidationChange={handleFileValidation}
      />
      <TextEditor eventState={eventState} setEventState={setEventState} onValidationChange={handleTextValidation} />
      <LinkInput eventState={eventState} setEventState={setEventState} />
    </div>
  );
};

export default EventInfoPage;
