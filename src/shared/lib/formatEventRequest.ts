import { BaseEvent } from '../types/baseEventType';

export const formatEventRequest = (data: Partial<BaseEvent>): BaseEvent => ({
  title: data.title || '',
  startDate: data.startDate || '',
  endDate: data.endDate || '',
  bannerImageUrl: data.bannerImageUrl || '',
  description: data.description || '',
  referenceLinks: data.referenceLinks || [],
  onlineType: data.onlineType || 'ONLINE',
  address: data.address || '',
  detailAddress: data.detailAddress || '',
  locationLat: data.locationLat || 0,
  locationLng: data.locationLng || 0,
  category: data.category || 'DEVELOPMENT_STUDY',
  hashtags: data.hashtags || [],
  organizerEmail: data.organizerEmail || '',
  organizerPhoneNumber: data.organizerPhoneNumber || '',
});
