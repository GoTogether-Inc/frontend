import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  return (
    <div className="flex items-center justify-between">
      <label className="font-bold text-gray-700 whitespace-nowrap text-sm md:text-base">예약 일시</label>

      <div className="flex flex-row justify-center md:gap-3 gap-1">
        {/* 날짜 선택 */}
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy년 MM월 dd일"
          className="border rounded-md px-3 py-2 w-[100px] text-center text-sm md:w-[150px] md:text-base"
        />
        {/* 시간 선택 */}
        <select
          value={selectedHour}
          onChange={e => setSelectedHour(e.target.value)}
          className="border rounded-md px-3 py-2 md:w-[80px] w-[60px] text-sm md:text-base text-center"
        >
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i.toString().padStart(2, '0'); // 1자리 숫자를 "00", "01" 형식으로 변환
            return (
              <option key={hour} value={hour}>
                {hour}시
              </option>
            );
          })}
        </select>
        {/* 분 선택 */}
        <select
          value={selectedMinute}
          onChange={e => setSelectedMinute(e.target.value)}
          className="border rounded-md px-3 py-2 md:w-[80px] w-[60px] md:text-base text-sm text-center"
        >
          {['00', '15', '30', '45'].map(minute => (
            <option key={minute} value={minute}>
              {minute}분
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
