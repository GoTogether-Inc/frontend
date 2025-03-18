export interface TicketType {
  eventId: number;
  ticketType: string;
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number;
  tickAmount: number;
  availableQuantity: number;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
} //일단 스웨거보고 작성

export const TicketMockData: TicketType[] = [
  {
    eventId: 1,
    ticketType: '일반',
    ticketName: 'VIP 티켓',
    ticketDescription: 'VIP 전용 좌석과 웰컴 패키지가 포함된 티켓입니다.',
    ticketPrice: 150000,
    tickAmount: 1,
    availableQuantity: 50,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-10'),
    startTime: '18:00',
    endTime: '22:00',
  },
  {
    eventId: 2,
    ticketType: '무료',
    ticketName: '일반 티켓',
    ticketDescription: '일반 입장권으로, 자유롭게 행사 참여가 가능합니다.',
    ticketPrice: 50000,
    tickAmount: 2,
    availableQuantity: 200,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-10'),
    startTime: '10:00',
    endTime: '20:00',
  },
  {
    eventId: 3,
    ticketType: '할인 티켓',
    ticketName: '학생 할인 티켓',
    ticketDescription: '학생증 제시 시 할인 적용된 티켓입니다.',
    ticketPrice: 30000,
    tickAmount: 3,
    availableQuantity: 100,
    startDate: new Date('2024-03-05'),
    endDate: new Date('2024-03-10'),
    startTime: '12:00',
    endTime: '18:00',
  },
];
