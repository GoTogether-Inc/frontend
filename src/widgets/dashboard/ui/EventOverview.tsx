import { dashboardData } from '../../../shared/types/dashboardType';

const EventOverview = ({ eventInfo }: { eventInfo?: dashboardData }) => {
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
            {' '}
            {/*@TODO 포맷팅?*/}
            {eventInfo ? `${eventInfo.eventStartDate} ${eventInfo.eventStartTime}` : '날짜 정보 없음'}
          </span>
          <span>&gt;</span>
          <span>{eventInfo ? `${eventInfo.eventEndDate} ${eventInfo.eventEndTime}` : '날짜 정보 없음'} </span>
        </div>
      </div>
    </div>
  );
};
export default EventOverview;
