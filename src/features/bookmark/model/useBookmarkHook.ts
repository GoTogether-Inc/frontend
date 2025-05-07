import { useMutation, useQuery} from "@tanstack/react-query"
import { BookmarkResponse } from "./bookmarkInformation"
import { createBookmark, deleteBookmark, readBookmark } from "../api/bookmark"

export const useBookmarks = () => {
    return useQuery<BookmarkResponse[]>({
        queryKey: ['bookmarks'],
        queryFn: readBookmark,
    })
}

export const useCreateBookmark = () => {
    return useMutation({
        mutationFn: createBookmark,
    })
}
export const useDeleteBookmark = () => {
    return useMutation({
        mutationFn: (params: { eventId: number; bookmarkId: number }) =>
            deleteBookmark(params.eventId, params.bookmarkId),
    });
}