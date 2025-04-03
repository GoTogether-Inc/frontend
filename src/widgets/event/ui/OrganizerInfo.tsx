import phoneImg from '../../../../public/assets/event-manage/details/Phone.svg';
import emailImg from '../../../../public/assets/event-manage/details/Email.svg';

interface OrganizerInfoProps {
  name: string;
  description: string;
  phone: string;
  email: string;
  bgColor?: string;
}

const OrganizerInfo = ({ name, description, phone, email, bgColor = "bg-gray-100"}: OrganizerInfoProps) => {

  return (
    <div className={`flex flex-col w-full h-full px-4 py-3 md:px-6 md:py-4 rounded-[10px] gap-1 ${bgColor}`}>
      <h1 className="font-bold text-lg">주최자</h1>
      <span className="font-semibold">{name}</span>
      <span className="text-sm md:text-base">{description}</span>
      <div className="flex gap-3">
        <img src={phoneImg} alt="번호 이미지" />
        <span className="text-sm md:text-base">{phone}</span>
      </div>
      <div className="flex gap-3">
        <img src={emailImg} alt="이메일 이미지" />
        <span className="text-sm md:text-base">{email}</span>
      </div>
    </div>
  );
};
export default OrganizerInfo;
