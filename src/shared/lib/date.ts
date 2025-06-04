export const formatDate = (isoDate: string) => {
  const dateObj = new Date(isoDate);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
  const day = dateObj.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
export const formatTime = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatISO = (date: Date, time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  const kstDate = new Date(newDate.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  return kstDate.toISOString();
};

export const formatUtcToKst = (utcString: string): string => {
  const date = new Date(utcString);

  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth();
  const utcDay = date.getUTCDate();
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();

  const kstDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, utcHours + 9, utcMinutes));

  const year = kstDate.getFullYear();
  const month = (kstDate.getMonth() + 1).toString().padStart(2, '0');
  const day = kstDate.getDate().toString().padStart(2, '0');
  const hours = kstDate.getHours().toString().padStart(2, '0');
  const minutes = kstDate.getMinutes().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};
