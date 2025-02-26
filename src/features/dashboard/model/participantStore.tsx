import { create } from 'zustand';

interface ParicipantState {
  all: boolean;
  participants: Record<string, boolean>;
  initializeParticipants: (participantList: string[]) => void;
  toggleAll: () => void;
  toggleParticipant: (ticketNum: string) => void; // 특정 항목 상태
}

export const useParticipantStore = create<ParicipantState>((set, get) => ({
  all: false,
  participants: {},

  // 초기 데이터 세팅
  initializeParticipants: participantList => {
    const initialState = participantList.reduce((acc, ticketNum) => {
      acc[ticketNum] = false; // 초기 상태는 모두 체크 해제
      return acc;
    }, {} as Record<string, boolean>);

    set({ participants: initialState });
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
}));
