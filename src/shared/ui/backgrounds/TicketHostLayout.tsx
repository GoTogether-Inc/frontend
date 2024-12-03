const TicketHostLayout = () => {
  return (
    <div className="h-screen bg-white relative">
      {/* 헤더 영역 */}

      {/* 레이아웃 내용 */}
      <div className="relative top-0 h-32 md:h-36 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px]">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(100%-50%)] w-32 h-32 md:w-36 md:h-36 bg-white rounded-full" />
      </div>
    </div>
  );
};
export default TicketHostLayout;
