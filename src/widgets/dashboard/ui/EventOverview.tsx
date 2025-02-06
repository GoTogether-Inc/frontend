const EventOverview = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-[10px] gap-5 px-4 py-6">
      <div>
        <h2 className="mb-2">이벤트 개요</h2>
        <hr />
      </div>
      <div className="flex items-center text-xs md:text-sm">
        <h4 className="text-main font-semibold mr-4">
          <span className="block md:inline">{`온라인`}</span>
          <span className="block md:inline">{`이벤트`}</span>
        </h4>
        <div className="flex gap-2">
          <span>10월 22일 오후 06:00</span>
          <span>&gt;</span>
          <span>10월 22일 오후 09:00</span>
        </div>
      </div>
    </div>
  );
};
export default EventOverview;
