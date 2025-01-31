import { useState } from 'react';
import HostDetailLayout from '../../../shared/ui/backgrounds/HostDetailLayout';
import ProfileCircle from '../../../../design-system/ui/Profile';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import { useParams } from 'react-router-dom';
import MemberEmailInput from '../../../features/menu/ui/MemberEmailInput';

const HostEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedHost, setSelectedHost] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const userData = [
    { id: 1, name: '유진', fullName: '백유진' },
    { id: 1, name: '예진', fullName: '고예진' },
    { id: 2, name: '유진', fullName: '백유진' },
    { id: 2, name: '예진', fullName: '고예진' },
    { id: 1, name: '히은', fullName: '조히은' },
    { id: 3, name: '유진', fullName: '백유진' },
    { id: 3, name: '정준', fullName: '민정준' },
    { id: 1, name: '히은', fullName: '조히은' },
  ];

  const user = userData.filter(user => user.id === Number(id));

  const handeHostInfoClick = () => {
    setSelectedHost(true);
    setSelectedInfo(false);
  };
  const handeInfoEditClick = () => {
    setSelectedInfo(true);
    setSelectedHost(false);
  };
  const handleAddClick = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <HostDetailLayout>
      <div className="relative overflow-y-auto">
        <div className="flex flex-col w-full px-8 py-8 gap-3">
          <div className="flex justify-between px-12 md:px-20 text-16 md:text-base">
            <span
              onClick={handeHostInfoClick}
              className={`cursor-pointer ${selectedHost ? 'text-black' : 'text-placeholderText'} transition-colors`}
            >
              호스트 정보
            </span>
            <span
              onClick={handeInfoEditClick}
              className={`cursor-pointer ${selectedInfo ? 'text-black' : 'text-placeholderText'} transition-colors`}
            >
              정보 수정
            </span>
          </div>
          <div className="relative">
            {selectedHost && <div className="absolute top-0 left-8 md:left-15 w-28 border-t-2 border-black" />}
            {selectedInfo && <div className="absolute top-0 right-7 md:right-15 w-24 border-t-2 border-black" />}
            <hr className="border-t-2" />
          </div>
        </div>

        {selectedHost && (
          <div className="flex flex-col px-8 md:px-12 gap-6">
            <div className="flex flex-col gap-4 py-4">
              <p className="text-xl text-black font-semibold">대표 이메일</p>
              <p>example@example.com</p>
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <p className="text-xl text-black font-semibold">멤버 목록</p>
              <div className="flex flex-wrap gap-x-5 gap-y-4 lg:gap-x-10 lg:gap-y-6 text-sm md:text-16 lg:text-base">
                {user.map(user => (
                  <ProfileCircle
                    key={user.id}
                    id={user.id}
                    profile="userProfile"
                    name={user.name}
                    className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 text-sm md:text-16 lg:text-base"
                  >
                    {user.fullName}
                  </ProfileCircle>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedInfo && (
          <div className="flex flex-col gap-8 px-8 md:px-6">
            <DefaultTextField
              label="대표 이메일"
              detail="채널 혹은, 채널에서 주최하는 이벤트에 대해 문의 할 수 있는 메일로 작성해주세요."
              placeholder="example@example.com"
              className="h-12"
              labelClassName="sm:text-base md:text-lg"
            />
            <div className="flex flex-col gap-2">
              <MultilineTextField
                label="채널에 대한 설명"
                placeholder="채널에 대한 설명을 작성해주세요."
                className="h-24 mb-8"
              />
              <TertiaryButton type="button" label="저장하기" color="pink" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-black text-lg">이벤트 해시태그</h1>
                <p className="text-placeholderText text-10 md:text-13">
                  이메일로 회원을 검색해 추가 할 수 있습니다. 삭제 하려면 추가된 이메일 아이콘의 x를 눌러주세요.{' '}
                </p>
              </div>
              <MemberEmailInput />
              <TertiaryButton type="button" label="전송" color="pink" onClick={handleAddClick} className="mb-4" />
            </div>
          </div>
        )}
      </div>
    </HostDetailLayout>
  );
};
export default HostEditPage;
