import { useMutation } from '@tanstack/react-query';
import { sendEmail, editEmail } from '../api/mail';
import { EmailRequest, EmailResponse } from '../model/emailInformation';

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
