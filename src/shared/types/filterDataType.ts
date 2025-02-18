import { trendingEventsData } from '../../shared/types/eventCardType';
import { hostInfoData } from '../../shared/types/hostInfoType';
import firstPage from '../../../public/assets/banners/1.png';
import secondPage from '../../../public/assets/banners/2.png';
import thirdPage from '../../../public/assets/banners/3.png';

export interface FilterDataType {
  Events: trendingEventsData[];
  Host: hostInfoData[];
}

export const FilterMockData: FilterDataType = {
  Events: [
    {
      id: 1,
      img: firstPage,
      eventTitle: '1인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
    {
      id: 2,
      img: secondPage,
      eventTitle: '2인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
    {
      id: 3,
      img: thirdPage,
      eventTitle: '3인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
    {
      id: 4,
      img: firstPage,
      eventTitle: '1인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
    {
      id: 5,
      img: secondPage,
      eventTitle: '2인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
    {
      id: 6,
      img: thirdPage,
      eventTitle: '3인프콘 2024 - INFCON 2024',
      dDay: 'D-1',
      host: '인프런',
      eventDate: '2025년 1월 13일',
      location: '올림픽 공원',
      hashtags: ['#IT', '#개발자', '#컨퍼런스', '#교육'],
    },
  ],
  Host: [
    { id: 1, name: 'Techeer', description: '먹는거에 진심인 사람들이 모여 숨겨진 맛집을 찾아다니는 모임입니다.' },
    { id: 2, name: 'Techeer', description: '먹는거에 진심인 사람들이 모여 숨겨진 맛집을 찾아다니는 모임입니다.' },
    { id: 3, name: 'Techeer', description: '먹는거에 진심인 사람들이 모여 숨겨진 맛집을 찾아다니는 모임입니다.' },
    { id: 4, name: 'Techeer', description: '먹는거에 진심인 사람들이 모여 숨겨진 맛집을 찾아다니는 모임입니다.' },
  ],
};
