import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import Header from '../../../../design-system/ui/Header';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/Search.svg';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import EventList from '../../../features/event-manage/event-list/ui/EventList';
import { useNavigate } from 'react-router-dom';

const AllEventsPage = () => {
  const navigater = useNavigate();

  return (
    <div className="flex flex-col items-center mb-28">
      <Header
        centerContent={
          <SearchTextField
            iconPath={<img src={searchIcon} alt="searchIcon" />}
            onClick={() => navigater('/search')}
            onChange={() => {}}
            placeholder="입력해주세요"
          />
        }
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={() => navigater('/')}
        leftButtonLabel="같이가요"
        rightContent={<SecondaryButton size="large" color="black" label="로그인" onClick={() => {}} />}
      />
      {/* 이벤트 카드 목록 */}
      <EventList />
      <BottomBar />
    </div>
  );
};
export default AllEventsPage;
