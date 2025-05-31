import { ApiResponse } from '../../../shared/types/api/apiResponse';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TicketOptionRequest, TicketOptionTypeResponse } from '../model/ticketOption';
import {
  PersonalTicketOptionAnswerResponse,
  TicketOptionAnswerRequest,
  TicketOptionAnswerResponse,
  TicketOptionResponse,
} from '../model/ticketInformation';
import {
  createTicketOptionAnswers,
  readPersonalTicketOptionAnswers,
  readPurchaserAnswers,
  readTicketOptions,
} from '../api/ticketOption';
import {
  getTicketOptions,
  createTicketOption,
  modifyTicketOption,
  deleteTicketOption,
  getAttachedTicketOptions,
  getTicketOptionDetail,
  attachTicketOption,
  detachTicketOption,
} from '../api/ticketOption';

// 티켓 옵션 조회
export const useTicketOptions = (ticketId: number) => {
  return useQuery<{ isSuccess: boolean; result: TicketOptionResponse[] }>({
    queryKey: ['ticketOptions', ticketId],
    queryFn: () => readTicketOptions(ticketId),
    enabled: !!ticketId,
  });
};

// 티켓 옵션 응답 전송
export const useCreateTicketOptionAnswers = () => {
  return useMutation<ApiResponse<null>, Error, TicketOptionAnswerRequest>({
    mutationFn: createTicketOptionAnswers,
    onSuccess: () => {
      console.log('티켓 옵션 응답 전송 성공');
    },
    onError: () => {
      alert('티켓 옵션 응답 전송 중 오류가 발생했습니다.');
    },
  });
};

// 티켓 옵션 응답 전체 조회
export const usePurchaserAnswers = (ticketId: number | null) => {
  return useQuery<{ isSuccess: boolean; result: TicketOptionAnswerResponse }>({
    queryKey: ['purchaserAnswers', ticketId],
    queryFn: () => {
      if (ticketId === null) {
        throw new Error('ticketId is required');
      }
      return readPurchaserAnswers(ticketId);
    },
    enabled: !!ticketId,
  });
};

// 티켓 옵션 응답 개별 조회
export const usePersonalTicketOptionAnswers = (ticketId: number | null) => {
  return useQuery<{ isSuccess: boolean; result: PersonalTicketOptionAnswerResponse[] }>({
    queryKey: ['personalTicketOptionAnswers', ticketId],
    queryFn: () => {
      if (ticketId === null) {
        throw new Error('ticketId is required');
      }
      return readPersonalTicketOptionAnswers(ticketId);
    },
    enabled: !!ticketId,
  });
};

// 티켓 옵션 생성 훅
export const useCreateTicketOptionMutation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TicketOptionRequest) => createTicketOption({ ...data, eventId: Number(id) }),
    onSuccess: () => {
      alert('티켓 옵션이 성공적으로 저장되었습니다.');
      navigate(`/dashboard/${id}/ticket/option`);
    },
    onError: () => {
      alert('티켓 옵션 저장에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 티켓 옵션 수정 훅
export const useModifyTicketOptionMutation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketOptionId, data }: { ticketOptionId: number; data: TicketOptionRequest }) =>
      modifyTicketOption(ticketOptionId, { ...data, eventId: Number(id) }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ticketOptions', id] });
      queryClient.invalidateQueries({ queryKey: ['ticketOptionDetail', variables.ticketOptionId] });
      alert('티켓 옵션이 성공적으로 수정되었습니다.');
      navigate(`/dashboard/${id}/ticket/option`);
    },
    onError: () => {
      alert('티켓 옵션 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 티켓 옵션 삭제 훅
export const useDeleteTicketOptionMutation = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketOptionId: number) => deleteTicketOption(ticketOptionId),
    onSuccess: (_, ticketOptionId) => {
      // 티켓 옵션 목록과 상세 정보 쿼리 리패칭
      queryClient.invalidateQueries({ queryKey: ['ticketOptions', id] });
      queryClient.invalidateQueries({ queryKey: ['ticketOptionDetail', ticketOptionId] });
      queryClient.invalidateQueries({ queryKey: ['attachedTicketOptions'] });
    },
    onError: error => {
      const errorCode = error.message;

      if (errorCode === '이미 응답된 티켓 옵션입니다.') {
        alert('한 명 이상의 유저가 응답한 옵션은 삭제할 수 없습니다.');
      } else {
        alert('티켓 옵션 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
};

// 티켓 옵션 목록 조회 훅
export const useGetTicketOptions = () => {
  const { id } = useParams();
  const eventId = Number(id);

  return useQuery<TicketOptionTypeResponse>({
    queryKey: ['ticketOptions', id],
    queryFn: () => getTicketOptions(eventId),
    enabled: !!id,
  });
};

// 티켓에 부착된 옵션 목록 조회 훅
export const useGetAttachedTicketOptions = (ticketId: number) => {
  return useQuery<TicketOptionTypeResponse>({
    queryKey: ['attachedTicketOptions', ticketId],
    queryFn: () => getAttachedTicketOptions(ticketId),
    enabled: !!ticketId,
  });
};

// 티켓 옵션 상세 조회 훅
export const useGetTicketOptionDetail = (ticketOptionId: number) => {
  return useQuery<TicketOptionTypeResponse>({
    queryKey: ['ticketOptionDetail', ticketOptionId],
    queryFn: () => getTicketOptionDetail(ticketOptionId),
    enabled: !!ticketOptionId,
  });
};

// 티켓 옵션 부착 훅
export const useAttachTicketOptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ticketId, ticketOptionId }: { ticketId: number; ticketOptionId: number }) =>
      attachTicketOption(ticketId, ticketOptionId),
    onSuccess: (_data, variables) => {
      // 티켓별 옵션 목록 쿼리 리패칭
      queryClient.invalidateQueries({ queryKey: ['attachedTicketOptions', variables.ticketId] });
      console.log('티켓 옵션이 성공적으로 부착되었습니다.');
    },
    onError: () => {
      console.log('티켓 옵션 부착에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 티켓에 부착된 티켓 옵션 부착 취소 훅
export const useDetachTicketOptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ticketId, ticketOptionId }: { ticketId: number; ticketOptionId: number }) =>
      detachTicketOption(ticketId, ticketOptionId),
    onSuccess: (_data, variables) => {
      // 티켓별 옵션 목록 쿼리 리패칭
      queryClient.invalidateQueries({ queryKey: ['attachedTicketOptions', variables.ticketId] });
      console.log('티켓에 부착된 티켓 옵션이 성공적으로 부착 취소되었습니다.');
    },
    onError: () => {
      console.log('티켓에 부착된 티켓 옵션 부착 취소에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
