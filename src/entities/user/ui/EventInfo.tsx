interface EventInfoProps {
  eventImageUrl: string;
  title: string;
  date?: string;
  onClick?: () => void;
}

const EventInfo = ({ eventImageUrl, title, date, onClick }: EventInfoProps) => {
  return (
    <div onClick={onClick} className="flex items-center gap-6 cursor-pointer">
      <img src={eventImageUrl} alt="프로필 사진" className="w-20 h-20 rounded-[5px]" />
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-lg">{title}</span>
        <div className="text-gray-500 text-sm">{date}</div>
      </div>
    </div>
  );
};
export default EventInfo;
