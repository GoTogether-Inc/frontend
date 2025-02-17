import { hostInfo } from '../../../shared/types/hostInfoType';

const OrganizerInfo = () => {
  const host = hostInfo.find(host => host.id === 1);
  if (!host) return null;

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 px-4 py-3 md:px-6 md:py-4 rounded-[10px] gap-1">
      <h1 className="font-bold text-lg">주최자</h1>
      <span className="font-semibold">{host.name}</span>
      <span className="text-sm md:text-base">{host.description}</span>
      <div className="flex gap-3">
        <img src={host.phoneImg} alt="번호 이미지" />
        <span className="text-sm md:text-base">{host.phone}</span>
      </div>
      <div className="flex gap-3">
        <img src={host.emailImg} alt="이메일 이미지" />
        <span className="text-sm md:text-base">{host.email}</span>
      </div>
    </div>
  );
};
export default OrganizerInfo;
