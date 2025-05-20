import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import Button from '../../../../../design-system/ui/Button';
import { useTicketOptionForm } from '../../../../features/ticket/hooks/useTicketOptionForm';
import { TicketOptionFormSection } from '../../../../features/ticket/ui/TicketOptionFromSection';
import { TicketOptionListSection } from '../../../../features/ticket/ui/TicketOptionListSection';

const TicketOptionCreatePage = () => {
  const { handleSave } = useTicketOptionForm();

  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7">
        <div className="text-center text-xl font-bold mb-5">티켓 옵션 생성</div>
        <p className="text-gray-400 text-sm mb-5">티켓 옵션을 생성할 수 있습니다.</p>

        <TicketOptionFormSection />
        <TicketOptionListSection />

        <div className="w-full mt-14 mb-20">
          <Button label="저장하기" onClick={handleSave} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketOptionCreatePage;
