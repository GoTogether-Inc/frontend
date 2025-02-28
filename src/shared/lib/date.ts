export const formatDate = (isoDate: string) => {
  const dateObj = new Date(isoDate);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
  const day = dateObj.getDate();
  const hours = dateObj.getHours();

  return `${year}년 ${month}월 ${day}일, ${hours}시`;
};
