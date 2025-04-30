import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimePickerProps {
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const TimePicker = ({ onDateChange, onTimeChange }: TimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  // 날짜, 시간 바뀔 때마다 업데이트
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      onDateChange(formattedDate);
    }
  }, [selectedDate]);
  useEffect(() => {
    const formattedTime = `${selectedHour}:${selectedMinute}`;
    onTimeChange(formattedTime);
  }, [selectedHour, selectedMinute]);

  return (
    <div className="flex items-center justify-between">
      <label className="font-bold text-gray-700 whitespace-nowrap text-sm md:text-base">예약 일시</label>

      <div className="flex flex-row justify-center gap-1 md:gap-2">
        {/* 날짜 선택 */}
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy년 MM월 dd일"
          className="border rounded-md py-2 w-32 md:w-40 text-center text-sm md:text-base"
        />
        {/* 시간 선택 */}
        <select
          value={selectedHour}
          onChange={e => setSelectedHour(e.target.value)}
          className="border rounded-md py-2 md:w-20 w-15 text-sm md:text-base text-center"
        >
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i.toString().padStart(2, '0');
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
          className="border rounded-md py-2 md:w-20 w-15 md:text-base text-sm text-center"
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
