import { create } from 'zustand';

interface FunnelData {
  hostChannelId: number;
  hostProfileImageUrl?: string;
  hostChannelName?: string;
  hostEmail?: string;
  channelDescription?: string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  organizerEmail: string;
  organizerPhoneNumber: string;
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
    hostProfileImageUrl: '',
    hostChannelName: '',
    hostEmail: '',
    channelDescription: '',
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    organizerEmail: '',
    organizerPhoneNumber: '',
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
