import { hostInfoData } from '../../../shared/types/hostInfoType';
import { useNavigate } from 'react-router-dom';

const HostInfoButton = ({ host }: { host: hostInfoData }) => {
  const navigate = useNavigate();

  const goToHostInfoPage = (id: number) => {
    navigate(`/menu/hostinfo/${id}`);
  };

  return (
    <button
      key={host.id}
      className="flex flex-col items-center justify-center gap-2 group"
      onClick={() => goToHostInfoPage(host.id)}
    >
      <div className="md:w-20 md:h-20 w-16 h-16 bg-gray4 rounded-full group-hover:border-main group-hover:border-2"></div>
      <p className="text-sm group-hover:text-main">{host.name}</p>
    </button>
  );
};

export default HostInfoButton;
