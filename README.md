# PPT Auto 🎨

디자인 컴포넌트 기반 PowerPoint 자동 생성 시스템

TypeScript로 작성된 재사용 가능한 PPT 컴포넌트 라이브러리와 Claude Skill을 사용하여 쉽고 빠르게 전문적인 프레젠테이션을 만들 수 있습니다.

## 🌟 NEW: 통합 워크플로우 (Integrated Workflow)

**프로젝트 디자인 시스템을 자동으로 분석**하여 **브랜드 일관성 있는 프레젠테이션을 자동 생성**합니다!

### 5단계 파이프라인

```
Design System Analyzer → Content Planner → HTML Generator
→ PPTX Converter → Validator & Preview
```

**지원 기능**:
- ✅ **자동 디자인 추출**: CSS 변수, 컬러, 폰트 자동 분석
- ✅ **프레임워크 감지**: React, Next.js, Vue, Nuxt, Svelte
- ✅ **스타일 변환**: shadcn/ui, Tailwind CSS 지원
- ✅ **HTML → PPTX**: Playwright 기반 렌더링

**빠른 테스트**:
```bash
npm run build

# 디자인 시스템 분석
node dist/examples/test-analyzer.js

# HTML 생성
node dist/examples/test-html-generator.js

# 전체 워크플로우 (HTML → PPTX)
node dist/examples/test-full-workflow.js
```

📖 **상세 가이드**: [통합 워크플로우 문서](./docs/integrated-workflow-guide.md)

---

## ✨ 기본 기능

- **🎨 4가지 테마 프리셋**: Professional, Creative, Minimal, Corporate
- **📦 재사용 가능한 컴포넌트**: 10가지 슬라이드 타입
- **🔧 커스터마이징**: 색상, 폰트, 레이아웃 자유롭게 조정
- **💪 TypeScript**: 완전한 타입 안정성
- **🤖 Claude Skill**: 자연어로 PPT 생성
- **⚡ PptxGenJS**: 강력한 PPT 생성 라이브러리 기반

## 📦 설치

```bash
npm install
npm run build
```

## 🚀 빠른 시작

### 1. 코드로 직접 생성

```typescript
import { createPresentation, themes } from './src';

const presentation = createPresentation({
  metadata: {
    title: '내 프레젠테이션',
    author: '홍길동',
  },
  theme: themes.professional,
  slides: [
    {
      type: 'title',
      props: {
        title: '제목',
        subtitle: '부제목',
      },
    },
    {
      type: 'content',
      props: {
        title: '내용',
        body: '본문 텍스트',
      },
    },
  ],
});

presentation.generate();
await presentation.save('output.pptx');
```

### 2. Claude Skill 사용

```bash
# 프로젝트 빌드
npm run build

# Claude에게 요청
"회사 소개 PPT 만들어줘. 타이틀, 회사 소개, 제품, 연락처 총 4개 슬라이드"
```

Claude가 자동으로 JSON 구조로 변환하여 PPT를 생성합니다.

## 📚 지원하는 슬라이드 타입

| 타입 | 설명 | 주요 속성 |
|------|------|-----------|
| `title` | 타이틀 슬라이드 | title, subtitle, backgroundImage |
| `content` | 콘텐츠 슬라이드 | title, body |
| `twoColumn` | 2단 레이아웃 | title, leftContent, rightContent |
| `bullet` | 불릿 포인트 | title, bullets |
| `chart` | 차트 | title, chartType, data |
| `table` | 표 | title, headers, rows |
| `image` | 이미지 | title, imagePath, caption |
| `quote` | 인용구 | quote, author |
| `section` | 섹션 구분 | title, subtitle |
| `thankYou` | 감사 슬라이드 | message, contact |

## 🎨 테마

### Professional (기본)
비즈니스 프레젠테이션에 적합한 블루/그레이 계열

### Creative
창의적이고 활기찬 프레젠테이션을 위한 밝은 색상

### Minimal
깔끔하고 모던한 흑백 베이스

### Corporate
기업용 공식 프레젠테이션을 위한 안정적인 색상

## 📖 예제

### 간단한 프레젠테이션

```bash
npm run build
node dist/examples/simple-presentation.js
```

### 커스텀 테마

```bash
node dist/examples/custom-theme.js
```

### 차트 포함

```bash
node dist/examples/chart-example.js
```

### 고급 레이아웃

```bash
node dist/examples/advanced-layouts.js
```

## 🔧 커스터마이징

### 커스텀 테마 만들기

```typescript
import { Theme } from './src/types';

const myTheme: Theme = {
  name: 'My Theme',
  colors: {
    primary: '#6C63FF',
    secondary: '#A29BFE',
    accent: '#FDCB6E',
    text: { dark: '#2D3436', light: '#FFFFFF' },
    background: { main: '#FFFFFF', alt: '#F8F9FA' },
    chart: ['#6C63FF', '#A29BFE', '#FDCB6E'],
  },
  fonts: {
    heading: { face: 'Arial', size: 40, bold: true },
    body: { face: 'Arial', size: 18 },
    emphasis: { face: 'Arial', size: 22, bold: true },
  },
  spacing: {
    margin: { top: 0.6, right: 0.6, bottom: 0.6, left: 0.6 },
    gap: { small: 0.15, medium: 0.3, large: 0.6 },
  },
};
```

### 슬라이드별 테마 오버라이드

```typescript
{
  type: 'content',
  props: {
    title: '특별한 슬라이드',
    body: '이 슬라이드만 다른 색상',
    theme: {
      colors: {
        primary: '#FF5733'
      }
    }
  }
}
```

## 📁 프로젝트 구조

```
PPT_auto/
├── src/
│   ├── types/          # TypeScript 타입 정의
│   ├── themes/         # 테마 프리셋
│   ├── components/     # 슬라이드 컴포넌트
│   ├── generator/      # 생성기 및 PptxGenJS 어댑터
│   └── utils/          # 유틸리티 함수
├── examples/           # 예제 파일
├── .claude/
│   └── skills/
│       └── create-ppt/ # Claude Skill
└── README.md
```

## 🛠️ 개발

```bash
# 의존성 설치
npm install

# TypeScript 빌드
npm run build

# Watch 모드
npm run watch

# 빌드 정리
npm run clean
```

## 📝 라이선스

MIT

## 🤝 기여

이슈와 PR을 환영합니다!

## 📮 연락처

궁금한 점이 있으시면 이슈를 열어주세요.

---

**Made with ❤️ using TypeScript and PptxGenJS**
