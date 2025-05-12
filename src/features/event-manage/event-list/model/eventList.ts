import { BaseEvent } from '../../../../shared/types/baseEventType';

export interface EventList extends BaseEvent {
  id: number;
  hostChannelName: string;
  remainDays: string;
}
