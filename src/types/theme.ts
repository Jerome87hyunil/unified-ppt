/**
 * 색상 팔레트 정의
 */
export interface ColorPalette {
  /** 주 색상 */
  primary: string;
  /** 보조 색상 */
  secondary: string;
  /** 강조 색상 */
  accent: string;
  /** 텍스트 색상 */
  text: {
    dark: string;
    light: string;
  };
  /** 배경 색상 */
  background: {
    main: string;
    alt: string;
  };
  /** 차트 색상 배열 */
  chart: string[];
}

/**
 * 폰트 설정
 */
export interface FontConfig {
  /** 폰트명 */
  face: string;
  /** 기본 크기 (포인트) */
  size: number;
  /** 굵기 (선택적) */
  bold?: boolean;
}

/**
 * 폰트 세트
 */
export interface FontSet {
  /** 제목용 폰트 */
  heading: FontConfig;
  /** 본문용 폰트 */
  body: FontConfig;
  /** 강조용 폰트 */
  emphasis: FontConfig;
  /** 코드용 폰트 (선택적) */
  code?: FontConfig;
}

/**
 * 간격 시스템
 */
export interface SpacingSystem {
  /** 슬라이드 여백 (인치) */
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  /** 요소 간 간격 (인치) */
  gap: {
    small: number;
    medium: number;
    large: number;
  };
}

/**
 * 테마 정의
 */
export interface Theme {
  /** 테마 이름 */
  name: string;
  /** 색상 팔레트 */
  colors: ColorPalette;
  /** 폰트 세트 */
  fonts: FontSet;
  /** 간격 시스템 */
  spacing: SpacingSystem;
}

/**
 * 테마 오버라이드 (부분 적용 가능)
 */
export type ThemeOverride = Partial<Theme>;
