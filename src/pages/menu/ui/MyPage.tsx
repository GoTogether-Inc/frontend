import { useState } from 'react';
import Header from '../../../../design-system/ui/Header';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import TertiaryButton from '../../../../design-system/ui/buttons/TertiaryButton';
import { useForm } from 'react-hook-form';
import { validations } from '../../../shared/lib/validation';

const MyPage = () => {
  const userData = { email: 'aaa@naver.com', name: '고예진', phone: '01012345678' };
  const cardData = [
    { id: 1, name: 'Card 1', color: 'bg-blue-500' },
    { id: 2, name: 'Card 2', color: 'bg-red-500' },
    { id: 3, name: 'Card 3', color: 'bg-green-500' },
    { id: 4, name: 'Card 4', color: 'bg-yellow-500' },
  ];

  const [isChanged, setIsChanged] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { name: userData.name, phone: userData.phone } });

  const handleSave = (data: { name: string; phone: string }) => {
    // 이름과 전화번호가 변경되었는지 확인하고 메시지 설정
    let changeMessage = '';
    if (data.name !== userData.name && data.phone !== userData.phone) {
      changeMessage = `${data.name}, ${data.phone}으로 변경되었습니다`;
    } else if (data.name !== userData.name) {
      changeMessage = `${data.name}으로 변경되었습니다`;
    } else if (data.phone !== userData.phone) {
      changeMessage = `${data.phone}으로 변경되었습니다`;
    }

    setIsChanged(changeMessage); // 변경 상태 업데이트
    setValue('name', data.name); // Reset name field value
    setValue('phone', data.phone);
  };
  return (
    <div>
      <Header leftButtonLabel="마이페이지" leftButtonClassName="font-bold text-2xl" />
      <div className="flex flex-col px-5 mt-10 gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">기본 정보</h1>
          <div className="flex flex-col">
            <span className="text-base font-normal">이메일</span>
            <span className="text-base font-light">{userData.email}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-2">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <DefaultTextField
                label="이름"
                placeholder={userData.name}
                className=" h-8"
                labelClassName="text-base font-normal"
                {...register('name', validations.name)}
              />
              {errors.name && <span className=" text-sm text-red-500">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <DefaultTextField
                label="전화번호"
                placeholder={userData.phone}
                className="h-8"
                labelClassName="text-base font-normal"
                {...register('phone', validations.phone)}
              />
              {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
            </div>
          </div>
          {isChanged && <span className="text-red-500 text-sm">{isChanged}</span>}
          <TertiaryButton label="저장하기" color="black" type="submit" className="w-24 h-8" />
        </form>
      </div>

      <div className="flex flex-col px-5 mt-16 gap-6">
        <h1 className="text-xl font-bold">등록된 카드</h1>
        <div className="flex w-full h-40">
          <div className="flex w-full gap-4 overflow-x-scroll scrollbar-hide snap-x snap-mandatory">
            {cardData.length === 1 ? (
              <div
                key={cardData[0].id}
                className={`flex items-center justify-center text-white text-2xl w-72 h-full rounded-xl mx-auto ${cardData[0].color}`}
              >
                {cardData[0].name}
              </div>
            ) : (
              cardData.map((card, index) => (
                <div
                  key={card.id}
                  className={`flex items-center justify-center w-[60%] h-full text-white text-2xl snap-center shrink-0 rounded-xl ${
                    card.color
                  }  ${index === 0 ? 'ml-40' : index === cardData.length - 1 ? 'mr-40' : ''}`}
                >
                  {card.name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
