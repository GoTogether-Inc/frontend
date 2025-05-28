import { useState } from 'react';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import ResponsesFilterBar from '../../../widgets/dashboard/ui/ResponsesFilterBar';
import ResponsesList from '../../../features/dashboard/ui/ResponsesList';
import { useResponseStore } from '../../../features/dashboard/model/store/ResponseStore';
import ResponesModal from '../../../widgets/dashboard/ui/response/ResponseModal';
import { usePurchaserAnswers } from '../../../features/ticket/hooks/useTicketOptionHook';

const ResponseManagementPage = () => {
  const [listType, setListType] = useState<'summary' | 'individual'>('summary');
  const { isModalOpen, closeModal, selectedTicketId } = useResponseStore();
  const { data } = usePurchaserAnswers(selectedTicketId);
  return (
    <DashboardLayout centerContent="WOOACON 2024" pinkBg={true}>
      {isModalOpen && (
        <ResponesModal onClose={closeModal}></ResponesModal>
      )}
      <div className="flex flex-col px-2 md:px-4">
        <h1 className="text-left font-semibold md:text-2xl text-xl py-4 md:py-6 pl-4">응답 {data?.result.length}개</h1>
        <div className="flex justify-center">
          <ResponsesFilterBar listType={listType} setListType={setListType} />
        </div>
        <ResponsesList listType={listType} ticketOptionResponses={data?.result ?? []} ticketId={selectedTicketId || 0} />
      </div>
    </DashboardLayout>
  );
};
export default ResponseManagementPage;
