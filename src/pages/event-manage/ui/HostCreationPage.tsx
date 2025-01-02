import basicProfile from '../../../../public/assets/basicProfile.svg';
import addImage from '../../../../public/assets/addImage.svg';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';

const HostCreationPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="relative flex items-center justify-center mb-4">
        <img src={basicProfile} alt="기본 프로필 이미지" className="w-24 object-cover" />
        <button className="absolute bottom-0 sm:right-[33%] md:right-[35%] lg:right-[38%]">
          <img src={addImage} alt="이미지 추가 버튼" className="w-7" />
        </button>
      </div>
      <DefaultTextField label="채널 이름을 입력해주세요" placeholder="채널 이름을 입력해 주세요" className="h-12" />
      <DefaultTextField
        label="대표 이메일"
        detail="주최하는 이벤트에 대해 문의 할 수 있는 메일로 작성해주세요"
        placeholder="example@example.com"
        className="h-12"
      />
      <MultilineTextField label="채널에 대한 설명" placeholder="채널에 대한 설명을 적어주세요" className="h-20" />
    </div>
  );
};
export default HostCreationPage;
