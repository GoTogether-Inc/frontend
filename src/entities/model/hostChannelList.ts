interface HostChannel {
  id: number;
  profileImageUrl: string;
  hostChannelName: string;
}

export interface HostChannelListResponse {
  result: HostChannel[];
}
