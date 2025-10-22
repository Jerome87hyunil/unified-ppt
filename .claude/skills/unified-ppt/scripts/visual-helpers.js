/**
 * Visual Helpers
 * Reusable visual elements and layout patterns
 */

/**
 * Add accent bar to slide
 */
function addAccentBar(slide, position, theme) {
  const patterns = theme.layout.accentBar;
  const pos = patterns[position] || patterns.left;

  slide.addShape('rect', {
    x: pos.x,
    y: pos.y,
    w: pos.w,
    h: pos.h,
    fill: { color: theme.colors.accent.replace('#', '') }
  });
}

/**
 * Add divider line
 */
function addDivider(slide, x, y, width, theme, style = 'medium') {
  const thickness = theme.layout.divider[style];

  slide.addShape('rect', {
    x,
    y,
    w: width,
    h: thickness.h,
    fill: { color: theme.colors.accent.replace('#', '') }
  });
}

/**
 * Add title with underline
 */
function addTitleWithUnderline(slide, text, x, y, width, theme, typography = 'h1') {
  const typo = theme.typography[typography];
  const fontFamily = theme.typography.fontFamily;

  // Title text
  slide.addText(text, {
    x,
    y,
    w: width,
    h: typo.fontSize / 72,  // Convert pt to inches
    fontSize: typo.fontSize,
    bold: typo.bold,
    color: theme.colors.primary.replace('#', ''),
    fontFace: fontFamily.heading,
    ...(theme.effects.textShadow && { shadow: convertShadow(theme.effects.textShadow) })
  });

  // Underline
  addDivider(slide, x, y + typo.fontSize / 72 + 0.1, width * 0.3, theme, 'medium');
}

/**
 * Add gradient background to slide
 */
function addGradientBackground(slide, gradientPreset) {
  slide.background = {
    fill: gradientPreset.stops.map(stop => ({
      color: stop.color,
      position: stop.position,
      transparency: stop.transparency || 0
    }))
  };
}

/**
 * Add overlay to slide (for text readability over images)
 */
function addOverlay(slide, color = '000000', transparency = 50) {
  slide.addShape('rect', {
    x: 0,
    y: 0,
    w: 10,
    h: 7.5,
    fill: {
      color: color,
      transparency: transparency
    }
  });
}

/**
 * Add corner decoration
 */
function addCornerDecoration(slide, position, theme, size = 1) {
  const positions = {
    topLeft: { x: 0, y: 0, flipH: false, flipV: false },
    topRight: { x: 10 - size, y: 0, flipH: true, flipV: false },
    bottomLeft: { x: 0, y: 7.5 - size, flipH: false, flipV: true },
    bottomRight: { x: 10 - size, y: 7.5 - size, flipH: true, flipV: true }
  };

  const pos = positions[position] || positions.topRight;

  slide.addShape('triangle', {
    x: pos.x,
    y: pos.y,
    w: size,
    h: size,
    fill: {
      color: theme.colors.accent.replace('#', ''),
      transparency: 70
    },
    flipH: pos.flipH,
    flipV: pos.flipV
  });
}

/**
 * Add icon with text
 */
function addIconText(slide, iconType, text, x, y, theme) {
  const iconSize = 0.3;
  const gap = 0.1;

  // Icon (if available)
  if (theme.assets.icons[iconType]) {
    slide.addImage({
      data: theme.assets.icons[iconType],
      x,
      y,
      w: iconSize,
      h: iconSize
    });
  }

  // Text
  slide.addText(text, {
    x: x + iconSize + gap,
    y,
    w: 8 - iconSize - gap,
    h: iconSize,
    fontSize: theme.typography.body.fontSize,
    fontFace: theme.typography.fontFamily.body,
    color: theme.colors.text.dark.replace('#', ''),
    valign: 'middle'
  });
}

/**
 * Add footer with page number
 */
function addFooter(slide, text, theme, showPageNumber = true) {
  const y = 7.2;

  // Footer text (left)
  slide.addText(text, {
    x: 0.5,
    y,
    w: 4,
    h: 0.3,
    fontSize: theme.typography.caption.fontSize,
    fontFace: theme.typography.fontFamily.body,
    color: theme.colors.muted.replace('#', ''),
    italic: theme.typography.caption.italic
  });

  // Page number (right)
  if (showPageNumber) {
    slide.addText('{{slideNumber}}', {
      x: 9,
      y,
      w: 0.5,
      h: 0.3,
      fontSize: theme.typography.caption.fontSize,
      fontFace: theme.typography.fontFamily.body,
      color: theme.colors.muted.replace('#', ''),
      align: 'right'
    });
  }
}

/**
 * Add section number badge
 */
function addSectionBadge(slide, number, theme) {
  const size = 0.8;
  const x = 0.5;
  const y = 0.5;

  // Circle background
  slide.addShape('ellipse', {
    x,
    y,
    w: size,
    h: size,
    fill: { color: theme.colors.accent.replace('#', '') },
    ...(theme.effects.shapeShadow && { shadow: convertShadow(theme.effects.shapeShadow) })
  });

  // Number
  slide.addText(String(number), {
    x,
    y,
    w: size,
    h: size,
    fontSize: 32,
    bold: true,
    color: theme.colors.text.light.replace('#', ''),
    fontFace: theme.typography.fontFamily.heading,
    align: 'center',
    valign: 'middle'
  });
}

/**
 * Create bullet point with custom style
 */
function addStyledBullet(slide, text, x, y, level, theme, iconType = null) {
  const indent = level * 0.4;
  const iconSize = 0.15;
  const gap = 0.1;

  if (iconType && theme.assets.icons[iconType]) {
    // Custom icon bullet
    slide.addImage({
      data: theme.assets.icons[iconType],
      x: x + indent,
      y: y + 0.05,
      w: iconSize,
      h: iconSize
    });
  } else {
    // Circle bullet
    const bulletSize = level === 0 ? 0.1 : 0.08;
    slide.addShape('ellipse', {
      x: x + indent,
      y: y + 0.1,
      w: bulletSize,
      h: bulletSize,
      fill: { color: theme.colors.primary.replace('#', '') }
    });
  }

  // Text
  slide.addText(text, {
    x: x + indent + iconSize + gap,
    y,
    w: 9 - x - indent - iconSize - gap,
    h: 0.3,
    fontSize: theme.typography.body.fontSize - (level * 2),
    fontFace: theme.typography.fontFamily.body,
    color: theme.colors.text.dark.replace('#', '')
  });
}

/**
 * Convert theme shadow to PptxGenJS format
 */
function convertShadow(shadowDef) {
  if (!shadowDef) return undefined;

  return {
    type: shadowDef.type,
    blur: shadowDef.blur,
    offset: shadowDef.offset,
    angle: shadowDef.angle,
    color: shadowDef.color,
    opacity: shadowDef.opacity
  };
}

/**
 * Apply typography style to text options
 */
function applyTypography(typography, fontFamily, colorHex, additionalOptions = {}) {
  return {
    fontSize: typography.fontSize,
    bold: typography.bold || false,
    italic: typography.italic || false,
    fontFace: fontFamily,
    color: colorHex.replace('#', ''),
    ...(typography.charSpacing && { charSpacing: typography.charSpacing }),
    ...(typography.lineSpacing && { lineSpacing: typography.lineSpacing }),
    ...additionalOptions
  };
}

module.exports = {
  addAccentBar,
  addDivider,
  addTitleWithUnderline,
  addGradientBackground,
  addOverlay,
  addCornerDecoration,
  addIconText,
  addFooter,
  addSectionBadge,
  addStyledBullet,
  convertShadow,
  applyTypography
};
