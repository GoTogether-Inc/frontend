import { axiosClient } from '../../../shared/types/api/http-client';
import { EmailRequest, ReadEmailResponse } from '../model/emailInformation';

// 예약 메일 조회
export const readEmail = async (eventId: number, status: 'PENDING' | 'SENT'): Promise<ReadEmailResponse[]> => {
    const response = await axiosClient.get<{ result: ReadEmailResponse[] }>(
        `/reservation-emails`,
        {
            params: {
                eventId,
                status,
            },
        }
    );
    return response.data.result;
}

// 전체/티켓별 구매자 이메일 조회
export const readPurchaserEmails = async (eventId: number, ticketId?: number) => {
    const response = await axiosClient.get('/orders/purchaser-emails',
        {
            params: {
                eventId,
                ...(ticketId !== undefined && { ticketId }),
            },
        }
    );
    return response.data.result;
};

export const sendEmail = async (data: EmailRequest) => {
    const response = await axiosClient.post('/reservation-emails', data);
    return response.data.result;
};

export const editEmail = async (reservationEmailId: number, data: EmailRequest) => {
    const response = await axiosClient.put(`/reservation-emails/${reservationEmailId}`, data);
    return response.data.result;
};

export const deleteEmail = async (reservationEmailId: number) => {
    const response = await axiosClient.delete(`/reservation-emails/${reservationEmailId}`);
    return response.data.result;
}