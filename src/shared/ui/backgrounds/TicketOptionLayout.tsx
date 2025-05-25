import { useNavigate } from "react-router-dom";
import Header from "../../../../design-system/ui/Header";
import ticket from "../../../../public/assets/dashboard/ticket/Ticket(horizon).svg";
import Button from "../../../../design-system/ui/Button";
import active from "../../../../public/assets/payment/Active.svg";
import inactive from "../../../../public/assets/payment/Inactive.svg";
import { useTicketOptionStore } from "../../../features/dashboard/model/TicketOptionStore";
import { useOrderTicket } from "../../../features/ticket/hooks/useOrderHook";
import { OrderTicketRequest } from "../../../features/ticket/model/orderInformation";
import { useCreateTicketOptionAnswers, useTickets } from "../../../features/ticket/hooks/useTicketHook";

interface TicketOptionLayoutProps {
    children: React.ReactNode;
    ticketAmount: number;
    ticketInfo: OrderTicketRequest;
}

const TicketOptionLayout = ({ children, ticketAmount, ticketInfo }: TicketOptionLayoutProps) => {
    const navigate = useNavigate();
    const { currentPage, setCurrentPage, selectedOptions, resetOptions } = useTicketOptionStore();
    const centerContent = `티켓 옵션 선택 (${currentPage}/${ticketAmount})`;

    const { mutate: orderTickets } = useOrderTicket();
    const { data: ticketData } = useTickets(ticketInfo.eventId);
    const ticketObj = ticketData?.result.find(
        (ticket) => ticket.ticketId === ticketInfo.ticketId
    );
    const { mutate: submitAnswers } = useCreateTicketOptionAnswers();

    //페이지
    const pageIndicator = Array(ticketAmount).fill(" . ");
    pageIndicator[currentPage - 1] = " - ";

    //버튼 텍스트
    const isLastPage = currentPage === ticketAmount;
    const buttonText = isLastPage ? "결제하기" : "다음 티켓 옵션 선택하기";
    const handleNextPage = () => {
        if (isLastPage) {
            const sendAnswersByPage = async () => {
                for (const pageIndex of Object.keys(selectedOptions).sort((a, b) => Number(a) - Number(b))) {
                    const optionsForPage = selectedOptions[Number(pageIndex)];

                    for (const [optionIdStr, value] of Object.entries(optionsForPage)) {
                        const optionId = Number(optionIdStr);

                        if (typeof value === "string") {
                            submitAnswers({
                                ticketOptionId: optionId,
                                answerText: value,
                            });
                        } else if (typeof value === "number") {
                            submitAnswers({
                                ticketOptionId: optionId,
                                ticketOptionChoiceId: value,
                            });
                        } else if (Array.isArray(value)) {
                            for (const choiceId of value) {
                                submitAnswers({
                                    ticketOptionId: optionId,
                                    ticketOptionChoiceId: choiceId,
                                });
                            }
                        }
                    }
                }
            };

            sendAnswersByPage()
                .then(() => {
                    resetOptions();
                    orderTickets(ticketInfo, {
                        onSuccess: (response) => {
                            if (response.isSuccess && Array.isArray(response.result)) {
                                const orderIds = response.result;
                                navigate('/payment/ticket-confirm', {
                                    state: { orderIds, ...ticketInfo }
                                });
                            } else {
                                alert("주문 정보를 불러올 수 없습니다.");
                            }
                        },
                    });
                })
                .catch(() => {
                    alert("옵션 답변 전송 중 오류가 발생했습니다.");
                });
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="relative flex flex-col">
            {/* 헤더 영역 */}
            <div className="w-full h-28 md:h-36 bg-gradient-to-br from-[#FF5593] to-[rgb(255,117,119)] rounded-b-[20px] z-10">
                <Header
                    leftButtonLabel="<"
                    leftButtonClassName="text-2xl z-30 font-semibold"
                    leftButtonClick={() => navigate(-1)}
                    centerContent={centerContent}
                    color="white"
                />
                {ticketAmount > 1 && (
                    <div className="flex justify-center gap-2 mt-4 md:mt-12">
                        {Array.from({ length: ticketAmount }, (_, index) => (
                            <img
                                key={index}
                                src={index + 1 === currentPage ? active : inactive}
                                className="object-contain"
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* 티켓 정보 영역 */}
            <div className="flex flex-col justify-between w-[90%] h-36 md:h-40 bg-white rounded-md mt-8 mx-auto z-10 shadow-md px-6 md:px-8 py-5 md:py-6">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex gap-4">
                        <img src={ticket} alt="ticket logo" className="w-7" />
                        <div>
                            <p className="font-bold text-base md:text-lg">{ticketObj?.ticketName}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-xs md:text-sm">{ticketObj?.ticketDescription}</p>
                </div>
            </div>

      <div className="flex flex-col mt-8 mx-auto w-[85%]">
        <p className="font-bold text-sm md:text-base">추가 옵션</p>
        <p className="text-xs md:text-sm text-gray-500 mt-2">
          구매하는 티켓에 추가적으로 선택할 수 있는 옵션들이 있습니다.
        </p>
      </div>

      {/* 내용 영역 */}
      <div className="flex flex-col w-[85%] mx-auto mt-4">
        {children}
        <div className="flex flex-grow" />
        <div className="w-full p-6">
          <Button label={buttonText} onClick={handleNextPage} className="w-full h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default TicketOptionLayout;
