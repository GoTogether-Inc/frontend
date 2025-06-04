import AgreementCard from '../../../shared/ui/AgreementCard';
import { useAgreementStore } from '../model/agreementStore';

const AgreementList = () => {
  const { agreements, toggleAgreement } = useAgreementStore();
  const NOTION_TERMS_LINK = 'https://namu00.notion.site/1a5eaffb9b0e8196b408f986b13aa15d?source=copy_link';

  return (
    <div className="flex flex-col gap-5">
      <AgreementCard
        title="서비스 이용 약관"
        required={true}
        checked={agreements.terms}
        onChange={() => toggleAgreement('terms')}
        link={NOTION_TERMS_LINK}
      />
      <AgreementCard
        title="개인정보처리 방침"
        required={true}
        checked={agreements.privacy}
        onChange={() => toggleAgreement('privacy')}
        link={NOTION_TERMS_LINK}
      />
      <AgreementCard
        title="개인정보 수집·이용 동의"
        required={true}
        checked={agreements.dataUsage}
        onChange={() => toggleAgreement('dataUsage')}
        link={NOTION_TERMS_LINK}
      />
      <AgreementCard
        title="마케팅 및 광고성 정보 수신 동의"
        required={false}
        checked={agreements.marketing}
        onChange={() => toggleAgreement('marketing')}
        link={NOTION_TERMS_LINK}
      />
    </div>
  );
};

export default AgreementList;
