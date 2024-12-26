import { useEffect } from 'react';
import { useFunnel } from '../../../features/event-manage/hooks/useFunnel';
import EventFunnel from '../../../features/event-manage/ui/evnetCreation/EventFunnel';
import { useLocation, useNavigate } from 'react-router-dom';

const FunnelPage = () => {
  const { Funnel, Step, setStep, currentStep, steps } = useFunnel(0);

  const navigate = useNavigate();
  const location = useLocation();

  const onNextClick = () => {
    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      setStep(nextStep);
      navigate(`${location.pathname}?step=${steps[nextStep]}`);
    }
  };

  const onPrevClick = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      setStep(prevStep);
      navigate(`${location.pathname}?step=${steps[prevStep]}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const step = params.get('step');
    if (step) {
      const index = steps.findIndex(s => s === step);
      if (index !== -1) {
        setStep(index);
      }
    }
  }, [location.search]);

  return (
    <EventFunnel
      steps={steps}
      onNext={onNextClick}
      onPrev={onPrevClick}
      Funnel={Funnel}
      Step={Step}
      currentStep={currentStep}
    />
  );
};

export default FunnelPage;
