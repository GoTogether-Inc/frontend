import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../../../design-system/ui/Header';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import ProfileInfo from '../../../entities/user/ui/ProfileInfo';
import BookmarkList from '../../../entities/user/ui/BookmarkList';
import arrow from '../../../../public/assets/bottomBar/Arrow.svg';
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import logout from '../../../../public/assets/bottomBar/Logout.svg';
import useAuthStore from '../../../app/provider/authStore';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import lock from '../../../../public/assets/bottomBar/Lock.svg';

const MyPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const handleToggle = () => setOpen(prev => !prev);
  const handleLogout = () => navigate('/menu/logout');

  const handleLoginRedirect = () => {
    navigate('/', { state: { openLogin: true } });
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-myPageBg">
      <Header leftButtonLabel="마이페이지" leftButtonClassName="font-bold text-2xl" className="bg-white" />
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center px-32 py-44 gap-4">
          <div className="flex items-center justify-center w-18 h-18 rounded-full bg-gray-200">
            <img src={lock} alt="잠금 아이콘" className="w-8 h-8" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">로그인이 필요한 페이지입니다.</p>
            <p className="text-sm text-gray-600">마이페이지를 이용하려면 로그인해 주세요</p>
          </div>
          <SecondaryButton label="로그인하러 가기" size="full" color="black" onClick={handleLoginRedirect} />
        </div>
      ) : (
        <>
          <div className="flex flex-col mx-5 gap-5 py-4 pb-24">
            <ProfileInfo />
            <BookmarkList />
            <div className="bg-white rounded-[10px] border-[0.5px] px-4 md:px-5 py-2 md:py-3 flex flex-col gap-2">
              <div
                onClick={() => navigate('/menu/myTicket')}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-medium md:text-lg font-semibold">구매한 티켓 정보</span>
                <IconButton
                  iconPath={<img src={arrow} alt="화살표" className="w-2" />}
                  onClick={() => navigate('/menu/myTicket')}
                />
              </div>
              <div className="border-b" />
              <div>
                <div onClick={handleToggle} className="flex items-center justify-between cursor-pointer">
                  <span className="text-medium md:text-lg font-semibold">문의하기</span>
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
                    <span className="text-sm md:text-medium">이메일 주소로 문의 부탁드립니다</span>
                    <br />
                    <a
                      href={`mailto:gotogether@gmail.com?subject=${encodeURIComponent(
                        '같이가요 서비스 문의'
                      )}&body=${encodeURIComponent(
                        `안녕하세요, 같이가요 서비스 개발팀입니다.\n\n서비스 이용 중 발생한 오류나 불편 사항을 공유해주시면, 더 나은 서비스 제공에 큰 도움이 됩니다.\n정확한 확인을 위해 [화면 캡처, 페이지 위치, 에러 내용] 등을 함께 작성해주시면 감사하겠습니다.`
                      )}`}
                      className="text-sm md:text-medium font-semibold underline text-blue-600"
                    >
                      gotogether@gmail.com
                    </a>
                  </div>
                )}
              </div>
              <div className="border-b" />
              <div onClick={handleLogout} className="flex items-center justify-between cursor-pointer">
                <span className="text-medium md:text-lg text-red-500 font-semibold">로그아웃</span>
                <IconButton iconPath={<img src={logout} alt="로그아웃" className="w-4" />} onClick={handleLogout} />
              </div>
            </div>
          </div>
        </>
      )}
      <BottomBar />
    </div>
  );
};
export default MyPage;
