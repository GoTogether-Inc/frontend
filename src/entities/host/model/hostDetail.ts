interface Event {
  id: number;
  bannerImageUrl: string;
  title: string;
  hostChannelName: string;
  startDate: string;
  address: string;
  onlineType: string;
  hashtags: string[];
  remainDays: string;
}

export interface HostDetailRequest {
  hostChannelId: number;
}

export interface HostDetailResponse {
  result: {
    id: number;
    profileImageUrl: string;
    hostChannelName: string;
    channelDescription: string;
    events: Event[];
  };
}
