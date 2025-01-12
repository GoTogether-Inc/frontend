import Header from '../../../../design-system/ui/Header';
import Banner from '../../../widgets/main/ui/Banner';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import firstPage from '../../../../public/assets/banners/1.png';
import secondPage from '../../../../public/assets/banners/2.png';
import thirdPage from '../../../../public/assets/banners/3.png';

const MainPage = () => {
  const images = [
    { img: firstPage, link: 'https://example.com/page1' },
    { img: secondPage, link: 'https://example.com/page2' },
    { img: thirdPage, link: 'https://example.com/page3' },
  ];

  return (
    <div>
      <Header
        centerContent={
          <input
            className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-main"
            placeholder="검색어를 입력하세요."
            type="text"
          />
        }
        leftButtonClassName="sm:text-base md:text-lg lg:text-xl font-bold"
        leftButtonClick={() => {}}
        leftButtonLabel="같이가요"
        rightContent={
          <button className="px-3.5 py-1.5 text-white bg-black rounded-md" type="button">
            로그인
          </button>
        }
      />
      <Banner images={images} interval={5000} />
      <BottomBar />
    </div>
  );
};
export default MainPage;
