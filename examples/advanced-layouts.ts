/**
 * 고급 레이아웃 예제
 */

import { createPresentation, themes } from '../src';

async function main() {
  const presentation = createPresentation({
    metadata: {
      title: '고급 레이아웃',
      author: 'PPT Auto',
    },
    theme: themes.minimal,
    slides: [
      {
        type: 'title',
        props: {
          title: '다양한 레이아웃',
          subtitle: '여러 슬라이드 타입 활용',
        },
      },
      // 2단 레이아웃
      {
        type: 'twoColumn',
        props: {
          title: '장점과 단점',
          leftContent: [
            '✅ 장점',
            '• 사용하기 쉬움',
            '• 타입 안정성',
            '• 재사용 가능',
          ],
          rightContent: [
            '❌ 단점',
            '• 초기 학습 필요',
            '• 고급 기능 제한',
          ],
        },
      },
      // 표
      {
        type: 'table',
        props: {
          title: '제품 비교',
          headers: ['제품', '가격', '성능', '평점'],
          rows: [
            ['제품 A', '₩100,000', '⭐⭐⭐⭐⭐', '9.5'],
            ['제품 B', '₩80,000', '⭐⭐⭐⭐', '8.0'],
            ['제품 C', '₩120,000', '⭐⭐⭐⭐⭐', '9.8'],
          ],
        },
      },
      // 인용구
      {
        type: 'quote',
        props: {
          quote: '단순함은 궁극의 세련됨이다',
          author: '레오나르도 다빈치',
        },
      },
      // 섹션
      {
        type: 'section',
        props: {
          title: '결론',
        },
      },
      // 종료
      {
        type: 'thankYou',
        props: {
          message: 'Thank You',
        },
      },
    ],
  });

  presentation.generate();
  await presentation.save('advanced-layouts.pptx');

  console.log('✅ 고급 레이아웃 프레젠테이션이 생성되었습니다!');
}

main().catch(console.error);
