import IndividualResponseViewer from "../../../../features/dashboard/ui/IndividualResponseViewer";
import { Order } from "../../../../features/ticket/model/ticketInformation";


interface OrderAnswerModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order;
}

const OrderAnswerModal = ({ isOpen, onClose, order }: OrderAnswerModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center w-full max-w-lg h-full mx-auto bg-black bg-opacity-30 z-30">
            <div className="relative flex flex-col w-[95%] px-4 py-4 gap-7 rounded-[5px] bg-white">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                <IndividualResponseViewer
                    orders={[order]}
                    currentIndex={0}
                    setCurrentIndex={() => { }}
                />
            </div>
        </div>
    );
};

export default OrderAnswerModal;
