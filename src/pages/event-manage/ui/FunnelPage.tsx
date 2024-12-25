import { useEffect, useState } from 'react';
import { useFunnel } from '../../../features/event-manage/hooks/useFunnel';
import EventFunnel from '../../../features/event-manage/ui/evnetCreation/EventFunnel';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const { Funnel, Step, setStep } = useFunnel(steps[0]);
  const [currentStep, setCurrentStep] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const onNextClick = () => {
    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
      setStep(steps[nextStep]);
      navigate(`${location.pathname}?step=${steps[nextStep]}`);
    }
  };

  const onPrevClick = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      setCurrentStep(prevStep);
      setStep(steps[prevStep]);
      navigate(`${location.pathname}?step=${steps[prevStep]}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const step = params.get('step');
    if (step) {
      const index = steps.findIndex(s => s === step);
      if (index !== -1) {
        setCurrentStep(index);
        setStep(steps[index]);
      }
    }
  }, [location.search]);

  return <EventFunnel steps={steps} onNext={onNextClick} onPrev={onPrevClick} Funnel={Funnel} Step={Step} />;
};

export default FunnelPage;
