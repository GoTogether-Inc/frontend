import { useNavigate } from 'react-router-dom';

const PaymentCard = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const cardData = [
    { id: 1, name: 'Card 1', color: 'bg-blue-500' },
    { id: 2, name: 'Card 2', color: 'bg-red-500' },
    { id: 3, name: 'Card 3', color: 'bg-green-500' },
    { id: 4, name: 'Card 4', color: 'bg-yellow-500' },
  ];

  return (
    <div className="flex flex-col px-5 mt-12 md:mt-16 gap-6">
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
          <button
            className="flex items-center justify-center w-[60%] h-full text-white text-2xl snap-center shrink-0 rounded-xl bg-gray-400 mr-40"
            onClick={() => navigate('/payment/cardRegister')}
          >
            + 카드 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
