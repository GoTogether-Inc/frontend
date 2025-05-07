import { useQuery } from "@tanstack/react-query"
import { BookmarkResponse } from "./bookmarkInformation"
import { readBookmark } from "../api/bookmark"

export const useBookmarks = () => {
    return useQuery<BookmarkResponse[]>({
        queryKey: ['bookmarks'],
        queryFn: readBookmark,
    })
}