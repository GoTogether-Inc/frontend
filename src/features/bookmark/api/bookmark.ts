import { axiosClient } from "../../../shared/types/api/http-client"
import { BookmarkResponse } from "../model/bookmarkInformation";

export const readBookmark = async (): Promise<BookmarkResponse[]> => {
    const response = await axiosClient.get<{result:BookmarkResponse[]}>('/events/{eventId}/bookmark');
    return response.data.result;
}

export const createBookmark = async (eventId: number) => {
    const response = await axiosClient.post(`/events/${eventId}/bookmark`);
    return response.data;
}

export const deleteBookmark = async (eventId: number, bookmarkId: number) => {
    const response = await axiosClient.delete(`/events/${eventId}/bookmark/${bookmarkId}`);
    return response.data;
}
