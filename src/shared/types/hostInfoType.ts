import phone from '../../../public/assets/event-manage/details/Phone.svg';
import email from '../../../public/assets/event-manage/details/Email.svg';

export interface hostInfoData {
  id: number;
  name: string;
  description: string;
  phoneImg: string;
  phone: string;
  emailImg?: string;
  email?: string;
}

export const hostInfo: hostInfoData[] = [
  {
    id: 1,
    name: '고예진',
    description: '먹는거에 진심인 사람들이 모여 숨겨진 맛집을 찾아다니는 모임입니다.',
    phoneImg: phone,
    phone: '010-1234-5678',
    emailImg: email,
    email: 'qwer@naver.com',
  },
  {
    id: 2,
    name: '백유진',
    description: '여행을 좋아하는 사람들이 모여 새로운 모험을 떠나는 그룹입니다.',
    phoneImg: phone,
    phone: '010-1234-5678',
    emailImg: email,
    email: 'qwer@naver.com',
  },
  {
    id: 3,
    name: '조히은',
    description: '책을 좋아하는 사람들이 함께 모여 독서를 즐기는 커뮤니티입니다.',
    phoneImg: phone,
    phone: '010-1234-5678',
    emailImg: email,
    email: 'qwer@naver.com',
  },
  {
    id: 4,
    name: '민정준',
    description: '먹는거에 진심인 사람들이 모여 숨겨진 맛집을 찾아다니는 모임입니다.',
    phoneImg: phone,
    phone: '010-1234-5678',
    emailImg: email,
    email: 'qwer@naver.com',
  },
  {
    id: 5,
    name: '백유진',
    description: '여행을 좋아하는 사람들이 모여 새로운 모험을 떠나는 그룹입니다.',
    phoneImg: phone,
    phone: '010-1234-5678',
    emailImg: email,
    email: 'qwer@naver.com',
  },
  {
    id: 6,
    name: '조히은',
    description: '책을 좋아하는 사람들이 함께 모여 독서를 즐기는 커뮤니티입니다.',
    phoneImg: phone,
    phone: '010-1234-5678',
    emailImg: email,
    email: 'qwer@naver.com',
  },
];
