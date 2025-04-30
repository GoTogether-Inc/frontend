export interface EmailRequest {
    eventId: number;
    title: string;
    content: string;
    recipients: string[];
    reservationDate: string;
    reservationTime: string;
}
export interface EmailResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}