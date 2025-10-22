import { Theme } from '../types';

/**
 * Corporate 테마
 * 기업용 공식 프레젠테이션을 위한 안정적인 색상
 */
export const corporateTheme: Theme = {
  name: 'Corporate',
  colors: {
    primary: '#004B87', // 코퍼레이트 블루
    secondary: '#6C8EBF', // 라이트 블루
    accent: '#D6A51A', // 골드
    text: {
      dark: '#1C1C1C', // 거의 블랙
      light: '#FFFFFF', // 화이트
    },
    background: {
      main: '#FFFFFF', // 화이트
      alt: '#EBF1F5', // 연한 블루 그레이
    },
    chart: [
      '#004B87',
      '#6C8EBF',
      '#D6A51A',
      '#7C9AB5',
      '#A5B8C9',
      '#C5D3DF',
    ],
  },
  fonts: {
    heading: {
      face: 'Calibri',
      size: 32,
      bold: true,
    },
    body: {
      face: 'Calibri',
      size: 16,
    },
    emphasis: {
      face: 'Calibri',
      size: 18,
      bold: true,
    },
    code: {
      face: 'Consolas',
      size: 13,
    },
  },
  spacing: {
    margin: {
      top: 0.5,
      right: 0.5,
      bottom: 0.5,
      left: 0.5,
    },
    gap: {
      small: 0.12,
      medium: 0.25,
      large: 0.5,
    },
  },
};
