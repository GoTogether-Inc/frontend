export type OnlineType = 'ONLINE' | 'OFFLINE';
export type CategoryType = 'DEVELOPMENT_STUDY' | 'NETWORKING' | 'HACKATHON' | 'CONFERENCE';

export interface BaseEvent {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  bannerImageUrl: string;
  description: string;
  referenceLinks: {
    title: string;
    url: string;
    address?: string;
    detailAddress?: string;
  }[];
  onlineType: OnlineType;
  address: string;
  location: { lat: number; lng: number };
  category: CategoryType;
  hashtags: string[];
  organizerEmail: string;
  organizerPhoneNumber: string;
}
