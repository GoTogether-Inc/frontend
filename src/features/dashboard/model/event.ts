import { BaseEvent } from '../../../shared/types/baseEventType';

export interface UpdateEventRequest extends BaseEvent {
  hostChannelId: number;

  // Swagger에서 이벤트 생성 시 제공하는 필드
  // detailAddress: string;
  // locationLat: number;
  // locationLng: number;
}
