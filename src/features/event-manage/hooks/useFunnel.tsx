// Funnel과 Step을 관리하는 커스텀 훅

import { ReactElement, ReactNode, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  // 각 단계를 나타내는 Step 컴포넌트
  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  // 현재 활성화된 step을 렌더링
  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(s => s.props.name === step);
    return <>{targetStep}</>;
  };

  return { Funnel, Step, setStep, currentStep: step };
};

/* 
props.name: 단계를 구별하기 위한 구분자
props.children: 단계에서 렌더링 할 실제 콘텐츠
*/
