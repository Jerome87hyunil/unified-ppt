/**
 * 표 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { TableSlideProps } from '../../types';
import { calculateContentArea } from '../../utils/layout';

export function createTableSlide(
  adapter: PptxAdapter,
  props: TableSlideProps
): void {
  const slide = adapter.createSlide();

  // 제목 추가
  adapter.addTitle(slide, props.title, props.theme);

  // 콘텐츠 영역 계산
  const contentArea = calculateContentArea(0.5, 1);

  // 표 추가
  adapter.addTable(
    slide,
    props.headers,
    props.rows,
    contentArea.x,
    contentArea.y,
    contentArea.w,
    contentArea.h,
    props.theme
  );
}
