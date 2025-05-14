import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { UpdateEventRequest } from '../model/event';
import { updateEventInfo } from '../api/event';
export const useUpdateEventHook = () => {
  const { id } = useParams();
  const eventId = Number(id);

  const mutation = useMutation({
    mutationFn: (dto: Partial<UpdateEventRequest>) => updateEventInfo(eventId, dto),
  });

  return mutation;
};
