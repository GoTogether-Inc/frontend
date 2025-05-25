import { useLocation } from "react-router-dom";
import TicketOption from "../../../../features/payment/ui/TicketOption";
import TicketOptionLayout from "../../../../shared/ui/backgrounds/TicketOptionLayout";
import { useTicketOptions } from "../../../../features/ticket/hooks/useTicketHook";

const TicketOptionResponsePage = () => {
    const location = useLocation();
    const { ticketId, eventId, ticketCnt } = location.state || {};
    const { data, isLoading } = useTicketOptions(ticketId);
    if (!ticketId || !eventId || !ticketCnt) {
        return <div>잘못된 접근입니다. 티켓 정보가 없습니다.</div>;
    }

    if (isLoading) return <div>로딩 중...</div>;
    if (!data?.isSuccess) return <div>옵션 정보를 불러오지 못했습니다.</div>;

    return (
        <TicketOptionLayout ticketAmount={ticketCnt} ticketInfo={{ ticketId, eventId, ticketCnt }}>
            <TicketOption options={data?.result}>
            </TicketOption>
        </TicketOptionLayout>
    );
};
export default TicketOptionResponsePage;