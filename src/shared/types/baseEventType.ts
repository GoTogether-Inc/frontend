export type OnlineType = 'ONLINE' | 'OFFLINE';
export type CategoryType = 'DEVELOPMENT_STUDY' | 'NETWORKING' | 'HACKATHON' | 'CONFERENCE';
export type TagType = 'current' | 'popular' | 'deadline';

export interface BaseEvent {
  title: string;
  startDate: string;
  endDate: string;
  bannerImageUrl: string;
  description: string;
  referenceLinks: {
    title: string;
    url: string;
  }[];
  onlineType: OnlineType;
  address: string;
  locationLat: number;
  locationLng: number;
  category: CategoryType;
  hashtags: string[];
  organizerEmail: string;
  organizerPhoneNumber: string;
}
