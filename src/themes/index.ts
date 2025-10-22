/**
 * 테마 모음
 *
 * @module themes
 */

import { Theme } from '../types';
import { professionalTheme } from './professional';
import { creativeTheme } from './creative';
import { minimalTheme } from './minimal';
import { corporateTheme } from './corporate';

/**
 * 사용 가능한 모든 테마
 */
export const themes = {
  professional: professionalTheme,
  creative: creativeTheme,
  minimal: minimalTheme,
  corporate: corporateTheme,
} as const;

/**
 * 테마 이름 타입
 */
export type ThemeName = keyof typeof themes;

/**
 * 테마 이름으로 테마 가져오기
 */
export function getTheme(name: ThemeName): Theme {
  return themes[name];
}

/**
 * 모든 테마 이름 목록
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}

// 개별 테마도 export
export { professionalTheme, creativeTheme, minimalTheme, corporateTheme };
