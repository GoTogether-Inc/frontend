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

// 텍스트
export interface TicketOptionAnswerTextRequest {
  ticketOptionId: number;
  answerText: string;
}

// 선택지
export interface TicketOptionAnswerChoiceRequest {
  ticketOptionId: number;
  ticketOptionChoiceId: number;
}

// 티켓 옵션 응답
export interface TicketOptionAnswerRequest {
    ticketOptionId: number;
    answerText?: string;
    ticketOptionChoiceId?: number;
}
