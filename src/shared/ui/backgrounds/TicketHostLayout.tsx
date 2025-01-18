interface TicketHostLayoutProps {
  image: string;
  children: React.ReactNode;
}

const TicketHostLayout = ({ image, children }: TicketHostLayoutProps) => {
  return (
    <div className="h-screen bg-white relative">
      {/* 레이아웃 내용 */}
      <div className="relative top-0 h-32 md:h-36 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px]">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(100%-50%)] w-32 h-32 md:w-36 md:h-36 bg-white rounded-full">
          <img
            src={image}
            alt="image"
            className="w-20 h-20 md:w-24 md:h-24 object-cover absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      {children}
    </div>
  );
};
export default TicketHostLayout;
