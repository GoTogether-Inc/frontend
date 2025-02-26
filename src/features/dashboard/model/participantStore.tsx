import { create } from 'zustand';
import { participantsData } from '../../../shared/types/participantInfoType';

interface ParicipantState {
  all: boolean;
  participants: Record<string, boolean>; // 체크박스 상태
  approvedParticipants: Record<string, boolean>; // 승인 여부 상태
  initializeParticipants: (participantList: participantsData[]) => void;
  toggleAll: () => void;
  toggleParticipant: (ticketNum: string) => void; // 특정 항목 상태
  toggleApproveParticipant: (ticketNum: string) => void;
}

export const useParticipantStore = create<ParicipantState>((set, get) => ({
  all: false,
  participants: {},
  approvedParticipants: {},

  // 초기 데이터 세팅
  initializeParticipants: participantList => {
    const initialCheckedState = participantList.reduce((acc, p) => {
      acc[p.ticketNum] = false; // 초기 상태는 모두 체크 해제
      return acc;
    }, {} as Record<string, boolean>);

    const initialApprovedState = participantList.reduce((acc, p) => {
      acc[p.ticketNum] = p.approved;
      return acc;
    }, {} as Record<string, boolean>);

    set({ participants: initialCheckedState, approvedParticipants: initialApprovedState });
  },

  toggleAll: () => {
    const { all, participants } = get();
    const newAll = !all;

    // 모든 참가자의 상태를 newAll 값으로 변경
    const updatedParticipants = Object.keys(participants).length
      ? Object.keys(participants).reduce((acc, ticketNum) => {
          acc[ticketNum] = newAll;
          return acc;
        }, {} as Record<string, boolean>)
      : {};
    set({ all: newAll, participants: updatedParticipants });
  },

  toggleParticipant: ticketNum => {
    set(state => {
      const updatedParticipants = {
        ...state.participants,
        [ticketNum]: !state.participants[ticketNum],
      };

      // 모든 항목이 선택되었는지 확인하여 `all` 상태 업데이트
      const allChecked = Object.values(updatedParticipants).every(Boolean);

      return {
        participants: updatedParticipants,
        all: allChecked,
      };
    });
  },

  toggleApproveParticipant: ticketNum => {
    set(state => ({
      approvedParticipants: {
        ...state.approvedParticipants,
        [ticketNum]: true,
      },
    }));
  },
}));
