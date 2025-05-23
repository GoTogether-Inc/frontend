import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTicketOptions } from '../api/ticketOption';
import { useTicketOption } from '../model/TicketOptionContext';

export const useTicketOptionQuery = () => {
  const { eventId } = useParams();
  const { setOptions } = useTicketOption();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tiekctOptions', eventId],
    queryFn: () => getTicketOptions(Number(eventId)),
    enabled: !!eventId,
  });

  useEffect(() => {
    if (data?.result) {
      setOptions(Array.isArray(data.result) ? data.result : [data.result]);
    }
  }, [data, setOptions]);

  return { isLoading, isError };
};
