import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { FunnelState } from '../model/FunnelContext';

interface DatePickerProps {
  className?: string;
  eventState?: FunnelState['eventState'];
  setEventState?: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
  isLabel?: boolean;
}

const EventDatePicker = ({ className, eventState, setEventState, isLabel = false }: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(
    eventState?.startDate ? new Date(eventState.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(eventState?.endDate ? new Date(eventState.endDate) : new Date());
  const [startTime, setStartTime] = useState<string>('06:00');
  const [endTime, setEndTime] = useState<string>('23:00');

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        const hour = i.toString().padStart(2, '0');
        const minute = (j * 15).toString().padEnd(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (setEventState && startDate && endDate) {
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);

      const start = new Date(startDate);
      start.setHours(startHour, startMin, 0, 0);

      const end = new Date(endDate);
      end.setHours(endHour, endMin, 0, 0);

      setEventState(prev => ({
        ...prev,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }));
    }
  }, [startDate, endDate, startTime, endTime, setEventState]);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
        <div className="flex flex-col w-full sm:w-auto gap-2">
          {!isLabel && <span className="text-sm font-medium">시작 날짜</span>}
          <div className="flex gap-1">
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              locale={ko}
              dateFormat="MM월 dd일"
              className="w-20 h-9 md:w-24 md:h-10 border border-placeholderText text-sm md:text-md rounded-[5px] p-2"
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex justify-center gap-4">
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="mb-1">
                    &lt;
                  </button>
                  <span>
                    {date.getFullYear()}년 {date.getMonth() + 1}월
                  </span>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="mb-1">
                    &gt;
                  </button>
                </div>
              )}
            />
            <select
              id="startTime"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-20 h-9 md:w-24 md:h-10 border border-placeholderText text-sm md:text-md rounded-[5px] p-2"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLabel && <span className="text-2xl hidden lg:inline">&gt;</span>}

        <div className="flex flex-col w-full sm:w-auto gap-2">
          {!isLabel && <span className="text-sm font-medium">종료 날짜</span>}
          <div className="flex gap-1">
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              locale={ko}
              dateFormat="MM월 dd일"
              className="w-20 h-9 md:w-24 md:h-10 border border-placeholderText text-sm md:text-md rounded-[5px] p-2"
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex justify-center gap-4">
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="mb-1">
                    &lt;
                  </button>
                  <span>
                    {date.getFullYear()}년 {date.getMonth() + 1}월
                  </span>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="mb-1">
                    &gt;
                  </button>
                </div>
              )}
            />
            <select
              id="endTime"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="w-20 h-9 md:w-24 md:h-10 border border-placeholderText text-sm md:text-md rounded-[5px] p-2"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDatePicker;
