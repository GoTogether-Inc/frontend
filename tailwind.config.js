/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 소스 파일 경로 설정
    './public/index.html',
    './design-system/**/*.{js,jsx,ts,tsx}', // custom-components 디렉토리
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      width: {
        90: '22.5rem',
      },
      fontFamily: {
        sans: ['Apple SD Gothic Neo', 'sans-self'],
        nexon: ['NEXON Lv1 Gothic OTF Bold', 'sans-serif'],
      },
      fontWeight: {
        thin: 100, // Thin
        extraLight: 200, // ExtraLight
        light: 300, // Light
        regular: 400, // Regular
        medium: 500, // Medium
        semibold: 600, // Semibold
        bold: 700, // Bold
        extrabold: 800, // ExtraBold
      },
      fontSize: {
        10: '10px',
      },
      colors: {
        main: '#FF5593', // 메인컬러
        mainDark: '#FF3680', // 메인컬러(다크)
        gradation: '#FF7577',
        dropdown: 'rgba(255, 85, 147, 0.05)', // 드롭다운 선택배경
        dashboardBg: '#FFFCFC', // 대시보드 배경
        text: '#000000', // 텍스트, 로그인과 구매하기 버튼, 메인 검색창 구분선
        placeholderText: '#A1A1A1', // 텍스트(플레이스홀더), 이벤트정보카드 라인, 라인(작성칸)
        deDayBg: 'rgba(254, 183, 128, 0.60)', // 디데이(배경)
        deDayText: '#F04444', // 디데이(글씨, 라인)
        deDayBgLight: 'rgba(209, 208, 208, 0.60)', // 디데이(배경)
        deDayTextDark: '#4F4F4F', // 디데이(글씨, 라인)
        disAbledText: '#bebebe', // 비활성화 버튼 텍스트
        gray1: '#F9F9F9', // 회색1
        gray2: '#F5F5F5', // 회색2
        gray3: '#EEEEEE', // 회색3
        gray4: '#D9D9D9', // 회색4
      },
    },
    screens: {
      sm: '350px', // 작은 화면
      md: '436px', // 중간 화면
      lg: '512px', // 큰 화면
    },
  },
  plugins: [],
};
