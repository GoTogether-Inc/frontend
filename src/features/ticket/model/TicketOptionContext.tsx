import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { TicketOptionsType } from '../model/ticketOption';

interface TicketOptionState {
  options: TicketOptionsType[];
  setOptions: React.Dispatch<React.SetStateAction<TicketOptionsType[]>>;
  selectedOptions: TicketOptionsType[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<TicketOptionsType[]>>;
}

const TicketOptionContext = createContext<TicketOptionState | undefined>(undefined);

export const TicketOptionProvider = ({ children }: PropsWithChildren) => {
  const [options, setOptions] = useState<TicketOptionsType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<TicketOptionsType[]>([]);

  return (
    <TicketOptionContext.Provider value={{ options, setOptions, selectedOptions, setSelectedOptions }}>
      {children}
    </TicketOptionContext.Provider>
  );
};

export const useTicketOption = () => {
  const context = useContext(TicketOptionContext);
  if (!context) {
    throw new Error('useTicketOption must be used within a TicketOptionProvider');
  }
  return context;
};
