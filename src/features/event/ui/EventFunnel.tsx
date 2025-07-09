import HostSelectionPage from '../../../pages/event/ui/host/HostSelectionPage';
import HostCreationPage from '../../../pages/event/ui/host/HostCreationPage';
import EventTitlePage from '../../../pages/event/ui/create-event/EventTitlePage';
import EventPeriodPage from '../../../pages/event/ui/create-event/EventPeriodPage';
import EventInfoPage from '../../../pages/event/ui/create-event/EventInfoPage';
import EventTypePage from '../../../pages/event/ui/create-event/EventTypePage';
import EventTagPage from '../../../pages/event/ui/create-event/EventTagPage';
import EventOrganizerInfoPage from '../../../pages/event/ui/create-event/EventOrganizerInfoPage';
import EventRegisterLayout from '../../../shared/ui/backgrounds/EventRegisterLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventFunnelInterface, StepNames } from '../../../shared/types/funnelType';
import { useFunnelState } from '../model/FunnelContext';
import { useEventCreation } from '../hooks/useEventHook';
import { useHostCreation } from '../../host/hook/useHostHook';
import { HostCreationRequest } from '../../host/model/host';
import { useState } from 'react';

const EventFunnel = ({ onNext, Funnel, Step, currentStep }: EventFunnelInterface) => {
  const navigate = useNavigate();
  const { eventState, hostState, setHostState } = useFunnelState();
  const { mutate: createEvent } = useEventCreation();
  const { mutate: createHost } = useHostCreation();
  const location = useLocation();
  const [backPath] = useState(location.state?.backPath ?? '/');

  //중복 클릭 방지
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSubmittingHost, setIsSubmittingHost] = useState(false);

  const stepOrder = [
    StepNames.HostSelection,
    StepNames.HostCreation,
    StepNames.EventTitle,
    StepNames.EventPeriod,
    StepNames.EventOrganizerInfo,
    StepNames.EventInfo,
    StepNames.EventType,
    StepNames.EventTag,
  ] as const;
  const stepNameToIndex = (name: StepNames) => stepOrder.indexOf(name);

  const goTo = (stepName: StepNames) => {
    const index = stepNameToIndex(stepName);
    onNext(String(index));
  };

  const handleNext = (nextStep: string) => {
    onNext(nextStep);
  };
  const handleCreateEvent = () => {
    if (isSubmittingEvent) return;
    setIsSubmittingEvent(true);
    createEvent(eventState, {
      onSuccess: () => {
        navigate('/menu/myHost');
      },
      onError: error => {
        console.error('API 호출 실패:', error);
      },
    });
  }
  const initialHostState: HostCreationRequest = {
    profileImageUrl: '',
    hostChannelName: '',
    hostEmail: '',
    channelDescription: '',
  };

  const handleHostCreation = () => {
    if (isSubmittingHost) return;
    setIsSubmittingHost(true);
    createHost(hostState, {
      onSuccess: () => {
        setHostState(initialHostState);
        goTo(StepNames.HostSelection);
      },
      onError: error => {
        const message = error?.message || '호스트 생성에 실패했습니다. 다시 시도해주세요.';
        alert(message);
      },
    });
  };

  return (
    <Funnel>
      <Step name={StepNames.HostSelection}>
        <EventRegisterLayout
          title="이벤트를 호스팅할 채널을 선택해주세요"
          onNext={() => goTo(StepNames.EventTitle)}
          onPrev={() => navigate(backPath)}
          requireValidation={true}
        >
          <HostSelectionPage onNext={handleNext} currentStep={currentStep} />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.HostCreation}>
        <EventRegisterLayout
          title="채널을 새로 생성합니다"
          onNext={() => handleHostCreation()}
          onPrev={() => goTo(StepNames.HostSelection)}
          requireValidation={true}
        >
          <HostCreationPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventTitle}>
        <EventRegisterLayout
          title="이벤트 제목을 입력해주세요"
          onNext={() => goTo(StepNames.EventPeriod)}
          onPrev={() => goTo(StepNames.HostSelection)}
          requireValidation={true}
        >
          <EventTitlePage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventPeriod}>
        <EventRegisterLayout
          title="이벤트 기간을 입력해주세요"
          onNext={() => goTo(StepNames.EventOrganizerInfo)}
          onPrev={() => goTo(StepNames.EventTitle)}
        >
          <EventPeriodPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventOrganizerInfo}>
        <EventRegisterLayout
          title="이벤트 주최자 정보를 입력해주세요"
          onNext={() => goTo(StepNames.EventInfo)}
          onPrev={() => goTo(StepNames.EventPeriod)}
          requireValidation={true}
        >
          <EventOrganizerInfoPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventInfo}>
        <EventRegisterLayout
          title="이벤트 정보를 입력해주세요"
          onNext={() => goTo(StepNames.EventType)}
          onPrev={() => goTo(StepNames.EventOrganizerInfo)}
          requireValidation={true}
        >
          <EventInfoPage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventType}>
        <EventRegisterLayout
          title="이벤트 진행방식을 선택해주세요"
          onNext={() => goTo(StepNames.EventTag)}
          onPrev={() => goTo(StepNames.EventInfo)}
        >
          <EventTypePage />
        </EventRegisterLayout>
      </Step>
      <Step name={StepNames.EventTag}>
        <EventRegisterLayout
          onNext={() => handleCreateEvent()}
          onPrev={() => goTo(StepNames.EventType)}
        >
          <EventTagPage />
        </EventRegisterLayout>
      </Step>
    </Funnel>
  );
};
export default EventFunnel;
