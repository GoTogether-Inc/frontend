import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface FunnelState {
  formState: {
    hostChannelId: number;
    hostProfileImageUrl?: string;
    hostChannelName: string;
    hostEmail: string;
    channelDescription: string;
    title: string;
    startDate?: string;
    startTime: string;
    endDate?: string;
    endTime: string;
    organizerEmail: string;
    organizerPhoneNumber: string;
    bannerImageUrl: string;
    description: string;
    referenceLinks: { title: string; url: string }[];
    onlineType: 'ONLINE' | 'OFFLINE';
    location: string;
    category: string;
    hashtags: string[];
  };
  setFormState: React.Dispatch<React.SetStateAction<FunnelState['formState']>>;
}

const FunnelContext = createContext<FunnelState | undefined>(undefined);

export const FunnelProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<FunnelState['formState']>({
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
    onlineType: 'ONLINE',
    location: '',
    category: '',
    hashtags: [],
  });

  return <FunnelContext.Provider value={{ formState, setFormState }}>{children}</FunnelContext.Provider>;
};

export const useFunnelState = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnelState must be used within a FunnelProvider');
  }
  return context;
};
