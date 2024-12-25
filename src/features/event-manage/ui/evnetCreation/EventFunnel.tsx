import { FunnelProps, StepProps } from '../../hooks/useFunnel';
import { useFunnelStore } from '../../model/funnelStore';

import HostSelectionPage from '../../../../pages/event-manage/ui/HostSelectionPage';
import EventTitlePage from '../../../../pages/event-manage/ui/EventTitlePage';
import EventPeriodPage from '../../../../pages/event-manage/ui/EventPeriodPage';
import EventInfoPage from '../../../../pages/event-manage/ui/EventInfoPage';
import EventTypePage from '../../../../pages/event-manage/ui/EventTypePage';
import EventTagPage from '../../../../pages/event-manage/ui/EventTagPage';
import EventOrganizerInfo from '../../../../pages/event-manage/ui/EventOrganizerInfo';
import EventRegisterLayout from '../../../../shared/ui/backgrounds/EventRegisterLayout';

export interface EventFunnelInterface {
  steps: string[];
  onNext: (nextStep: string) => void;
  onPrev: (prevStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const EventFunnel = ({ steps, onNext, onPrev, Funnel, Step }: EventFunnelInterface) => {
  const { data } = useFunnelStore();

  const handleNext = (nextStep: string) => {
    console.log('이벤트 주최 데이터:', data);
    onNext(nextStep);
  };

  return (
    <Funnel>
      <Step name="HostSelection">
        <EventRegisterLayout
          title="이벤트를 호스팅할 채널을 선택해주세요"
          onNext={() => handleNext(steps[0])}
          // onPrev={() => {}}
        >
          <HostSelectionPage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventTitle">
        <EventRegisterLayout
          title="이벤트 제목을 입력해주세요"
          onNext={() => handleNext(steps[1])}
          onPrev={() => onPrev(steps[0])}
        >
          <EventTitlePage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventPeriod">
        <EventRegisterLayout
          title="이벤트 기간을 입력해주세요"
          onNext={() => handleNext(steps[2])}
          onPrev={() => onPrev(steps[1])}
        >
          <EventPeriodPage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventOrganizerInfo">
        <EventRegisterLayout
          title="이벤트 주최자 정보를 입력해주세요"
          onNext={() => handleNext(steps[3])}
          onPrev={() => onPrev(steps[2])}
        >
          <EventOrganizerInfo />
        </EventRegisterLayout>
      </Step>
      <Step name="EventInfo">
        <EventRegisterLayout
          title="이벤트 정보를 입력해주세요"
          onNext={() => handleNext(steps[4])}
          onPrev={() => onPrev(steps[3])}
        >
          <EventInfoPage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventType">
        <EventRegisterLayout
          title="이벤트 진행방식을 선택해주세요"
          onNext={() => handleNext(steps[5])}
          onPrev={() => onPrev(steps[4])}
        >
          <EventTypePage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventTag">
        <EventRegisterLayout onNext={() => handleNext(steps[6])} onPrev={() => onPrev(steps[5])}>
          <EventTagPage />
        </EventRegisterLayout>
      </Step>
    </Funnel>
  );
};
export default EventFunnel;
