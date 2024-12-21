import HostSelectionPage from './HostSelectionPage';
import EventTitlePage from './EventTitlePage';
import EventPeriodPage from './EventPeriodPage';
import EventInfoPage from './EventInfoPage';
import EventTypePage from './EventTypePage';
import EventTagPage from './EventTagPage';
import Funnel, { Step } from '../../../features/event-manage/ui/evnetCreation/EventFunnel';
import { EventRegisterLayout } from '../../../shared';
import useFunnel from '../../../features/event-manage/model/eventCreation/useFunnel';
import EventOrganizerInfo from './EventOrganizerInfo';

const steps = [
  'HostSelection',
  'EventTitle',
  'EventPeriod',
  'EventOrganizerInfo',
  'EventInfo',
  'EventType',
  'EventTag',
];

const FunnelPage = () => {
  const { step, onNextStep, onPrevStep } = useFunnel({ steps });

  return (
    <Funnel step={step}>
      <Step name="HostSelection">
        <EventRegisterLayout title="이벤트를 호스팅할 채널을 선택해주세요" onNext={onNextStep} onPrev={onPrevStep}>
          <HostSelectionPage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventTitle">
        <EventRegisterLayout title="이벤트 제목을 입력해주세요" onNext={onNextStep} onPrev={onPrevStep}>
          <EventTitlePage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventPeriod">
        <EventRegisterLayout title="이벤트 기간을 입력해주세요" onNext={onNextStep} onPrev={onPrevStep}>
          <EventPeriodPage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventOrganizerInfo">
        <EventRegisterLayout title="이벤트 주최자 정보를 입력해주세요" onNext={onNextStep} onPrev={onPrevStep}>
          <EventOrganizerInfo />
        </EventRegisterLayout>
      </Step>
      <Step name="EventInfo">
        <EventRegisterLayout title="이벤트 정보를 입력해주세요" onNext={onNextStep} onPrev={onPrevStep}>
          <EventInfoPage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventType">
        <EventRegisterLayout title="이벤트 진행방식을 선택해주세요" onNext={onNextStep} onPrev={onPrevStep}>
          <EventTypePage />
        </EventRegisterLayout>
      </Step>
      <Step name="EventTag">
        <EventRegisterLayout onNext={onNextStep} onPrev={onPrevStep}>
          <EventTagPage />
        </EventRegisterLayout>
      </Step>
    </Funnel>
  );
};

export default FunnelPage;
