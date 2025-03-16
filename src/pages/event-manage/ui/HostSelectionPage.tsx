import { useEffect, useState } from 'react';
import AddButton from '../../../../public/assets/event-manage/creation/AddBtn.svg';
import { useFunnelState } from '../../../features/event-manage/event-create/model/FunnelContext';
import useHostChannelList from '../../../widgets/event/hook/useHostChannelListHook';

interface HostSelectionPageProps {
  onNext: (nextStep: string) => void;
  currentStep: number;
  onValidationChange?: (isValid: boolean) => void;
}

const HostSelectionPage = ({ onNext, currentStep, onValidationChange }: HostSelectionPageProps) => {
  const { setHostState } = useFunnelState();
  const [selected, setSelected] = useState<number | null>(null);
  const { data, isLoading, error } = useHostChannelList();

  console.log('Error:', error); // 에러 확인
  console.log('Fetched data:', data); // 데이터 확인

  const handleHostClick = (host: { id: number; hostChannelName: string; profileImageUrl: string }) => {
    setSelected(host.id);
    setHostState(prev => ({
      ...prev,
      hostChannelId: host.id,
      hostChannelName: host.hostChannelName,
    }));
  };

  useEffect(() => {
    onValidationChange?.(selected !== null);
  }, [selected, onValidationChange]);

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
      {data?.result.map(host => (
        <div
          key={host.id}
          onClick={() => handleHostClick(host)}
          className={`flex justify-start items-center py-3 px-3 ${
            selected === host.id
              ? 'bg-dropdown border border-main rounded-[5px]'
              : 'hover:bg-dropdown hover:border hover:border-main hover:rounded-[5px]'
          }`}
        >
          <div className="w-12 h-12 bg-gray-400">
            <img src={host.profileImageUrl} alt={host.hostChannelName} className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-base md:text-xl ml-4">{host.hostChannelName}</span>
        </div>
      ))}
    </div>
  );
};

export default HostSelectionPage;
