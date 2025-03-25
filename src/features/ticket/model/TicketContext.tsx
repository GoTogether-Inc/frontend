import { createContext, ReactNode, useContext, useState } from 'react';
import { CreateTicketRequest } from './ticketCreation';

export interface TicketState {
  ticketState: CreateTicketRequest;
  setTicketState: React.Dispatch<React.SetStateAction<CreateTicketRequest>>;
  setTicketChannelId: (ticketChannelId: number) => void;
}

const TicketContext = createContext<TicketState | undefined>(undefined);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [ticketState, setTicketState] = useState<CreateTicketRequest>({
    eventId: 0, 
    ticketType: '',
    ticketName: '',
    ticketDescription: '',
    ticketPrice: 0,
    availableQuantity: 0,
    startDate: '',
    endDate: '',
    startTime: '06:00',
    endTime: '23:00',
  });

  const setTicketChannelId = (ticketChannelId: number) => {
    setTicketState(prev => ({ ...prev, ticketChannelId }));
  };

  return (
    <TicketContext.Provider value={{ ticketState, setTicketState, setTicketChannelId }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketState = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketState must be used within a TicketProvider');
  }
  return context;
};