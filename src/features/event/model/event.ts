import { BaseEvent } from '../../../shared/types/baseEventType';

export interface CreateEventRequest extends BaseEvent {
  hostChannelId: number;
}

export interface EventList extends BaseEvent {
  id: number;
  hostChannelName: string;
  remainDays: string;
}
