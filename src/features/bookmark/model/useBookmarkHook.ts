import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BookmarkResponse } from "./bookmarkInformation"
import { createBookmark, deleteBookmark, readBookmark } from "../api/bookmark"

export const useBookmarks = () => {
    return useQuery<BookmarkResponse[]>({
        queryKey: ['bookmarks'],
        queryFn: readBookmark,
    })
}

export const useCreateBookmark = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBookmark,
        // Optimistic 
        onMutate: async (eventId: number) => {
            await queryClient.cancelQueries({ queryKey: ['eventDetail', eventId] });
            const previous = queryClient.getQueryData(['eventDetail', eventId]);

            queryClient.setQueryData(['eventDetail', eventId], (old: any) => ({
                ...old,
                bookmarked: true,
            }));

            return { previous };
        },
        onError: (_err, eventId, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['eventDetail', eventId], context.previous);
                alert("좋아요 등록에 실패했습니다. 잠시후 다시 시도해 주세요.");
            }
        },
        onSettled: (_data, _error, eventId) => {
            queryClient.invalidateQueries({ queryKey: ['eventDetail', eventId] });
        },
    })
}
export const useDeleteBookmark = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: { eventId: number; bookmarkId: number }) =>
            deleteBookmark(params.eventId, params.bookmarkId),
        // Optimistic 
        onMutate: async ({ eventId }) => {
            await queryClient.cancelQueries({ queryKey: ['eventDetail', eventId] });
            const previous = queryClient.getQueryData(['eventDetail', eventId]);

            queryClient.setQueryData(['eventDetail', eventId], (old: any) => ({
                ...old,
                bookmarked: false,
            }));

            return { previous };
        },
        onError: (_err, { eventId }, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['eventDetail', eventId], context.previous);
                alert("좋아요 삭제에 실패했습니다. 잠시후 다시 시도해 주세요.");
            }
        },
        onSettled: (_data, _error, { eventId }) => {
            queryClient.invalidateQueries({ queryKey: ['eventDetail', eventId] });
        },
    });
}