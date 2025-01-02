import React from 'react';
import Header from '../../../design-system/ui/Header';
import Button from '../../../design-system/ui/Button';
import AgreementList from '../../features/join/ui/AgreementList';
import { useAgreementStore } from '../../features/join/model/agreementStore';
import { useNavigate } from 'react-router-dom';

const AgreementPage: React.FC = () => {
  const { isAllRequiredAgreed } = useAgreementStore();
  const navigate = useNavigate();

  console.log('isAllRequiredAgreed:', isAllRequiredAgreed());

  return (
    <div className="flex flex-col w-full h-screen bg-white border ">
      <Header title="이용약관" onBack={() => navigate(-1)} />
      <div className="relative mx-10 my-12 sm:mx-8 sm:my-10 md:mx-10 md:my-12 lg:mx-12 lg:my-16">
        <div className="mb-10">
          <p className="text-xl font-bold sm:text-base md:text-lg lg:text-xl">서비스 이용을 위해</p>
          <p className="text-xl font-bold sm:text-base md:text-lg lg:text-xl">약관에 동의해 주세요.</p>
        </div>
        <AgreementList />
      </div>
      <Button
        className="absolute h-14 sm:h-12 md:h-14 lg:h-14 max-w-90 bottom-16 left-0 right-0 mx-10 sm:mx-8 md:mx-10 lg:mx-12 rounded-[150px]"
        label="다음"
        onClick={() => navigate('/join/info-input')}
        disabled={!isAllRequiredAgreed()}
      />
    </div>
  );
};

export default AgreementPage;
