export interface participantsData {
  ticketNum: string;
  name: string;
  email: string;
  phone: string;
  purchaseDate: string;
  ticketName: string;
  checkIn: boolean;
  approved: boolean;
}

export const participantsInfo: participantsData[] = [
  {
    ticketNum: 'ABCD1234',
    name: '고에진',
    email: 'qwe@naver.com',
    phone: '000-1234-5678',
    purchaseDate: '2024-03-01',
    ticketName: 'VIP 티켓',
    checkIn: false,
    approved: true,
  },
  {
    ticketNum: 'ABCD2346',
    name: '조히은',
    email: 'asd@naver.com',
    phone: '000-1212-3232',
    purchaseDate: '2024-03-10',
    ticketName: '일반 티켓',
    checkIn: true,
    approved: false,
  },
  {
    ticketNum: 'ABCD4570',
    name: '한승철',
    email: 'qaz@naver.com',
    phone: '000-3456-1234',
    purchaseDate: '2024-03-04',
    ticketName: '학생 할인 티켓',
    checkIn: false,
    approved: false,
  },
  {
    ticketNum: 'ABCD1250',
    name: '민정준',
    email: 'poi@naver.com',
    phone: '000-1345-2346',
    purchaseDate: '2024-03-20',
    ticketName: '일반 티켓',
    checkIn: true,
    approved: true,
  },
  {
    ticketNum: 'ABCD5678',
    name: '고에진',
    email: 'ghj@naver.com',
    phone: '000-1234-5678',
    purchaseDate: '2024-03-01',
    ticketName: '학생 할인 티켓',
    checkIn: true,
    approved: false,
  },
  {
    ticketNum: 'ABCD3961',
    name: '조히은',
    email: 'jhe@naver.com',
    phone: '000-1212-3232',
    purchaseDate: '2024-03-10',
    ticketName: 'VIP 티켓',
    checkIn: false,
    approved: false,
  },
  {
    ticketNum: 'ABCD0974',
    name: '한승철',
    email: 'hsc@naver.com',
    phone: '000-3456-1234',
    purchaseDate: '2024-03-04',
    ticketName: 'VIP 티켓',
    checkIn: false,
    approved: true,
  },
  {
    ticketNum: 'ABCD5578',
    name: '민정준',
    email: 'mjj@naver.com',
    phone: '000-1345-2346',
    purchaseDate: '2024-03-20',
    ticketName: '일반 티켓',
    checkIn: false,
    approved: false,
  },
];
