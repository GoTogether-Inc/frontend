import { useState } from 'react';
import ChoiceChip from '../../../../design-system/ui/ChoiceChip';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import EventDatePicker from '../../../features/event-manage/ui/DatePicker';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import SearchBar from '../../../shared/ui/SearchBar';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../design-system/ui/Button';

const EventInfoPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="flex flex-col gap-5 mt-8 px-7">
        <h1 className="text-center text-xl font-bold mb-5">이벤트 기본 정보</h1>
        <DefaultTextField label="이벤트 제목" placeholder="제목을 입력해주세요" className="h-12" />
        <EventDatePicker />
        <DefaultTextField label="주최자 이메일" placeholder="example@example.com" className="h-12" />
        <DefaultTextField
          label="주최자 연락처"
          placeholder="01012345678(‘-’를 제외한 숫자만 입력해주세요)"
          className="h-12"
        />
        <ChoiceChip
          label="온라인/오프라인 여부"
          options={['온라인', '오프라인']}
          onSelect={handleSelect}
          className="w-32 md:w-36"
        />
        {selectedOption === '오프라인' ? (
          <div className="space-y-2">
            <h1 className="font-bold text-black text-lg">이벤트는 어디서 진행되나요?</h1>
            <SearchBar placeholder="장소를 입력하세요." className="w-full" />
          </div>
        ) : (
          ''
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
