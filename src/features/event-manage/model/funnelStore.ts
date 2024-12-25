import { create } from 'zustand';

interface FunnelData {
  host: string;
  title: string;
  startDate?: Date;
  startTime: string;
  endDate?: Date;
  endTime: string;
  email: string;
  phone: string;
  file: string;
  detail: string;
  link: { title: string; url: string }[];
  type: 'online' | 'offline';
  location: string;
  category: string;
  hashtags: string[];
}

interface FunnelStore {
  data: FunnelData;
  updateFunnelData: (newData: Partial<FunnelData>) => void;
}

export const useFunnelStore = create<FunnelStore>(set => ({
  data: {
    host: '',
    title: '',
    startDate: undefined,
    startTime: '',
    endDate: undefined,
    endTime: '',
    email: '',
    phone: '',
    file: '',
    detail: '',
    link: [],
    type: 'online',
    location: '',
    category: '',
    hashtags: [],
  },
  updateFunnelData: newData => set(state => ({ data: { ...state.data, ...newData } })),
}));
