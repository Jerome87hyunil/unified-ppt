# Unified PPT Generator - Claude Skill

프로젝트 디자인 시스템을 자동으로 분석하여 브랜드 일관성 있는 프레젠테이션을 생성하는 독립 실행형 Claude Skill입니다.

**PptxGenJS 네이티브 방식**으로 완벽하게 편집 가능한 고품질 PowerPoint를 생성합니다.

## 🚀 빠른 시작

### 1. 설치

```bash
# 스킬 복사
cp -r /path/to/PPT-AUTO/.claude/skills/unified-ppt ~/.claude/skills/

# 의존성 설치
cd ~/.claude/skills/unified-ppt
npm install
```

**설치 시간**: ~10초 (pptxgenjs만 필요)

### 2. 실행

```bash
# 샘플 PPT 생성 (현재 프로젝트 디자인 분석)
node scripts/unified-ppt.js

# 출력: presentation.pptx
```

## ✨ 주요 기능

- ✅ CSS 변수 자동 추출
- ✅ 프레임워크 자동 감지 (React, Next.js, Vue, etc.)
- ✅ 컬러/폰트 자동 변환 (shadcn/ui, Tailwind CSS 지원)
- ✅ **네이티브 PPTX 생성** - 완벽하게 편집 가능
- ✅ 6가지 슬라이드 타입 지원

## 🎯 기술적 장점

### PptxGenJS 네이티브 방식 (현재 사용)

- ✅ **완벽한 편집 가능**: 모든 텍스트/객체가 PowerPoint에서 직접 편집
- ✅ **높은 품질**: 네이티브 PowerPoint 객체로 품질 손실 없음
- ✅ **가벼운 의존성**: pptxgenjs만 필요 (~2MB)
- ✅ **빠른 생성**: 중간 변환 없이 직접 생성 (~0.5초/슬라이드)

### ~~HTML → PPTX 방식 (사용 안 함)~~

- ❌ CSS 호환성 문제
- ❌ 품질 저하
- ❌ 무거운 의존성 (Playwright ~200MB)

## 📖 사용 예제

```bash
# 기본 사용
node scripts/unified-ppt.js

# 슬라이드 정의 파일 사용
node scripts/unified-ppt.js --slides my-slides.json --output my-ppt.pptx

# 다른 프로젝트 분석
node scripts/unified-ppt.js --project ~/my-project --output output.pptx

# 도움말
node scripts/unified-ppt.js --help
```

## 📁 파일 구조

```
unified-ppt/
├── README.md              # 이 파일
├── SKILL.md               # 상세 문서
├── package.json           # 의존성 (pptxgenjs만)
└── scripts/
    ├── unified-ppt.js     # 메인 진입점
    ├── analyzer.js        # 디자인 시스템 분석기
    └── pptx-generator.js  # PptxGenJS 네이티브 생성기
```

## 🔧 요구사항

- **Node.js**: >= 18.0.0
- **의존성**: pptxgenjs만 필요 (playwright, sharp 불필요)

## 📚 더 알아보기

- [SKILL.md](./SKILL.md) - 상세 사용 가이드
- [통합 워크플로우 가이드](../../docs/integrated-workflow-guide.md)
- [개발 진행 상황](../../docs/DEVELOPMENT_PROGRESS.md)

## 🤝 기여

이슈와 PR 환영합니다!

## 📝 라이선스

MIT
