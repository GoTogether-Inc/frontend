import Header from '../../../../design-system/ui/Header';
import Banner from '../../../widgets/main/ui/Banner';
import BottomBar from '../../../widgets/main/ui/BottomBar';
import firstPage from '../../../../public/assets/banners/1.png';
import secondPage from '../../../../public/assets/banners/2.png';
import thirdPage from '../../../../public/assets/banners/3.png';
import SecondaryButton from '../../../../design-system/ui/buttons/SecondaryButton';
import SearchTextField from '../../../../design-system/ui/textFields/SearchTextField';
import searchIcon from '../../../../design-system/icons/search.svg';
import VerticalCardButton from '../../../../design-system/ui/buttons/VerticalCardButton';

const MainPage = () => {
  const images = [
    { img: firstPage, link: 'https://example.com/page1' },
    { img: secondPage, link: 'https://example.com/page2' },
    { img: thirdPage, link: 'https://example.com/page3' },
  ];

  // 버튼 데이터
  const cardButtons = [
    {
      iconPath: '/assets/main-buttons/DevStudy.svg',
      label: '개발/스터디',
      onClick: () => console.log('Schedule clicked'),
    },
    {
      iconPath: '/assets/main-buttons/Networking.svg',
      label: '네트워킹',
      onClick: () => console.log('Tasks clicked'),
    },
    {
      iconPath: '/assets/main-buttons/Hackathon.svg',
      label: '해커톤',
      onClick: () => console.log('Profile clicked'),
    },
    {
      iconPath: '/assets/main-buttons/Conference.svg',
      label: '컨퍼런스',
      onClick: () => console.log('Settings clicked'),
    },
  ];

  return (
    <div>
      <Header
        centerContent={<SearchTextField icon={searchIcon} onChange={() => {}} placeholder="입력해주세요" />}
        leftButtonClassName="sm:text-lg md:text-xl lg:text-2xl font-extrabold font-nexon"
        leftButtonClick={() => {}}
        leftButtonLabel="같이가요"
        rightContent={<SecondaryButton color="black" label="로그인" onClick={() => {}} />}
      />
      <div className="mx-6">
        <Banner images={images} interval={5000} />
        {/* VerticalCardButtons Section */}
        <div className="flex items-center justify-around sm:my-8 md:my-9 lg:my-10">
          {cardButtons.map((button, index) => (
            <VerticalCardButton
              key={index} // 각 버튼에 고유한 key 추가
              iconPath={button.iconPath}
              label={button.label}
              size="lg"
              onClick={button.onClick}
              className="font-semibold"
            />
          ))}
        </div>
      </div>

      <BottomBar />
    </div>
  );
};
export default MainPage;
