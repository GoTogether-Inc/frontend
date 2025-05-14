import { FunnelProps, StepProps } from '../../features/event/hooks/useFunnelHook';

export enum StepNames {
  HostSelection = 'HostSelection',
  HostCreation = 'HostCreation',
  EventTitle = 'EventTitle',
  EventPeriod = 'EventPeriod',
  EventOrganizerInfo = 'EventOrganizerInfo',
  EventInfo = 'EventInfo',
  EventType = 'EventType',
  EventTag = 'EventTag',
}

export interface EventFunnelInterface {
  onNext: (nextStep: string) => void;
  onPrev: (prevStep: string) => void;
  Funnel: React.FC<FunnelProps>;
  Step: React.FC<StepProps>;
  setStep: (step: number) => void;
  currentStep: number;
}
