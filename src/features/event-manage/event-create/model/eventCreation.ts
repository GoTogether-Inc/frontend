export interface CreateEventRequest {
  hostChannelId: number;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  bannerImageUrl: string;
  description: string;
  referenceLinks: { address: string; detailAddress: string; title: string; url: string }[];
  onlineType: 'ONLINE' | 'OFFLINE';
  location: { address: string; detailAddress: string; lat: number; lng: number };
  category: string;
  hashtags: string[];
  organizerEmail: string;
  organizerPhoneNumber: string;
}
