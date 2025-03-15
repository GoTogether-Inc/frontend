import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CreateEventRequest } from './eventCreation';
import { HostCreationRequest } from './hostCreation';

export interface FunnelState {
  hostState: HostCreationRequest;
  eventState: CreateEventRequest;
  setHostState: React.Dispatch<React.SetStateAction<FunnelState['hostState']>>;
  setEventState: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
}

const FunnelContext = createContext<FunnelState | undefined>(undefined);

export const FunnelProvider = ({ children }: { children: ReactNode }) => {
  const [hostState, setHostState] = useState<FunnelState['hostState']>({
    profileImageUrl: '',
    hostChannelName: '',
    hostEmail: '',
    channelDescription: '',
  });

  const [eventState, setEventState] = useState<FunnelState['eventState']>({
    id: 0,
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    bannerImageUrl: '',
    description: '',
    referenceLinks: [],
    onlineType: 'ONLINE',
    address: '',
    location: { lat: 37.5665, lng: 126.978 },
    category: '',
    hashtags: [],
    organizerEmail: '',
    organizerPhoneNumber: '',
  });

  return (
    <FunnelContext.Provider value={{ hostState, eventState, setHostState, setEventState }}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnelState = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnelState must be used within a FunnelProvider');
  }
  return context;
};
