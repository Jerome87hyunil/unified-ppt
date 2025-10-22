/**
 * 간단한 프레젠테이션 예제
 */

import { createPresentation, themes } from '../src';

async function main() {
  // 프레젠테이션 정의
  const presentation = createPresentation({
    metadata: {
      title: '간단한 프레젠테이션',
      author: 'PPT Auto',
      subject: '예제',
    },
    theme: themes.professional,
    slides: [
      // 1. 타이틀 슬라이드
      {
        type: 'title',
        props: {
          title: 'PPT Auto',
          subtitle: '자동 프레젠테이션 생성 시스템',
        },
      },
      // 2. 콘텐츠 슬라이드
      {
        type: 'content',
        props: {
          title: '소개',
          body: 'PPT Auto는 디자인 컴포넌트를 사용하여 자동으로 PowerPoint를 생성합니다.',
        },
      },
      // 3. 불릿 포인트 슬라이드
      {
        type: 'bullet',
        props: {
          title: '주요 기능',
          bullets: [
            { text: '재사용 가능한 디자인 컴포넌트', level: 0 },
            { text: '4가지 테마 프리셋', level: 0 },
            { text: 'TypeScript 타입 안정성', level: 0 },
            { text: 'Claude Skill 통합', level: 0 },
          ],
        },
      },
      // 4. 감사 슬라이드
      {
        type: 'thankYou',
        props: {
          message: '감사합니다',
          contact: 'info@example.com',
        },
      },
    ],
  });

  // 생성
  presentation.generate();

  // 저장
  await presentation.save('simple-presentation.pptx');

  console.log('✅ 프레젠테이션이 생성되었습니다!');
}

main().catch(console.error);
