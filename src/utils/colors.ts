/**
 * 색상 유틸리티 함수들
 */

/**
 * HEX 색상을 RGB 객체로 변환
 * @param hex HEX 색상 (예: '#FF5733')
 * @returns RGB 객체 { r, g, b }
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * HEX 색상 유효성 검사
 * @param hex HEX 색상
 * @returns 유효성 여부
 */
export function isValidHex(hex: string): boolean {
  return /^#?([a-f\d]{6})$/i.test(hex);
}

/**
 * 색상 밝기 계산 (0-255)
 * @param hex HEX 색상
 * @returns 밝기 값
 */
export function getColorBrightness(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * 색상이 밝은지 어두운지 판단
 * @param hex HEX 색상
 * @returns 밝으면 true, 어두우면 false
 */
export function isLightColor(hex: string): boolean {
  return getColorBrightness(hex) > 128;
}
