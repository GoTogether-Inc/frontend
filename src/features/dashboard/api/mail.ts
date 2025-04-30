import { axiosClient } from '../../../shared/types/api/http-client';
import { EmailRequest, ReadEmailResponse } from '../model/emailInformation';

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

export const sendEmail = async (data: EmailRequest) => {
    const response = await axiosClient.post('/reservation-emails', data);
    return response.data.result;
};

export const editEmail = async (reservationEmailId: number, data: EmailRequest) => {
    const response = await axiosClient.put(`/reservation-emails/${reservationEmailId}`, data);
    return response.data.result;
};