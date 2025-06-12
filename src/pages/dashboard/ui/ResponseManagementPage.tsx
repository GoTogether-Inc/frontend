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
  const { data, isLoading, isError } = usePurchaserAnswers(selectedTicketId);
  const orderCount = data?.result?.orderCount ?? 0;
  return (
    <DashboardLayout centerContent="DASHBOARD" pinkBg={true}>
      {isModalOpen && (
        <ResponesModal onClose={closeModal}></ResponesModal>
      )}
      <div className="flex flex-col px-2 md:px-4">
        <h1 className="text-left font-semibold md:text-2xl text-xl py-4 md:py-6 pl-4">
          {isLoading ? '응답 불러오는 중...' : isError ? '응답 0개' : `응답 ${orderCount}개`}
        </h1>
        {isError ? (
          <div className="text-center text-red-500 mt-8">
            응답이 존재하지 않습니다
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <ResponsesFilterBar listType={listType} setListType={setListType} />
            </div>
            <ResponsesList listType={listType} ticketOptionResponses={data?.result.ticketOptions ?? []} ticketId={selectedTicketId || 0} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
export default ResponseManagementPage;
