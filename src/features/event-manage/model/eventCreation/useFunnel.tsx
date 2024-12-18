import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface UseFunnelProps {
  steps: string[];
}

const useFunnel = ({ steps }: UseFunnelProps) => {
  const [level, setStepLevel] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const onNextStep = useCallback(() => {
    setStepLevel(prev => {
      if (prev >= steps.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  }, [steps]);

  const onPrevStep = useCallback(() => {
    setStepLevel(prev => {
      if (prev <= 0) {
        return 0;
      }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    navigate(`${location.pathname}?step=${steps[level]}`);
  }, [level, steps, navigate, location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const step = params.get('step');
    if (step) {
      const index = steps.findIndex(s => s === step);
      if (index !== -1) {
        setStepLevel(index);
      }
    }
  }, [location.search, steps]);

  return {
    step: steps[level],
    onNextStep,
    onPrevStep,
  };
};

export default useFunnel;
