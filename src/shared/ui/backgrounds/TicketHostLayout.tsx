import Header from '../../../../design-system/ui/Header';

interface TicketHostLayoutProps {
  image: string;
  children: React.ReactNode;
  centerContent: string;
}

const TicketHostLayout = ({ image, children, centerContent }: TicketHostLayoutProps) => {
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className="relative">
      <div className="relative top-0 h-32 md:h-36 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px] z-10">
        {/* 헤더 */}
        <Header
          leftButtonLabel="<"
          leftButtonClassName="text-xl z-30"
          leftButtonClick={handleBackClick}
          centerContent={centerContent}
          color="white"
        />

        {/* 레이아웃 내용 */}
        <>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(100%-50%)] w-32 h-32 md:w-36 md:h-36 bg-white rounded-full">
            <img
              src={image}
              alt="image"
              className="w-16 h-16 md:w-20 md:h-20 object-cover absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(150%)] text-placeholderText text-center text-sm whitespace-nowrap">
            티켓을 누르면 입장을 위한 QR코드를 확인할 수 있습니다.
          </div>
        </>
      </div>
      {children}
    </div>
  );
};
export default TicketHostLayout;
