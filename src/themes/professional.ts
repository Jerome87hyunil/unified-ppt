import { Theme } from '../types';

/**
 * Professional 테마
 * 비즈니스 프레젠테이션에 적합한 블루/그레이 계열
 */
export const professionalTheme: Theme = {
  name: 'Professional',
  colors: {
    primary: '#2E5090', // 진한 블루
    secondary: '#5B7FB8', // 중간 블루
    accent: '#F0A500', // 골드 액센트
    text: {
      dark: '#2C3E50', // 진한 그레이
      light: '#FFFFFF', // 화이트
    },
    background: {
      main: '#FFFFFF', // 화이트
      alt: '#F5F7FA', // 연한 그레이
    },
    chart: [
      '#2E5090',
      '#5B7FB8',
      '#F0A500',
      '#95A5A6',
      '#34495E',
      '#7F8C8D',
    ],
  },
  fonts: {
    heading: {
      face: 'Calibri',
      size: 36,
      bold: true,
    },
    body: {
      face: 'Calibri',
      size: 18,
    },
    emphasis: {
      face: 'Calibri',
      size: 20,
      bold: true,
    },
    code: {
      face: 'Consolas',
      size: 14,
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
      small: 0.1,
      medium: 0.25,
      large: 0.5,
    },
  },
};
