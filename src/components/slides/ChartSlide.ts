/**
 * 차트 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { ChartSlideProps } from '../../types';
import { calculateContentArea } from '../../utils/layout';

export function createChartSlide(
  adapter: PptxAdapter,
  props: ChartSlideProps
): void {
  const slide = adapter.createSlide();

  // 제목 추가
  adapter.addTitle(slide, props.title, props.theme);

  // 콘텐츠 영역 계산
  const contentArea = calculateContentArea(0.5, 1);

  // 차트 데이터 변환
  const chartData = props.data.datasets.map((dataset) => ({
    name: dataset.name,
    labels: props.data.labels,
    values: dataset.values,
  }));

  // 차트 추가
  adapter.addChart(
    slide,
    props.chartType,
    chartData,
    contentArea.x,
    contentArea.y,
    contentArea.w,
    contentArea.h,
    props.theme
  );
}
