import { useEffect, useState } from 'react';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import ResponsesFilterBar from '../../../widgets/dashboard/ui/ResponsesFilterBar';
import ResponsesList from '../../../features/dashboard/ui/ResponsesList';
import { useResponseStore } from '../../../features/dashboard/model/ResponseStore';
import { responsesInfo } from '../../../shared/types/responseType';
import { useLocation } from 'react-router-dom';

const ResponsesManagementPage = () => {
    const [listType, setListType] = useState<'summary' | 'query' | 'individual'>('summary');
    const { response, setResponses, setItemsPerPage, setSelectedResponse } = useResponseStore();
    const location = useLocation();
    const { participantName, participantEmail } = location.state || {};
    useEffect(() => {
        setResponses(responsesInfo);
    }, [setResponses]);
    useEffect(() => {
        if (participantName) {
            setListType('individual');
            setSelectedResponse(participantName, participantEmail);
        }
    }, [participantName]);
    useEffect(() => {
        if (listType === 'summary') {
            setItemsPerPage(4);
        } else if (listType === 'query') {
            setItemsPerPage(10);
        } else {
            setItemsPerPage(1);
        }
    }, [listType]);
    return (
        <DashboardLayout centerContent="WOOACON 2024" pinkBg={true}>
            <div className="flex flex-col px-2 md:px-4">
                <h1 className="text-left font-semibold text-2xl py-4 md:py-6 pl-4">응답 {response.length}개</h1>
                <div className="flex justify-center">
                    <ResponsesFilterBar
                        listType={listType}
                        setListType={setListType}
                    />
                </div>
                <ResponsesList listType={listType} />
            </div>
        </DashboardLayout>
    );
};
export default ResponsesManagementPage;