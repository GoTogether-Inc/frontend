import firstPage from '../../../public/assets/banners/1.png';
import secondPage from '../../../public/assets/banners/2.png';
import thirdPage from '../../../public/assets/banners/3.png';

export interface trendingEventsData {
  id: number;
  img: string;
  eventTitle: string;
  dDay: string;
  host: string;
  eventDate: string;
  location: string;
  hashtags: string[];
}

export const latestEvents = [
  {
    img: firstPage,
    eventTitle: '1인프콘 2024 - INFCON 2024',
    dDay: 'D-1',
    host: '인프런',
    eventDate: '2025년 1월 13일',
    location: '올림픽 공원',
    hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
  },
  {
    img: secondPage,
    eventTitle: '2인프콘 2024 - INFCON 2024',
    dDay: 'D-1',
    host: '인프런',
    eventDate: '2025년 1월 13일',
    location: '올림픽 공원',
    hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
  },
  {
    img: thirdPage,
    eventTitle: '3인프콘 2024 - INFCON 2024',
    dDay: 'D-1',
    host: '인프런',
    eventDate: '2025년 1월 13일',
    location: '올림픽 공원',
    hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
  },
];

export const trendingEvents = [
  {
    id: 1,
    img: firstPage,
    eventTitle: 'Tech Conference 2025',
    dDay: 'D-3',
    host: 'Tech World',
    eventDate: '2025-01-20',
    location: 'Seoul, Korea',
    hashtags: ['#Tech', '#Innovation', '#Conference'],
  },
  {
    id: 1,
    img: secondPage,
    eventTitle: 'Startup Meetup',
    dDay: 'D-2',
    host: 'Startup Hub',
    eventDate: '2025-01-27',
    location: 'Busan, Korea',
    hashtags: ['#Startup', '#Networking', '#Innovation'],
  },
  {
    id: 2,
    img: thirdPage,
    eventTitle: 'AI Summit 2025',
    dDay: 'D-5',
    host: 'AI Korea',
    eventDate: '2025-01-22',
    location: 'Daegu, Korea',
    hashtags: ['#AI', '#MachineLearning', '#Tech'],
  },
  {
    id: 2,
    img: firstPage,
    eventTitle: 'Developer Festival',
    dDay: 'D-7',
    host: 'Dev Korea',
    eventDate: '2025-02-01',
    location: 'Incheon, Korea',
    hashtags: ['#Developer', '#Coding', '#Festival'],
  },
  {
    id: 3,
    img: secondPage,
    eventTitle: 'Developer Festival',
    dDay: 'D-7',
    host: 'Dev Korea',
    eventDate: '2025-02-01',
    location: 'Incheon, Korea',
    hashtags: ['#Developer', '#Coding', '#Festival'],
  },
  {
    id: 4,
    img: thirdPage,
    eventTitle: 'Developer Festival',
    dDay: 'D-7',
    host: 'Dev Korea',
    eventDate: '2025-02-01',
    location: 'Incheon, Korea',
    hashtags: ['#Developer', '#Coding', '#Festival'],
  },
];

export const closingSoonEvents = [
  {
    img: firstPage,
    eventTitle: '1커뮤니티 네트워킹 - Dev MeetUp 2024',
    dDay: 'D-6',
    host: 'Dev 커뮤니티',
    eventDate: '2025년 1월 12일',
    location: '판교 스타트업 캠퍼스',
    hashtags: ['#네트워킹', '#개발자', '#스타트업', '#기술교류'],
  },
  {
    img: secondPage,
    eventTitle: '2커뮤니티 네트워킹 - Dev MeetUp 2024',
    dDay: 'D-6',
    host: 'Dev 커뮤니티',
    eventDate: '2025년 1월 12일',
    location: '판교 스타트업 캠퍼스',
    hashtags: ['#네트워킹', '#개발자', '#스타트업', '#기술교류'],
  },
  {
    img: thirdPage,
    eventTitle: '3커뮤니티 네트워킹 - Dev MeetUp 2024',
    dDay: 'D-6',
    host: 'Dev 커뮤니티',
    eventDate: '2025년 1월 12일',
    location: '판교 스타트업 캠퍼스',
    hashtags: ['#네트워킹', '#개발자', '#스타트업', '#기술교류'],
  },
];
