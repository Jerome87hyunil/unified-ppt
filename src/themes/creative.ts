import { Theme } from '../types';

/**
 * Creative 테마
 * 창의적이고 활기찬 프레젠테이션을 위한 밝은 색상
 */
export const creativeTheme: Theme = {
  name: 'Creative',
  colors: {
    primary: '#E74C3C', // 레드
    secondary: '#3498DB', // 브라이트 블루
    accent: '#F39C12', // 오렌지
    text: {
      dark: '#2C3E50', // 진한 그레이
      light: '#FFFFFF', // 화이트
    },
    background: {
      main: '#FFFFFF', // 화이트
      alt: '#FEF5E7', // 연한 크림
    },
    chart: [
      '#E74C3C',
      '#3498DB',
      '#F39C12',
      '#9B59B6',
      '#1ABC9C',
      '#E67E22',
    ],
  },
  fonts: {
    heading: {
      face: 'Arial',
      size: 38,
      bold: true,
    },
    body: {
      face: 'Arial',
      size: 18,
    },
    emphasis: {
      face: 'Arial',
      size: 22,
      bold: true,
    },
    code: {
      face: 'Courier New',
      size: 14,
    },
  },
  spacing: {
    margin: {
      top: 0.6,
      right: 0.6,
      bottom: 0.6,
      left: 0.6,
    },
    gap: {
      small: 0.15,
      medium: 0.3,
      large: 0.6,
    },
  },
};
