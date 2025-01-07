import React from 'react';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import { useFunnelState } from '../../../features/event-manage/model/FunnelContext';

const EventTitlePage = () => {
  const { formState, setFormState } = useFunnelState();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      title: e.target.value,
    }));
  };

  return (
    <div className="flex justify-start items-center w-full p-5">
      <UnderlineTextField label="이벤트 제목" className="w-full" value={formState.title} onChange={handleTitleChange} />
    </div>
  );
};

export default EventTitlePage;
