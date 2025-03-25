import React, { useState } from 'react';
import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import { TwoOptions } from '../../../../../design-system/stories/ChoiceChip.stories';
import ChoiceChip from '../../../../../design-system/ui/ChoiceChip';
import DefaultTextField from '../../../../../design-system/ui/textFields/DefaultTextField';
import Button from '../../../../../design-system/ui/Button';
import TicketDatePicker from '../../../../features/ticket/model/TicketDatePicker';
import { createTicket } from '../../../../features/ticket/api/ticket';
import { CreateTicketRequest } from '../../../../features/ticket/model/ticketCreation';

const TicketCreatePage = () => {
  const [ticketData, setTicketData] = useState<CreateTicketRequest>({
    eventId: 1,
    ticketType: 'FIRST_COME',
    ticketName: '',
    ticketDescription: '',
    ticketPrice: 0,
    availableQuantity: 0,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  const handleTicketTypeChange = (type: string) => {
    let mappedType: string;
    if (type === '선착순') {
      mappedType = 'FIRST_COME';
    } else {
      mappedType = 'SELECTION';
    }
    setTicketData((prev) => ({
      ...prev,
      ticketType: mappedType,
    }));
  };

  // 필드값 업데이트
  const handleInputChange = (field: keyof CreateTicketRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if ((field === 'ticketPrice' || field === 'availableQuantity') && Number(value) < 0) {
      return;
    }
    setTicketData((prev) => ({
      ...prev,
      [field]: field === 'ticketPrice' || field === 'availableQuantity' ? Number(value) : value,
    }));
  };

  // 시간 업데이트
  const handleDateChange = (dates: { startDate: string; endDate: string; startTime: string; endTime: string }) => {
    setTicketData((prevState) => ({
      ...prevState,
      startDate: dates.startDate,
      endDate: dates.endDate,
      startTime: dates.startTime,
      endTime: dates.endTime,
    }));
  };

  // 예상 수익
  const sum = ticketData.ticketPrice * ticketData.availableQuantity;
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return num / 1000000 + 'M';
    }
    if (num >= 1000) {
      return num / 1000 + 'K';
    }
    return num.toString();
  };

  // API 호출
  const handleSaveClick = async () => {
    if (!ticketData.ticketName || !ticketData.ticketDescription || ticketData.ticketPrice < 0 || !ticketData.availableQuantity) {
      alert('모든 필수 입력 항목을 작성해주세요.');
      return;
    }
    try {
      const response = await createTicket(ticketData);
      console.log('티켓 저장 성공:', response);
      alert('티켓이 성공적으로 저장되었습니다.');
    } catch (err) {
      console.error('티켓 저장에 실패했습니다.', err);
      alert('티켓 저장에 실패했습니다. 다시 시도해주세요.');
    }
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
            <ChoiceChip {...TwoOptions.args} onSelect={handleTicketTypeChange} />
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
            onChange={handleInputChange('ticketName')}
          />
        </div>
        {/*티켓 설명 입력란*/}
        <div>
          <DefaultTextField
            placeholder="무료 수강권과 티셔츠가 기본으로 포함되어 있는 티켓입니다."
            label="티켓 설명"
            detail="티켓에 대한 상세한 설명을 해주세요."
            className="h-12"
            onChange={handleInputChange('ticketDescription')}
          />
        </div>

        {/*가격 계산 란*/}
        <div className="flex items-center gap-5">
          <DefaultTextField label="1개당 가격" className="h-8 md:h-9" onChange={handleInputChange('ticketPrice')} placeholder="0" />
          <p className="text-gray-700 text-2xl">X</p>
          <DefaultTextField label="수량" className="h-8 md:h-9" onChange={handleInputChange('availableQuantity')} placeholder="1" />
          <p className="text-gray-700 text-2xl">=</p>
          <div>
            <p className="whitespace-nowrap text-gray-700 font-semibold text-15 md:text-base">예상 수익</p>
            <p>₩ {formatNumber(sum)}</p>
          </div>
        </div>

        {/*캘린더가 들어갈 자리*/}
        <div className="flex flex-col gap-2">
          <p className="px-1 text-gray-700 font-semibold">판매 기간</p>
          <TicketDatePicker isLabel={true} ticketState={ticketData}
            setTicketState={setTicketData} onDateChange={handleDateChange} />
        </div>
        
        <div className="flex-grow"></div>

        <div className="w-full ">
          <Button label="저장하기" onClick={handleSaveClick} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketCreatePage;