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
