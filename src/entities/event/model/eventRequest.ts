import { OnlineType, Location, ReferenceLink, Category } from './eventMeta';

export interface EventRequest {
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
}

// POST,이벤트 생성
export interface EventCreate extends EventRequest {
  hostChannelId: number;
  organizerEmail: string;
  organizerPhoneNumber: string;
}

// PUT,이벤트 수정
export interface EventUpdate extends EventRequest {
  organizerEmail: string;
  organizerPhoneNumber: string;
}