import AddButton from '../../../../public/assets/AddBtn.svg';

const HostSelectionPage = () => {
  return (
    <div className="flex justify-start items-center w-full px-5 py-2 md:py-10">
      <div className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 bg-gray2 rounded-[4px]">
        <img src={AddButton} alt="추가 버튼" className="w-6 h-6 md:w-7 md:h-7" />
      </div>
      <span className="font-bold text-base md:text-xl ml-4">채널 새로 만들기</span>
    </div>
  );
};

export default HostSelectionPage;
