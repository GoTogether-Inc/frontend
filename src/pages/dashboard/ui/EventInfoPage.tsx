import { useEffect, useState } from 'react';
import ChoiceChip from '../../../../design-system/ui/ChoiceChip';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import EventDatePicker from '../../../features/event-manage/event-create/ui/DatePicker';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../shared/ui/SearchBar';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../design-system/ui/Button';
import useEventDetail from '../../../entities/event/hook/useEventHook';

const EventInfoPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const { data } = useEventDetail();

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  // 초기값 세팅을 위한 state
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [onlineType, setOnlineType] = useState('');
  const [address, setAddress] = useState('');

  // 초기 데이터 채우기
  useEffect(() => {
    if (data?.result) {
      const info = data.result;
      setTitle(info.title);
      setEmail(info.organizerEmail);
      setPhone(info.organizerPhoneNumber);
      setOnlineType(info.onlineType); // '온라인' or '오프라인'
      setAddress(info.address);
      setSelectedOption(info.onlineType);
    }
  }, [data]);

  return (
    <DashboardLayout centerContent="WOOACON 2024">
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
          <div className="space-y-2">
            <h1 className="font-bold text-black text-lg">이벤트는 어디서 진행되나요?</h1>
            <SearchBar placeholder="장소를 입력하세요." className="w-full" value={address} onChange={setAddress} />
          </div>
        )}
      </div>
      <div className="w-full p-7">
        <Button
          label="저장하기"
          onClick={() => navigate('/dashbord/eventDetail')}
          className="w-full h-12 rounded-full"
        />
      </div>
    </DashboardLayout>
  );
};
export default EventInfoPage;
