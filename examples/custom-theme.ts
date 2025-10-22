/**
 * 커스텀 테마 예제
 */

import { createPresentation, Theme } from '../src';

// 커스텀 테마 정의
const myTheme: Theme = {
  name: 'My Custom Theme',
  colors: {
    primary: '#6C63FF', // 보라색
    secondary: '#A29BFE',
    accent: '#FDCB6E', // 노란색
    text: {
      dark: '#2D3436',
      light: '#FFFFFF',
    },
    background: {
      main: '#FFFFFF',
      alt: '#F8F9FA',
    },
    chart: ['#6C63FF', '#A29BFE', '#FDCB6E', '#74B9FF', '#FF7675', '#55EFC4'],
  },
  fonts: {
    heading: {
      face: 'Arial',
      size: 40,
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

async function main() {
  const presentation = createPresentation({
    metadata: {
      title: '커스텀 테마 프레젠테이션',
      author: 'User',
    },
    theme: myTheme,
    slides: [
      {
        type: 'title',
        props: {
          title: '나만의 테마',
          subtitle: '커스텀 색상과 폰트',
        },
      },
      {
        type: 'content',
        props: {
          title: '테마 커스터마이징',
          body: [
            '원하는 색상으로 변경 가능',
            '폰트와 크기 조정 가능',
            '여백과 간격 설정 가능',
          ],
        },
      },
      {
        type: 'section',
        props: {
          title: '새로운 섹션',
          subtitle: '배경 색상이 primary로 설정됩니다',
        },
      },
    ],
  });

  presentation.generate();
  await presentation.save('custom-theme.pptx');

  console.log('✅ 커스텀 테마 프레젠테이션이 생성되었습니다!');
}

main().catch(console.error);
