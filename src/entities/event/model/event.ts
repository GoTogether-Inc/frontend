import { BaseEvent, CategoryType, TagType } from '../../../shared/types/baseEventType';

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
    // detailAddress: string;
  };
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface EventFilters {
  tag?: TagType;
  category?: CategoryType;
  search?: string;
}

export interface EventItem extends BaseEvent {
  id: number;
  hostChannelName: string;
  remainDays: string;
}