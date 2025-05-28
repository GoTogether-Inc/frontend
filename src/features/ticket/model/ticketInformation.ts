export interface CreateTicketRequest {
    eventId: number;
    ticketType: string;
    ticketName: string;
    ticketDescription: string;
    ticketPrice: number;
    availableQuantity: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

export interface TicketResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string; // "ticketId: 2"
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
    type: 'SINGLE' | 'MULTIPLE' | 'TEXT';
    isMandatory: boolean;
    choices: TicketOptionChoice[];
}

// 티켓 옵션 응답 전송
export interface TicketOptionAnswerRequest {
    ticketOptionId: number;
    answerText?: string;
    ticketOptionChoiceId?: number;
}

// 티켓 옵션 응답 전체 조회
export type TicketOptionAnswer = {
  id: number;
  answer: string;
};
export type TicketOptionAnswerResponse = {
  optionId: number;
  optionName: string;
  //optionType: 'SINGLE' | 'MULTIPLE' | 'TEXT';
  answers: TicketOptionAnswer[];
};



// 티켓 옵션 응답 개별 조회
// export type PersonalTicketOptionAnswerResponse = {
//   optionName: string;
//   answer: string;
// };

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
  optionType: 'SINGLE' | 'MULTIPLE' | 'TEXT';
  answer: string;
}