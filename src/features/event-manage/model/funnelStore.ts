import { create } from 'zustand';

interface FunnelData {
  hostChannelId: number;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  hostEmail: string;
  hostPhoneNumber: string;
  bannerImageUrl: string;
  description: string;
  referenceLinks: { title: string; url: string }[];
  onlineType: 'online' | 'offline';
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
    hostChannelId: 0,
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    hostEmail: '',
    hostPhoneNumber: '',
    bannerImageUrl: '',
    description: '',
    referenceLinks: [],
    onlineType: 'online',
    location: '',
    category: '',
    hashtags: [],
  },
  updateFunnelData: newData => set(state => ({ data: { ...state.data, ...newData } })),
}));
