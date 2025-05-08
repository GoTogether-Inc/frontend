import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CreateEventRequest } from './eventCreation';
import { HostCreationRequest } from './hostCreation';

export interface FunnelState {
  hostState: HostCreationRequest;
  eventState: CreateEventRequest;
  setHostState: React.Dispatch<React.SetStateAction<FunnelState['hostState']>>;
  setEventState: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
  setHostChannelId: (hostChannelId: number) => void;
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
    hostChannelId: 0,
    title: '',
    startDate: '',
    endDate: '',
    bannerImageUrl: '',
    description: '',
    referenceLinks: [],
    onlineType: 'ONLINE',
    address: '',
    detailAddress: '',
    locationLat: 0,
    locationLng: 0,
    category: 'DEVELOPMENT_STUDY',
    hashtags: [],
    organizerEmail: '',
    organizerPhoneNumber: '',
  });

  const setHostChannelId = (hostChannelId: number) => {
    setEventState(prev => ({ ...prev, hostChannelId }));
  };

  return (
    <FunnelContext.Provider value={{ hostState, eventState, setHostState, setEventState, setHostChannelId }}>
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
