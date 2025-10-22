/**
 * 인용 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { QuoteSlideProps } from '../../types';

export function createQuoteSlide(
  adapter: PptxAdapter,
  props: QuoteSlideProps
): void {
  const slide = adapter.createSlide();

  // 인용부호 도형 추가
  adapter.addShape(slide, 'roundRect', 1, 1.5, 8, 2.5, '#F5F7FA');

  // 인용문
  slide.addText(props.quote, {
    x: 1.5,
    y: 2,
    w: 7,
    h: 1.5,
    fontSize: 28,
    italic: true,
    align: 'center',
    valign: 'middle',
  });

  // 저자
  if (props.author) {
    slide.addText(`— ${props.author}`, {
      x: 1.5,
      y: 3.5,
      w: 7,
      h: 0.5,
      fontSize: 18,
      align: 'right',
      valign: 'top',
    });
  }
}
