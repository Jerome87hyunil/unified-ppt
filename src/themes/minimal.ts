import { Theme } from '../types';

/**
 * Minimal 테마
 * 깔끔하고 모던한 흑백 베이스
 */
export const minimalTheme: Theme = {
  name: 'Minimal',
  colors: {
    primary: '#000000', // 블랙
    secondary: '#4A4A4A', // 다크 그레이
    accent: '#FF6B6B', // 소프트 레드 액센트
    text: {
      dark: '#2C2C2C', // 거의 블랙
      light: '#FFFFFF', // 화이트
    },
    background: {
      main: '#FFFFFF', // 화이트
      alt: '#F8F9FA', // 연한 그레이
    },
    chart: [
      '#000000',
      '#4A4A4A',
      '#FF6B6B',
      '#6C757D',
      '#ADB5BD',
      '#DEE2E6',
    ],
  },
  fonts: {
    heading: {
      face: 'Helvetica',
      size: 40,
      bold: true,
    },
    body: {
      face: 'Helvetica',
      size: 16,
    },
    emphasis: {
      face: 'Helvetica',
      size: 20,
      bold: true,
    },
    code: {
      face: 'Monaco',
      size: 13,
    },
  },
  spacing: {
    margin: {
      top: 0.7,
      right: 0.7,
      bottom: 0.7,
      left: 0.7,
    },
    gap: {
      small: 0.2,
      medium: 0.4,
      large: 0.8,
    },
  },
};
