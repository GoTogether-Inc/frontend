import firstPage from '../../../public/assets/banners/1.png';
import secondPage from '../../../public/assets/banners/2.png';
import thirdPage from '../../../public/assets/banners/3.png';

export interface trendingEventsData {
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
    img: firstPage,
    eventTitle: 'Tech Conference 2025',
    dDay: 'D-3',
    host: 'Tech World',
    eventDate: '2025-01-20',
    location: 'Seoul, Korea',
    hashtags: ['#Tech', '#Innovation', '#Conference'],
  },
  {
    img: secondPage,
    eventTitle: 'Startup Meetup',
    dDay: 'D-10',
    host: 'Startup Hub',
    eventDate: '2025-01-27',
    location: 'Busan, Korea',
    hashtags: ['#Startup', '#Networking', '#Innovation'],
  },
  {
    img: thirdPage,
    eventTitle: 'AI Summit 2025',
    dDay: 'D-5',
    host: 'AI Korea',
    eventDate: '2025-01-22',
    location: 'Daegu, Korea',
    hashtags: ['#AI', '#MachineLearning', '#Tech'],
  },
  {
    img: firstPage,
    eventTitle: 'Developer Festival',
    dDay: 'D-15',
    host: 'Dev Korea',
    eventDate: '2025-02-01',
    location: 'Incheon, Korea',
    hashtags: ['#Developer', '#Coding', '#Festival'],
  },
];
