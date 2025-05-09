import { useEffect, useState } from 'react';
import ChoiceChip from '../../../../design-system/ui/ChoiceChip';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import EventDatePicker from '../../../features/event-manage/event-create/ui/DatePicker';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../design-system/ui/Button';
import useEventDetail from '../../../entities/event/hook/useEventHook';
import { useUpdateEventHook } from '../../../features/dashboard/hook/useEventHook';
import { formatEventRequest } from '../../../shared/lib/formatEventRequest';
import { OnlineType } from '../../../shared/types/baseEventType';
import { AddressSearch } from '../../../shared/ui/AddressSearch';
import KakaoMap from '../../../shared/ui/KakaoMap';

const EventInfoPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const { data } = useEventDetail();
  const { mutate } = useUpdateEventHook();

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  // 초기값 세팅을 위한 state
  const [hostChannelId, setHostChannelId] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [onlineType, setOnlineType] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [locationLat, setLocationLat] = useState<number>(0);
  const [locationLng, setLocationLng] = useState<number>(0);

  const handleSave = () => {
    if (!data?.result.id) return;

    const formatData = formatEventRequest(data.result);

    const toIsoDateTime = (date: string, time: string) => {
      return `${date}T${time}`;
    };

    mutate(
      {
        ...formatData,
        hostChannelId,
        title,
        startDate: toIsoDateTime(data.result.startDate, data.result.startTime),
        endDate: toIsoDateTime(data.result.endDate, data.result.endTime),
        organizerEmail: email,
        organizerPhoneNumber: phone,
        onlineType: selectedOption as OnlineType,
        address,
        detailAddress,
        locationLat,
        locationLng,
      },
      {
        onSuccess: () => {
          alert('이벤트 정보가 저장되었습니다.');
          navigate(`/dashboard/${data?.result.id}`);
        },
        onError: () => {
          alert('저장에 실패했습니다.');
        },
      }
    );
  };

  useEffect(() => {
    if (data?.result) {
      const info = data.result;
      setHostChannelId(data.result.hostChannelId || 0);
      setTitle(info.title);
      setEmail(info.organizerEmail);
      setPhone(info.organizerPhoneNumber);
      setOnlineType(info.onlineType);
      setSelectedOption(info.onlineType);
      setAddress(info.address);
      setDetailAddress(info.detailAddress);
      setLocationLat(info.locationLat || 0);
      setLocationLng(info.locationLng || 0);
    }
  }, [data]);

  return (
    <DashboardLayout centerContent={title}>
      <div className="flex flex-col gap-5 mt-8 px-7">
        <h1 className="text-center text-xl font-bold mb-5">이벤트 기본 정보</h1>
        <DefaultTextField
          label="이벤트 제목"
          placeholder="제목을 입력해주세요"
          className="h-12"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <EventDatePicker />
        <DefaultTextField
          label="주최자 이메일"
          placeholder="example@example.com"
          className="h-12"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <DefaultTextField
          label="주최자 연락처"
          placeholder="01012345678(‘-’를 제외한 숫자만 입력해주세요)"
          className="h-12"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <ChoiceChip
          label="온라인/오프라인 여부"
          options={[
            { label: '온라인', value: 'ONLINE' },
            { label: '오프라인', value: 'OFFLINE' },
          ]}
          onSelect={handleSelect}
          className="w-32 md:w-36"
          value={selectedOption || onlineType}
        />
        {(selectedOption || onlineType) === 'OFFLINE' && (
          <div className="space-y-4">
            <h1 className="font-bold text-black text-lg">이벤트는 어디서 진행되나요?</h1>
            <AddressSearch
              address={address}
              detailAddress={detailAddress}
              setAddress={setAddress}
              onLocationChange={(lat, lng) => {
                setLocationLat(lat);
                setLocationLng(lng);
              }}
              onDetailAddressChange={setDetailAddress}
            />
            {locationLat !== 0 && locationLng !== 0 && <KakaoMap lat={locationLat} lng={locationLng} />}
          </div>
        )}
      </div>
      <div className="w-full p-7">
        <Button label="저장하기" onClick={handleSave} className="w-full h-12 rounded-full" />
      </div>
    </DashboardLayout>
  );
};
export default EventInfoPage;
