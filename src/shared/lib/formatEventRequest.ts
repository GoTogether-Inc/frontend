import { BaseEvent } from '../types/baseEventType';

export const formatEventRequest = (data: Partial<BaseEvent>): BaseEvent => ({
  title: data.title || '',
  startDate: data.startDate || '',
  endDate: data.endDate || '',
  startTime: data.startTime || '',
  endTime: data.endTime || '',
  bannerImageUrl: data.bannerImageUrl || '',
  description: data.description || '',
  referenceLinks: data.referenceLinks || [],
  onlineType: data.onlineType || 'ONLINE',
  address: data.address || '',
  location: data.location || { lat: 0, lng: 0 },
  category: data.category || 'DEVELOPMENT_STUDY',
  hashtags: data.hashtags || [],
  organizerEmail: data.organizerEmail || '',
  organizerPhoneNumber: data.organizerPhoneNumber || '',
});
