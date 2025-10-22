/**
 * 섹션 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { SectionSlideProps, Theme } from '../../types';

export function createSectionSlide(
  adapter: PptxAdapter,
  props: SectionSlideProps
): void {
  const slide = adapter.createSlide();

  // 기본 테마 가져오기
  const theme: Theme = (adapter as any).theme;

  // 배경 색상 설정
  adapter.setBackground(slide, theme.colors.primary);

  // 섹션 제목 (중앙, 큰 폰트, 흰색)
  slide.addText(props.title, {
    x: 1,
    y: '35%',
    w: 8,
    h: 1.5,
    fontSize: 48,
    bold: true,
    fontFace: theme.fonts.heading.face,
    color: theme.colors.text.light.replace('#', ''),
    align: 'center',
    valign: 'middle',
  });

  // 부제목
  if (props.subtitle) {
    slide.addText(props.subtitle, {
      x: 1,
      y: '55%',
      w: 8,
      h: 0.8,
      fontSize: 24,
      fontFace: theme.fonts.body.face,
      color: theme.colors.text.light.replace('#', ''),
      align: 'center',
      valign: 'top',
    });
  }
}
