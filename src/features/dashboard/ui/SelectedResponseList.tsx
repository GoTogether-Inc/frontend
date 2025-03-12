import { useResponseStore } from '../model/ResponseStore';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import OptionSection from './OptionSection';
import { options } from '../../../shared/types/responseType';

interface SelectedResponseListProps {
    currentIndex: number;
    itemsPerPage: number;
}

const SelectedResponseList = ({ currentIndex, itemsPerPage }: SelectedResponseListProps) => {
    const { selectedResponse } = useResponseStore();

    return (
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
            {selectedResponse.length > 0 ? (
                selectedResponse.slice(currentIndex, currentIndex + itemsPerPage).map((response) => (
                    <div className="p-4" key={response.id}>
                        <UnderlineTextField
                            label="이름"
                            value={response.name}
                            onChange={() => {}}
                            placeholder="이름"
                            errorMessage={''}
                            className="mb-4"
                        />
                        <UnderlineTextField
                            label="학년"
                            value={response.grade}
                            onChange={() => {}}
                            placeholder="학년"
                            errorMessage={''}
                            className="mb-4"
                        />
                        <UnderlineTextField
                            label="학번"
                            value={response.num}
                            onChange={() => {}}
                            placeholder="학번"
                            errorMessage={''}
                            className="mb-4"
                        />
                        <UnderlineTextField
                            label="전화번호"
                            value={response.phone}
                            onChange={() => {}}
                            placeholder="전화번호"
                            errorMessage={''}
                            className="mb-4"
                        />
                        <UnderlineTextField
                            label="이메일"
                            value={response.email}
                            onChange={() => {}}
                            placeholder="이메일"
                            errorMessage={''}
                            className="mb-4"
                        />
                        <OptionSection responses={[response]} options={options} />
                    </div>
                ))
            ) : (
                <p>선택된 응답자가 없습니다.</p>
            )}
        </div>
    );
};

export default SelectedResponseList;
