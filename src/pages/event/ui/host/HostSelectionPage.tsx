import { useEffect, useState } from 'react';
import AddButton from '../../../../../public/assets/event-manage/creation/AddBtn.svg';
import { useFunnelState } from '../../../../features/event/model/FunnelContext';
import useHostChannelList from '../../../../entities/host/hook/useHostChannelListHook';
import IconButton from '../../../../../design-system/ui/buttons/IconButton';
import CloseButton from '../../../../../public/assets/event-manage/creation/CloseBtn.svg';
import { useHostDeletion } from '../../../../features/host/hook/useHostHook';
import useAuthStore from '../../../../app/provider/authStore';

interface HostSelectionPageProps {
  onNext: (nextStep: string) => void;
  currentStep: number;
  onValidationChange?: (isValid: boolean) => void;
}

const HostSelectionPage = ({ onNext, currentStep, onValidationChange }: HostSelectionPageProps) => {
  const { setHostState, setHostChannelId } = useFunnelState();
  const [selected, setSelected] = useState<number | null>(null);
  const { data, refetch } = useHostChannelList();
  const { mutate: deleteHost } = useHostDeletion();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const handleHostClick = (host: { id: number; hostChannelName: string; profileImageUrl: string }) => {
    setSelected(host.id);
    setHostState(prev => ({
      ...prev,
      hostChannelId: host.id,
      hostChannelName: host.hostChannelName,
    }));
    setHostChannelId(host.id);
  };

  const handleHostDelete = (hostChannelId: number) => {
    deleteHost(hostChannelId, {
      onSuccess: () => {
        refetch();
        if (selected === hostChannelId) {
          setSelected(null);
        }
      },
      onError: error => {
        alert(`${error.message}`);
      },
    });
  };

  useEffect(() => {
    onValidationChange?.(selected !== null);
  }, [selected, onValidationChange]);

  return (
    <div className="flex flex-col w-full px-2">
      {isLoggedIn ? (
        <div
          onClick={() => {
            onNext(String(currentStep + 1));
          }}
          className="flex justify-start items-center px-3 py-4 cursor-pointer"
        >
          <button className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 bg-gray2 rounded-full">
            <IconButton
              iconPath={<img src={AddButton} alt="추가 버튼" className="w-6 h-6 md:w-7 md:h-7" />}
              onClick={() => {}}
            />
          </button>
          <span className="font-bold text-base md:text-xl ml-4">채널 새로 만들기</span>
        </div>
      ) : (
        <p className="col-span-2 mt-10 text-center text-sm md:text-base text-red-500">로그인이 필요한 서비스입니다.</p>
      )}
      {data?.result.map(host => (
        <div
          key={host.id}
          onClick={() => handleHostClick(host)}
          className={`relative flex justify-start items-center py-3 px-3 group ${
            selected === host.id
              ? 'bg-dropdown border border-main rounded-[5px]'
              : 'hover:bg-dropdown hover:border hover:border-main hover:rounded-[5px]'
          }`}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full">
            <img
              src={host.profileImageUrl}
              alt={host.hostChannelName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-bold text-base md:text-xl ml-4">{host.hostChannelName}</span>

          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <IconButton
              iconPath={<img src={CloseButton} alt="삭제" className="w-4 h-4" />}
              onClick={e => {
                e.stopPropagation();
                handleHostDelete(host.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostSelectionPage;
