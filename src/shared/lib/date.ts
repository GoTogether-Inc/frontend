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