import React from 'react';
import TicketHostLayout from '../../../shared/ui/backgrounds/TicketHostLayout';
import CreditCard from '../../../../public/assets/payment/CreditCard.svg';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import Button from '../../../../design-system/ui/Button';
import { useForm } from 'react-hook-form';

type CardFormValues = {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
};

const CardRegisterPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CardFormValues>();

  // 공통 포맷 함수
  const formatValue = (type: keyof CardFormValues, value: string): string => {
    switch (type) {
      case 'cardNumber':
        return value
          .replace(/\D/g, '')
          .slice(0, 16)
          .replace(/(\d{4})/g, '$1 ')
          .trim();
      case 'expiryMonth':
        return value.replace(/\D/g, '').slice(0, 2);
      case 'expiryYear':
        return value.replace(/\D/g, '').slice(0, 4);
      case 'cvc':
        return value.replace(/\D/g, '').slice(0, 3);
      default:
        return value;
    }
  };

  // 공통 핸들러
  const handleInputChange = (type: keyof CardFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatValue(type, e.target.value);
    setValue(type, formattedValue, { shouldValidate: true });
  };

  const onSubmit = (data: CardFormValues) => {
    console.log('폼 전체 데이터 객체:', data);
  };

  return (
    <TicketHostLayout centerContent="새 카드 추가" image={CreditCard}>
      <div className="px-10 flex flex-col min-h-[calc(100vh-16rem)] gap-6 md:gap-8 mt-20 md:mt-24">
        <p className="text-gray-400 text-sm">안전한 결제를 위해 카드 정보를 입력해주세요.</p>

        <div>
          <DefaultTextField
            label="카드 번호"
            className={`h-12 ${errors.cardNumber ? 'border-2 border-red-500' : ''}`}
            placeholder="1234 5678 9012 3456"
            {...register('cardNumber', {
              required: '카드 번호를 입력하세요.',
              pattern: {
                value: /^\d{4} \d{4} \d{4} \d{4}$/,
                message: '올바른 카드 번호 형식이 아닙니다.',
              },
            })}
            onChange={handleInputChange('cardNumber')}
          />
          {errors.cardNumber && <p className="text-red-500 text-xs md:text-sm">{errors.cardNumber.message}</p>}
        </div>

        <div>
          <DefaultTextField
            label="카드 소지자 이름"
            className={`h-12 ${errors.cardHolder ? 'border-2 border-red-500' : ''}`}
            placeholder="홍길동"
            {...register('cardHolder', { required: '카드 소지자 이름을 입력하세요. ' })}
          />
          {errors.cardHolder && <p className="text-red-500 text-xs md:text-sm">{errors.cardHolder.message}</p>}
        </div>

        <div className="flex justify-between w-full gap-2">
          <div>
            <DefaultTextField
              label="만료 월"
              className={`h-10 ${errors.expiryMonth ? 'border-2 border-red-500' : ''}`}
              placeholder="월"
              {...register('expiryMonth', { required: '만료 월을 입력하세요.' })}
              onChange={handleInputChange('expiryMonth')}
            />
            {errors.expiryMonth && <p className="text-red-500 text-xs md:text-sm">{errors.expiryMonth.message}</p>}
          </div>
          <div>
            <DefaultTextField
              label="만료 년도"
              className={`h-10 ${errors.expiryYear ? 'border-2 border-red-500' : ''}`}
              placeholder="년도"
              {...register('expiryYear', { required: '만료 년도를 입력하세요.' })}
              onChange={handleInputChange('expiryYear')}
            />
            {errors.expiryYear && <p className="text-red-500 text-xs md:text-sm">{errors.expiryYear.message}</p>}
          </div>
          <div>
            <DefaultTextField
              label="CVC/CVV"
              className={`h-10 ${errors.cvc ? 'border-2 border-red-500' : ''}`}
              placeholder="123"
              {...register('cvc', { required: 'cvc를 입력하세요.' })}
              onChange={handleInputChange('cvc')}
            />
            {errors.cvc && <p className="text-red-500 text-xs md:text-sm">{errors.cvc.message}</p>}
          </div>
        </div>
        <div className="flex flex-grow" />
        <form onSubmit={handleSubmit(onSubmit)} className="py-5">
          <Button label="저장하기" onClick={() => console.log()} className="rounded-full w-full h-12" />
        </form>
      </div>
    </TicketHostLayout>
  );
};

export default CardRegisterPage;
