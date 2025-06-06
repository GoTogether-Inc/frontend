export const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^\d]/g, '').slice(0, 11); // 11자리까지만 허용
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};