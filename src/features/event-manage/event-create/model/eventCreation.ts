export interface CreateEventRequest {
  hostChannelId: number;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  bannerImageUrl: string;
  description: string;
  referenceLinks: { title: string; url: string }[];
  onlineType: 'ONLINE' | 'OFFLINE';
  location: string;
  category: string;
  hashtags: string[];
  organizerEmail: string;
  organizerPhoneNumber: string;
}
