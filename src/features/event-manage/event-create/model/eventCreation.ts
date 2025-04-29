import { BaseEvent } from '../../../../shared/types/baseEventType';

export interface CreateEventRequest extends BaseEvent {
  hostChannelId: number;
}
