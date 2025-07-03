import Header from '../../../../design-system/ui/Header';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import ProfileInfo from '../../../entities/user/ui/ProfileInfo';
import BookmarkList from '../../../entities/user/ui/BookmarkList';

const MyPage = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-myPageBg">
      <Header leftButtonLabel="마이페이지" leftButtonClassName="font-bold text-2xl" className="bg-white" />
      <div className="flex flex-col mt-6 mx-5 gap-5">
        <ProfileInfo />
        <BookmarkList />
      </div>
      <BottomBar />
    </div>
  );
};
export default MyPage;
