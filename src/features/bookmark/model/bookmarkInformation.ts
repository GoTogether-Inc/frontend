export interface BookmarkResponse {
    id: number;
    bannerImageUrl: string;
    title: string;
    hostChannelName: string;
    startDate: string;
    address: string;
    onlineType: 'ONLINE' | 'OFFLINE';
    hashtags: string[];
    remainDays: string;
}