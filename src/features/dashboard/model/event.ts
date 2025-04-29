import { BaseEvent } from '../../../shared/types/baseEventType';

export interface UpdateEventRequest extends BaseEvent {
  hostChannelId: number;
}
