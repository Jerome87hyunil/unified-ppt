/**
 * PptxGenJS 어댑터
 * 테마와 컴포넌트를 PptxGenJS API로 변환
 */

import PptxGenJS from 'pptxgenjs';
import { Theme } from '../types';
import { isLightColor } from '../utils/colors';

export class PptxAdapter {
  private pres: PptxGenJS;
  private theme: Theme;
  private currentSlide: any = null;

  constructor(theme: Theme) {
    this.pres = new PptxGenJS();
    this.theme = theme;
    this.initializePresentation();
  }

  /**
   * 프레젠테이션 초기화
   */
  private initializePresentation(): void {
    // 16:9 레이아웃 설정
    this.pres.layout = 'LAYOUT_16x9';
  }

  /**
   * 프레젠테이션 객체 반환
   */
  getPresentation(): PptxGenJS {
    return this.pres;
  }

  /**
   * 슬라이드 생성
   */
  createSlide(): any {
    this.currentSlide = this.pres.addSlide();
    return this.currentSlide;
  }

  /**
   * 현재 슬라이드 반환
   */
  getCurrentSlide(): any {
    return this.currentSlide;
  }

  /**
   * 제목 텍스트 추가
   */
  addTitle(slide: any, text: string, customTheme?: Partial<Theme>): void {
    const theme = this.mergeTheme(customTheme);

    slide.addText(text, {
      x: theme.spacing.margin.left,
      y: theme.spacing.margin.top,
      w: 10 - theme.spacing.margin.left - theme.spacing.margin.right,
      h: 0.8,
      fontSize: theme.fonts.heading.size,
      bold: theme.fonts.heading.bold,
      fontFace: theme.fonts.heading.face,
      color: theme.colors.primary.replace('#', ''),
      align: 'left',
      valign: 'middle',
    });
  }

  /**
   * 본문 텍스트 추가
   */
  addBodyText(
    slide: any,
    text: string | string[],
    x: number,
    y: number,
    w: number,
    h: number,
    customTheme?: Partial<Theme>
  ): void {
    const theme = this.mergeTheme(customTheme);
    const content = Array.isArray(text) ? text.join('\n\n') : text;

    slide.addText(content, {
      x,
      y,
      w,
      h,
      fontSize: theme.fonts.body.size,
      fontFace: theme.fonts.body.face,
      color: theme.colors.text.dark.replace('#', ''),
      align: 'left',
      valign: 'top',
    });
  }

  /**
   * 불릿 포인트 추가
   */
  addBullets(
    slide: any,
    bullets: Array<{ text: string; level?: number }>,
    x: number,
    y: number,
    w: number,
    h: number,
    customTheme?: Partial<Theme>
  ): void {
    const theme = this.mergeTheme(customTheme);

    const bulletOptions = bullets.map((bullet) => ({
      text: bullet.text,
      options: {
        bullet: true,
        indentLevel: bullet.level || 0,
        fontSize: theme.fonts.body.size,
        fontFace: theme.fonts.body.face,
        color: theme.colors.text.dark.replace('#', ''),
      },
    }));

    slide.addText(bulletOptions, {
      x,
      y,
      w,
      h,
      valign: 'top',
    });
  }

  /**
   * 이미지 추가
   */
  addImage(
    slide: any,
    imagePath: string,
    x: number,
    y: number,
    w: number,
    h: number
  ): void {
    slide.addImage({
      path: imagePath,
      x,
      y,
      w,
      h,
    });
  }

  /**
   * 배경 설정
   */
  setBackground(slide: any, color: string): void {
    slide.background = { color: color.replace('#', '') };
  }

  /**
   * 차트 추가
   */
  addChart(
    slide: any,
    type: string,
    data: any,
    x: number,
    y: number,
    w: number,
    h: number,
    customTheme?: Partial<Theme>
  ): void {
    const theme = this.mergeTheme(customTheme);

    const chartType = this.mapChartType(type);

    slide.addChart(chartType, data, {
      x,
      y,
      w,
      h,
      chartColors: theme.colors.chart.map((c) => c.replace('#', '')),
      showLegend: true,
      showTitle: false,
    });
  }

  /**
   * 표 추가
   */
  addTable(
    slide: any,
    headers: string[],
    rows: string[][],
    x: number,
    y: number,
    w: number,
    h: number,
    customTheme?: Partial<Theme>
  ): void {
    const theme = this.mergeTheme(customTheme);

    const tableData = [
      headers.map((header) => ({
        text: header,
        options: {
          bold: true,
          fill: theme.colors.primary.replace('#', ''),
          color: isLightColor(theme.colors.primary)
            ? theme.colors.text.dark.replace('#', '')
            : theme.colors.text.light.replace('#', ''),
        },
      })),
      ...rows.map((row) =>
        row.map((cell) => ({
          text: cell,
        }))
      ),
    ];

    slide.addTable(tableData, {
      x,
      y,
      w,
      h,
      fontSize: theme.fonts.body.size - 2,
      fontFace: theme.fonts.body.face,
      border: { type: 'solid', pt: 1, color: '999999' },
    });
  }

  /**
   * 도형 추가
   */
  addShape(
    slide: any,
    type: string,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ): void {
    slide.addShape(this.pres.ShapeType[type as keyof typeof this.pres.ShapeType], {
      x,
      y,
      w,
      h,
      fill: { color: color.replace('#', '') },
    });
  }

  /**
   * 중앙 정렬 텍스트 추가
   */
  addCenterText(
    slide: any,
    text: string,
    fontSize: number,
    customTheme?: Partial<Theme>
  ): void {
    const theme = this.mergeTheme(customTheme);

    slide.addText(text, {
      x: 1,
      y: '40%',
      w: 8,
      h: 2,
      fontSize,
      fontFace: theme.fonts.heading.face,
      color: theme.colors.primary.replace('#', ''),
      align: 'center',
      valign: 'middle',
    });
  }

  /**
   * 부제목 추가
   */
  addSubtitle(slide: any, text: string, customTheme?: Partial<Theme>): void {
    const theme = this.mergeTheme(customTheme);

    slide.addText(text, {
      x: 1,
      y: '55%',
      w: 8,
      h: 1,
      fontSize: theme.fonts.body.size,
      fontFace: theme.fonts.body.face,
      color: theme.colors.secondary.replace('#', ''),
      align: 'center',
      valign: 'top',
    });
  }

  /**
   * 테마 병합
   */
  private mergeTheme(customTheme?: Partial<Theme>): Theme {
    if (!customTheme) return this.theme;

    return {
      ...this.theme,
      ...customTheme,
      colors: { ...this.theme.colors, ...customTheme.colors },
      fonts: { ...this.theme.fonts, ...customTheme.fonts },
      spacing: { ...this.theme.spacing, ...customTheme.spacing },
    };
  }

  /**
   * 차트 타입 매핑
   */
  private mapChartType(type: string): any {
    const typeMap: { [key: string]: any } = {
      bar: this.pres.ChartType.bar,
      line: this.pres.ChartType.line,
      pie: this.pres.ChartType.pie,
      area: this.pres.ChartType.area,
      column: this.pres.ChartType.bar, // column은 bar와 동일
    };

    return typeMap[type] || this.pres.ChartType.bar;
  }
}
