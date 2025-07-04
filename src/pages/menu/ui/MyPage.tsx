import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../../../design-system/ui/Header';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import ProfileInfo from '../../../entities/user/ui/ProfileInfo';
import BookmarkList from '../../../entities/user/ui/BookmarkList';
import arrow from '../../../../public/assets/bottomBar/Arrow.svg';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import logout from '../../../../public/assets/bottomBar/Logout.svg';

const MyPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(prev => !prev);
  const handleLogout = () => navigate('/menu/logout');

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-myPageBg">
      <Header leftButtonLabel="마이페이지" leftButtonClassName="font-bold text-2xl" className="bg-white" />
      <div className="flex flex-col mt-6 mx-5 gap-5">
        <ProfileInfo />
        <BookmarkList />
        <div className="bg-white rounded-[10px] border-[0.5px] px-5 py-3 flex flex-col gap-2">
          <div onClick={() => navigate('/menu/myTicket')} className="flex items-center justify-between cursor-pointer">
            <span className="text-lg font-semibold">구매한 티켓 정보</span>
            <IconButton
              iconPath={<img src={arrow} alt="화살표" className="w-2" />}
              onClick={() => navigate('/menu/myTicket')}
            />
          </div>
          <div className="border-b" />

          <div>
            <div onClick={handleToggle} className="flex items-center justify-between cursor-pointer">
              <span className="text-lg font-semibold">문의하기</span>
              <IconButton
                iconPath={
                  <img
                    src={arrow}
                    alt="화살표"
                    className={`w-2 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                  />
                }
                onClick={handleToggle}
              />
            </div>
            {open && (
              <div className="mt-3">
                이메일 주소로 문의 부탁드립니다:
                <span className="ml-1 font-semibold">gotogether@gmail.com</span>
              </div>
            )}
          </div>
          <div className="border-b" />

          <div
            onClick={handleLogout}
            className="flex items-center justify-between cursor-pointer text-red-500 font-semibold"
          >
            <span>로그아웃</span>
            <IconButton iconPath={<img src={logout} alt="로그아웃" className="w-4" />} onClick={handleLogout} />
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};
export default MyPage;
