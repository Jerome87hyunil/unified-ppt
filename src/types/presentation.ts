import { Theme } from './theme';
import { SlideComponent } from './components';

/**
 * 프레젠테이션 메타데이터
 */
export interface PresentationMetadata {
  /** 제목 */
  title: string;
  /** 작성자 */
  author?: string;
  /** 주제 */
  subject?: string;
  /** 회사명 */
  company?: string;
}

/**
 * 프레젠테이션 설정
 */
export interface PresentationConfig {
  /** 슬라이드 크기 */
  layout?: 'LAYOUT_16x9' | 'LAYOUT_16x10' | 'LAYOUT_4x3' | 'LAYOUT_WIDE';
  /** RTL 지원 */
  rtlMode?: boolean;
}

/**
 * 프레젠테이션 정의
 */
export interface PresentationDefinition {
  /** 메타데이터 */
  metadata: PresentationMetadata;
  /** 테마 */
  theme: Theme;
  /** 슬라이드 배열 */
  slides: SlideComponent[];
  /** 설정 (선택적) */
  config?: PresentationConfig;
}

/**
 * 에러 코드
 */
export enum PptErrorCode {
  INVALID_THEME = 'INVALID_THEME',
  INVALID_COMPONENT = 'INVALID_COMPONENT',
  INVALID_LAYOUT = 'INVALID_LAYOUT',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  GENERATION_FAILED = 'GENERATION_FAILED',
}

/**
 * PPT 에러 클래스
 */
export class PptError extends Error {
  constructor(
    message: string,
    public code: PptErrorCode,
    public context?: any
  ) {
    super(message);
    this.name = 'PptError';
  }
}
