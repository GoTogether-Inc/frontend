import AvailableTicket from '../../../../public/assets/dashboard/ticket/Ticket(gray).svg';
import PersonIcon from '../../../../public/assets/dashboard/ticket/PersonIcon.svg';
import { motion } from "framer-motion";
import { useState } from 'react';
import { ReadTicketResponse } from '../../../features/ticket/model/ticketInformation';
import { useDeleteTicket } from '../../../features/ticket/hooks/useTicketHook';

const TicketItem = ({ ticket }: { ticket: ReadTicketResponse }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { mutate: handleDelete} = useDeleteTicket();
  return (
    <div className="relative overflow-hidden w-full mb-4">
      <motion.div
        className="flex items-center bg-gray-100 p-4 rounded-lg"
        drag="x"
        dragConstraints={{ left: -80, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          if (info.offset.x < -50) {
            setIsDragging(true);
          } else {
            setIsDragging(false);
          }
        }}
      >
        <div className="flex gap-5">
          <p className="font-bold">{ticket.ticketPrice > 0 ? "일반" : "무료"}</p>
          <p>{ticket.ticketName}</p>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col gap-1 text-gray-400 text-xs">
          <div className="flex gap-1 items-center justify-end">
            <img src={AvailableTicket} alt="남은 티켓" /> {ticket.availableQuantity}개 남음
          </div>
          <div className="flex gap-1 items-center justify-end">
            <img src={PersonIcon} alt="1인당 최대 구매량" /> 1인당 최대 2장
          </div>
        </div>
      </motion.div>

      {/* 삭제 버튼  */}
      <motion.button
        className="absolute right-0 top-0 bottom-0 bg-red-500 text-white rounded-lg px-4 flex items-center justify-center transition-transform"
        initial={{ x: '100%' }}
        animate={{ x: isDragging ? 0 : 'calc(100% + 1px)' }}
        transition={{ duration: 0 }}
        onClick={() => handleDelete(ticket.ticketId)}
      >
        삭제
      </motion.button>

    </div>
  );
};

export default TicketItem;
