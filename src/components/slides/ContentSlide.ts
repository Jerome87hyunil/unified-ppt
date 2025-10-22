/**
 * 콘텐츠 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { ContentSlideProps } from '../../types';
import { calculateContentArea } from '../../utils/layout';

export function createContentSlide(
  adapter: PptxAdapter,
  props: ContentSlideProps
): void {
  const slide = adapter.createSlide();

  // 제목 추가
  adapter.addTitle(slide, props.title, props.theme);

  // 콘텐츠 영역 계산
  const contentArea = calculateContentArea(0.5, 1);

  // 본문 추가
  adapter.addBodyText(
    slide,
    props.body,
    contentArea.x,
    contentArea.y,
    contentArea.w,
    contentArea.h,
    props.theme
  );
}
