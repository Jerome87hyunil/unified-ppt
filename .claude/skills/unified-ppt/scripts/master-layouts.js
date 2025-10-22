/**
 * Master Layouts System
 * Eliminates repetitive layout code by defining reusable layout patterns
 */

const {
  addAccentBar,
  addTitleWithUnderline,
  addFooter,
  addCornerDecoration,
  addOverlay
} = require('./visual-helpers');

/**
 * Standard Content Layout
 * Used by: content, bullet, twoColumn slides
 *
 * Features:
 * - Left accent bar
 * - Title with underline
 * - Footer with page number
 * - Content area placeholder
 */
function applyStandardLayout(slide, title, theme, options = {}) {
  const {
    showAccentBar = true,
    showFooter = true,
    footerText = theme.name || 'Presentation',
    contentY = 1.5,
    contentH = 5.0
  } = options;

  // Accent bar (left)
  if (showAccentBar) {
    addAccentBar(slide, 'left', theme);
  }

  // Title with underline
  addTitleWithUnderline(slide, title, 0.6, 0.5, 8.5, theme, 'h2');

  // Footer
  if (showFooter) {
    addFooter(slide, footerText, theme, true);
  }

  // Return content area dimensions for placing content
  return {
    contentArea: {
      x: 0.6,
      y: contentY,
      w: 8.9,
      h: contentH
    }
  };
}

/**
 * Full Background Layout
 * Used by: title, section slides
 *
 * Features:
 * - Full-slide background color
 * - Optional corner decorations
 * - Centered content area
 */
function applyFullBackgroundLayout(slide, theme, options = {}) {
  const {
    backgroundColor = theme.colors.primary,
    cornerDecoration = null, // 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
    decorationSize = 1.5,
    backgroundImage = null,
    overlayTransparency = 40
  } = options;

  // Background
  if (backgroundImage) {
    slide.background = { path: backgroundImage };
    addOverlay(slide, '000000', overlayTransparency);
  } else {
    slide.background = {
      fill: backgroundColor.replace('#', '')
    };
  }

  // Corner decoration
  if (cornerDecoration) {
    addCornerDecoration(slide, cornerDecoration, theme, decorationSize);
  }

  // Return centered content area
  return {
    contentArea: {
      x: 0.5,
      y: 2.5,
      w: 9.0,
      h: 2.5
    }
  };
}

/**
 * Light Background Layout
 * Used by: thankYou, summary slides
 *
 * Features:
 * - Light background color
 * - Multiple corner decorations
 * - Centered content
 */
function applyLightBackgroundLayout(slide, theme, options = {}) {
  const {
    backgroundColor = theme.colors.background.alt,
    decorations = ['topLeft', 'bottomRight'],
    decorationSize = 1.0
  } = options;

  // Light background
  slide.background = {
    fill: backgroundColor.replace('#', '')
  };

  // Corner decorations
  decorations.forEach(position => {
    addCornerDecoration(slide, position, theme, decorationSize);
  });

  // Return centered content area
  return {
    contentArea: {
      x: 0.5,
      y: 2.5,
      w: 9.0,
      h: 3.0
    }
  };
}

/**
 * Two Column Layout
 * Used by: twoColumn, comparison slides
 *
 * Features:
 * - Standard layout base
 * - Center divider
 * - Left/right content areas
 */
function applyTwoColumnLayout(slide, title, theme, options = {}) {
  const {
    dividerType = 'dash', // 'solid', 'dash', 'dot'
    dividerColor = theme.colors.muted,
    gapWidth = 0.4
  } = options;

  // Apply standard layout
  const { contentArea } = applyStandardLayout(slide, title, theme, {
    contentY: 1.8,
    contentH: 4.5
  });

  // Center divider
  const dividerX = 4.95;
  slide.addShape('line', {
    x: dividerX,
    y: contentArea.y,
    w: 0,
    h: contentArea.h,
    line: {
      color: dividerColor.replace('#', ''),
      width: 2,
      dashType: dividerType
    }
  });

  // Return left and right content areas
  const columnWidth = (contentArea.w - gapWidth) / 2;
  return {
    leftColumn: {
      x: contentArea.x,
      y: contentArea.y,
      w: columnWidth,
      h: contentArea.h
    },
    rightColumn: {
      x: dividerX + 0.35,
      y: contentArea.y,
      w: columnWidth,
      h: contentArea.h
    }
  };
}

/**
 * Image Showcase Layout
 * Used by: image slides with different arrangements
 */
function applyImageShowcaseLayout(slide, title, theme, arrangement = 'full') {
  // Apply standard layout for title
  const { contentArea } = applyStandardLayout(slide, title, theme, {
    contentY: 1.5,
    contentH: 5.5
  });

  const layouts = {
    // Full width image
    full: {
      image: {
        x: contentArea.x,
        y: contentArea.y,
        w: contentArea.w,
        h: contentArea.h * 0.85
      },
      caption: {
        x: contentArea.x,
        y: contentArea.y + contentArea.h * 0.85 + 0.1,
        w: contentArea.w,
        h: 0.4
      }
    },

    // Side-by-side (2 images)
    sideBySide: {
      leftImage: {
        x: contentArea.x,
        y: contentArea.y,
        w: contentArea.w * 0.48,
        h: contentArea.h * 0.85
      },
      rightImage: {
        x: contentArea.x + contentArea.w * 0.52,
        y: contentArea.y,
        w: contentArea.w * 0.48,
        h: contentArea.h * 0.85
      },
      caption: {
        x: contentArea.x,
        y: contentArea.y + contentArea.h * 0.85 + 0.1,
        w: contentArea.w,
        h: 0.4
      }
    },

    // Grid (4 images)
    grid: {
      images: [
        { x: contentArea.x, y: contentArea.y, w: 4.3, h: 2.5 },
        { x: contentArea.x + 4.5, y: contentArea.y, w: 4.3, h: 2.5 },
        { x: contentArea.x, y: contentArea.y + 2.7, w: 4.3, h: 2.5 },
        { x: contentArea.x + 4.5, y: contentArea.y + 2.7, w: 4.3, h: 2.5 }
      ]
    },

    // Image left, text right
    imageLeft: {
      image: {
        x: contentArea.x,
        y: contentArea.y,
        w: contentArea.w * 0.48,
        h: contentArea.h
      },
      text: {
        x: contentArea.x + contentArea.w * 0.52,
        y: contentArea.y,
        w: contentArea.w * 0.48,
        h: contentArea.h
      }
    }
  };

  return layouts[arrangement] || layouts.full;
}

/**
 * Chart Layout
 * Used by: chart slides with data visualization
 */
function applyChartLayout(slide, title, theme, chartType = 'bar') {
  // Apply standard layout
  const { contentArea } = applyStandardLayout(slide, title, theme, {
    contentY: 1.5,
    contentH: 5.5
  });

  // Chart area (leave space for legend if needed)
  const hasLegend = true;
  const legendHeight = hasLegend ? 0.5 : 0;

  return {
    chartArea: {
      x: contentArea.x + 0.2,
      y: contentArea.y,
      w: contentArea.w - 0.4,
      h: contentArea.h - legendHeight
    },
    legendArea: hasLegend ? {
      x: contentArea.x + 0.2,
      y: contentArea.y + contentArea.h - legendHeight,
      w: contentArea.w - 0.4,
      h: legendHeight
    } : null
  };
}

/**
 * Table Layout
 * Used by: table slides with structured data
 */
function applyTableLayout(slide, title, theme) {
  // Apply standard layout
  const { contentArea } = applyStandardLayout(slide, title, theme, {
    contentY: 1.5,
    contentH: 5.5
  });

  // Table area with padding
  return {
    tableArea: {
      x: contentArea.x + 0.2,
      y: contentArea.y + 0.2,
      w: contentArea.w - 0.4,
      h: contentArea.h - 0.4
    }
  };
}

/**
 * Quote Layout
 * Used by: quote slides with large centered quote text
 */
function applyQuoteLayout(slide, theme, options = {}) {
  const {
    backgroundColor = theme.colors.background.alt,
    showQuoteMark = true
  } = options;

  // Light background
  slide.background = {
    fill: backgroundColor.replace('#', '')
  };

  // Large decorative quote mark (optional)
  if (showQuoteMark) {
    slide.addText('"', {
      x: 0.5,
      y: 1.5,
      w: 1.0,
      h: 1.0,
      fontSize: 120,
      color: theme.colors.accent.replace('#', ''),
      transparency: 70,
      fontFace: 'Georgia',
      bold: true
    });
  }

  // Return quote and author areas
  return {
    quoteArea: {
      x: 1.5,
      y: 2.0,
      w: 7.0,
      h: 3.0
    },
    authorArea: {
      x: 1.5,
      y: 5.2,
      w: 7.0,
      h: 0.6
    }
  };
}

/**
 * Comparison Layout
 * Used by: before/after, vs slides
 */
function applyComparisonLayout(slide, title, theme, options = {}) {
  const {
    dividerType = 'solid',
    leftLabel = 'Before',
    rightLabel = 'After'
  } = options;

  // Apply standard layout for title
  applyStandardLayout(slide, title, theme, {
    contentY: 2.0,
    contentH: 4.8
  });

  // Center divider (vertical)
  const dividerX = 5.0;
  slide.addShape('line', {
    x: dividerX,
    y: 2.0,
    w: 0,
    h: 4.8,
    line: {
      color: theme.colors.accent.replace('#', ''),
      width: 3,
      dashType: dividerType
    }
  });

  // Left label
  slide.addText(leftLabel, {
    x: 0.6,
    y: 1.5,
    w: 4.2,
    h: 0.4,
    fontSize: theme.typography.h3.fontSize,
    bold: true,
    color: theme.colors.primary.replace('#', ''),
    fontFace: theme.typography.fontFamily.heading,
    align: 'center'
  });

  // Right label
  slide.addText(rightLabel, {
    x: 5.2,
    y: 1.5,
    w: 4.2,
    h: 0.4,
    fontSize: theme.typography.h3.fontSize,
    bold: true,
    color: theme.colors.accent.replace('#', ''),
    fontFace: theme.typography.fontFamily.heading,
    align: 'center'
  });

  return {
    leftSide: {
      x: 0.6,
      y: 2.0,
      w: 4.2,
      h: 4.8
    },
    rightSide: {
      x: 5.2,
      y: 2.0,
      w: 4.2,
      h: 4.8
    }
  };
}

/**
 * Timeline Layout
 * Used by: timeline, process flow slides
 */
function applyTimelineLayout(slide, title, theme, itemCount = 4) {
  // Apply standard layout for title
  const { contentArea } = applyStandardLayout(slide, title, theme, {
    contentY: 1.8,
    contentH: 5.0
  });

  // Calculate timeline positions
  const timelineY = contentArea.y + 0.5;
  const timelineHeight = contentArea.h - 1.0;
  const itemWidth = contentArea.w / itemCount;
  const nodeSize = 0.4;

  // Draw timeline line
  slide.addShape('line', {
    x: contentArea.x + itemWidth / 2,
    y: timelineY,
    w: contentArea.w - itemWidth,
    h: 0,
    line: {
      color: theme.colors.muted.replace('#', ''),
      width: 3
    }
  });

  // Return timeline item positions
  const items = [];
  for (let i = 0; i < itemCount; i++) {
    const itemX = contentArea.x + (i * itemWidth) + (itemWidth / 2);
    items.push({
      node: {
        x: itemX - nodeSize / 2,
        y: timelineY - nodeSize / 2,
        w: nodeSize,
        h: nodeSize
      },
      title: {
        x: itemX - itemWidth / 2 + 0.2,
        y: timelineY + 0.5,
        w: itemWidth - 0.4,
        h: 0.4
      },
      content: {
        x: itemX - itemWidth / 2 + 0.2,
        y: timelineY + 1.0,
        w: itemWidth - 0.4,
        h: timelineHeight - 1.5
      }
    });
  }

  return { items };
}

module.exports = {
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
};
