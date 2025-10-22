/**
 * 감사 슬라이드 컴포넌트
 */

import { PptxAdapter } from '../../generator/pptx-adapter';
import { ThankYouSlideProps, Theme } from '../../types';

export function createThankYouSlide(
  adapter: PptxAdapter,
  props: ThankYouSlideProps
): void {
  const slide = adapter.createSlide();

  // 기본 테마 가져오기
  const theme: Theme = (adapter as any).theme;

  // 메시지 (기본값: "감사합니다")
  const message = props.message || '감사합니다';

  adapter.addCenterText(slide, message, 48, props.theme);

  // 연락처 정보
  if (props.contact) {
    slide.addText(props.contact, {
      x: 1,
      y: '65%',
      w: 8,
      h: 0.8,
      fontSize: 16,
      fontFace: theme.fonts.body.face,
      color: theme.colors.secondary.replace('#', ''),
      align: 'center',
      valign: 'top',
    });
  }
}
