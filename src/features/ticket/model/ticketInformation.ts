export type TicketOptionType = 'SINGLE' | 'MULTIPLE' | 'TEXT';

export interface CreateTicketRequest {
  eventId: number;
  ticketType: string;
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number;
  availableQuantity: number;
  startDate: string;
  endDate: string;
}

export interface ReadTicketResponse {
  ticketId: number;
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number;
  availableQuantity: number;
}

export interface TicketOptionChoice {
  id: number;
  name: string;
}
export interface TicketOptionResponse {
  id: number;
  name: string;
  description: string;
  type: TicketOptionType;
  isMandatory: boolean;
  choices: TicketOptionChoice[];
}

// 티켓 옵션 응답 전송
export interface TicketOptionAnswerRequest {
  ticketOptionId: number;
  answerText?: string;
  ticketOptionChoiceId?: number;
  ticketOptionChoiceIds?: number[];
}

// 티켓 옵션 응답 전체 조회
export type TicketOptionAnswer = {
  id: number;
  answer: string;
};
export type TicketOption = {
  optionId: number;
  optionName: string;
  optionType: TicketOptionType;
  ticketOptionAnswers: TicketOptionAnswer[];
};
export type TicketOptionAnswerResponse = {
  orderCount: number;
  ticketOptions: TicketOption[];
};

// 티켓 옵션 응답 개별 조회
export type PersonalTicketOptionAnswerResponse = {
  userId: number;
  orders: Order[];
};
export interface Order {
  orderId: number;
  optionAnswers: OptionAnswer[];
}
export interface OptionAnswer {
  optionName: string;
  optionType: TicketOptionType;
  answer: string;
}
