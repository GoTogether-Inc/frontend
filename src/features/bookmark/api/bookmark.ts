import { axiosClient } from "../../../shared/types/api/http-client"
import { BookmarkResponse } from "../model/bookmarkInformation";

export const readBookmark = async (): Promise<BookmarkResponse[]> => {
    const response = await axiosClient.get<{result:BookmarkResponse[]}>('/events/{eventId}/bookmark');
    return response.data.result;
}