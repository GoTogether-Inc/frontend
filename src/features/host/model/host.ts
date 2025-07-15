export interface HostCreationRequest {
  profileImageUrl: string;
  hostChannelName: string;
  hostEmail: string;
  channelDescription: string;
}

export interface UpdateHostChannelInfoRequest {
  profileImageUrl: string;
  hostChannelName: string;
  hostEmail: string;
  channelDescription: string;
}

export interface HostDeletionResponse {
  code: string;
  message: string;
}
