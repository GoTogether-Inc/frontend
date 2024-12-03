type DashboardLayoutProps = {
  bgColor: string;
};

const DashboardLayout = ({ bgColor }: DashboardLayoutProps) => {
  return (
    <div className="h-screen bg-white relative">
      {/* 헤더 영역 */}

      {/* 레이아웃 내용 */}
      <div className="relative top-0 h-28 md:h-32 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)]">
        <div className={`absolute top-[calc(100%-2vh)] w-full h-screen ${bgColor} rounded-[20px]`} />
      </div>
    </div>
  );
};
export default DashboardLayout;
