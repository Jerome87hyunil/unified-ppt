# Create PPT Skill

이 스킬은 PPT_auto 라이브러리를 사용하여 PowerPoint 프레젠테이션을 생성합니다.

## 사용 방법

### 1. Claude를 통한 자연어 사용

```
"회사 소개 PPT 만들어줘. 제목 슬라이드, 회사 소개, 제품 소개, 연락처 총 4개 슬라이드로"
```

Claude가 자동으로 JSON 구조로 변환하여 스킬을 호출합니다.

### 2. JSON 직접 제공

```javascript
{
  "metadata": {
    "title": "회사 소개",
    "author": "홍길동"
  },
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "우리 회사",
        "subtitle": "혁신을 선도하는 기업"
      }
    },
    {
      "type": "content",
      "props": {
        "title": "회사 소개",
        "body": "우리는 최고의 기술을 제공합니다."
      }
    }
  ]
}
```

## 파라미터

- **content** (필수): 프레젠테이션 내용 (JSON 또는 자연어)
- **theme** (선택): 테마 선택 (professional, creative, minimal, corporate)
- **filename** (선택): 파일명 (기본값: presentation.pptx)

## 지원하는 슬라이드 타입

1. **title**: 타이틀 슬라이드
2. **content**: 콘텐츠 슬라이드 (제목 + 본문)
3. **twoColumn**: 2단 레이아웃
4. **bullet**: 불릿 포인트
5. **chart**: 차트 (bar, line, pie, area)
6. **table**: 표
7. **image**: 이미지 + 캡션
8. **quote**: 인용구
9. **section**: 섹션 구분
10. **thankYou**: 감사 슬라이드

## 예제

### 간단한 프레젠테이션

```json
{
  "metadata": { "title": "프로젝트 발표" },
  "slides": [
    { "type": "title", "props": { "title": "프로젝트 X" } },
    { "type": "content", "props": { "title": "개요", "body": "프로젝트 설명" } },
    { "type": "thankYou", "props": {} }
  ]
}
```

### 차트가 포함된 프레젠테이션

```json
{
  "type": "chart",
  "props": {
    "title": "월별 매출",
    "chartType": "bar",
    "data": {
      "labels": ["1월", "2월", "3월"],
      "datasets": [{
        "name": "매출",
        "values": [100, 150, 200]
      }]
    }
  }
}
```
