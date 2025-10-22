/**
 * 불릿 포인트 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { BulletSlideProps } from '../../types';
import { calculateContentArea } from '../../utils/layout';

export function createBulletSlide(
  adapter: PptxAdapter,
  props: BulletSlideProps
): void {
  const slide = adapter.createSlide();

  // 제목 추가
  adapter.addTitle(slide, props.title, props.theme);

  // 콘텐츠 영역 계산
  const contentArea = calculateContentArea(0.5, 1);

  // 불릿 포인트 추가
  adapter.addBullets(
    slide,
    props.bullets,
    contentArea.x,
    contentArea.y,
    contentArea.w,
    contentArea.h,
    props.theme
  );
}
