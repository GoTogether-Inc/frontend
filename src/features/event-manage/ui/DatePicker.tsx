import React, { useEffect, useState } from 'react';
import { useFunnelStore } from '../../../features/event-manage/model/funnelStore';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  title: string;
  textSize: string;
  className?: string;
}

const EventDatePicker: React.FC<DatePickerProps> = ({ title, textSize, className }) => {
  const { updateFunnelData } = useFunnelStore();

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
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

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // yyyy-mm-dd 형태로 포맷팅
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    updateFunnelData({
      startDate: startDate ? formatDate(startDate) : undefined,
      endDate: endDate ? formatDate(endDate) : undefined,
      startTime,
      endTime,
    });
  }, [startDate, endDate, startTime, endTime, updateFunnelData]);

  return (
    <div className="flex flex-col w-full">
      <h3 className={`text-black mb-5 font-semibold ${textSize} ${className}`}>{title}</h3>
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
        <div className="flex flex-col w-full sm:w-auto">
          <span className="text-xs font-bold">시작 날짜</span>
          <div className="flex gap-1">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setStartDate(date);
                }
              }}
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
        <div className="flex flex-col w-full sm:w-auto">
          <span className="text-xs font-bold">종료 날짜</span>
          <div className="flex gap-1">
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setEndDate(date);
                }
              }}
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
