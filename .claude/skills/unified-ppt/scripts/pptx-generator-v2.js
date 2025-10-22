/**
 * PPTX Generator V2.5
 * Enhanced with Theme System 2.0 and Master Layout Patterns
 */

const PptxGenJS = require('pptxgenjs');
const { createTheme } = require('./theme-system');
const {
  addDivider,
  addSectionBadge,
  addStyledBullet,
  applyTypography,
  calculateAdaptiveTypography
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
 * Title Slide (Using Master Layout)
 */
function createTitleSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  // Apply full background layout
  const { contentArea } = applyFullBackgroundLayout(slide, theme, {
    backgroundColor: theme.colors.primary,
    cornerDecoration: 'topRight',
    decorationSize: 1.5,
    backgroundImage: props.backgroundImage,
    overlayTransparency: 40
  });

  // Main title (Hero typography with shadow)
  slide.addText(props.title, {
    x: contentArea.x,
    y: contentArea.y,
    w: contentArea.w,
    h: 1.5,
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

  // Subtitle
  if (props.subtitle) {
    slide.addText(props.subtitle, {
      x: contentArea.x,
      y: contentArea.y + 1.7,
      w: contentArea.w,
      h: 0.8,
      ...applyTypography(
        theme.typography.h3,
        theme.typography.fontFamily.body,
        theme.colors.text.light,
        {
          align: 'center',
          valign: 'middle'
        }
      )
    });
  }
}

/**
 * Content Slide (Using Master Layout)
 */
function createContentSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  // Apply standard layout
  const { contentArea } = applyStandardLayout(slide, props.title, theme);

  // Content body with adaptive typography
  const bodyText = Array.isArray(props.body) ? props.body.join('\n\n') : props.body;

  // Apply adaptive typography for long content
  const adaptedTypography = calculateAdaptiveTypography(
    bodyText,
    theme.typography.bodyLarge,
    {
      maxLength: 600,
      minFontSize: 16,
      minScaleFactor: 0.85
    }
  );

  slide.addText(bodyText, {
    x: contentArea.x,
    y: contentArea.y,
    w: contentArea.w,
    h: contentArea.h,
    ...applyTypography(
      adaptedTypography,
      theme.typography.fontFamily.body,
      theme.colors.text.dark,
      {
        valign: 'top'
      }
    )
  });
}

/**
 * Bullet Slide (Using Master Layout)
 */
function createBulletSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  // Apply standard layout
  const { contentArea } = applyStandardLayout(slide, props.title, theme, {
    contentY: 1.8,
    contentH: 4.7
  });

  // Styled bullets
  let currentY = contentArea.y;
  const lineHeight = 0.4;

  props.bullets.forEach((bullet, index) => {
    const level = bullet.level || 0;

    // Determine icon type based on level
    let iconType = null;
    if (level === 0) {
      iconType = 'arrow';  // Top level bullets get arrows
    }

    addStyledBullet(
      slide,
      bullet.text,
      contentArea.x,
      currentY,
      level,
      theme,
      iconType
    );

    currentY += lineHeight;
  });
}

/**
 * Two Column Slide (Using Master Layout)
 */
function createTwoColumnSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

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
function createSectionSlide(pptx, props, theme) {
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
function createThankYouSlide(pptx, props, theme) {
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
function createImageSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

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

  const layout = applyImageShowcaseLayout(slide, props.title, theme, arrangement);

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
        slide.addText(props.caption, {
          x: layout.caption.x,
          y: layout.caption.y,
          w: layout.caption.w,
          h: layout.caption.h,
          ...applyTypography(
            theme.typography.caption,
            theme.typography.fontFamily.body,
            theme.colors.muted,
            { align: 'center', italic: true }
          )
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
        slide.addText(props.caption, {
          x: layout.caption.x,
          y: layout.caption.y,
          w: layout.caption.w,
          h: layout.caption.h,
          ...applyTypography(
            theme.typography.caption,
            theme.typography.fontFamily.body,
            theme.colors.muted,
            { align: 'center', italic: true }
          )
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
function createChartSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  const layout = applyChartLayout(slide, props.title, theme, props.chartType || 'bar');

  // Prepare chart data
  const chartData = props.data || [];

  // Chart options based on theme
  const chartOptions = {
    x: layout.chartArea.x,
    y: layout.chartArea.y,
    w: layout.chartArea.w,
    h: layout.chartArea.h,
    chartColors: theme.colors.chart || [
      theme.colors.primary,
      theme.colors.accent,
      theme.colors.secondary
    ].map(c => c.replace('#', '')),
    showLegend: true,
    showTitle: false,
    valAxisLineShow: true,
    catAxisLineShow: true,
    valGridLine: { style: 'dot', color: theme.colors.muted.replace('#', '') }
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
function createTableSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  const layout = applyTableLayout(slide, props.title, theme);

  // Prepare table data
  const tableData = [];

  // Add header row
  if (props.headers) {
    tableData.push(props.headers);
  }

  // Add data rows
  if (props.rows) {
    tableData.push(...props.rows);
  }

  // Table options based on theme
  const tableOptions = {
    x: layout.tableArea.x,
    y: layout.tableArea.y,
    w: layout.tableArea.w,
    h: layout.tableArea.h,
    colW: props.columnWidths || undefined,
    rowH: 0.4,
    border: { pt: 1, color: theme.colors.muted.replace('#', '') },
    fill: { color: theme.colors.background.main.replace('#', '') },
    color: theme.colors.text.dark.replace('#', ''),
    fontSize: theme.typography.body.fontSize,
    fontFace: theme.typography.fontFamily.body,
    align: 'left',
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
function createQuoteSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  // Apply quote layout
  const { quoteArea, authorArea } = applyQuoteLayout(slide, theme, {
    showQuoteMark: props.showQuoteMark !== false
  });

  // Quote text (large, centered, italic)
  const quoteText = props.quote || props.text;
  slide.addText(quoteText, {
    x: quoteArea.x,
    y: quoteArea.y,
    w: quoteArea.w,
    h: quoteArea.h,
    fontSize: 32,
    italic: true,
    color: theme.colors.text.dark.replace('#', ''),
    fontFace: 'Georgia',
    align: 'center',
    valign: 'middle'
  });

  // Author (smaller, right-aligned)
  if (props.author) {
    slide.addText(`— ${props.author}`, {
      x: authorArea.x,
      y: authorArea.y,
      w: authorArea.w,
      h: authorArea.h,
      fontSize: theme.typography.h3.fontSize,
      color: theme.colors.muted.replace('#', ''),
      fontFace: theme.typography.fontFamily.body,
      align: 'right',
      valign: 'middle'
    });
  }
}

/**
 * Comparison Slide
 * Side-by-side comparison (Before/After, VS, etc.)
 */
function createComparisonSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  // Apply comparison layout
  const { leftSide, rightSide } = applyComparisonLayout(slide, props.title, theme, {
    leftLabel: props.leftLabel || 'Before',
    rightLabel: props.rightLabel || 'After'
  });

  // Left side content
  if (props.leftContent) {
    const leftText = Array.isArray(props.leftContent)
      ? props.leftContent.join('\n\n')
      : props.leftContent;

    slide.addText(leftText, {
      x: leftSide.x,
      y: leftSide.y,
      w: leftSide.w,
      h: leftSide.h,
      ...applyTypography(
        theme.typography.body,
        theme.typography.fontFamily.body,
        theme.colors.text.dark,
        { valign: 'top' }
      )
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

    slide.addText(rightText, {
      x: rightSide.x,
      y: rightSide.y,
      w: rightSide.w,
      h: rightSide.h,
      ...applyTypography(
        theme.typography.body,
        theme.typography.fontFamily.body,
        theme.colors.text.dark,
        { valign: 'top' }
      )
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
function createTimelineSlide(pptx, props, theme) {
  const slide = pptx.addSlide();

  const items = props.items || [];
  const { items: timelineItems } = applyTimelineLayout(slide, props.title, theme, items.length);

  // Add timeline items
  items.forEach((item, index) => {
    const layout = timelineItems[index];

    // Node (circle)
    slide.addShape('ellipse', {
      x: layout.node.x,
      y: layout.node.y,
      w: layout.node.w,
      h: layout.node.h,
      fill: { color: theme.colors.accent.replace('#', '') },
      line: { color: theme.colors.primary.replace('#', ''), width: 3 }
    });

    // Item title (date or milestone name)
    slide.addText(item.title || `Step ${index + 1}`, {
      x: layout.title.x,
      y: layout.title.y,
      w: layout.title.w,
      h: layout.title.h,
      ...applyTypography(
        theme.typography.body,
        theme.typography.fontFamily.heading,
        theme.colors.primary,
        {
          align: 'center',
          bold: true
        }
      )
    });

    // Item description
    if (item.description) {
      const descText = Array.isArray(item.description)
        ? item.description.join('\n')
        : item.description;

      slide.addText(descText, {
        x: layout.content.x,
        y: layout.content.y,
        w: layout.content.w,
        h: layout.content.h,
        fontSize: theme.typography.bodySmall.fontSize,
        color: theme.colors.text.dark.replace('#', ''),
        fontFace: theme.typography.fontFamily.body,
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
  switch (slideData.type) {
    case 'title':
      createTitleSlide(pptx, slideData.props, theme);
      break;
    case 'content':
      createContentSlide(pptx, slideData.props, theme);
      break;
    case 'bullet':
      createBulletSlide(pptx, slideData.props, theme);
      break;
    case 'twoColumn':
      createTwoColumnSlide(pptx, slideData.props, theme);
      break;
    case 'section':
      createSectionSlide(pptx, slideData.props, theme);
      break;
    case 'image':
      createImageSlide(pptx, slideData.props, theme);
      break;
    case 'chart':
      createChartSlide(pptx, slideData.props, theme);
      break;
    case 'table':
      createTableSlide(pptx, slideData.props, theme);
      break;
    case 'quote':
      createQuoteSlide(pptx, slideData.props, theme);
      break;
    case 'comparison':
      createComparisonSlide(pptx, slideData.props, theme);
      break;
    case 'timeline':
      createTimelineSlide(pptx, slideData.props, theme);
      break;
    case 'thankYou':
      createThankYouSlide(pptx, slideData.props, theme);
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

    console.log('\n🎨 적용된 테마:');
    console.log(`  이름: ${theme.name}`);
    console.log(`  Primary: ${theme.colors.primary}`);
    console.log(`  Accent: ${theme.colors.accent}`);
    console.log(`  Font: ${theme.typography.fontFamily.heading}`);
    console.log(`  Gradients: ${Object.keys(theme.gradients).length}개`);
    console.log(`  Icons: ${Object.keys(theme.assets.icons).length}개`);

    // 3. Generate slides
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
