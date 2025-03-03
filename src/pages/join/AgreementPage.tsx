import React from 'react';
import Header from '../../../design-system/ui/Header';
import Button from '../../../design-system/ui/Button';
import AgreementList from '../../features/join/ui/AgreementList';
import { useAgreementStore } from '../../features/join/model/agreementStore';
import { useNavigate } from 'react-router-dom';

const AgreementPage: React.FC = () => {
  const { isAllRequiredAgreed } = useAgreementStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      <Header
        centerContent="이용약관"
        leftButtonLabel="<"
        leftButtonClassName="text-2xl z-30 font-semibold"
        leftButtonClick={() => navigate(-1)}
        color="black"
      />
      <div className="relative px-10 py-10 md:px-12 md:py-14">
        <p className="font-bold text-lg md:text-xl mb-10">
          서비스 이용을 위해
          <br />
          약관에 동의해 주세요.
        </p>

        <AgreementList />
      </div>
      <div className="flex flex-grow" />
      <div className="w-full px-5 py-10">
        <Button
          className="w-full h-12 rounded-full"
          label="다음"
          onClick={() => navigate('/join/info-input')}
          disabled={!isAllRequiredAgreed()}
        />
      </div>
    </div>
  );
};

export default AgreementPage;
