import { useNavigate } from 'react-router-dom';
import check from '../../../../public/assets/dashboard/main/Check.svg';
import { getMenuLists } from '../../../shared/types/dashboardType';
import { useParams } from 'react-router-dom';
// import completeCheck from '../../../../public/assets/dashboard/main/Check(complete).svg';

const CheckList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const menuLists = id ? getMenuLists(id) : []; // id가 있을 때만 리스트 생성

  const checkLists = menuLists
    .filter(item =>
      ['이벤트 기본 정보', '이벤트 상세와 사진', '티켓 생성하기', '티켓에 추가 옵션 부착'].includes(item.text)
    )
    .map(items => ({ text: items.text, path: items.path }));

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-md rounded-[10px] gap-4 px-4 py-6">
      <div className="flex flex-col">
        <h2 className="text-base font-semibold">체크리스트</h2>
        <h3 className="text-11 text-gray-500">이벤트를 열기 위해 꼭 필요한 정보에요.</h3>
      </div>
      <div className="flex w-full justify-between gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full h-[0.8vh] bg-gray-200 rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {checkLists.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} className="flex items-center gap-3 cursor-pointer">
            <img src={check} alt="체크" className="w-4 h-4" />
            <div className="text-xs md:text-sm">{item.text}</div>
            <span className="font-bold">&gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CheckList;
