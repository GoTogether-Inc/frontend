import TicketOption, { options } from "../../../../features/payment/TicketOption";
import TicketOptionLayout from "../../../../shared/ui/backgrounds/TicketOptionLayout";

const TicketOptionResponsePage = () => {
    return (
        <TicketOptionLayout ticketAmount={4}>
            <TicketOption options={options}>
            </TicketOption>
        </TicketOptionLayout>
    );
};
export default TicketOptionResponsePage;