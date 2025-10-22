/**
 * 이미지 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { ImageSlideProps } from '../../types';
import { calculateContentArea } from '../../utils/layout';

export function createImageSlide(
  adapter: PptxAdapter,
  props: ImageSlideProps
): void {
  const slide = adapter.createSlide();

  // 제목 추가
  adapter.addTitle(slide, props.title, props.theme);

  // 콘텐츠 영역 계산
  const contentArea = calculateContentArea(0.5, 1);

  // 캡션이 있으면 이미지 영역 조정
  const imageHeight = props.caption ? contentArea.h - 0.5 : contentArea.h;

  // 이미지 추가
  adapter.addImage(
    slide,
    props.imagePath,
    contentArea.x,
    contentArea.y,
    contentArea.w,
    imageHeight
  );

  // 캡션 추가
  if (props.caption) {
    adapter.addBodyText(
      slide,
      props.caption,
      contentArea.x,
      contentArea.y + imageHeight + 0.1,
      contentArea.w,
      0.4,
      props.theme
    );
  }
}
