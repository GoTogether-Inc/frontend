import { useLocation } from "react-router-dom";
import TicketOption, { options } from "../../../../features/payment/ui/TicketOption";
import TicketOptionLayout from "../../../../shared/ui/backgrounds/TicketOptionLayout";

const TicketOptionResponsePage = () => {
    const location = useLocation();
    const { ticketId, eventId, ticketCnt } = location.state || {};
    return (
        <TicketOptionLayout ticketAmount={ticketCnt} ticketInfo={{ ticketId, eventId, ticketCnt }}>
            <TicketOption options={options}>
            </TicketOption>
        </TicketOptionLayout>
    );
};
export default TicketOptionResponsePage;