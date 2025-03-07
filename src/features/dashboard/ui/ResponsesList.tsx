import { useEffect, useState } from 'react';
import { participantsInfo } from '../../../shared/types/participantInfoType';
import { useParticipantStore } from '../model/ParticipantStore';
import DropDown from '../../../shared/ui/DropDown';

interface ResponsesListProps {
  listType: 'summary' | 'query' | 'individual';
}

const ResponsesList = ({ listType }: ResponsesListProps) => {
  const { initializeParticipants } = useParticipantStore();
  const [selectedField, setSelectedField] = useState<'name' | 'phone' | 'email'>('name');

  useEffect(() => {
    initializeParticipants(participantsInfo);
  }, [initializeParticipants]);

  const participants = participantsInfo;

  const renderSection = (title: string, key: keyof typeof participantsInfo[0], isSummary: boolean = false) => (
    <div className="bg-white p-4 flex flex-col gap-2 mb-4">
      <div className="flex justify-between text-xs bg-white px-2 md:px-3 py-3">
        <p>{title}</p>
        <p>응답 {participants.length}개</p>
      </div>
      {participants.length === 0 ? (
        <p>응답이 없습니다.</p>
      ) : (
        (isSummary ? participants.slice(0, 4) : participants).map(participant => (
          <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3" key={participant.ticketNum}>
            <p>{participant[key]}</p>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      {listType === 'query' && (
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
          <DropDown
            options={['이름', '전화번호', '이메일']}
            selectedValue={
              selectedField === 'name' ? '이름' : selectedField === 'phone' ? '전화번호' : '이메일'
            }
            onSelect={(value) => {
              if (value === '이름') setSelectedField('name');
              if (value === '전화번호') setSelectedField('phone');
              if (value === '이메일') setSelectedField('email');
            }}
          />
          
        </div>
      )}

      {listType === 'query' && renderSection(
        selectedField === 'name' ? '이름' : selectedField === 'phone' ? '전화번호' : '이메일', 
        selectedField
      )}
      {listType === 'summary' && (
        <>
          {renderSection('이름', 'name', true)}  
          {renderSection('전화번호', 'phone', true)} 
          {renderSection('이메일', 'email', true)}
        </>
      )}
      {listType === 'individual' && renderSection('이름', 'name')}
    </div>
  );
};

export default ResponsesList;
