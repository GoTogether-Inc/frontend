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

import { OnlineType, Location, ReferenceLink, Category, EventStatus } from './eventMeta';

// 이벤트 기본 정보 (최신, 인기, 마감, 검색)
export interface EventItem {
  id: number; 
  bannerImageUrl: string;
  title: string;
  startDate: string;
  address: string;
  hostChannelName: string;
  onlineType: OnlineType;
  hashtags: string[];
  remainDays: string;
}

// 이벤트 상세 정보 (기본 정보 + 추가 정보)
export interface EventDetail extends Omit<EventItem, 'remainDays'> {
  participantCount: number;
  endDate: string;
  startTime: string;
  endTime: string;
  location: Location;
  description: string;
  hostChannelDescription: string;
  organizerEmail: string;
  organizerPhoneNumber: string;
  referenceLinks: ReferenceLink[];
  category: Category;
  status: EventStatus;
}