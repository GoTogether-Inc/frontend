import { useNavigate } from 'react-router-dom';
import PlusButton from '../../../../public/assets/payment/PlusButton.svg';
import VerticalCardButton from '../../../../design-system/ui/buttons/VerticalCardButton';

const PaymentCard = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const cardData = [
    { id: 1, name: 'Card 1', color: 'bg-blue-500' },
    { id: 2, name: 'Card 2', color: 'bg-red-500' },
    { id: 3, name: 'Card 3', color: 'bg-green-500' },
    { id: 4, name: 'Card 4', color: 'bg-yellow-500' },
  ];

  return (
    <div className="flex flex-col px-6 md:px-8 mt-8 md:mt-10 gap-6">
      <h1 className="text-base md:text-xl font-semibold">{title}</h1>
      <div className="flex w-full h-32 md:h-40">
        <div className="flex w-full gap-4 overflow-x-scroll scrollbar-hide snap-x snap-mandatory items-center">
          {cardData.map((card, index) => (
            <div
              key={card.id}
              className={`flex items-center justify-center w-[60%] h-full text-white text-2xl snap-center shrink-0 rounded-xl ${
                card.color
              }  ${index === 0 ? 'ml-40' : ''}`}
            >
              {card.name}
            </div>
          ))}
          {/*  카드 추가 버튼  */}
          <div
            className={`flex flex-col items-center justify-center w-[60%] h-full border-2 border-dashed border-gray-400 rounded-xl p-6 text-center bg-white snap-center shrink-0 mr-40 gap-3 ${
              cardData.length == 0 ? 'ml-40' : ''
            }`}
          >
            <VerticalCardButton
              iconPath={
                <div className="w-full h-full flex justify-center">
                  <img src={PlusButton} alt="카드 등록 버튼" className="md:w-6 w-5" />
                </div>
              }
              label="카드 등록"
              onClick={() => navigate(`/payment/cardRegister`)}
              size="lg"
              className="font-semibold w-full h-full"
            />

            <p className="md:text-sm text-xs text-gray-500">
              계좌를 한번만 등록해놓으면 <br />
              매번 쉽게 결제할 수 있어요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
