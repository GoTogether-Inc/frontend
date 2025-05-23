import { TicketOptionProvider } from '../../../../features/ticket/model/TicketOptionContext';
import TicketOptionPageContent from '../../../../features/ticket/ui/TicketOptionPageContent';

const TicketOptionPage = () => {
  return (
    <TicketOptionProvider>
      <TicketOptionPageContent />
    </TicketOptionProvider>
  );
};

export default TicketOptionPage;
