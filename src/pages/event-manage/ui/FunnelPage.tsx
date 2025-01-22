import { useEffect, useState } from 'react';
import { useFunnel } from '../../../features/event-manage/hooks/useFunnel';
import EventFunnel from '../../../features/event-manage/ui/EventFunnel';
import { useLocation, useNavigate } from 'react-router-dom';
import { FunnelProvider } from '../../../features/event-manage/model/FunnelContext';

const FunnelPage = () => {
  const { Funnel, Step, setStep, currentStep, steps } = useFunnel(0);
  const [previousStep, setPreviousStep] = useState<number[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const onNextClick = (targetStep?: number) => {
    const nextStep = targetStep !== undefined ? targetStep : currentStep + 1;
    if (nextStep < steps.length) {
      setPreviousStep([...previousStep, currentStep]);
      setStep(nextStep);
      navigate(`${location.pathname}?step=${steps[nextStep]}`);
    }
  };

  const onPrevClick = () => {
    const prevStep = previousStep.pop();
    if (prevStep !== undefined) {
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
  }, [location.search, setStep, steps]);

  return (
    <FunnelProvider>
      <EventFunnel
        onNext={nextStep => onNextClick(Number(nextStep))}
        onPrev={onPrevClick}
        Funnel={Funnel}
        Step={Step}
        setStep={setStep}
        currentStep={currentStep}
      />
    </FunnelProvider>
  );
};

export default FunnelPage;
