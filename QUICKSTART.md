# 빠른 시작 가이드 🚀

PPT Auto를 5분 안에 시작하는 방법

## 1단계: 설치

```bash
cd PPT_auto
npm install
npm run build
```

## 2단계: 첫 번째 PPT 만들기

### 방법 1: TypeScript 코드로 생성

`test.ts` 파일 생성:

```typescript
import { createPresentation, themes } from './src';

async function main() {
  const pres = createPresentation({
    metadata: { title: 'My First PPT' },
    theme: themes.professional,
    slides: [
      {
        type: 'title',
        props: {
          title: '첫 번째 PPT',
          subtitle: 'PPT Auto로 만들었습니다',
        },
      },
      {
        type: 'content',
        props: {
          title: '안녕하세요',
          body: '이것은 자동 생성된 프레젠테이션입니다.',
        },
      },
    ],
  });

  pres.generate();
  await pres.save('my-first.pptx');
  console.log('✅ 완료!');
}

main();
```

실행:

```bash
npm run build
node dist/test.js
```

### 방법 2: Claude Skill 사용

Claude에게 이렇게 말하세요:

```
"간단한 회사 소개 PPT 만들어줘.
제목 슬라이드, 회사 소개, 제품 소개, 연락처 이렇게 4개 슬라이드로"
```

Claude가 자동으로 JSON 구조를 만들어서 `create-ppt` skill을 실행합니다.

## 3단계: 테마 변경해보기

```typescript
// professional 대신 다른 테마 사용
theme: themes.creative    // 밝고 활기찬 색상
theme: themes.minimal     // 깔끔한 흑백
theme: themes.corporate   // 기업용 안정적 색상
```

## 4단계: 다양한 슬라이드 추가

```typescript
// 불릿 포인트
{
  type: 'bullet',
  props: {
    title: '주요 기능',
    bullets: [
      { text: '첫 번째 항목' },
      { text: '두 번째 항목' },
    ]
  }
}

// 차트
{
  type: 'chart',
  props: {
    title: '월별 매출',
    chartType: 'bar',
    data: {
      labels: ['1월', '2월', '3월'],
      datasets: [{
        name: '매출',
        values: [100, 150, 200]
      }]
    }
  }
}

// 2단 레이아웃
{
  type: 'twoColumn',
  props: {
    title: '비교',
    leftContent: '왼쪽 내용',
    rightContent: '오른쪽 내용'
  }
}
```

## 예제 실행하기

```bash
# 간단한 예제
node dist/examples/simple-presentation.js

# 커스텀 테마
node dist/examples/custom-theme.js

# 차트 예제
node dist/examples/chart-example.js

# 고급 레이아웃
node dist/examples/advanced-layouts.js
```

## 문제 해결

### 빌드 에러가 나요
```bash
npm run clean
npm install
npm run build
```

### PPT 파일이 안 열려요
- 파일 경로 확인
- 프로젝트 루트 디렉토리에 `*.pptx` 파일이 생성되었는지 확인

### Claude Skill이 작동하지 않아요
1. `npm run build` 먼저 실행
2. `.claude/skills/create-ppt/` 경로 확인
3. `skill.json` 파일 확인

## 다음 단계

- `README.md`: 전체 문서 읽기
- `examples/`: 더 많은 예제 확인
- 커스텀 테마 만들기
- 자신만의 슬라이드 컴포넌트 추가

즐거운 프레젠테이션 만들기! 🎉
