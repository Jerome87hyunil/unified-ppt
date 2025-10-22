/**
 * 프레젠테이션 생성기
 *
 * @module generator
 */

import { PptxAdapter } from './pptx-adapter';
import {
  PresentationDefinition,
  SlideComponent,
  PptError,
  PptErrorCode,
} from '../types';
import * as slideComponents from '../components/slides';

/**
 * 프레젠테이션 생성기 클래스
 */
export class PresentationGenerator {
  private adapter: PptxAdapter;
  private definition: PresentationDefinition;

  constructor(definition: PresentationDefinition) {
    this.definition = definition;
    this.adapter = new PptxAdapter(definition.theme);
    this.initializeMetadata();
  }

  /**
   * 메타데이터 초기화
   */
  private initializeMetadata(): void {
    const pres = this.adapter.getPresentation();

    pres.author = this.definition.metadata.author || 'PPT Auto';
    pres.title = this.definition.metadata.title;
    if (this.definition.metadata.subject) {
      pres.subject = this.definition.metadata.subject;
    }
    if (this.definition.metadata.company) {
      pres.company = this.definition.metadata.company;
    }
  }

  /**
   * 모든 슬라이드 생성
   */
  generate(): void {
    this.definition.slides.forEach((slide, index) => {
      try {
        this.createSlide(slide);
      } catch (error) {
        throw new PptError(
          `슬라이드 ${index + 1} 생성 실패: ${
            error instanceof Error ? error.message : String(error)
          }`,
          PptErrorCode.GENERATION_FAILED,
          { slideIndex: index, slide }
        );
      }
    });
  }

  /**
   * 개별 슬라이드 생성
   */
  private createSlide(slide: SlideComponent): void {
    switch (slide.type) {
      case 'title':
        slideComponents.createTitleSlide(this.adapter, slide.props as any);
        break;
      case 'content':
        slideComponents.createContentSlide(this.adapter, slide.props as any);
        break;
      case 'twoColumn':
        slideComponents.createTwoColumnSlide(this.adapter, slide.props as any);
        break;
      case 'bullet':
        slideComponents.createBulletSlide(this.adapter, slide.props as any);
        break;
      case 'chart':
        slideComponents.createChartSlide(this.adapter, slide.props as any);
        break;
      case 'table':
        slideComponents.createTableSlide(this.adapter, slide.props as any);
        break;
      case 'image':
        slideComponents.createImageSlide(this.adapter, slide.props as any);
        break;
      case 'quote':
        slideComponents.createQuoteSlide(this.adapter, slide.props as any);
        break;
      case 'section':
        slideComponents.createSectionSlide(this.adapter, slide.props as any);
        break;
      case 'thankYou':
        slideComponents.createThankYouSlide(this.adapter, slide.props as any);
        break;
      default:
        throw new PptError(
          `알 수 없는 슬라이드 타입: ${(slide as any).type}`,
          PptErrorCode.INVALID_COMPONENT
        );
    }
  }

  /**
   * 파일로 저장
   */
  async save(filename: string): Promise<void> {
    const pres = this.adapter.getPresentation();
    await pres.writeFile({ fileName: filename });
  }

  /**
   * 프레젠테이션 객체 반환
   */
  getPresentation(): any {
    return this.adapter.getPresentation();
  }
}

/**
 * 간편한 프레젠테이션 생성 함수
 */
export function createPresentation(
  definition: PresentationDefinition
): PresentationGenerator {
  return new PresentationGenerator(definition);
}
