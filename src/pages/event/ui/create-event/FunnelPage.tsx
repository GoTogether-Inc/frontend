import { useEffect, useState } from 'react';
import { useFunnel } from '../../../../features/event/hooks/useFunnelHook';
import EventFunnel from '../../../../features/event/ui/EventFunnel';
import { useLocation, useNavigate } from 'react-router-dom';
import { FunnelProvider } from '../../../../features/event/model/FunnelContext';

const FunnelPage = () => {
  const { Funnel, Step, setStep, currentStep, steps } = useFunnel(0);
  const [previousStep, setPreviousStep] = useState<number[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const onNextClick = (targetStep: number) => {
    const nextStep = targetStep !== undefined ? targetStep : currentStep + 1;
    if (nextStep < steps.length) {
      setPreviousStep([...previousStep, currentStep]);
      setStep(nextStep);
      navigate(`${location.pathname}?step=${steps[nextStep]}`);
    }
  };

  const onPrevClick = () => {
    if (currentStep === 1) {
      // HostCreation에서 뒤로가기: 브라우저 히스토리 뒤로
      navigate(-1);
      return;
    }
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

  // Funnel current step을 HostSelection으로 초기화
  useEffect(() => {
    setStep(0);
    setPreviousStep([]);
    if (!new URLSearchParams(location.search).get('step')) {
      navigate(`${location.pathname}?step=${steps[0]}`, { replace: true });
    }
  }, []);

  return (
    <FunnelProvider>
      <EventFunnel
        onNext={(nextStep: string) => onNextClick(Number(nextStep))}
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
