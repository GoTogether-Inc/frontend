export type OnlineType = 'ONLINE' | 'OFFLINE';
export type CategoryType = 'DEVELOPMENT_STUDY' | 'NETWORKING' | 'HACKATHON' | 'CONFERENCE';

export interface EventDetailRequest {
  eventId: number;
}

export interface EventDetailResponse {
  result: {
    id: number;
    bannerImageUrl: string;
    title: string;
    participantCount: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    address: string;
    location: {
      lat: number;
      lng: number;
    };
    description: string;
    hostChannelName: string;
    hostChannelDescription: string;
    organizerEmail: string;
    organizerPhoneNumber: string;
    referenceLinks: {
      title: string;
      url: string;
    }[];
    category: CategoryType;
    onlineType: OnlineType;
    status: string;
    hashtags: string[];
  };
}
