// src/features/join/model/agreementStore.ts
import { create } from 'zustand';

interface Agreements {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  dataUsage: boolean;
  marketing: boolean;
}

interface AgreementState {
  agreements: Agreements;
  toggleAgreement: (key: keyof Agreements) => void; // 특정 항목 상태 토글
  isAllRequiredAgreed: () => boolean; // 필수 항목 체크 여부
  getAgreementStates: () => {
    serviceAgreed: boolean;
    privacyPolicyAgree: boolean;
    personalInfoUsageAgreed: boolean;
    marketingAgreed: boolean;
  };
}

export const useAgreementStore = create<AgreementState>((set, get) => ({
  agreements: {
    all: false,
    terms: false,
    privacy: false,
    dataUsage: false,
    marketing: false,
  },
  toggleAgreement: key => {
    const { agreements } = get();

    if (key === 'all') {
      const newAllValue = !agreements.all;
      set({
        agreements: {
          all: newAllValue,
          terms: newAllValue,
          privacy: newAllValue,
          dataUsage: newAllValue,
          marketing: newAllValue,
        },
      });
    } else {
      // TypeScript가 "all"과 다른 키를 확실히 구분하도록 수정
      const updatedAgreements = {
        ...agreements,
        [key]: !agreements[key],
      };

      set({
        agreements: {
          ...updatedAgreements,
          all: updatedAgreements.terms && updatedAgreements.privacy && updatedAgreements.dataUsage,
        },
      });
    }
  },
  isAllRequiredAgreed: () => {
    const { agreements } = get();
    return agreements.terms && agreements.privacy && agreements.dataUsage;
  },
  getAgreementStates: () => {
    const { agreements } = get();
    return {
      serviceAgreed: agreements.terms,
      privacyPolicyAgree: agreements.privacy,
      personalInfoUsageAgreed: agreements.dataUsage,
      marketingAgreed: agreements.marketing,
    };
  },
}));
