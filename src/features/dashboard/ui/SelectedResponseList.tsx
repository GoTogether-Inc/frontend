import { useResponseStore } from '../model/ResponseStore';
import UnderlineTextField from '../../../../design-system/ui/textFields/UnderlineTextField';
import OptionSection from './OptionSection';
import { options } from '../../../shared/types/responseType';

interface SelectedResponseListProps {
    currentIndex: number;
    itemsPerPage: number;
}
interface Response {
    id: number;
    name: string;
    grade: string;
    num: string;
    phone: string;
    email: string;
}

const SelectedResponseList = ({ currentIndex, itemsPerPage }: SelectedResponseListProps) => {
    const { selectedResponse } = useResponseStore();

    const fields = [
        { label: '이름', value: 'name', placeholder: '이름' },
        { label: '학년', value: 'grade', placeholder: '학년' },
        { label: '학번', value: 'num', placeholder: '학번' },
        { label: '전화번호', value: 'phone', placeholder: '전화번호' },
        { label: '이메일', value: 'email', placeholder: '이메일' },
    ];

    return (
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
            {selectedResponse.length > 0 ? (
                selectedResponse.slice(currentIndex, currentIndex + itemsPerPage).map((response) => (
                    <div className="p-4" key={response.id}>
                        {fields.map(({ label, value, placeholder }) => (
                            <UnderlineTextField
                                key={value}
                                label={label}
                                value={response[value as keyof Response]}
                                onChange={() => { }}
                                placeholder={placeholder}
                                errorMessage={''}
                                className="mb-4"
                            />
                        ))}
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
