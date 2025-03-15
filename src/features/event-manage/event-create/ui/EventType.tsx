import OnlineIcon from '../../../../../public/assets/event-manage/creation/OnlineIcon.svg';
import OfflineIcon from '../../../../../public/assets/event-manage/creation/OfflineIcon.svg';
import { useFunnelState } from '../model/FunnelContext';
import KakaoMap from '../../../../shared/ui/KakaoMap';
import { AddressSearch } from '../../../../shared/ui/AddressSearch';
import { useState } from 'react';

interface EventTypeProps {
  className?: string;
}

const EventType = ({ className }: EventTypeProps) => {
  const { formState, setFormState } = useFunnelState();
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const handleTypeClick = (type: 'ONLINE' | 'OFFLINE') => {
    setFormState(prev => ({
      ...prev,
      onlineType: type,
    }));
  };

  const handleAddressChange = (address: string) => {
    setAddress(address);
    setFormState(prev => ({
      ...prev,
      address: `${address} ${detailAddress}`.trim(),
    }));
  };

  const handleDetailAddressChange = (detailAddress: string) => {
    setDetailAddress(detailAddress);
    setFormState(prev => ({
      ...prev,
      address: `${address} ${detailAddress}`.trim(),
    }));
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setFormState(prev => ({
      ...prev,
      location: { lat, lng },
    }));
  };

  return (
    <div className={`flex flex-col justify-center w-full ${className}`}>
      <div className="flex flex-col justify-start">
        <h1 className="font-bold text-black text-lg mb-4">이벤트가 온라인 인가요, 오프라인 인가요?</h1>
        <div className="flex justify-between gap-2 md:px-1">
          <div
            onClick={() => handleTypeClick('ONLINE')}
            className={`flex flex-col justify-center items-center w-40 h-40 md:w-44 md:h-44 border rounded-[20px] cursor-pointer ${
              formState.onlineType === 'ONLINE' ? 'border-main' : 'border-placeholderText'
            }`}
          >
            <img src={OnlineIcon} alt="온라인 이모지" className="w-28 h-28 md:w-32 md:h-32" />
            <span className="text-base font-semibold">온라인 이벤트</span>
          </div>

          <div
            onClick={() => handleTypeClick('OFFLINE')}
            className={`flex flex-col justify-center items-center w-40 h-40 md:w-44 md:h-44 border rounded-[20px] cursor-pointer ${
              formState.onlineType === 'OFFLINE' ? 'border-main' : 'border-placeholderText'
            }`}
          >
            <img src={OfflineIcon} alt="오프라인 이모지" className="w-28 h-28 md:w-32 md:h-32" />
            <span className="text-base font-semibold">오프라인 이벤트</span>
          </div>
        </div>
      </div>

      {formState.onlineType === 'OFFLINE' && (
        <div className="mt-6 space-y-2">
          <h1 className="font-bold text-black text-lg">이벤트는 어디서 진행되나요?</h1>
          <AddressSearch
            address={address}
            setAddress={handleAddressChange}
            onLocationChange={handleLocationChange}
            onDetailAddressChange={handleDetailAddressChange}
          />
          <KakaoMap lat={formState.location.lat} lng={formState.location.lng} />
        </div>
      )}
    </div>
  );
};
export default EventType;
