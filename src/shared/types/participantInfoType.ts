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
    ticketName: 'WOOAKON 2024 일반참가자',
    checkIn: false,
    approved: true,
  },
  {
    ticketNum: 'ABCD2346',
    name: '조히은',
    email: 'asd@naver.com',
    phone: '000-1212-3232',
    purchaseDate: '2024-03-10',
    ticketName: 'WOOAKON 2024 일반참가자',
    checkIn: true,
    approved: false,
  },
  {
    ticketNum: 'ABCD4570',
    name: '한승철',
    email: 'qaz@naver.com',
    phone: '000-3456-1234',
    purchaseDate: '2024-03-04',
    ticketName: 'WOOAKON 2024 일반참가자',
    checkIn: false,
    approved: false,
  },
  {
    ticketNum: 'ABCD1250',
    name: '민정준',
    email: 'poi@naver.com',
    phone: '000-1345-2346',
    purchaseDate: '2024-03-20',
    ticketName: 'WOOAKON 2024 일반참가자',
    checkIn: true,
    approved: true,
  },
];
