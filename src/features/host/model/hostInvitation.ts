export interface HostInvitationRequest {
  email: string;
}

export interface HostInvitationResponse {
  code: string;
  message: string;
  result?: string;
}
