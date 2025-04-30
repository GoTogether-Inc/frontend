import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sendEmail, editEmail, readEmail, deleteEmail } from '../api/mail';
import { EmailRequest, EmailResponse, ReadEmailResponse } from '../model/emailInformation';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmailStore } from '../model/EmailStore';

export const useReadEmail = (eventId: number, status: 'PENDING' | 'SENT') => {
    return useQuery<ReadEmailResponse[]>({
        queryKey: ['emails', eventId, status],
        queryFn: () => readEmail(eventId, status),
        enabled: !!eventId && !!status,
    });
}

export const useSendEmail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { reset } = useEmailStore();
    return useMutation<EmailResponse, Error, EmailRequest>({
        mutationFn: sendEmail,
        onSuccess: () => {
            reset();
            alert("예약 메일이 성공적으로 발송되었습니다!");
            navigate(`/dashboard/${id}/mailBox`);
        },
        onError: () => {
            alert("메일 전송에 실패했습니다. 다시 시도해 주세요.");
        },
    });
};

export const useEditEmail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { reset } = useEmailStore();
    return useMutation<EmailResponse, Error, { reservationEmailId: number; data: EmailRequest }>({
        mutationFn: ({ reservationEmailId, data }) => editEmail(reservationEmailId, data),
        onSuccess: () => {
            reset();
            alert("예약 메일이 성공적으로 수정되었습니다!");
            navigate(`/dashboard/${id}/mailBox`);
        },
        onError: () => {
            alert("메일 수정에 실패했습니다. 다시 시도해 주세요.");
        },
    });
};

export const useDeleteEmail = () => {
    const queryClient = useQueryClient();
    return useMutation<EmailResponse, Error, number>({
        mutationFn: (reservationEmailId) => deleteEmail(reservationEmailId),
        onSuccess: () => {
            alert("메일이 삭제되었습니다.");
            queryClient.invalidateQueries({ queryKey: ['emails'] });
        },
        onError: () => {
            alert("메일 삭제에 실패했습니다. 다시 시도해 주세요.");
        }
    });
}
