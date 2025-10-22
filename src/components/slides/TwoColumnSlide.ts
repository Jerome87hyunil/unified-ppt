/**
 * 2단 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { TwoColumnSlideProps } from '../../types';
import { calculateTwoColumnLayout } from '../../utils/layout';

export function createTwoColumnSlide(
  adapter: PptxAdapter,
  props: TwoColumnSlideProps
): void {
  const slide = adapter.createSlide();

  // 제목 추가
  adapter.addTitle(slide, props.title, props.theme);

  // 2단 레이아웃 계산
  const layout = calculateTwoColumnLayout();

  // 왼쪽 콘텐츠
  adapter.addBodyText(
    slide,
    props.leftContent,
    layout.left.x,
    layout.left.y,
    layout.left.w,
    layout.left.h,
    props.theme
  );

  // 오른쪽 콘텐츠
  adapter.addBodyText(
    slide,
    props.rightContent,
    layout.right.x,
    layout.right.y,
    layout.right.w,
    layout.right.h,
    props.theme
  );
}
