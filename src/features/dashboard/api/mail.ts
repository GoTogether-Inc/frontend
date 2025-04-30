import { axiosClient } from '../../../shared/types/api/http-client';
import { EmailRequest } from '../model/emailInformation';

export const sendEmail = async (data: EmailRequest) => {
    const response = await axiosClient.post('/reservation-emails', data);
    return response.data.result;
};

export const editEmail = async (reservationEmailId: number, data: EmailRequest) => {
    const response = await axiosClient.put(`/reservation-emails/${reservationEmailId}`, data);
    return response.data.result;
};