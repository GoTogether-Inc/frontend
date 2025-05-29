import { OnlineType } from '../../../shared/types/baseEventType';

export interface OrderTicketRequest {
  ticketId: number;
  eventId: number;
  ticketCnt: number;
}

export interface OrderTicketResponse {
  id: number;
  event: {
    id: number;
    bannerImageUrl: string;
    title: string;
    hostChannelName: string;
    address: string;
    startDate: string;
    remainDays: string;
    hashtags: string[];
    onlineType: OnlineType;
  };
  ticketQrCode: string;
  ticketName: string;
  ticketPrice: number;
  orderStatus: 'COMPLETED' | 'PENDING' | 'CANCELED';
  checkIn: boolean;
}
