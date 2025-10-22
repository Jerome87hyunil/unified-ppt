import { ThemeOverride } from './theme';

/**
 * 위치 정의
 */
export interface Position {
  x: number | string; // 숫자(인치) 또는 'left'|'center'|'right'
  y: number | string; // 숫자(인치) 또는 'top'|'middle'|'bottom'
  w?: number | string; // 너비
  h?: number | string; // 높이
}

/**
 * 텍스트 정렬
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * 텍스트 수직 정렬
 */
export type VerticalAlign = 'top' | 'middle' | 'bottom';

/**
 * 기본 컴포넌트 속성
 */
export interface BaseComponentProps {
  /** 테마 오버라이드 */
  theme?: ThemeOverride;
}

/**
 * 타이틀 슬라이드 속성
 */
export interface TitleSlideProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

/**
 * 콘텐츠 슬라이드 속성
 */
export interface ContentSlideProps extends BaseComponentProps {
  title: string;
  body: string | string[];
}

/**
 * 2단 슬라이드 속성
 */
export interface TwoColumnSlideProps extends BaseComponentProps {
  title: string;
  leftContent: string | string[];
  rightContent: string | string[];
}

/**
 * 이미지 슬라이드 속성
 */
export interface ImageSlideProps extends BaseComponentProps {
  title: string;
  imagePath: string;
  caption?: string;
}

/**
 * 차트 데이터
 */
export interface ChartData {
  labels: string[];
  datasets: Array<{
    name: string;
    values: number[];
  }>;
}

/**
 * 차트 타입
 */
export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'column';

/**
 * 차트 슬라이드 속성
 */
export interface ChartSlideProps extends BaseComponentProps {
  title: string;
  chartType: ChartType;
  data: ChartData;
}

/**
 * 표 슬라이드 속성
 */
export interface TableSlideProps extends BaseComponentProps {
  title: string;
  headers: string[];
  rows: string[][];
}

/**
 * 불릿 슬라이드 속성
 */
export interface BulletSlideProps extends BaseComponentProps {
  title: string;
  bullets: Array<{
    text: string;
    level?: number; // 0(기본) ~ 2
  }>;
}

/**
 * 인용 슬라이드 속성
 */
export interface QuoteSlideProps extends BaseComponentProps {
  quote: string;
  author?: string;
}

/**
 * 섹션 슬라이드 속성
 */
export interface SectionSlideProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
}

/**
 * 감사 슬라이드 속성
 */
export interface ThankYouSlideProps extends BaseComponentProps {
  message?: string;
  contact?: string;
}

/**
 * 슬라이드 컴포넌트 타입
 */
export type SlideType =
  | 'title'
  | 'content'
  | 'twoColumn'
  | 'image'
  | 'chart'
  | 'table'
  | 'bullet'
  | 'quote'
  | 'section'
  | 'thankYou';

/**
 * 슬라이드 컴포넌트 정의
 */
export interface SlideComponent {
  type: SlideType;
  props:
    | TitleSlideProps
    | ContentSlideProps
    | TwoColumnSlideProps
    | ImageSlideProps
    | ChartSlideProps
    | TableSlideProps
    | BulletSlideProps
    | QuoteSlideProps
    | SectionSlideProps
    | ThankYouSlideProps;
}
