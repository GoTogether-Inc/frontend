import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimePickerProps {
  value?: string;
  onChange: (datetime: string) => void;
}

const parseUtcToKst = (utcString: string): Date => {
  const utcDate = new Date(utcString);
  const kstTimestamp = utcDate.getTime() + 9 * 60 * 60 * 1000;
  return new Date(kstTimestamp);
};

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const initialKstDate = value ? parseUtcToKst(value) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialKstDate);
  const [selectedHour, setSelectedHour] = useState<string>(initialKstDate.getHours().toString().padStart(2, '0'));
  const [selectedMinute, setSelectedMinute] = useState<string>(initialKstDate.getMinutes().toString().padStart(2, '0'));

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setSelectedHour(date.getHours().toString().padStart(2, '0'));
      setSelectedMinute(date.getMinutes().toString().padStart(2, '0'));
    }
  }, [value]);

  // 날짜, 시간 바뀔 때마다 업데이트
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate);
      formattedDate.setHours(Number(selectedHour), Number(selectedMinute), 0, 0);

      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const hour = String(formattedDate.getHours()).padStart(2, '0');
      const minute = String(formattedDate.getMinutes()).padStart(2, '0');

      const localString = `${year}-${month}-${day}T${hour}:${minute}:00`;

      onChange(localString);
    }
  }, [selectedDate, selectedHour, selectedMinute]);

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
