# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 필수 지시사항
- 모든 커뮤니케이션과 문서는 한글로 작성하고, 코드 내부 명명은 영어로 유지합니다.

## Project Overview

PPT-AUTO는 프로젝트의 디자인 시스템을 자동으로 분석하여 브랜드 일관성을 유지하는 PowerPoint 프레젠테이션을 생성하는 시스템입니다. PptxGenJS를 사용하여 완벽하게 편집 가능한 네이티브 PPTX 파일을 생성합니다.

## Project Structure

```
PPT-AUTO/
├── .git/                           # Version control
├── .gitignore                      # Git configuration
├── CLAUDE.md                       # This file
├── README.md                       # Project documentation
└── .claude/
    └── skills/
        └── unified-ppt/            # Main PPT generation skill
            ├── SKILL.md            # Complete skill documentation
            ├── README.md
            ├── package.json        # Skill dependencies (pptxgenjs)
            ├── node_modules/       # Skill-specific dependencies
            └── scripts/
                ├── unified-ppt.js          # Main entry point (v3.0)
                ├── analyzer.js             # Design system analyzer
                ├── theme-system.js         # Theme System 2.0
                ├── visual-helpers.js       # Reusable visual elements
                ├── master-layouts.js       # Master Layout System (10 layouts)
                └── pptx-generator-v2.js    # PPTX generation engine (12 slide types)
```

## Essential Commands

### Using the Unified PPT Skill

```bash
# Navigate to skill directory
cd .claude/skills/unified-ppt

# Install dependencies (first time only)
npm install

# Basic usage - analyze current project and generate sample PPT
node scripts/unified-ppt.js

# With custom slide definition
node scripts/unified-ppt.js --slides slides.json --output my-presentation.pptx

# With specific theme
node scripts/unified-ppt.js --theme professional  # or minimal, corporate

# Analyze different project
node scripts/unified-ppt.js --project /path/to/project --slides slides.json
```

## Architecture

### System Flow

1. **Design System Analysis** (`analyzer.js`)
   - Detect project framework (React, Next.js, Vue, etc.)
   - Parse CSS `:root` blocks for variables
   - Extract colors (HEX/RGB/HSL → HEX conversion)
   - Extract fonts and normalize to PowerPoint-safe fonts
   - Support shadcn/ui HSL format and Tailwind CSS variables

2. **Theme Generation** (`theme-system.js`)
   - Convert design system to PptxGenJS theme
   - Theme System 2.0 with typography scales, effects, embedded icons
   - 3 preset themes: professional (blue), minimal (monochrome), corporate (navy)
   - Base64 icon embedding (10 SVG icons)

3. **Layout Application** (`master-layouts.js`)
   - 10 reusable layout patterns
   - Eliminate code duplication
   - Consistent design across slides
   - **Layouts**: Standard, FullBackground, LightBackground, TwoColumn, ImageShowcase, Chart, Table, Quote, Comparison, Timeline

4. **Slide Generation** (`pptx-generator-v2.js`)
   - 12 slide types with native PptxGenJS
   - Apply master layouts
   - Use visual helpers for consistent elements
   - Generate fully editable PPTX

5. **Visual Helpers** (`visual-helpers.js`)
   - Reusable visual elements (accent bars, dividers, footers, etc.)
   - Shadow conversion
   - Typography application
   - Corner decorations

### 12 Slide Types

**Basic Slides** (6):
- **title**: Centered title with optional subtitle and background image
- **section**: Section divider with primary color background
- **content**: Standard layout with accent bar, title, body text
- **bullet**: Hierarchical bullet points (3 levels: 0, 1, 2)
- **twoColumn**: Split layout with left/right content
- **thankYou**: Closing slide with message and contact

**Advanced Slides** (6):
- **image**: 4 arrangements (full, sideBySide, grid, imageLeft)
- **chart**: Data visualization (bar, line, pie, area) with native PptxGenJS charts
- **table**: Structured data with theme-based styling
- **quote**: Large centered quote with author attribution (Georgia font, italic)
- **comparison**: Side-by-side comparison (Before/After, VS layouts)
- **timeline**: Horizontal timeline with nodes and event descriptions

### 3 Theme Presets

1. **professional** (default)
   - Modern blue palette (#2563EB primary)
   - Clean typography with Arial/Calibri
   - Balanced spacing

2. **minimal**
   - Monochrome design (#1F2937 dark gray)
   - Minimalist aesthetic
   - Ample whitespace

3. **corporate**
   - Professional navy (#1E3A8A)
   - Business-focused styling
   - Conservative design

### Master Layout System

10 reusable layout patterns that eliminate repetitive code:

1. **applyStandardLayout**: Content, bullet, twoColumn slides
2. **applyFullBackgroundLayout**: Title, section slides
3. **applyLightBackgroundLayout**: ThankYou, summary slides
4. **applyTwoColumnLayout**: TwoColumn, comparison slides
5. **applyImageShowcaseLayout**: Image slides (4 arrangements)
6. **applyChartLayout**: Chart slides with legend area
7. **applyTableLayout**: Table slides with padding
8. **applyQuoteLayout**: Quote slides with decorative mark
9. **applyComparisonLayout**: Comparison slides with divider
10. **applyTimelineLayout**: Timeline slides with nodes

## Slide Definition Format

Define slides in JSON:

```json
{
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "Presentation Title",
        "subtitle": "Optional subtitle"
      }
    },
    {
      "type": "bullet",
      "props": {
        "title": "Key Points",
        "bullets": [
          { "text": "First point", "level": 0 },
          { "text": "Sub-point", "level": 1 }
        ]
      }
    },
    {
      "type": "quote",
      "props": {
        "quote": "Your quote text here",
        "author": "Author Name"
      }
    },
    {
      "type": "comparison",
      "props": {
        "title": "Before vs After",
        "leftLabel": "Before",
        "rightLabel": "After",
        "leftContent": "Old approach text",
        "rightContent": "New approach text"
      }
    },
    {
      "type": "timeline",
      "props": {
        "title": "Project Timeline",
        "items": [
          { "title": "Q1 2024", "description": "Initial planning" },
          { "title": "Q2 2024", "description": "Development" }
        ]
      }
    }
  ]
}
```

## Design System Analysis

### Supported CSS Sources
- `src/index.css`
- `src/app/globals.css`
- `src/styles/globals.css`
- `styles/globals.css`
- `app/globals.css`

### Supported CSS Variable Formats
```css
:root {
  --primary: #3b82f6;                  /* Standard HEX */
  --secondary: rgb(124, 58, 237);      /* RGB */
  --accent: hsl(271, 91%, 65%);        /* HSL function */
  --brand: 221.2 83.2% 53.3%;         /* shadcn/ui HSL */
  --font-sans: Inter, sans-serif;      /* Font families */
}
```

### Font Normalization

| Web Font | PowerPoint Font |
|----------|----------------|
| Inter, Roboto, Open Sans | Arial |
| JetBrains Mono, Fira Code, Consolas | Courier New |
| Georgia, Merriweather | Georgia |
| Others | Arial (default) |

## Dependencies

**Runtime**:
- **pptxgenjs**: v3.12.0 (Core PPT generation, ~2MB)

**Development**: None (skill is production-ready)

## Performance Characteristics

- **Design System Analysis**: ~1 second
- **PPTX Generation**: ~0.5 seconds per slide
- **Memory Usage**: ~80MB total
- **File Size**: ~50-200KB depending on slide count
- **Installation Size**: ~2MB (pptxgenjs only)

## Key Technical Decisions

### Why PptxGenJS Native (Not HTML → PPTX)?

**Benefits** ✅:
- Fully editable text and objects in PowerPoint
- High quality with no conversion artifacts
- Lightweight dependency (~2MB only)
- Fast generation (~0.5 seconds per slide)
- Precise layout control

**HTML → PPTX Issues** ❌:
- CSS compatibility issues (Flexbox, Grid unsupported)
- Quality degradation (text may become images)
- Heavy dependencies (Playwright ~200MB, Sharp ~20MB)
- Limited editability in final output

### Why No Gradient Support?

PptxGenJS TypeScript definitions only support `type: 'solid' | 'none'` for fills. Native PowerPoint gradient support is not available in the library. Solid color backgrounds are sufficient for professional presentations.

## Error Handling

Common issues and solutions:

### CSS Variables Not Found
1. Check CSS file locations match supported paths
2. Ensure `:root` blocks exist in CSS
3. Verify variable format (no `var()` references)

### Font Not Displaying Correctly
- Web fonts are automatically converted to PowerPoint-safe fonts
- All text remains fully editable in PowerPoint
- Fonts can be manually changed in PowerPoint if needed

### Dependency Installation Failed
```bash
cd .claude/skills/unified-ppt
npm install
```

Ensure Node.js version >= 18.0.0:
```bash
node --version
```

## Version History

- **v1.0**: Initial implementation with 6 basic slide types
- **v2.0**: Theme System 2.0 + Master Layouts
- **v2.5**: Added image, chart, table slides
- **v3.0**: Added quote, comparison, timeline slides (12 total slide types)

## Notes for Development

- Skill is self-contained in `.claude/skills/unified-ppt/`
- No build step required (pure Node.js scripts)
- Dependencies automatically installed on first run
- All measurements are in inches (PptxGenJS convention)
- Design system analysis happens automatically
- Each slide type is self-contained with its own layout logic
- Master layouts eliminate code duplication
- Visual helpers provide consistent design elements

### 커스텀 스타일 적용

**v3.0의 새로운 기능**: JSON에서 각 슬라이드마다 개별 스타일 지정 가능!

각 슬라이드에 `style` 속성을 추가하여 배경색, 텍스트 색상, 폰트 크기 등을 자유롭게 커스터마이징할 수 있습니다.

#### Title 슬라이드 스타일 예제
```json
{
  "type": "title",
  "props": {
    "title": "프로젝트 제목",
    "subtitle": "부제목"
  },
  "style": {
    "background": "#5ec9a7",
    "title": {
      "color": "#FFFFFF",
      "fontSize": 52,
      "fontFamily": "Arial",
      "align": "center"
    },
    "subtitle": {
      "color": "#E5E7EB",
      "fontSize": 26
    }
  }
}
```

#### Bullet 슬라이드 스타일 예제
```json
{
  "type": "bullet",
  "props": {
    "title": "주요 기능",
    "bullets": [
      { "text": "첫 번째 항목", "level": 0 },
      { "text": "두 번째 항목", "level": 0 }
    ]
  },
  "style": {
    "accentBar": {
      "color": "#5ec9a7"
    },
    "title": {
      "color": "#1c3f57",
      "fontSize": 32
    },
    "bullets": {
      "primaryColor": "#5ec9a7",
      "secondaryColor": "#1c3f57",
      "fontSize": 18,
      "iconType": "arrow"
    }
  }
}
```

#### Content 슬라이드 스타일 예제
```json
{
  "type": "content",
  "props": {
    "title": "내용 제목",
    "body": ["첫 번째 줄", "두 번째 줄"]
  },
  "style": {
    "background": "#F3F4F6",
    "accentBar": {
      "color": "#EF4444"
    },
    "title": {
      "color": "#DC2626",
      "fontSize": 36
    },
    "body": {
      "color": "#374151",
      "fontSize": 20
    }
  }
}
```

#### Section 슬라이드 스타일 예제
```json
{
  "type": "section",
  "props": {
    "title": "섹션 제목",
    "number": "01"
  },
  "style": {
    "background": "#1c3f57",
    "title": {
      "color": "#5ec9a7",
      "fontSize": 44
    }
  }
}
```

### 스타일 우선순위

1. **JSON의 `style` 속성** (최우선) - 개별 슬라이드 커스터마이징
2. **프로젝트 CSS 변수** (자동 추출) - 브랜드 일관성 유지
3. **테마 기본값** (professional/minimal/corporate) - 최종 fallback

### 예제 파일

- **`slides-with-styles.json`**: 다양한 스타일 옵션 예제 (6가지 슬라이드 타입)
- **`test-slides.json`**: 코나래 프로젝트 브랜드 컬러 적용 예제

### 실행 예제

```bash
cd .claude/skills/unified-ppt

# 스타일 예제로 PPT 생성
node scripts/unified-ppt.js --slides slides-with-styles.json --output styled.pptx

# 코나래 브랜드 스타일로 PPT 생성
node scripts/unified-ppt.js \
  --project /Users/jerome/dev/konarae_new \
  --slides test-slides.json \
  --output konarae.pptx
```

### 지원되는 스타일 속성 전체 목록

| 슬라이드 타입 | 스타일 속성 |
|--------------|------------|
| **title** | `background`, `title.{color,fontSize,fontFamily,align}`, `subtitle.{color,fontSize,align}` |
| **content** | `background`, `accentBar.color`, `title.{color,fontSize}`, `body.{color,fontSize,fontFamily,align}` |
| **bullet** | `background`, `accentBar.color`, `title.{color,fontSize}`, `bullets.{primaryColor,secondaryColor,mutedColor,fontSize,fontFamily,lineHeight,iconType}` |
| **section** | `background`, `title.{color,fontSize}`, `badge.{backgroundColor,textColor}` |
| **twoColumn** | `background`, `title.{color,fontSize}`, `leftColumn.{backgroundColor,textColor}`, `rightColumn.{backgroundColor,textColor}` |
| **thankYou** | `background`, `message.{color,fontSize}`, `contact.{color,fontSize}` |

모든 색상은 HEX 포맷(`#RRGGBB`)을 사용합니다.

