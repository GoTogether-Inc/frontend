import DashboardLayout from '../../../../shared/ui/backgrounds/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const TicketOptionPage = () => {
  const navigate = useNavigate();

  return(
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="mt-8 px-7"></div>
    </DashboardLayout>
  );
};

export default TicketOptionPage;