import React, { useState, useEffect } from 'react';
import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import CreditCard from '../../../../public/assets/payment/CreditCard.svg';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import Button from '../../../../design-system/ui/Button';
import { useForm } from 'react-hook-form';

type CardFormValues = {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvc: string;
};

const CardRegisterPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CardFormValues>({ mode: 'onChange' });

  const [isDisabled, setIsDisabled] = useState(true);

  // 입력값 변경 감지 및 버튼 활성화 여부 결정
  useEffect(() => {
    setIsDisabled(!isValid);
  }, [isValid]);

  const formatValue = (type: keyof CardFormValues, value: string): string => {
    switch (type) {
      case 'cardNumber':
        return value
          .replace(/\D/g, '')
          .slice(0, 16)
          .replace(/(\d{4})/g, '$1 ')
          .trim();
      case 'expiry':
        return value
          .replace(/\D/g, '')
          .slice(0, 4)
          .replace(/(\d{2})(\d{0,2})/, '$1 / $2');
      case 'cvc':
        return value.replace(/\D/g, '').slice(0, 4);
      default:
        return value;
    }
  };

  const handleInputChange = (type: keyof CardFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatValue(type, e.target.value);
    setValue(type, formattedValue, { shouldValidate: true });
  };

  const onSubmit = (data: CardFormValues) => {
    alert('카드 정보가 저장되었습니다!');
    console.log('폼 데이터:', data);
  };

  return (
    <TicketHostLayout centerContent="새 카드 추가" image={CreditCard}>
      <div className="px-10 flex flex-col min-h-[calc(100vh-16rem)] gap-6 md:gap-8 mt-20 md:mt-24">
        <p className="text-gray-400 text-sm">안전한 결제를 위해 카드 정보를 입력해주세요.</p>

        <div>
          <DefaultTextField
            label="카드 번호"
            placeholder="1234 5678 9012 3456"
            className={`h-12 ${errors.cardNumber ? 'border-2 border-red-500' : ''}`}
            {...register('cardNumber', {
              required: '카드 번호를 입력하세요.',
              pattern: { value: /^\d{4} \d{4} \d{4} \d{4}$/, message: '올바른 카드 번호 형식이 아닙니다.' },
            })}
            onChange={handleInputChange('cardNumber')}
          />
          {errors.cardNumber && <p className="text-red-500 text-xs md:text-sm">{errors.cardNumber.message}</p>}
        </div>

        <div>
          <DefaultTextField
            label="카드 소지자 이름"
            placeholder="홍길동"
            className={`h-12 ${errors.cardHolder ? 'border-2 border-red-500' : ''}`}
            {...register('cardHolder', { required: '카드 소지자 이름을 입력하세요.' })}
          />
          {errors.cardHolder && <p className="text-red-500 text-xs md:text-sm">{errors.cardHolder.message}</p>}
        </div>

        <div>
          <DefaultTextField
            label="만료 날짜 (MM / YY)"
            placeholder="MM / YY"
            className={`h-12 ${errors.expiry ? 'border-2 border-red-500' : ''}`}
            {...register('expiry', { required: '만료 날짜를 입력하세요.' })}
            onChange={handleInputChange('expiry')}
          />
          {errors.expiry && <p className="text-red-500 text-xs md:text-sm">{errors.expiry.message}</p>}
        </div>

        <div>
          <DefaultTextField
            label="CVC / CVV"
            placeholder="123"
            className={`h-12 ${errors.cvc ? 'border-2 border-red-500' : ''}`}
            {...register('cvc', { required: 'CVC를 입력하세요.' })}
            onChange={handleInputChange('cvc')}
          />
          {errors.cvc && <p className="text-red-500 text-xs md:text-sm">{errors.cvc.message}</p>}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="py-5">
          <Button
            label="저장하기"
            disabled={isDisabled}
            className="rounded-full w-full h-12 bg-blue-500 disabled:bg-gray-400"
            onClick={() => console.log()}
          />
        </form>
      </div>
    </TicketHostLayout>
  );
};

export default CardRegisterPage;
