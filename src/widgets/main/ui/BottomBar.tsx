import { useNavigate } from 'react-router-dom';
import { bottomBar } from '../../../shared/types/bottomBarType';

const BottomBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between fixed bottom-0 w-full max-w-lg h-20 rounded-t-[10px] bg-white border-t border-t-gray4">
      {bottomBar.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center w-24 h-20 cursor-pointer"
          onClick={() => navigate(item.path)}
        >
          <img src={item.icon} alt={`${item.label}Icon`} className={`${item.iconClassName} object-contain`} />
          <span className={`text-sm ${item.label === '관심' ? 'mb-1' : 'mt-2'}`}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
export default BottomBar;
