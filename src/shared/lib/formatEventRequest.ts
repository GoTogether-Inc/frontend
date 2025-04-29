import { BaseEvent } from '../types/baseEventType';

export const formatEventRequest = (data: any): BaseEvent => ({
  title: data.title,
  startDate: data.startDate,
  endDate: data.endDate,
  startTime: data.startTime,
  endTime: data.endTime,
  bannerImageUrl: data.bannerImageUrl,
  description: data.description,
  referenceLinks: data.referenceLinks,
  onlineType: data.onlineType,
  address: data.address,
  location: data.location,
  category: data.category,
  hashtags: data.hashtags,
  organizerEmail: data.organizerEmail,
  organizerPhoneNumber: data.organizerPhoneNumber,
});
