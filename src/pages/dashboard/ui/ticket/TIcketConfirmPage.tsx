import React, { useState } from 'react';
import Header from '../../../../../design-system/ui/Header';
import Search from '../../../../../design-system/icons/Search.svg';
import { useNavigate } from 'react-router-dom';
import EmailDeleteMoal from '../../../../widgets/dashboard/ui/EmailDeleteModal';
import PurchaseBanner from '../../../../widgets/dashboard/ui/TicketConfirmPage/PurchaseBanner';
import OrganizerInfo from '../../../../widgets/dashboard/ui/TicketConfirmPage/OrganizerInfo';
import LocationInfo from '../../../../widgets/dashboard/ui/TicketConfirmPage/LocationInfo';

const TicketConfirmPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreviousButton = () => {
    navigate(-1);
  };

  return (
    <>
      <Header
        leftButtonClassName="text-xl hover:no-underline z-30"
        leftButtonClick={handlePreviousButton}
        leftButtonLabel="<"
        centerContent="티켓 구매 확인"
        rightContent={<img src={Search} alt="검색" className="w-4" />}
      />
      <div className=" bg-gray-100 p-3 min-h-screen flex flex-col gap-3">
        <PurchaseBanner setIsModalOpen={setIsModalOpen} />
        <OrganizerInfo />
        <LocationInfo />
      </div>
      {isModalOpen && (
        <EmailDeleteMoal
          mainText="WOOACON 2024의 일반 티켓 2매 구매를 취소하시겠습니까?. 취소 후에는 복구가 불가능합니다."
          approveButtonText="취소"
          rejectButtonText="뒤로가기"
          onClose={() => setIsModalOpen(false)}
          onClick={() => navigate('/menu/myticket')}
        />
      )}
    </>
  );
};

export default TicketConfirmPage;
