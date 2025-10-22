/**
 * 레이아웃 유틸리티 함수들
 */

import { Position } from '../types';

/**
 * 논리적 위치를 실제 좌표로 변환
 * @param position 논리적 위치 (예: 'center', 'middle')
 * @param slideWidth 슬라이드 너비 (기본: 10인치)
 * @param slideHeight 슬라이드 높이 (기본: 5.625인치)
 * @returns 실제 좌표
 */
export function resolvePosition(
  position: Position,
  slideWidth: number = 10,
  slideHeight: number = 5.625
): { x: number; y: number; w: number; h: number } {
  let x: number;
  let y: number;
  let w: number = typeof position.w === 'number' ? position.w : 1;
  let h: number = typeof position.h === 'number' ? position.h : 0.5;

  // x 좌표 계산
  if (typeof position.x === 'number') {
    x = position.x;
  } else {
    switch (position.x) {
      case 'left':
        x = 0.5;
        break;
      case 'center':
        x = (slideWidth - w) / 2;
        break;
      case 'right':
        x = slideWidth - w - 0.5;
        break;
      default:
        x = 0.5;
    }
  }

  // y 좌표 계산
  if (typeof position.y === 'number') {
    y = position.y;
  } else {
    switch (position.y) {
      case 'top':
        y = 0.5;
        break;
      case 'middle':
        y = (slideHeight - h) / 2;
        break;
      case 'bottom':
        y = slideHeight - h - 0.5;
        break;
      default:
        y = 0.5;
    }
  }

  return { x, y, w, h };
}

/**
 * 2단 레이아웃 계산
 * @param margin 여백
 * @param gap 간격
 * @returns 왼쪽/오른쪽 영역 좌표
 */
export function calculateTwoColumnLayout(
  margin: number = 0.5,
  gap: number = 0.3
): {
  left: { x: number; y: number; w: number; h: number };
  right: { x: number; y: number; w: number; h: number };
} {
  const slideWidth = 10;
  const slideHeight = 5.625;
  const titleHeight = 0.8;

  const contentWidth = (slideWidth - margin * 2 - gap) / 2;
  const contentHeight = slideHeight - titleHeight - margin * 2;

  return {
    left: {
      x: margin,
      y: titleHeight + margin,
      w: contentWidth,
      h: contentHeight,
    },
    right: {
      x: margin + contentWidth + gap,
      y: titleHeight + margin,
      w: contentWidth,
      h: contentHeight,
    },
  };
}

/**
 * 컨텐츠 영역 계산
 * @param margin 여백
 * @param titleHeight 제목 높이
 * @returns 콘텐츠 영역 좌표
 */
export function calculateContentArea(
  margin: number = 0.5,
  titleHeight: number = 0.8
): { x: number; y: number; w: number; h: number } {
  const slideWidth = 10;
  const slideHeight = 5.625;

  return {
    x: margin,
    y: titleHeight + margin,
    w: slideWidth - margin * 2,
    h: slideHeight - titleHeight - margin * 2,
  };
}
