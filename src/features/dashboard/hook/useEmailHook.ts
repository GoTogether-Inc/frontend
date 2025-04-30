import { useMutation, useQuery } from '@tanstack/react-query';
import { sendEmail, editEmail, readEmail } from '../api/mail';
import { EmailRequest, EmailResponse, ReadEmailResponse } from '../model/emailInformation';

export const useSendEmail = () => {
    return useMutation<EmailResponse, Error, EmailRequest>({
        mutationFn: sendEmail,
    });
};

export const useEditEmail = () => {
    return useMutation<EmailResponse, Error, { emailId: number; data: EmailRequest }>({
        mutationFn: ({ emailId, data }) => editEmail(emailId, data),
    });
};

export const useReadEmail = (eventId: number, status: 'PENDING' | 'SENT') => {
    return useQuery<ReadEmailResponse[]>({
        queryKey: ['emails', eventId, status],
        queryFn: () => readEmail(eventId, status),
        enabled: !!eventId && !!status,
      });
}
