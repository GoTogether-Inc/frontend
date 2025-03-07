import { useState } from 'react';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import ResponsesFilterBar from '../../../widgets/dashboard/ui/ResponsesFilterBar';
import ResponsesList from '../../../features/dashboard/ui/ResponsesList';
import { participantsInfo } from '../../../shared/types/participantInfoType';

const ResponsesManagementPage = () => {
    const [listType, setListType] = useState<'summary' | 'query' | 'individual'>('summary');
    return(
        <DashboardLayout centerContent="WOOACON 2024" pinkBg={true}>
            <div className="flex flex-col px-2 md:px-4">
                <h1 className="text-left font-semibold text-2xl py-4 md:py-6 pl-4">응답 {participantsInfo.length}개</h1>
                <div className="flex justify-center">
                    <ResponsesFilterBar
                        listType={listType}
                        setListType={setListType}
                    />
                </div>
                <ResponsesList listType={listType}  />
            </div>
        </DashboardLayout>
    );
};
export default ResponsesManagementPage;