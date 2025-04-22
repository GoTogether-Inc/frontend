import { EventItem, EventDetail } from './event';

export interface EventResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export type EventNormalResponse = EventResponse<EventItem[]>; // 이벤트 최신, 인기, 마감, 검색
export type EventDetailResponse = EventResponse<EventDetail>; // 이벤트 상세