// Meta : 핵심 데이터를 설명하거나 보완하는 부가 정보
export type EventTag = 'current' | 'popular' | 'deadline';
export type EventCategory = 'DEVELOPMENT_STUDY' | 'NETWORKING' | 'HACKATHON' | 'CONFERENCE';

export interface EventFilters {
  tag?: EventTag;
  category?: EventCategory;
  search?: string;
}

export interface PaginationParams {
  page: number;
  size: number;
}

// 참조 링크 타입
export interface ReferenceLink {
  title: string;
  url: string;
}

// 위치 타입
export interface Location {
  lat: number;
  lng: number;
}

// 온라인 타입
export enum OnlineType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

// 카테고리 타입
export enum Category {
  DEVELOPMENT_STUDY = 'DEVELOPMENT_STUDY',
  NETWORKING = 'NETWORKING',
  HACKATHON = 'HACKATHON',
  CONFERENCE = 'CONFERENCE',
}

// 이벤트 상태 타입
export enum EventStatus {
  PROGRESS = 'PROGRESS',
}