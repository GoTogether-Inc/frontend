const EventRegisterLayout = () => {
  return (
    <div className="h-screen bg-white relative">
      {/* 헤더 영역 */}

      {/* 레이아웃 내용 */}
      <div className="relative h-40 md:h-44 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[60px]">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(100%-8vh)] w-[85%] min-h-[85vh] bg-white rounded-[20px]" />
      </div>
    </div>
  );
};
export default EventRegisterLayout;
