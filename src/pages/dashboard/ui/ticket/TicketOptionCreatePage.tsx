import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../../design-system/ui/Button';
import { useTicketOptionForm } from '../../../../features/ticket/hooks/useTicketOptionForm';
import { TicketOptionFormSection } from '../../../../features/ticket/ui/TicketOptionFormSection';
import { TicketOptionListSection } from '../../../../features/ticket/ui/TicketOptionListSection';
import { useLocation } from 'react-router-dom';
import { useGetTicketOptionDetail } from '../../../../features/ticket/hooks/useTicketOptionHook';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TicketOptionCreatePage = () => {
  const [initialized, setInitialized] = useState(false);
  const { optionId } = useParams();
  const { isEditing } = useLocation().state || { };
  const form = useTicketOptionForm();

  // 상세 데이터 fetch (수정 모드일 때만)
  const { data: optionDetail } = useGetTicketOptionDetail(Number(optionId));

  useEffect(() => {
    if (isEditing && optionDetail?.result && !initialized) {
      form.setAll(optionDetail.result);
      setInitialized(true);
    }
  }, [isEditing, optionDetail]);

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓 옵션 생성</div>
        <p className="text-gray-400 text-sm mb-5">티켓 옵션을 생성할 수 있습니다.</p>

        <TicketOptionFormSection form={form} />
        <TicketOptionListSection form={form} />

        <div className="w-full mt-14 mb-20">
          <Button label="저장하기" onClick={form.handleSave} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionCreatePage;
