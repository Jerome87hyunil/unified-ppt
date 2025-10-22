/**
 * 타이틀 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { TitleSlideProps } from '../../types';

export function createTitleSlide(
  adapter: PptxAdapter,
  props: TitleSlideProps
): void {
  const slide = adapter.createSlide();

  // 배경 이미지가 있으면 설정
  if (props.backgroundImage) {
    adapter.addImage(slide, props.backgroundImage, 0, 0, 10, 5.625);
  }

  // 제목
  adapter.addCenterText(slide, props.title, 44, props.theme);

  // 부제목
  if (props.subtitle) {
    adapter.addSubtitle(slide, props.subtitle, props.theme);
  }
}
