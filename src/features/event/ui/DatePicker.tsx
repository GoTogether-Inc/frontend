import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { FunnelState } from '../model/FunnelContext';
import { formatISO } from '../../../shared/lib/date';

interface DatePickerProps {
  className?: string;
  eventState?: FunnelState['eventState'];
  setEventState?: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  isLabel?: boolean;
}

const EventDatePicker = ({
  className,
  eventState,
  setEventState,
  startDate: initialStartDate,
  endDate: initialEndDate,
  onStartDateChange,
  onEndDateChange,
  isLabel = false,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(
    eventState?.startDate ? new Date(eventState.startDate) : initialStartDate ? new Date(initialStartDate) : new Date()
  );

  const [endDate, setEndDate] = useState<Date | null>(
    eventState?.endDate ? new Date(eventState.endDate) : initialEndDate ? new Date(initialEndDate) : new Date()
  );
  const [startTime, setStartTime] = useState<string>('06:00');
  const [endTime, setEndTime] = useState<string>('23:00');

  useEffect(() => {
    const start = eventState?.startDate || initialStartDate;
    const end = eventState?.endDate || initialEndDate;

    if (start && !startDate) {
      const startDateObj = new Date(start);
      setStartDate(prev => prev ?? startDateObj);
      const hours = startDateObj.getHours().toString().padStart(2, '0');
      const minutes = startDateObj.getMinutes().toString().padStart(2, '0');
      setStartTime(`${hours}:${minutes}`);
    }

    if (end && !endDate) {
      const endDateObj = new Date(end);
      setEndDate(prev => prev ?? endDateObj);
      const hours = endDateObj.getHours().toString().padStart(2, '0');
      const minutes = endDateObj.getMinutes().toString().padStart(2, '0');
      setEndTime(`${hours}:${minutes}`);
    }
  }, [eventState, initialStartDate, initialEndDate]);

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        const hour = i.toString().padStart(2, '0');
        const minute = (j * 15).toString().padStart(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (startDate && endDate) {
      const startISO = formatISO(startDate, startTime);
      const endISO = formatISO(endDate, endTime);

      if (setEventState) {
        setEventState(prev => ({
          ...prev,
          startDate: startISO,
          endDate: endISO,
        }));
      }

      if (onStartDateChange) {
        onStartDateChange(startISO);
      }

      if (onEndDateChange) {
        onEndDateChange(endISO);
      }
    }
  }, [startDate, endDate, startTime, endTime, setEventState, onStartDateChange, onEndDateChange]);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
        <div className="flex flex-col w-full sm:w-auto gap-2">
          {!isLabel && <span className="text-sm font-medium">시작 날짜</span>}
          <div className="flex gap-1 ">
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              locale={ko}
              dateFormat="MM월 dd일"
              autoComplete="off"
              onKeyDown={(e) => e.preventDefault()}
              className="
                w-20 h-9 md:w-24 md:h-10 
                border border-placeholderText 
                text-sm md:text-md 
                rounded-[5px] 
                p-2 cursor-pointer 
                caret-transparent
              "
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
              className="w-20 h-9 md:w-24 md:h-10 border border-placeholderText text-sm md:text-md rounded-[5px] p-2 cursor-pointer"
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
              autoComplete="off"
              onKeyDown={(e) => e.preventDefault()}
              className="w-20 h-9 md:w-24 md:h-10 border border-placeholderText text-sm md:text-md rounded-[5px] p-2 cursor-pointer caret-transparent"
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
              className="w-20 h-9 md:w-24 md:h-10 border border-placeholderText text-sm md:text-md rounded-[5px] p-2 cursor-pointer"
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
