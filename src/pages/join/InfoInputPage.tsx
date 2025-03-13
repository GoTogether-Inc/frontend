import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../../../design-system/ui/Header';
import Button from '../../../design-system/ui/Button';
import UnderlineTextField from '../../../design-system/ui/textFields/UnderlineTextField';
import { useNavigate } from 'react-router-dom';
import { FormData, zodValidation } from '../../shared/lib/formValidation';

const existingNames = ['김원영']; // 중복 이름 예시
const existingPhones = ['01012345678']; // 중복 연락처 예시
const existingEmails = ['example@example.com']; // 중복 이메일 예시

const InfoInputPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    ...zodValidation,
  });
  const navigate = useNavigate();

  const nameValue = watch('name');
  const phoneValue = watch('phone');
  const emailValue = watch('email');

  // 버튼 활성화 조건
  const isButtonEnabled = nameValue && phoneValue && emailValue && isValid;

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('제출 데이터:', data);
    alert('정보 입력 완료!');
  };

  // 디버깅 추가
  console.log('name:', nameValue, errors.name?.message);
  console.log('phone:', phoneValue, errors.phone?.message);
  console.log('email:', emailValue, errors.email?.message);
  console.log('isValid:', isValid);
  console.log('isButtonEnabled:', isButtonEnabled);

  return (
    <div className="relative flex flex-col w-full h-screen border ">
      <Header
        centerContent="정보입력"
        leftButtonLabel="<"
        leftButtonClassName="text-2xl z-30 font-semibold"
        leftButtonClick={() => navigate(-1)}
        color="black"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-10 py-12 md:px-12 md:py-16">
        {/* 이름 필드 */}
        <UnderlineTextField
          label="이름"
          placeholder="이름"
          errorMessage={errors.name?.message}
          className="text-xl"
          {...register('name', {
            validate: {
              notDuplicate: value => !existingNames.includes(value) || '이미 존재하는 이름입니다.',
            },
          })}
        />

        {/* 연락처 필드 */}
        <UnderlineTextField
          label="연락처"
          placeholder={`"-" 없이 번호만 입력해주세요`}
          type="tel"
          errorMessage={errors.phone?.message}
          className="text-xl"
          {...register('phone', {
            validate: {
              notDuplicate: value => !existingPhones.includes(value) || '이미 존재하는 연락처입니다.',
            },
          })}
        />

        {/* 이메일 필드 */}
        <UnderlineTextField
          label="이메일"
          placeholder="이메일"
          type="email"
          errorMessage={errors.email?.message}
          className="text-xl"
          {...register('email', {
            validate: {
              notDuplicate: value => !existingEmails.includes(value) || '이미 존재하는 이메일입니다.',
            },
          })}
        />
      </form>
      <div className="flex flex-grow" />
      <div className="w-full px-5 py-10">
        <Button
          label="시작하기"
          onClick={handleSubmit(onSubmit)}
          disabled={!isButtonEnabled}
          className="w-full h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default InfoInputPage;
