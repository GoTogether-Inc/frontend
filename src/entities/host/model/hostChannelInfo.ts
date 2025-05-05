export interface HostChannelInfoRequest {
  hostChannelId: number;
}

export interface HostChannelInfoResponse {
  result: {
    id: number;
    profileImageUrl: string;
    hostChannelName: string;
    channelDescription: string;
    email: string;
    hostChannelMembers: { id: number; memberName: string }[];
  };
}
