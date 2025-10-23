/**
 * PPTX Generator V2.5
 * Enhanced with Theme System 2.0 and Master Layout Patterns
 */

const PptxGenJS = require('pptxgenjs');
const { createTheme } = require('./theme-system');
const {
  addAccentBar,
  addDivider,
  addSectionBadge,
  addStyledBullet,
  applyTypography,
  calculateAdaptiveTypography,
  mergeSlideStyles,
  applyBackground
} = require('./visual-helpers');
const {
  applyStandardLayout,
  applyFullBackgroundLayout,
  applyLightBackgroundLayout,
  applyTwoColumnLayout,
  applyImageShowcaseLayout,
  applyChartLayout,
  applyTableLayout,
  applyQuoteLayout,
  applyComparisonLayout,
  applyTimelineLayout
} = require('./master-layouts');

/**
 * Title Slide (Supports Custom Styles)
 */
function createTitleSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide();

  // Apply background (custom or default)
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  } else if (props.backgroundImage) {
    const { addOverlay } = require('./visual-helpers');
    slide.background = { path: props.backgroundImage };
    addOverlay(slide, '000000', 40);
  } else {
    slide.background = { fill: theme.colors.primary.replace('#', '') };
  }

  // Content area (centered)
  const contentArea = {
    x: 0.5,
    y: 2.5,
    w: 9.0,
    h: 2.5
  };

  // Merge title style
  const titleStyle = mergeSlideStyles(theme.typography.hero, customStyle.title || {});
  const titleFontFamily = customStyle.title?.fontFamily || theme.typography.fontFamily.heading;
  const titleColor = customStyle.title?.color || theme.colors.text.light;
  const titleAlign = customStyle.title?.align || 'center';

  // Main title
  slide.addText(props.title, {
    x: contentArea.x,
    y: contentArea.y,
    w: contentArea.w,
    h: 1.5,
    ...applyTypography(
      titleStyle,
      titleFontFamily,
      titleColor,
      {
        align: titleAlign,
        valign: 'middle',
        ...(theme.effects.textShadowStrong && {
          shadow: theme.effects.textShadowStrong
        })
      }
    )
  });

  // Subtitle
  if (props.subtitle) {
    const subtitleStyle = mergeSlideStyles(theme.typography.h3, customStyle.subtitle || {});
    const subtitleFontFamily = customStyle.subtitle?.fontFamily || theme.typography.fontFamily.body;
    const subtitleColor = customStyle.subtitle?.color || theme.colors.text.light;
    const subtitleAlign = customStyle.subtitle?.align || 'center';

    slide.addText(props.subtitle, {
      x: contentArea.x,
      y: contentArea.y + 1.7,
      w: contentArea.w,
      h: 0.8,
      ...applyTypography(
        subtitleStyle,
        subtitleFontFamily,
        subtitleColor,
        {
          align: subtitleAlign,
          valign: 'middle'
        }
      )
    });
  }
}

/**
 * Content Slide (Using Master Layout)
 */
function createContentSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide();

  // Apply custom background if specified
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  // Accent bar (left) - use custom color if specified
  if (customStyle.accentBar !== false) {
    const accentColor = customStyle.accentBar?.color || theme.colors.accent;
    const tempTheme = { ...theme, colors: { ...theme.colors, accent: accentColor } };
    addAccentBar(slide, 'left', tempTheme);
  }

  // Title styling
  const titleStyle = mergeSlideStyles(theme.typography.h2, customStyle.title || {});
  const titleFontFamily = customStyle.title?.fontFamily || theme.typography.fontFamily.heading;
  const titleColor = customStyle.title?.color || theme.colors.primary;
  const titleAlign = customStyle.title?.align || 'left';

  // Add title with underline
  const titleY = 0.5;
  slide.addText(props.title, {
    x: 0.6,
    y: titleY,
    w: 8.5,
    h: titleStyle.fontSize / 72,
    ...applyTypography(
      titleStyle,
      titleFontFamily,
      titleColor,
      {
        align: titleAlign,
        ...(theme.effects.textShadow && { shadow: theme.effects.textShadow })
      }
    )
  });

  // Title underline
  const dividerColor = customStyle.divider?.color || theme.colors.accent;
  const tempThemeForDivider = { ...theme, colors: { ...theme.colors, accent: dividerColor } };
  addDivider(slide, 0.6, titleY + titleStyle.fontSize / 72 + 0.1, 8.5 * 0.3, tempThemeForDivider, 'medium');

  // Content body with adaptive typography
  const bodyText = Array.isArray(props.body) ? props.body.join('\n\n') : props.body;

  // Base body typography
  const baseBodyTypography = customStyle.body?.fontSize
    ? mergeSlideStyles(theme.typography.bodyLarge, customStyle.body)
    : theme.typography.bodyLarge;

  // Apply adaptive typography for long content
  const adaptedTypography = calculateAdaptiveTypography(
    bodyText,
    baseBodyTypography,
    {
      maxLength: customStyle.body?.maxLength || 600,
      minFontSize: customStyle.body?.minFontSize || 16,
      minScaleFactor: customStyle.body?.minScaleFactor || 0.85
    }
  );

  const bodyFontFamily = customStyle.body?.fontFamily || theme.typography.fontFamily.body;
  const bodyColor = customStyle.body?.color || theme.colors.text.dark;
  const bodyAlign = customStyle.body?.align || 'left';

  const contentArea = {
    x: 0.6,
    y: 1.5,
    w: 8.9,
    h: 5.0
  };

  slide.addText(bodyText, {
    x: contentArea.x,
    y: contentArea.y,
    w: contentArea.w,
    h: contentArea.h,
    ...applyTypography(
      adaptedTypography,
      bodyFontFamily,
      bodyColor,
      {
        align: bodyAlign,
        valign: 'top'
      }
    )
  });
}

/**
 * Bullet Slide (Using Master Layout)
 */
function createBulletSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide();

  // Apply custom background if specified
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  // Accent bar (left) - use custom color if specified
  if (customStyle.accentBar !== false) {
    const accentColor = customStyle.accentBar?.color || theme.colors.accent;
    const tempTheme = { ...theme, colors: { ...theme.colors, accent: accentColor } };
    addAccentBar(slide, 'left', tempTheme);
  }

  // Title styling
  const titleStyle = mergeSlideStyles(theme.typography.h2, customStyle.title || {});
  const titleFontFamily = customStyle.title?.fontFamily || theme.typography.fontFamily.heading;
  const titleColor = customStyle.title?.color || theme.colors.primary;
  const titleAlign = customStyle.title?.align || 'left';

  // Add title with underline
  const titleY = 0.5;
  slide.addText(props.title, {
    x: 0.6,
    y: titleY,
    w: 8.5,
    h: titleStyle.fontSize / 72,
    ...applyTypography(
      titleStyle,
      titleFontFamily,
      titleColor,
      {
        align: titleAlign,
        ...(theme.effects.textShadow && { shadow: theme.effects.textShadow })
      }
    )
  });

  // Title underline
  const dividerColor = customStyle.divider?.color || theme.colors.accent;
  const tempThemeForDivider = { ...theme, colors: { ...theme.colors, accent: dividerColor } };
  addDivider(slide, 0.6, titleY + titleStyle.fontSize / 72 + 0.1, 8.5 * 0.3, tempThemeForDivider, 'medium');

  // Content area for bullets
  const contentArea = {
    x: 0.6,
    y: 1.8,
    w: 8.9,
    h: 4.7
  };

  // Styled bullets
  let currentY = contentArea.y;
  const lineHeight = customStyle.bullets?.lineHeight || 0.4;

  // Create custom theme for bullets if colors are specified
  const bulletTheme = customStyle.bullets ? {
    ...theme,
    colors: {
      ...theme.colors,
      primary: customStyle.bullets.primaryColor || theme.colors.primary,
      secondary: customStyle.bullets.secondaryColor || theme.colors.secondary,
      muted: customStyle.bullets.mutedColor || theme.colors.muted
    },
    typography: {
      ...theme.typography,
      body: customStyle.bullets.fontSize ? {
        ...theme.typography.body,
        fontSize: customStyle.bullets.fontSize
      } : theme.typography.body,
      fontFamily: {
        ...theme.typography.fontFamily,
        body: customStyle.bullets.fontFamily || theme.typography.fontFamily.body
      }
    }
  } : theme;

  props.bullets.forEach((bullet, index) => {
    const level = bullet.level || 0;

    // Determine icon type based on level
    let iconType = null;
    if (level === 0 && customStyle.bullets?.iconType !== false) {
      iconType = customStyle.bullets?.iconType || 'arrow';  // Top level bullets get arrows
    }

    addStyledBullet(
      slide,
      bullet.text,
      contentArea.x,
      currentY,
      level,
      bulletTheme,
      iconType
    );

    currentY += lineHeight;
  });
}

/**
 * Two Column Slide (Using Master Layout)
 */
function createTwoColumnSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide({});

  // Apply two column layout
  const { leftColumn, rightColumn } = applyTwoColumnLayout(slide, props.title, theme);

  // Left column content
  slide.addText(props.leftContent, {
    x: leftColumn.x,
    y: leftColumn.y,
    w: leftColumn.w,
    h: leftColumn.h,
    ...applyTypography(
      theme.typography.body,
      theme.typography.fontFamily.body,
      theme.colors.text.dark,
      {
        valign: 'top'
      }
    )
  });

  // Right column content
  slide.addText(props.rightContent, {
    x: rightColumn.x,
    y: rightColumn.y,
    w: rightColumn.w,
    h: rightColumn.h,
    ...applyTypography(
      theme.typography.body,
      theme.typography.fontFamily.body,
      theme.colors.text.dark,
      {
        valign: 'top'
      }
    )
  });
}

/**
 * Section Slide (Using Master Layout)
 */
function createSectionSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide();

  // Apply full background layout
  applyFullBackgroundLayout(slide, theme, {
    backgroundColor: theme.colors.primary
  });

  // Section number badge (if provided)
  if (props.number) {
    addSectionBadge(slide, props.number, theme);
  }

  // Section title (large, centered)
  slide.addText(props.title, {
    x: 0.5,
    y: 2.5,
    w: 9.0,
    h: 2.0,
    ...applyTypography(
      theme.typography.hero,
      theme.typography.fontFamily.heading,
      theme.colors.text.light,
      {
        align: 'center',
        valign: 'middle',
        ...(theme.effects.textShadowStrong && {
          shadow: theme.effects.textShadowStrong
        })
      }
    )
  });

  // Decorative line
  addDivider(slide, 2, 4.7, 6, theme, 'medium');
}

/**
 * Thank You Slide (Using Master Layout)
 */
function createThankYouSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide();

  // Apply light background layout
  const { contentArea } = applyLightBackgroundLayout(slide, theme, {
    decorations: ['topLeft', 'bottomRight'],
    decorationSize: 1.0
  });

  // Main message
  slide.addText(props.message || '감사합니다', {
    x: contentArea.x,
    y: contentArea.y,
    w: contentArea.w,
    h: 1.5,
    ...applyTypography(
      theme.typography.hero,
      theme.typography.fontFamily.heading,
      theme.colors.primary,
      {
        align: 'center',
        valign: 'middle',
        ...(theme.effects.textShadow && {
          shadow: theme.effects.textShadow
        })
      }
    )
  });

  // Decorative underline
  addDivider(slide, 3, contentArea.y + 1.7, 4, theme, 'medium');

  // Contact info
  if (props.contact) {
    slide.addText(props.contact, {
      x: contentArea.x,
      y: contentArea.y + 2.3,
      w: contentArea.w,
      h: 0.5,
      ...applyTypography(
        theme.typography.bodyLarge,
        theme.typography.fontFamily.body,
        theme.colors.muted,
        {
          align: 'center',
          valign: 'middle'
        }
      )
    });
  }
}

/**
 * Image Slide (Advanced Layouts)
 * Supports: full, sideBySide, grid, imageLeft arrangements
 * Auto-detects layout based on image count if arrangement not specified
 */
function createImageSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide({});

  // Apply background
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  // Auto-detect arrangement based on image count if not specified
  let arrangement = props.arrangement;
  if (!arrangement) {
    const imageCount = props.images ? props.images.length : (props.image ? 1 : 0);
    if (imageCount === 1) {
      arrangement = 'full';
    } else if (imageCount === 2) {
      arrangement = 'sideBySide';
    } else if (imageCount >= 3) {
      arrangement = 'grid';
    } else {
      arrangement = 'full'; // Default
    }
  }

  const layout = applyImageShowcaseLayout(slide, props.title, theme, arrangement, customStyle.title);

  switch (arrangement) {
    case 'full':
      // Single full-width image
      if (props.image) {
        slide.addImage({
          path: props.image,
          x: layout.image.x,
          y: layout.image.y,
          w: layout.image.w,
          h: layout.image.h,
          sizing: { type: 'contain', w: layout.image.w, h: layout.image.h }
        });
      }

      // Caption
      if (props.caption) {
        const captionColor = customStyle.caption?.color || theme.colors.muted;
        const captionFontSize = customStyle.caption?.fontSize || theme.typography.caption.fontSize;
        const captionFontFamily = customStyle.caption?.fontFamily || theme.typography.fontFamily.body;
        const captionAlign = customStyle.caption?.align || 'center';
        const captionItalic = customStyle.caption?.italic !== false;

        slide.addText(props.caption, {
          x: layout.caption.x,
          y: layout.caption.y,
          w: layout.caption.w,
          h: layout.caption.h,
          fontSize: captionFontSize,
          color: captionColor.replace('#', ''),
          fontFace: captionFontFamily,
          align: captionAlign,
          italic: captionItalic
        });
      }
      break;

    case 'sideBySide':
      // Two images side by side
      if (props.images && props.images.length >= 2) {
        slide.addImage({
          path: props.images[0],
          x: layout.leftImage.x,
          y: layout.leftImage.y,
          w: layout.leftImage.w,
          h: layout.leftImage.h,
          sizing: { type: 'contain', w: layout.leftImage.w, h: layout.leftImage.h }
        });

        slide.addImage({
          path: props.images[1],
          x: layout.rightImage.x,
          y: layout.rightImage.y,
          w: layout.rightImage.w,
          h: layout.rightImage.h,
          sizing: { type: 'contain', w: layout.rightImage.w, h: layout.rightImage.h }
        });
      }

      if (props.caption) {
        const captionColor = customStyle.caption?.color || theme.colors.muted;
        const captionFontSize = customStyle.caption?.fontSize || theme.typography.caption.fontSize;
        const captionFontFamily = customStyle.caption?.fontFamily || theme.typography.fontFamily.body;
        const captionAlign = customStyle.caption?.align || 'center';
        const captionItalic = customStyle.caption?.italic !== false;

        slide.addText(props.caption, {
          x: layout.caption.x,
          y: layout.caption.y,
          w: layout.caption.w,
          h: layout.caption.h,
          fontSize: captionFontSize,
          color: captionColor.replace('#', ''),
          fontFace: captionFontFamily,
          align: captionAlign,
          italic: captionItalic
        });
      }
      break;

    case 'grid':
      // 2x2 grid of images
      if (props.images && props.images.length >= 1) {
        props.images.slice(0, 4).forEach((imagePath, index) => {
          const imgLayout = layout.images[index];
          slide.addImage({
            path: imagePath,
            x: imgLayout.x,
            y: imgLayout.y,
            w: imgLayout.w,
            h: imgLayout.h,
            sizing: { type: 'contain', w: imgLayout.w, h: imgLayout.h }
          });
        });
      }
      break;

    case 'imageLeft':
      // Image on left, text on right
      if (props.image) {
        slide.addImage({
          path: props.image,
          x: layout.image.x,
          y: layout.image.y,
          w: layout.image.w,
          h: layout.image.h,
          sizing: { type: 'contain', w: layout.image.w, h: layout.image.h }
        });
      }

      if (props.text) {
        const bodyText = Array.isArray(props.text) ? props.text.join('\n\n') : props.text;
        slide.addText(bodyText, {
          x: layout.text.x,
          y: layout.text.y,
          w: layout.text.w,
          h: layout.text.h,
          ...applyTypography(
            theme.typography.body,
            theme.typography.fontFamily.body,
            theme.colors.text.dark,
            { valign: 'top' }
          )
        });
      }
      break;
  }
}

/**
 * Chart Slide (Native PptxGenJS Charts)
 */
function createChartSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide({});

  // Apply background
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  const layout = applyChartLayout(slide, props.title, theme, props.chartType || 'bar', customStyle.title);

  // Prepare chart data
  const chartData = props.data || [];

  // Chart colors (customizable)
  const defaultColors = theme.colors.chart || [
    theme.colors.primary,
    theme.colors.accent,
    theme.colors.secondary
  ];
  const chartColors = customStyle.chartColors || defaultColors;

  // Grid line color
  const gridColor = customStyle.gridColor || theme.colors.muted;

  // Chart options based on theme + custom styles
  const chartOptions = {
    x: layout.chartArea.x,
    y: layout.chartArea.y,
    w: layout.chartArea.w,
    h: layout.chartArea.h,
    chartColors: chartColors.map(c => c.replace('#', '')),
    showLegend: customStyle.showLegend !== false,
    showTitle: false,
    valAxisLineShow: customStyle.showAxisLines !== false,
    catAxisLineShow: customStyle.showAxisLines !== false,
    valGridLine: {
      style: customStyle.gridStyle || 'dot',
      color: gridColor.replace('#', '')
    }
  };

  // Add chart based on type
  switch (props.chartType) {
    case 'bar':
      slide.addChart(pptx.ChartType.bar, chartData, chartOptions);
      break;
    case 'line':
      slide.addChart(pptx.ChartType.line, chartData, chartOptions);
      break;
    case 'pie':
      slide.addChart(pptx.ChartType.pie, chartData, chartOptions);
      break;
    case 'area':
      slide.addChart(pptx.ChartType.area, chartData, chartOptions);
      break;
    default:
      slide.addChart(pptx.ChartType.bar, chartData, chartOptions);
  }
}

/**
 * Table Slide (Enhanced Tables)
 */
function createTableSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide({});

  // Apply background
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  const layout = applyTableLayout(slide, props.title, theme, customStyle.title);

  // Prepare table data
  const tableData = [];

  // Border styling
  const borderColor = customStyle.border?.color || theme.colors.muted;
  const borderWidth = customStyle.border?.width || 1;

  // Body styling
  const bodyBgColor = customStyle.body?.backgroundColor || theme.colors.background.main;
  const bodyTextColor = customStyle.body?.textColor || theme.colors.text.dark;
  const bodyFontSize = customStyle.body?.fontSize || theme.typography.body.fontSize;

  // Add header row
  if (props.headers) {
    const headerBgColor = customStyle.header?.backgroundColor || theme.colors.primary;
    const headerTextColor = customStyle.header?.textColor || '#FFFFFF';
    const headerFontSize = customStyle.header?.fontSize || theme.typography.body.fontSize;

    // Style header cells
    const styledHeaders = props.headers.map(cell => ({
      text: cell,
      options: {
        fill: { color: headerBgColor.replace('#', '') },
        color: headerTextColor.replace('#', ''),
        fontSize: headerFontSize,
        bold: true
      }
    }));
    tableData.push(styledHeaders);
  }

  // Add data rows
  if (props.rows) {
    tableData.push(...props.rows);
  }

  // Table options based on theme + custom styles
  const tableOptions = {
    x: layout.tableArea.x,
    y: layout.tableArea.y,
    w: layout.tableArea.w,
    h: layout.tableArea.h,
    colW: props.columnWidths || undefined,
    rowH: customStyle.rowHeight || 0.4,
    border: { pt: borderWidth, color: borderColor.replace('#', '') },
    fill: { color: bodyBgColor.replace('#', '') },
    color: bodyTextColor.replace('#', ''),
    fontSize: bodyFontSize,
    fontFace: theme.typography.fontFamily.body,
    align: customStyle.align || 'left',
    valign: 'middle'
  };

  // Add table
  slide.addTable(tableData, tableOptions);

  // Style header row if present
  if (props.headers && tableData.length > 0) {
    // Headers are styled with first row formatting
    // PptxGenJS applies special styling to first row automatically
  }
}

/**
 * Quote Slide
 * Large centered quote with author attribution
 */
function createQuoteSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide();

  // Apply background
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  // Apply quote layout
  const { quoteArea, authorArea } = applyQuoteLayout(slide, theme, {
    showQuoteMark: props.showQuoteMark !== false
  });

  // Quote text (large, centered, italic)
  const quoteText = props.quote || props.text;
  const quoteColor = customStyle.quote?.color || theme.colors.text.dark;
  const quoteFontSize = customStyle.quote?.fontSize || 32;
  const quoteFontFamily = customStyle.quote?.fontFamily || 'Georgia';
  const quoteItalic = customStyle.quote?.italic !== false;
  const quoteAlign = customStyle.quote?.align || 'center';

  slide.addText(quoteText, {
    x: quoteArea.x,
    y: quoteArea.y,
    w: quoteArea.w,
    h: quoteArea.h,
    fontSize: quoteFontSize,
    italic: quoteItalic,
    color: quoteColor.replace('#', ''),
    fontFace: quoteFontFamily,
    align: quoteAlign,
    valign: 'middle'
  });

  // Author (smaller, right-aligned)
  if (props.author) {
    const authorColor = customStyle.author?.color || theme.colors.muted;
    const authorFontSize = customStyle.author?.fontSize || theme.typography.h3.fontSize;
    const authorFontFamily = customStyle.author?.fontFamily || theme.typography.fontFamily.body;
    const authorAlign = customStyle.author?.align || 'right';

    slide.addText(`— ${props.author}`, {
      x: authorArea.x,
      y: authorArea.y,
      w: authorArea.w,
      h: authorArea.h,
      fontSize: authorFontSize,
      color: authorColor.replace('#', ''),
      fontFace: authorFontFamily,
      align: authorAlign,
      valign: 'middle'
    });
  }
}

/**
 * Comparison Slide
 * Side-by-side comparison (Before/After, VS, etc.)
 */
function createComparisonSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide({});

  // Apply background
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  // Apply comparison layout
  const { leftSide, rightSide } = applyComparisonLayout(slide, props.title, theme, {
    leftLabel: props.leftLabel || 'Before',
    rightLabel: props.rightLabel || 'After'
  }, customStyle.title);

  // Left side content
  if (props.leftContent) {
    const leftText = Array.isArray(props.leftContent)
      ? props.leftContent.join('\n\n')
      : props.leftContent;

    const leftColor = customStyle.leftContent?.color || theme.colors.text.dark;
    const leftFontSize = customStyle.leftContent?.fontSize || theme.typography.body.fontSize;
    const leftFontFamily = customStyle.leftContent?.fontFamily || theme.typography.fontFamily.body;

    slide.addText(leftText, {
      x: leftSide.x,
      y: leftSide.y,
      w: leftSide.w,
      h: leftSide.h,
      fontSize: leftFontSize,
      color: leftColor.replace('#', ''),
      fontFace: leftFontFamily,
      valign: 'top'
    });
  }

  // Left side image (alternative to text)
  if (props.leftImage) {
    slide.addImage({
      path: props.leftImage,
      x: leftSide.x,
      y: leftSide.y,
      w: leftSide.w,
      h: leftSide.h,
      sizing: { type: 'contain', w: leftSide.w, h: leftSide.h }
    });
  }

  // Right side content
  if (props.rightContent) {
    const rightText = Array.isArray(props.rightContent)
      ? props.rightContent.join('\n\n')
      : props.rightContent;

    const rightColor = customStyle.rightContent?.color || theme.colors.text.dark;
    const rightFontSize = customStyle.rightContent?.fontSize || theme.typography.body.fontSize;
    const rightFontFamily = customStyle.rightContent?.fontFamily || theme.typography.fontFamily.body;

    slide.addText(rightText, {
      x: rightSide.x,
      y: rightSide.y,
      w: rightSide.w,
      h: rightSide.h,
      fontSize: rightFontSize,
      color: rightColor.replace('#', ''),
      fontFace: rightFontFamily,
      valign: 'top'
    });
  }

  // Right side image (alternative to text)
  if (props.rightImage) {
    slide.addImage({
      path: props.rightImage,
      x: rightSide.x,
      y: rightSide.y,
      w: rightSide.w,
      h: rightSide.h,
      sizing: { type: 'contain', w: rightSide.w, h: rightSide.h }
    });
  }
}

/**
 * Timeline Slide
 * Horizontal timeline with events/milestones
 */
function createTimelineSlide(pptx, props, theme, customStyle = {}) {
  const slide = pptx.addSlide({});

  // Apply background
  if (customStyle.background) {
    applyBackground(slide, customStyle.background, theme);
  }

  const items = props.items || [];
  const { items: timelineItems } = applyTimelineLayout(slide, props.title, theme, items.length, customStyle.title);

  // Node colors
  const nodeFillColor = customStyle.node?.fillColor || theme.colors.accent;
  const nodeBorderColor = customStyle.node?.borderColor || theme.colors.primary;
  const nodeBorderWidth = customStyle.node?.borderWidth || 3;

  // Add timeline items
  items.forEach((item, index) => {
    const layout = timelineItems[index];

    // Node (circle)
    slide.addShape('ellipse', {
      x: layout.node.x,
      y: layout.node.y,
      w: layout.node.w,
      h: layout.node.h,
      fill: { color: nodeFillColor.replace('#', '') },
      line: { color: nodeBorderColor.replace('#', ''), width: nodeBorderWidth }
    });

    // Item title (date or milestone name)
    const itemTitleColor = customStyle.itemTitle?.color || theme.colors.primary;
    const itemTitleFontSize = customStyle.itemTitle?.fontSize || theme.typography.body.fontSize;
    const itemTitleFontFamily = customStyle.itemTitle?.fontFamily || theme.typography.fontFamily.heading;

    slide.addText(item.title || `Step ${index + 1}`, {
      x: layout.title.x,
      y: layout.title.y,
      w: layout.title.w,
      h: layout.title.h,
      fontSize: itemTitleFontSize,
      color: itemTitleColor.replace('#', ''),
      fontFace: itemTitleFontFamily,
      align: 'center',
      bold: true
    });

    // Item description
    if (item.description) {
      const descText = Array.isArray(item.description)
        ? item.description.join('\n')
        : item.description;

      const itemDescColor = customStyle.itemDescription?.color || theme.colors.text.dark;
      const itemDescFontSize = customStyle.itemDescription?.fontSize || theme.typography.bodySmall.fontSize;
      const itemDescFontFamily = customStyle.itemDescription?.fontFamily || theme.typography.fontFamily.body;

      slide.addText(descText, {
        x: layout.content.x,
        y: layout.content.y,
        w: layout.content.w,
        h: layout.content.h,
        fontSize: itemDescFontSize,
        color: itemDescColor.replace('#', ''),
        fontFace: itemDescFontFamily,
        align: 'center',
        valign: 'top'
      });
    }
  });
}

/**
 * Create slide based on type
 */
function createSlide(pptx, slideData, theme) {
  const { style } = slideData; // Extract custom style from slide definition

  switch (slideData.type) {
    case 'title':
      createTitleSlide(pptx, slideData.props, theme, style);
      break;
    case 'content':
      createContentSlide(pptx, slideData.props, theme, style);
      break;
    case 'bullet':
      createBulletSlide(pptx, slideData.props, theme, style);
      break;
    case 'twoColumn':
      createTwoColumnSlide(pptx, slideData.props, theme, style);
      break;
    case 'section':
      createSectionSlide(pptx, slideData.props, theme, style);
      break;
    case 'image':
      createImageSlide(pptx, slideData.props, theme, style);
      break;
    case 'chart':
      createChartSlide(pptx, slideData.props, theme, style);
      break;
    case 'table':
      createTableSlide(pptx, slideData.props, theme, style);
      break;
    case 'quote':
      createQuoteSlide(pptx, slideData.props, theme, style);
      break;
    case 'comparison':
      createComparisonSlide(pptx, slideData.props, theme, style);
      break;
    case 'timeline':
      createTimelineSlide(pptx, slideData.props, theme, style);
      break;
    case 'thankYou':
      createThankYouSlide(pptx, slideData.props, theme, style);
      break;
    default:
      console.warn(`⚠️ 지원하지 않는 슬라이드 타입: ${slideData.type}`);
  }
}

/**
 * Generate PPTX with Theme System 2.0
 */
async function generatePPTX(slides, designSystem, outputPath, themeName = 'professional') {
  console.log('\n📦 PPTX 생성 시작 (Theme System 2.0)...');
  console.log(`출력 파일: ${outputPath}`);
  console.log(`슬라이드 수: ${slides.length}`);
  console.log(`테마: ${themeName}`);

  try {
    // 1. Create PptxGenJS instance
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = designSystem.projectName || 'PPT-AUTO';
    pptx.title = 'Generated Presentation';
    pptx.subject = 'Auto-generated with unified-ppt';

    // 2. Create theme from design system
    const theme = createTheme(themeName, designSystem);

    // 3. Define Master Slide for content slides
    const footerText = designSystem.projectName || pptx.author || 'Presentation';
    pptx.defineSlideMaster({
      title: 'CONTENT_MASTER',
      background: { fill: theme.colors.background.main.replace('#', '') },
      objects: [
        // Footer text (left)
        {
          text: {
            text: footerText,
            options: {
              x: 0.5,
              y: 7.2,
              w: 4.0,
              h: 0.3,
              fontSize: theme.typography.caption.fontSize,
              fontFace: theme.typography.fontFamily.body,
              color: theme.colors.muted.replace('#', ''),
              italic: theme.typography.caption.italic || false
            }
          }
        },
        // Page number placeholder (right)
        {
          placeholder: {
            options: {
              name: 'slideNumber',
              type: 'body',
              x: 9.0,
              y: 7.2,
              w: 0.5,
              h: 0.3,
              fontSize: theme.typography.caption.fontSize,
              fontFace: theme.typography.fontFamily.body,
              color: theme.colors.muted.replace('#', ''),
              align: 'right'
            }
          }
        }
      ]
    });

    console.log('\n🎨 적용된 테마:');
    console.log(`  이름: ${theme.name}`);
    console.log(`  Primary: ${theme.colors.primary}`);
    console.log(`  Accent: ${theme.colors.accent}`);
    console.log(`  Font: ${theme.typography.fontFamily.heading}`);
    console.log(`  Gradients: ${Object.keys(theme.gradients).length}개`);
    console.log(`  Icons: ${Object.keys(theme.assets.icons).length}개`);

    // 4. Generate slides
    console.log('\n🔄 슬라이드 생성 중...');
    slides.forEach((slide, index) => {
      const slideNumber = String(index + 1).padStart(2, '0');
      console.log(`  ✅ 슬라이드 ${slideNumber} (${slide.type})`);
      createSlide(pptx, slide, theme);
    });

    // 4. Save PPTX file
    console.log('\n💾 PPTX 파일 저장 중...');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`✅ 저장 완료: ${outputPath}`);

    return {
      success: true,
      outputPath,
      slideCount: slides.length,
      theme: theme.name
    };

  } catch (error) {
    console.error('\n❌ PPTX 생성 실패:', error.message);
    throw error;
  }
}

module.exports = {
  generatePPTX
};
