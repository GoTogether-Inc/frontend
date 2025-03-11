import React, { useState } from 'react';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import { TwoOptions } from '../../../../../design-system/stories/ChoiceChip.stories';
import ChoiceChip from '../../../../../design-system/ui/ChoiceChip';
import DefaultTextField from '../../../../../design-system/ui/textFields/DefaultTextField';
import Button from '../../../../../design-system/ui/Button';
import EventDatePicker from '../../../../features/event-manage/event-create/ui/DatePicker';

const TicketCreatePage = () => {
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPrice(Number.isNaN(value) ? 0 : value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(Number.isNaN(value) ? 0 : value);
  };

  const sum = price * quantity;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return num / 1000000 + 'M';
    }
    if (num >= 1000) {
      return num / 1000 + 'K';
    }
    return num.toString();
  };

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className=" flex flex-col gap-3 md:gap-5 px-7 py-5">
        <div className="w-full text-center font-bold text-xl">티켓(입장권)</div>
        <p className="text-gray-400 text-11 md:text-xs">
          참가자들이 이벤트에 접속, 혹은 입장 할 수 있도록 티켓을 만들어 주세요.
          <br />
          적어도 1개의 티켓이 필요합니다.
        </p>
        {/*티켓 종류 선택란*/}
        <div>
          <div className="w-32 md:w-40 my-1">
            <p className="font-semibold px-1 mb-1 text-gray-700">티켓 종류</p>
            <ChoiceChip {...TwoOptions.args} />
          </div>
          <p className="block px-1 mb-1 text-placeholderText text-11 md:text-13">
            참가자가 선착순으로 발행된 티켓을 구매합니다.
          </p>
        </div>
        {/*티켓 이름 입력란*/}
        <div>
          <DefaultTextField
            placeholder="VIP 입장권"
            label="티켓(입장권) 이름"
            detail="티켓을 잘 나타낼 수 있는 이름을 써보세요.(무료 입장권, VIP 입장권,얼리버드)"
            className="h-12"
          />
        </div>
        {/*티켓 설명 입력란*/}
        <div>
          <DefaultTextField
            placeholder="무료 수강권과 티셔츠가 기본으로 포함되어 있는 티켓입니다."
            label="티켓 설명"
            detail="티켓에 대한 상세한 설명을 해주세요."
            className="h-12"
          />
        </div>

        {/*가격 계산 란*/}
        <div className="flex items-center gap-5">
          <DefaultTextField label="1개당 가격" className="h-8 md:h-9" onChange={handlePriceChange} placeholder="0" />
          <p className="text-gray-700 text-2xl">X</p>
          <DefaultTextField label="수량" className="h-8 md:h-9" onChange={handleQuantityChange} placeholder="1" />
          <p className="text-gray-700 text-2xl">=</p>
          <div>
            <p className="whitespace-nowrap text-gray-700 font-semibold text-15 md:text-base">예상 수익</p>
            <p>₩ {formatNumber(sum)}</p>
          </div>
        </div>

        {/*캘린더가 들어갈 자리*/}
        <div className="flex flex-col gap-2">
          <p className="px-1 text-gray-700 font-semibold">판매 기간</p>
          <EventDatePicker isLabel={true} />
        </div>
        <div className="flex-grow"></div>

        <div className="w-full ">
          <Button label="저장하기" onClick={() => console.log('post 요청')} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketCreatePage;
