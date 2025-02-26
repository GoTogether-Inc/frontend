import check from '../../../../public/assets/dashboard/main/Check.svg';
// import completeCheck from '../../../../public/assets/dashboard/main/Check(complete).svg';

const checkLists = ['이벤트 기본 정보', '이벤트 상세와 사진', '티켓 생성하기'];

const CheckList = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-[10px] gap-4 px-4 py-6">
      <div className="flex flex-col">
        <h2 className="text-base font-semibold">체크리스트</h2>
        <h3 className="text-10 text-gray-500">이벤트를 열기 위해 꼭 필요한 정보에요.</h3>
      </div>
      <div className="flex w-full justify-between gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full h-[0.8vh] bg-gray-200 rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {checkLists.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <img src={check} alt="체크" className="w-4 h-4" />
            <div className="text-xs md:text-sm">{item}</div>
            <span className="font-bold">&gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CheckList;
