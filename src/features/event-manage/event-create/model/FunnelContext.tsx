import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CreateEventRequest } from './eventCreation';

export interface FunnelState {
  formState: CreateEventRequest;
  setFormState: React.Dispatch<React.SetStateAction<FunnelState['formState']>>;
}

const FunnelContext = createContext<FunnelState | undefined>(undefined);

export const FunnelProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<FunnelState['formState']>({
    hostChannelId: 0,
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
