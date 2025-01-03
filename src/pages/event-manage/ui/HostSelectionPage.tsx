import { useState } from 'react';
import AddButton from '../../../../public/assets/AddBtn.svg';
import { useFunnelStore } from '../../../features/event-manage/model/funnelStore';

interface HostSelectionPageProps {
  onNext: (nextStep: string) => void;
  currentStep: number;
}

const HostSelectionPage = ({ onNext, currentStep }: HostSelectionPageProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const { updateFunnelData } = useFunnelStore();

  const [hostList, setHostList] = useState([
    { id: 1, hostChannelName: '실1000', hostEmail: 'example@example.com', channelDescription: '어쩌구저쩌구' },
    { id: 2, hostChannelName: '같이가요', hostEmail: 'test@test.com', channelDescription: '어쩌구저쩌구' },
  ]);

  const handleHostClick = (host: {
    id: number;
    hostChannelName: string;
    hostEmail: string;
    channelDescription: string;
  }) => {
    setSelected(host.id);
    updateFunnelData({
      hostChannelId: host.id,
      hostChannelName: host.hostChannelName,
      hostEmail: host.hostEmail,
      channelDescription: host.channelDescription,
    });
  };

  return (
    <div className="flex flex-col w-full px-2">
      <div
        onClick={() => onNext(String(currentStep + 1))}
        className="flex justify-start items-center px-3 py-4 mt-5 cursor-pointer"
      >
        <button className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 bg-gray2 rounded-[4px]">
          <img src={AddButton} alt="추가 버튼" className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <span className="font-bold text-base md:text-xl ml-4">채널 새로 만들기</span>
      </div>
      {hostList.map(host => (
        <div
          key={host.id}
          onClick={() => handleHostClick(host)}
          className={`flex justify-start items-center py-3 px-3 ${
            selected === host.id
              ? 'bg-dropdown border border-main rounded-[5px]'
              : 'hover:bg-dropdown hover:border hover:border-main hover:rounded-[5px]'
          }`}
        >
          <div className="w-12 h-12 bg-gray-400" />
          <span className="font-bold text-base md:text-xl ml-4 ">{host.hostChannelName}</span>
        </div>
      ))}
    </div>
  );
};

export default HostSelectionPage;
