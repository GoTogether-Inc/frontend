import Checkbox from "../../../../design-system/ui/Checkbox";
import { Order } from "../../ticket/model/ticketInformation";
import IconButton from '../../../../design-system/ui/buttons/IconButton';
import rightButton from '../../../../public/assets/main/RightButton.svg';
import leftButton from '../../../../public/assets/main/LeftButton.svg';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';

interface IndividualResponseViewerProps {
    orders: Order[];
    currentIndex: number;
    setCurrentIndex: (fn: (prev: number) => number) => void;
}

const IndividualResponseViewer = ({ orders, currentIndex, setCurrentIndex }: IndividualResponseViewerProps) => {
    const currentOrder = orders[currentIndex];

    // multiple
    const groupedAnswers = currentOrder.optionAnswers.reduce<Record<string, { optionType: string; answers: string[] }>>((acc, cur) => {
        if (!acc[cur.optionName]) {
            acc[cur.optionName] = { optionType: cur.optionType, answers: [] };
        }
        acc[cur.optionName].answers.push(cur.answer);
        return acc;
    }, {});

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, orders.length - 1));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    return (
        <div className="rounded p-4 space-y-4 ">
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold">응답 ID: {currentOrder.orderId}</p>
                <div className="flex items-center gap-2">
                    <IconButton
                        iconPath={<img src={leftButton} alt="왼쪽 버튼" />}
                        onClick={handlePrev}
                    />
                    <span>{currentIndex + 1} / {orders.length}</span>
                    <IconButton
                        iconPath={<img src={rightButton} alt="오른쪽 버튼" />}
                        onClick={handleNext}
                    />
                </div>
            </div>

            <div className="space-y-6">
                {Object.entries(groupedAnswers).map(([optionName, { optionType, answers }]) => (
                    <div key={optionName} className="border border-gray-300 rounded-md p-4 mb-4 bg-white shadow-sm">
                        <p className="font-semibold mb-2">{optionName}</p>
                        {optionType === 'TEXT' ? (
                            <div className="mb-4">
                                <p className="w-full border-b border-gray-300 py-2 px-1 text-sm font-semibold text-gray-800">
                                    {answers[0]}
                                </p>
                            </div>
                        ) : (
                            <ul className="space-y-1">
                                
                                {answers.map((ans, idx) => (
                                    <li key={idx}>
                                        <Checkbox
                                            label={ans}
                                            checked={true}
                                            onChange={() => { }}
                                            disabled={true}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default IndividualResponseViewer;