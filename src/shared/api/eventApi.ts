import { axiosClient } from '../types/api/http-client';
import { EventRequest, EventNormalResponse, EventDetailResponse, EventResponse } from '../types/api/event';

export type EventTag = 'current' | 'popular' | 'deadline';
export type EventCategory = 'DEVELOPMENT_STUDY' | 'NETWORKING' | 'HACKATHON' | 'CONFERENCE';

interface EventParams {
  page?: number;
  size?: number;
}

export const eventApi = {
  // 태그별 이벤트 목록 조회 (최신, 인기, 마감 / 기본 정보)
  getEventByTag: async (tag: EventTag, params: EventParams = { page: 0, size: 10 }): Promise<EventNormalResponse> => {
    const response = await axiosClient.get<EventNormalResponse>(
      `/events?tags=${tag}&page=${params.page}&size=${params.size}`
    );
    return response.data;
  },

  // 카테고리별 이벤트 목록 조회 (개발, 네트워킹, 해커톤, 컨퍼런스)
  getEventByCategory: async (
    category: EventCategory,
    params: EventParams = { page: 0, size: 10 }
  ): Promise<EventNormalResponse> => {
    const response = await axiosClient.get<EventNormalResponse>(
      `/events/category?category=${category}&page=${params.page}&size=${params.size}`
    );
    return response.data;
  },

  // 이벤트 검색 (기본 정보)
  searchEvents: async (keyword: string, params: EventParams = { page: 0, size: 10 }): Promise<EventNormalResponse> => {
    const response = await axiosClient.get<EventNormalResponse>(
      `/events/search?keyword=${keyword}&page=${params.page}&size=${params.size}`
    );
    return response.data;
  },

  // 이벤트 상세 조회 (기본 정보 + 상세 정보)
  getEventById: async (eventId: number): Promise<EventDetailResponse> => {
    const response = await axiosClient.get<EventDetailResponse>(`/events/${eventId}`);
    return response.data;
  },

  // 이벤트 생성 (POST)
  createEvent: async (eventData: EventRequest): Promise<EventResponse<string>> => {
    const response = await axiosClient.post<EventResponse<string>>(`/events`, eventData);
    return response.data;
  },

  // 이벤트 수정 (PUT)
  updateEvent: async (eventId: number, eventData: EventRequest): Promise<EventResponse<string>> => {
    const response = await axiosClient.put<EventResponse<string>>(`/events/${eventId}`, eventData);
    return response.data;
  },

  // 이벤트 삭제 (DELETE)
  deleteEvent: async (eventId: number): Promise<EventResponse<string>> => {
    const response = await axiosClient.delete<EventResponse<string>>(`/events/${eventId}`);
    return response.data;
  },
};
