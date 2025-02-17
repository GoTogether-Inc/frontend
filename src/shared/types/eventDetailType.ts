import banner1 from '../../../public/assets/banners/1.png';
import people from '../../../public/assets/event-manage/details/People.svg';
import date from '../../../public/assets/event-manage/details/Date.svg';
import time from '../../../public/assets/event-manage/details/Time.svg';
import location from '../../../public/assets/event-manage/details/Location.svg';

export interface eventDetailData {
  id: number;
  banner: string;
  title: string;
  participantsImg: string;
  participants: number;
  dateImg: string;
  date: string;
  timeImg: string;
  time: string;
  locationImg: string;
  location: string;
  detail: string;
}

export const eventData: eventDetailData[] = [
  {
    id: 1,
    banner: banner1,
    title: '우아콘 - WOOWACON 2024',
    participantsImg: people,
    participants: 170,
    dateImg: date,
    date: '2024-10-24 ~ 2024-10-25',
    timeImg: time,
    time: '09:00 - 18:00',
    locationImg: location,
    location: '서울특별시 강남구 테헤란로 123',
    detail:
      '건물 입장시 Gate B를 이용해주세요 다른 입구는 업무공간이라 입장이 불가합니다. Google I/O Extended Pangyo 2024년 7월 4일 (목요일) 오후7시, Google I/O Extended Pangyo가 돌아옵니다! 주제는 AI 에서 부터 I/O 후기까지! 다양한 주제의 세션을 듣고, 다른 개발자들과 네트워크 할 수 있는 시간을 갖고 아이디어와 에너지를 받아가세요! 이번 행사의 컨셉은 Californian(캘리포니안)으로, 무더운 더위를 날려버릴 시원한 음료, 맥주와 굿즈가 준비되어 있습니다. 저녁을 못드시고 오시는 분들을 위해 간단한 다과를 준비해둘게요!',
  },
];
