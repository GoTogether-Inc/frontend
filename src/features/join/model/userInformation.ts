export interface UserInfoResponse {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
}

export interface UserInfoRequest {
    name: string;
    phoneNumber: string;
    email: string;
}

export interface TermsAgreementRequset {
  serviceAgreed: boolean;
  privacyPolicyAgree: boolean;
  personalInfoUsageAgreed: boolean;
  marketingAgreed: boolean;
}