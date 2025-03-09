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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    initializeParticipants(participantsInfo);
  }, [initializeParticipants]);

  const participants = participantsInfo;
  const totalPages = Math.ceil(participants.length / itemsPerPage);

  const fieldMap: Record<string, 'name' | 'phone' | 'email'> = {
    '이름': 'name',
    '전화번호': 'phone',
    '이메일': 'email',
  };
  

  const renderSection = (title: string, key: keyof typeof participantsInfo[0]) => {
    const paginatedParticipants = participants.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return (
      <div className="bg-white p-4 flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center text-xs bg-white px-2 md:px-3 py-3">
          <p>{title}</p>
          <p>응답 {participants.length}개</p>
        </div>

        {paginatedParticipants.length === 0 ? (
          <p>응답이 없습니다.</p>
        ) : (
          paginatedParticipants.map((participant) => (
            <div className="flex justify-between text-xs bg-gray-100 shadow-sm px-2 md:px-3 py-3" key={participant.ticketNum}>
              <p>{participant[key]}</p>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div>
      {listType === 'query' && (
        <div className="bg-white p-4 flex flex-col gap-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="w-2/3">
              <DropDown
                options={['이름', '전화번호', '이메일']}
                selectedValue={{ name: '이름', phone: '전화번호', email: '이메일' }[selectedField]}
                onSelect={(value) => {
                  setSelectedField(fieldMap[value]);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-transparent disabled:opacity-50"
              >
                ＜
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-transparent disabled:opacity-50"
              >
                ＞
              </button>
            </div>
          </div>
        </div>
      )}

      {listType === 'query' && renderSection({ name: '이름', phone: '전화번호', email: '이메일' }[selectedField], selectedField)}
      {listType === 'summary' && (
        <>
          {renderSection('이름', 'name')}  
          {renderSection('전화번호', 'phone')} 
          {renderSection('이메일', 'email')}
        </>
      )}
      {listType === 'individual' && renderSection('이름', 'name')}
    </div>
  );
};

export default ResponsesList;
