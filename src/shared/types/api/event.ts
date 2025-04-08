// GET 이벤트 응답 타입 --------------------------------
export interface EventResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 이벤트 기본 정보 (최신, 인기, 마감, 검색)
export interface EventItem {
  id: number;
  bannerImageUrl: string;
  title: string;
  hostChannelName: string;
  startDate: string;
  address: string;
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

// 이벤트 기본 정보와 상세 정보
export type EventNormalResponse = EventResponse<EventItem[]>;
export type EventDetailResponse = EventResponse<EventDetail>;

// POST/PUT 요청 시 사용하는 타입 (이벤트 생성, 수정)
export interface EventRequest {
  hostChannelId: number;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  bannerImageUrl: string;
  description: string;
  referenceLinks: ReferenceLink[];
  onlineType: OnlineType;
  address: string;
  location: Location;
  category: Category;
  hashtags: string[];
  organizerEmail: string;
  organizerPhoneNumber: string;
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
