interface TicketRevenueProps {
  icon: React.ReactElement;
  title: string;
  value: string;
}

const TicketRevenue = ({ icon, title, value }: TicketRevenueProps) => {
  return (
    <div className="flex items-center w-full h-full bg-white shadow-md rounded-[10px] gap-3 md:gap-7 px-3 md:px-4 py-5">
      <div className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 bg-main rounded-[5px]">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs md:text-base text-main font-semibold">{title}</span>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
};
export default TicketRevenue;
