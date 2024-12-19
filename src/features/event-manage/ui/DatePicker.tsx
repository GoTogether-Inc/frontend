import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import useWindowSize from '../../../shared/lib/useWindowSizeHook';

interface DatePickerProps {
  title: string;
  textSize: string;
  className?: string;
}

const EventDatePicker: React.FC<DatePickerProps> = ({ title, textSize, className }) => {
  const [windowSize] = useWindowSize();
  const [width, setWidth] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>('06:00');
  const [endTime, setEndTime] = useState<string>('12:00');

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
    setWidth(windowSize.width <= 400);
  }, [windowSize]);

  return (
    <div className="flex flex-col w-full">
      <h3 className={`text-black mb-5 font-semibold ${textSize} ${className}`}>{title}</h3>
      <div className={`${width ? 'flex flex-col space-y-4' : 'flex justify-center items-center gap-1'}`}>
        <div>
          {width && <span className="text-xs font-bold">시작 날짜</span>}
          <div className="flex gap-1">
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
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
        {!width && <div className="text-lg">&gt;</div>}
        <div>
          {width && <span className="text-xs font-bold">종료 날짜</span>}
          <div className="flex gap-1">
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
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
