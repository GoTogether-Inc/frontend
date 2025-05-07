import { axiosClient } from '../../../shared/types/api/http-client';
import { EventDetailRequest } from '../model/event';
import { CategoryType, TagType } from '../../../shared/types/baseEventType';
import { ApiResponse } from '../../../shared/types/api/apiResponse';
import { EventItem, PaginationParams } from '../model/event';

export const eventDetail = async (dto: EventDetailRequest) => {
  const response = await axiosClient.get(`/events/${dto.eventId}`);
  return response.data.result;
};

// 이벤트 검색 (기본 정보)
export const searchEvents = async (keyword: string, { page, size }: PaginationParams): Promise<ApiResponse<EventItem[]>> => {
  const params = new URLSearchParams();

  params.append('keyword', keyword);
  params.append('page', page.toString());
  params.append('size', size.toString());

  const response = await axiosClient.get<ApiResponse<EventItem[]>>(`/events/search?${params.toString()}`);
  
  return response.data;
};

// 전체 이벤트 목록 조회 (무한 스크롤)
export const getAllEventsInfinite = async ({
  page,
  size,
  tag,
}: PaginationParams & { tag?: TagType }): Promise<{ items: EventItem[]; hasNextPage: boolean }> => {
  const response = await axiosClient.get<ApiResponse<EventItem[]>>(
    `/events${tag ? `?tags=${tag}` : ''}${tag ? '&' : '?'}page=${page}&size=${size}`
  );

  // ApiResponse의 result는 옵셔널 -> result?: T
  const items = response.data.result ?? [];

  return {
    items,
    hasNextPage: items.length === size,
  };
};

// 태그별 이벤트 목록 조회 (최신, 인기, 마감 / 기본 정보)
export const getEventByTag = async (tag: TagType, { page, size }: PaginationParams): Promise<EventItem[]> => {
  const response = await axiosClient.get<{ result: EventItem[] }>(`/events?tags=${tag}&page=${page}&size=${size}`);
  return response.data.result || [];
};

// 카테고리별 이벤트 목록 조회 (개발, 네트워킹, 해커톤, 컨퍼런스)
export const getEventByCategory = async (
  category: CategoryType,
  { page, size }: PaginationParams
): Promise<EventItem[]> => {
  const response = await axiosClient.get<EventItem[]>(
    `/events/category?category=${category}&page=${page}&size=${size}`
  );
  return response.data;
};

// 이벤트 삭제 (DELETE)
export const deleteEvent = async (eventId: number): Promise<ApiResponse<string>> => {
  const response = await axiosClient.delete<ApiResponse<string>>(`/events/${eventId}`);
  return response.data;
};
