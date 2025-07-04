interface EventInfoProps {
  eventImageUrl: string;
  title: string;
  date?: string;
  onClick?: () => void;
}

const EventInfo = ({ eventImageUrl, title, date, onClick }: EventInfoProps) => {
  return (
    <div onClick={onClick} className="flex items-center gap-4 md:gap-6 cursor-pointer">
      <img src={eventImageUrl} alt="프로필 사진" className="w-16 h-16 md:w-20 md:h-20 rounded-[5px]" />
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-medium md:text-lg w-52 md:w-80 truncate overflow-hidden whitespace-nowrap">
          {title}
        </span>
        <div className="text-gray-500 text-sm">{date}</div>
      </div>
    </div>
  );
};
export default EventInfo;
