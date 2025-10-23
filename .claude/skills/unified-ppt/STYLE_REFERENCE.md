# 커스텀 스타일 완전 가이드

모든 12개 슬라이드 타입이 `style` 속성을 통한 커스텀 스타일링을 지원합니다.

## 전체 슬라이드 타입 스타일 속성 표

| 슬라이드 타입 | 지원 스타일 속성 |
|--------------|----------------|
| **title** | `background`, `title.{color,fontSize,fontFamily,align}`, `subtitle.{color,fontSize,align}` |
| **content** | `background`, `accentBar.color`, `title.{color,fontSize}`, `body.{color,fontSize,fontFamily,align}`, `divider.color` |
| **bullet** | `background`, `accentBar.color`, `title.{color,fontSize}`, `bullets.{primaryColor,secondaryColor,mutedColor,fontSize,fontFamily,lineHeight,iconType}` |
| **section** | `background`, `title.{color,fontSize}`, `badge.{backgroundColor,textColor}` |
| **twoColumn** | `background`, `title.{color,fontSize}`, `leftColumn.{backgroundColor,textColor}`, `rightColumn.{backgroundColor,textColor}` |
| **thankYou** | `background`, `message.{color,fontSize}`, `contact.{color,fontSize}` |
| **image** | `background`, `title.{color,fontSize}`, `caption.{color,fontSize,fontFamily,align,italic}` |
| **chart** | `background`, `title.{color,fontSize}`, `chartColors`, `gridColor`, `gridStyle`, `showLegend`, `showAxisLines` |
| **table** | `background`, `title.{color,fontSize}`, `header.{backgroundColor,textColor,fontSize}`, `body.{backgroundColor,textColor,fontSize}`, `border.{color,width}`, `rowHeight`, `align` |
| **quote** | `background`, `quote.{color,fontSize,fontFamily,italic,align}`, `author.{color,fontSize,fontFamily,align}` |
| **comparison** | `background`, `title.{color,fontSize}`, `leftContent.{color,fontSize,fontFamily}`, `rightContent.{color,fontSize,fontFamily}` |
| **timeline** | `background`, `title.{color,fontSize}`, `node.{fillColor,borderColor,borderWidth}`, `itemTitle.{color,fontSize,fontFamily}`, `itemDescription.{color,fontSize,fontFamily}` |

## 상세 예제

### 1. Title 슬라이드
```json
{
  "type": "title",
  "props": {
    "title": "제목",
    "subtitle": "부제목"
  },
  "style": {
    "background": "#1E3A8A",
    "title": {
      "color": "#FBBF24",
      "fontSize": 54,
      "fontFamily": "Arial",
      "align": "center"
    },
    "subtitle": {
      "color": "#E5E7EB",
      "fontSize": 26,
      "align": "center"
    }
  }
}
```

### 2. Content 슬라이드
```json
{
  "type": "content",
  "props": {
    "title": "내용 제목",
    "body": ["내용 1", "내용 2"]
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
      "fontSize": 20,
      "fontFamily": "Arial",
      "align": "left"
    },
    "divider": {
      "color": "#E5E7EB"
    }
  }
}
```

### 3. Bullet 슬라이드
```json
{
  "type": "bullet",
  "props": {
    "title": "항목",
    "bullets": [
      { "text": "항목 1", "level": 0 },
      { "text": "서브 항목", "level": 1 }
    ]
  },
  "style": {
    "background": "#FFFFFF",
    "accentBar": {
      "color": "#10B981"
    },
    "title": {
      "color": "#059669",
      "fontSize": 32
    },
    "bullets": {
      "primaryColor": "#10B981",
      "secondaryColor": "#6B7280",
      "mutedColor": "#9CA3AF",
      "fontSize": 18,
      "fontFamily": "Arial",
      "lineHeight": 0.4,
      "iconType": "arrow"
    }
  }
}
```

### 4. Section 슬라이드
```json
{
  "type": "section",
  "props": {
    "title": "섹션",
    "number": "01"
  },
  "style": {
    "background": "#7C3AED",
    "title": {
      "color": "#FFFFFF",
      "fontSize": 48
    },
    "badge": {
      "backgroundColor": "#A78BFA",
      "textColor": "#FFFFFF"
    }
  }
}
```

### 5. TwoColumn 슬라이드
```json
{
  "type": "twoColumn",
  "props": {
    "title": "제목",
    "leftContent": "왼쪽 내용",
    "rightContent": "오른쪽 내용"
  },
  "style": {
    "background": "#FEF3C7",
    "title": {
      "color": "#92400E",
      "fontSize": 32
    },
    "leftColumn": {
      "backgroundColor": "#FCD34D",
      "textColor": "#78350F"
    },
    "rightColumn": {
      "backgroundColor": "#FBBF24",
      "textColor": "#78350F"
    }
  }
}
```

### 6. ThankYou 슬라이드
```json
{
  "type": "thankYou",
  "props": {
    "message": "감사합니다",
    "contact": "contact@example.com"
  },
  "style": {
    "background": "#1F2937",
    "message": {
      "color": "#10B981",
      "fontSize": 56
    },
    "contact": {
      "color": "#9CA3AF",
      "fontSize": 20
    }
  }
}
```

### 7. Image 슬라이드
```json
{
  "type": "image",
  "props": {
    "title": "이미지 제목",
    "image": "/path/to/image.png",
    "caption": "이미지 캡션"
  },
  "style": {
    "background": "#F9FAFB",
    "title": {
      "color": "#1F2937",
      "fontSize": 32
    },
    "caption": {
      "color": "#6B7280",
      "fontSize": 16,
      "fontFamily": "Arial",
      "align": "center",
      "italic": true
    }
  }
}
```

### 8. Chart 슬라이드
```json
{
  "type": "chart",
  "props": {
    "title": "차트 제목",
    "chartType": "bar",
    "data": [...]
  },
  "style": {
    "background": "#FFFFFF",
    "title": {
      "color": "#1F2937",
      "fontSize": 32
    },
    "chartColors": ["#3B82F6", "#10B981", "#F59E0B"],
    "gridColor": "#E5E7EB",
    "gridStyle": "dot",
    "showLegend": true,
    "showAxisLines": true
  }
}
```

### 9. Table 슬라이드
```json
{
  "type": "table",
  "props": {
    "title": "테이블 제목",
    "headers": ["컬럼1", "컬럼2"],
    "rows": [["데이터1", "데이터2"]]
  },
  "style": {
    "background": "#F9FAFB",
    "title": {
      "color": "#1F2937",
      "fontSize": 32
    },
    "header": {
      "backgroundColor": "#1E40AF",
      "textColor": "#FFFFFF",
      "fontSize": 16
    },
    "body": {
      "backgroundColor": "#FFFFFF",
      "textColor": "#374151",
      "fontSize": 14
    },
    "border": {
      "color": "#D1D5DB",
      "width": 1
    },
    "rowHeight": 0.4,
    "align": "left"
  }
}
```

### 10. Quote 슬라이드
```json
{
  "type": "quote",
  "props": {
    "quote": "인용문 내용",
    "author": "저자"
  },
  "style": {
    "background": "#FEF2F2",
    "quote": {
      "color": "#991B1B",
      "fontSize": 34,
      "fontFamily": "Georgia",
      "italic": true,
      "align": "center"
    },
    "author": {
      "color": "#6B7280",
      "fontSize": 20,
      "fontFamily": "Arial",
      "align": "right"
    }
  }
}
```

### 11. Comparison 슬라이드
```json
{
  "type": "comparison",
  "props": {
    "title": "비교",
    "leftLabel": "Before",
    "rightLabel": "After",
    "leftContent": "이전 내용",
    "rightContent": "이후 내용"
  },
  "style": {
    "background": "#F3F4F6",
    "title": {
      "color": "#1F2937",
      "fontSize": 32
    },
    "leftContent": {
      "color": "#DC2626",
      "fontSize": 16,
      "fontFamily": "Arial"
    },
    "rightContent": {
      "color": "#059669",
      "fontSize": 16,
      "fontFamily": "Arial"
    }
  }
}
```

### 12. Timeline 슬라이드
```json
{
  "type": "timeline",
  "props": {
    "title": "타임라인",
    "items": [
      {
        "title": "Q1 2024",
        "description": "설명"
      }
    ]
  },
  "style": {
    "background": "#FFFFFF",
    "title": {
      "color": "#1F2937",
      "fontSize": 32
    },
    "node": {
      "fillColor": "#DBEAFE",
      "borderColor": "#3B82F6",
      "borderWidth": 3
    },
    "itemTitle": {
      "color": "#1E40AF",
      "fontSize": 18,
      "fontFamily": "Arial"
    },
    "itemDescription": {
      "color": "#6B7280",
      "fontSize": 14,
      "fontFamily": "Arial"
    }
  }
}
```

## 스타일 우선순위

1. **JSON의 `style` 속성** (최우선) - 슬라이드별 커스터마이징
2. **프로젝트 CSS 변수** (자동 추출) - 브랜드 일관성
3. **테마 기본값** (professional/minimal/corporate) - Fallback

## 사용 팁

- 모든 색상은 HEX 포맷(`#RRGGBB`) 사용
- fontSize는 포인트(pt) 단위
- fontFamily는 PowerPoint 호환 폰트 (Arial, Georgia, Calibri 등)
- align: `left`, `center`, `right`
- 스타일을 지정하지 않은 속성은 테마 기본값 사용

## 예제 파일

- **`all-12-types-styled.json`**: 전체 12개 타입 스타일 예제
- **`slides-with-styles.json`**: 기본 6개 타입 스타일 예제
- **`test-slides.json`**: 코나래 프로젝트 브랜드 스타일 예제

