import { HostDashboardResponse } from '../../../../entities/host/model/hostDashboard';
import { formatDate, formatTime } from '../../../../shared/lib/date';

const EventOverview = ({ eventInfo }: { eventInfo?: HostDashboardResponse }) => {
  return (
    <div className="flex flex-col w-full h-full bg-white shadow-md rounded-[10px] gap-5 px-4 py-6">
      <div>
        <h2 className="text-base font-semibold mb-2">이벤트 개요</h2>
        <hr />
      </div>
      <div className="flex items-center text-xs md:text-sm ">
        <h4 className="text-main font-semibold mr-4 sm:mr-2">
          <span className="block md:inline">{`온라인`}</span>
          <span className="block md:inline">{`이벤트`}</span>
        </h4>
        <div className="flex gap-2">
          <span>
            {eventInfo
              ? `${formatDate(eventInfo.eventStartDate)} ${formatTime(eventInfo.eventStartDate)}`
              : '날짜 정보 없음'}
          </span>
          <span>&gt;</span>
          <span>
            {eventInfo
              ? `${formatDate(eventInfo.eventEndDate)} ${formatTime(eventInfo.eventEndDate)}`
              : '날짜 정보 없음'}
          </span>
        </div>
      </div>
    </div>
  );
};
export default EventOverview;
