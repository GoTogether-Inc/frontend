import React, { useState } from 'react';
import { useFunnelStore } from '../../../features/event-manage/model/funnelStore';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';

const EventTitlePage: React.FC = () => {
  const { data, updateFunnelData } = useFunnelStore();
  const [title, setTitle] = useState(data.title || '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateFunnelData({ title: e.target.value });
  };

  return (
    <div className="flex justify-start items-center w-full p-5">
      <DefaultTextField label="이벤트 제목" className="w-full" value={title} onChange={handleTitleChange} />
    </div>
  );
};

export default EventTitlePage;
