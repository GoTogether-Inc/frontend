import axios from 'axios';
import { EventRequest, EventNormalResponse, EventDetailResponse, EventResponse } from '../types/api/event';

const BASE_URL = `http://localhost:8080/api/v1`;

export type EventTag = 'current' | 'popular' | 'deadline';
export type EventCategory = 'DEVELOPMENT_STUDY' | 'NETWORKING' | 'HACKATHON' | 'CONFERENCE';

interface EventParams {
  page?: number;
  size?: number;
}

export const eventApi = {
  // 태그별 이벤트 목록 조회 (최신, 인기, 마감 / 기본 정보)
  getEventByTag: async (tag: EventTag, params: EventParams = { page: 0, size: 10 }): Promise<EventNormalResponse> => {
    const response = await axios.get<EventNormalResponse>(
      `${BASE_URL}/events?tags=${tag}&page=${params.page}&size=${params.size}`
    );
    return response.data;
  },

  // 카테고리별 이벤트 목록 조회 (개발, 네트워킹, 해커톤, 컨퍼런스)
  getEventByCategory: async (
    category: EventCategory,
    params: EventParams = { page: 0, size: 10 }
  ): Promise<EventNormalResponse> => {
    const response = await axios.get<EventNormalResponse>(
      `${BASE_URL}/events/category?category=${category}&page=${params.page}&size=${params.size}`
    );
    return response.data;
  },

  // 이벤트 검색 (기본 정보)
  searchEvents: async (keyword: string, params: EventParams = { page: 0, size: 10 }): Promise<EventNormalResponse> => {
    const response = await axios.get<EventNormalResponse>(
      `${BASE_URL}/events/search?keyword=${keyword}&page=${params.page}&size=${params.size}`
    );
    return response.data;
  },

  // 이벤트 상세 조회 (기본 정보 + 상세 정보)
  getEventById: async (eventId: number): Promise<EventDetailResponse> => {
    const response = await axios.get<EventDetailResponse>(`${BASE_URL}/events/${eventId}`);
    return response.data;
  },

  // 이벤트 생성 (POST)
  createEvent: async (eventData: EventRequest): Promise<EventResponse<string>> => {
    const response = await axios.post<EventResponse<string>>(`${BASE_URL}/events`, eventData, {
      headers: {
        Authorization: 'ACCESS_TOKEN',
      },
    });
    return response.data;
  },

  // 이벤트 수정 (PUT)
  updateEvent: async (eventId: number, eventData: EventRequest): Promise<EventResponse<string>> => {
    const response = await axios.put<EventResponse<string>>(`${BASE_URL}/events/${eventId}`, eventData, {
      headers: {
        Authorization: 'ACCESS_TOKEN',
      },
    });
    return response.data;
  },

  // 이벤트 삭제 (DELETE)
  deleteEvent: async (eventId: number): Promise<EventResponse<string>> => {
    const response = await axios.delete<EventResponse<string>>(`${BASE_URL}/events/${eventId}`, {
      headers: {
        Authorization: 'ACCESS_TOKEN',
      },
    });
    return response.data;
  },
};
