import { axiosClient } from '../../../shared/types/api/http-client';
import { EventNormalResponse, EventDetailResponse } from '../model/eventResponse';
import { EventTag, EventCategory, PaginationParams } from '../model/eventMeta';
import { EventCreate, EventUpdate } from '../model/eventRequest';
import { EventResponse } from '../model/eventResponse';
import { EventItem } from '../model/event';
import { EventDetailRequest } from '../model/event';

export const eventDetail = async (dto: EventDetailRequest) => {
  const response = await axiosClient.get(`/events/${dto.eventId}`);
  return response.data;
};

// 이벤트 검색 (기본 정보)
export const searchEvents = async (keyword: string, { page, size }: PaginationParams): Promise<EventNormalResponse> => {
  const response = await axiosClient.get<EventNormalResponse>(
    `/events/search?keyword=${keyword}&page=${page}&size=${size}`
  );
  return response.data;
};

// 전체 이벤트 목록 조회 (무한 스크롤)
export const getAllEventsInfinite = async ({
  page,
  size,
  tag,
}: PaginationParams & { tag?: EventTag }): Promise<{ items: EventItem[]; hasNextPage: boolean }> => {
  const response = await axiosClient.get<EventNormalResponse>(
    `/events${tag ? `?tags=${tag}` : ''}${tag ? '&' : '?'}page=${page}&size=${size}`
  );

  return {
    items: response.data.result,
    hasNextPage: response.data.result.length === size,
  };
};

// 태그별 이벤트 목록 조회 (최신, 인기, 마감 / 기본 정보)
export const getEventByTag = async (tag: EventTag, { page, size }: PaginationParams): Promise<EventNormalResponse> => {
  const response = await axiosClient.get<EventNormalResponse>(`/events?tags=${tag}&page=${page}&size=${size}`);
  return response.data;
};

// 카테고리별 이벤트 목록 조회 (개발, 네트워킹, 해커톤, 컨퍼런스)
export const getEventByCategory = async (
  category: EventCategory,
  { page, size }: PaginationParams
): Promise<EventNormalResponse> => {
  const response = await axiosClient.get<EventNormalResponse>(
    `/events/category?category=${category}&page=${page}&size=${size}`
  );
  return response.data;
};

// 이벤트 상세 조회 (기본 정보 + 상세 정보)
export const getEventById = async (eventId: number): Promise<EventDetailResponse> => {
  const response = await axiosClient.get<EventDetailResponse>(`/events/${eventId}`);
  return response.data;
};

// 이벤트 생성 (POST)
export const createEvent = async (eventData: EventCreate): Promise<EventResponse<string>> => {
  const response = await axiosClient.post<EventResponse<string>>(`/events`, eventData);
  return response.data;
};

// 이벤트 수정 (PUT)
export const updateEvent = async (eventId: number, eventData: EventUpdate): Promise<EventResponse<string>> => {
  const response = await axiosClient.put<EventResponse<string>>(`/events/${eventId}`, eventData);
  return response.data;
};

// 이벤트 삭제 (DELETE)
export const deleteEvent = async (eventId: number): Promise<EventResponse<string>> => {
  const response = await axiosClient.delete<EventResponse<string>>(`/events/${eventId}`);
  return response.data;
};
