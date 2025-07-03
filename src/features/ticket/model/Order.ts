import { OnlineType } from '../../../shared/types/baseEventType';

export interface OrderTicketRequest {
  ticketId: number;
  eventId: number;
  ticketCnt: number;
}

export interface OrderTicketResponse {
  orderId: number;
  event: {
    id: number;
    bannerImageUrl: string;
    title: string;
    hostChannelName: string;
    startDate: string;
    endDate: string;
    address: string;
    onlineType: OnlineType;
    hashtags: string[];
    remainDays: string;
    status: 'PROGRESS' | 'COMPLETE' | 'DELETED';
  };
  ticketQrCode: string;
  ticketName: string;
  ticketPrice: number;
  orderStatus: 'COMPLETED' | 'PENDING' | 'CANCELED';
  checkIn: boolean;
}
