import HostSelectionPage from '../../../../pages/event-manage/ui/HostSelectionPage';
import HostCreationPage from '../../../../pages/event-manage/ui/HostCreationPage';
import EventTitlePage from '../../../../pages/event-manage/ui/EventTitlePage';
import EventPeriodPage from '../../../../pages/event-manage/ui/EventPeriodPage';
import EventInfoPage from '../../../../pages/event-manage/ui/EventInfoPage';
import EventTypePage from '../../../../pages/event-manage/ui/EventTypePage';
import EventTagPage from '../../../../pages/event-manage/ui/EventTagPage';
import EventOrganizerInfoPage from '../../../../pages/event-manage/ui/EventOrganizerInfoPage';
import EventRegisterLayout from '../../../../shared/ui/backgrounds/EventRegisterLayout';
import { useNavigate } from 'react-router-dom';
import { EventFunnelInterface, StepNames } from '../../../../shared/types/FunnelType';
import { useFunnelState } from '../../model/FunnelContext';

const EventFunnel = ({ onNext, onPrev, Funnel, Step, currentStep }: EventFunnelInterface) => {
  const { formState } = useFunnelState();
  const navigate = useNavigate();

  const handleNext = (nextStep: string) => {
    console.log('이벤트 주최 데이터:', formState);
    onNext(nextStep);
  };

  return (
    <Funnel>
      <Step name={StepNames.HostSelection}>
        <EventRegisterLayout
          title="이벤트를 호스팅할 채널을 선택해주세요"
          onNext={() => handleNext(String(currentStep + 2))}
          onPrev={() => navigate(-1)}
        >
          <HostSelectionPage onNext={handleNext} currentStep={currentStep} />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.HostCreation}>
        <EventRegisterLayout
          title="채널을 새로 생성합니다"
          onNext={() => handleNext(String(currentStep + 1))}
          onPrev={() => onPrev(String(currentStep - 1))}
        >
          <HostCreationPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventTitle}>
        <EventRegisterLayout
          title="이벤트 제목을 입력해주세요"
          onNext={() => handleNext(String(currentStep + 1))}
          onPrev={() => onPrev(String(currentStep - 1))}
        >
          <EventTitlePage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventPeriod}>
        <EventRegisterLayout
          title="이벤트 기간을 입력해주세요"
          onNext={() => handleNext(String(currentStep + 1))}
          onPrev={() => onPrev(String(currentStep - 1))}
        >
          <EventPeriodPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventOrganizerInfo}>
        <EventRegisterLayout
          title="이벤트 주최자 정보를 입력해주세요"
          onNext={() => handleNext(String(currentStep + 1))}
          onPrev={() => onPrev(String(currentStep - 1))}
        >
          <EventOrganizerInfoPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventInfo}>
        <EventRegisterLayout
          title="이벤트 정보를 입력해주세요"
          onNext={() => handleNext(String(currentStep + 1))}
          onPrev={() => onPrev(String(currentStep - 1))}
        >
          <EventInfoPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventType}>
        <EventRegisterLayout
          title="이벤트 진행방식을 선택해주세요"
          onNext={() => handleNext(String(currentStep + 1))}
          onPrev={() => onPrev(String(currentStep - 1))}
        >
          <EventTypePage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventTag}>
        <EventRegisterLayout
          onNext={() => handleNext(String(currentStep + 1))}
          onPrev={() => onPrev(String(currentStep - 1))}
        >
          <EventTagPage />
        </EventRegisterLayout>
      </Step>
    </Funnel>
  );
};
export default EventFunnel;
