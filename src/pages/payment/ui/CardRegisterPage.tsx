import React, { useState } from 'react';
import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import CreditCard from '../../../../public/assets/payment/CreditCard.svg';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import Button from '../../../../design-system/ui/Button';

const CardRegisterPage = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  //포맷팅
  // 카드 번호 입력 핸들러
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 '); // 4자리마다 공백 추가
    setCardNumber(formattedValue);
  };

  // 카드 소지자 입력 핸들러
  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\d/g, '');
    setCardHolder(value);
  };

  // 만료 월 입력 핸들러
  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setExpiryMonth(value);
  };

  // 만료 연도 입력 핸들러
  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setExpiryYear(value);
  };

  // CVC 입력 핸들러
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvc(value);
  };

  return (
    <TicketHostLayout centerContent="새 카드 추가" image={CreditCard}>
      <div className="p-10 flex flex-col gap-16 mt-20 min-h-[80vh]">
        <p className="text-gray-400 text-sm">안전한 결제를 위해 카드 정보를 입력해주세요.</p>
        <DefaultTextField
          label="카드 번호"
          className="h-12"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        <DefaultTextField
          label="카드 소지자 이름"
          className="h-12"
          placeholder="홍길동"
          value={cardHolder}
          onChange={handleCardHolderChange}
        />
        <div className="flex gap-3">
          <DefaultTextField
            label="만료 월"
            className="h-12"
            placeholder="월"
            value={expiryMonth}
            onChange={handleExpiryMonthChange}
          />
          <DefaultTextField
            label="만료 년도"
            className="h-12"
            placeholder="년도"
            value={expiryYear}
            onChange={handleExpiryYearChange}
          />
          <DefaultTextField label="CVC/CVV" className="h-12" placeholder="123" value={cvc} onChange={handleCvcChange} />
        </div>
        <div className="flex-grow"></div>
        <div>
          <Button label="저장하기" onClick={() => console.log('카드 정보 저장')} className="rounded-full w-full" />
        </div>
      </div>
    </TicketHostLayout>
  );
};

export default CardRegisterPage;
