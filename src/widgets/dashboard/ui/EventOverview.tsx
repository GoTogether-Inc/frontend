const EventOverview = ({ eventTimeData }) => {
  return (
    <div className="flex flex-col w-full h-full bg-white shadow-md rounded-[10px] gap-5 px-4 py-6">
      <div>
        <h2 className="text-base font-semibold mb-2">이벤트 개요</h2>
        <hr />
      </div>
      <div className="flex items-center text-xs md:text-sm">
        <h4 className="text-main font-semibold mr-4">
          <span className="block md:inline">{`온라인`}</span>
          <span className="block md:inline">{`이벤트`}</span>
        </h4>
        <div className="flex gap-2">
          <span>
            {eventTimeData.StartDate}
            {eventTimeData.StartTime}
          </span>
          <span>&gt;</span>
          <span>
            {eventTimeData.EndDate}
            {eventTimeData.EndTime}
          </span>
        </div>
      </div>
    </div>
  );
};
export default EventOverview;
