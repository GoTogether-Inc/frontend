import { BaseEvent } from '../../../shared/types/baseEventType';

export interface EventDetailRequest {
  eventId: number;
}

export interface EventDetailResponse {
  result: BaseEvent & {
    id: number;
    participantCount: number;
    hostChannelName: string;
    hostChannelDescription: string;
    status: string;
  };
}
