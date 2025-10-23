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
 * Requires PptxGenJS-compatible gradient format from convertGradientToPptxGenJS
 */
function addGradientBackground(slide, pptxGradient) {
  if (!pptxGradient || pptxGradient.type !== 'gradient') {
    console.warn('⚠️ Invalid gradient format. Use convertGradientToPptxGenJS to convert.');
    return;
  }

  slide.background = {
    fill: pptxGradient
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
 * Enhanced with level-specific styling for improved visual hierarchy
 */
function addStyledBullet(slide, text, x, y, level, theme, iconType = null) {
  // Level-specific styling configuration
  const levelConfig = {
    0: {
      indent: 0,
      bulletSize: 0.12,
      iconSize: 0.15,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text.dark,
      bulletColor: theme.colors.primary
    },
    1: {
      indent: 0.5,
      bulletSize: 0.09,
      iconSize: 0.12,
      fontSize: theme.typography.body.fontSize - 2,
      color: theme.colors.text.dark,
      bulletColor: theme.colors.secondary || theme.colors.primary
    },
    2: {
      indent: 1.0,
      bulletSize: 0.07,
      iconSize: 0.1,
      fontSize: theme.typography.body.fontSize - 4,
      color: theme.colors.muted,
      bulletColor: theme.colors.muted
    }
  };

  const config = levelConfig[Math.min(level, 2)] || levelConfig[2];
  const gap = 0.1;

  if (iconType && theme.assets.icons[iconType] && level === 0) {
    // Custom icon bullet (only for top level)
    slide.addImage({
      data: theme.assets.icons[iconType],
      x: x + config.indent,
      y: y + 0.05,
      w: config.iconSize,
      h: config.iconSize
    });
  } else {
    // Shape-based bullet (circle for level 0-1, dash for level 2)
    if (level < 2) {
      // Circle bullet
      slide.addShape('ellipse', {
        x: x + config.indent,
        y: y + 0.1,
        w: config.bulletSize,
        h: config.bulletSize,
        fill: { color: config.bulletColor.replace('#', '') }
      });
    } else {
      // Dash bullet for level 2
      slide.addShape('rect', {
        x: x + config.indent,
        y: y + 0.13,
        w: 0.15,
        h: 0.03,
        fill: { color: config.bulletColor.replace('#', '') }
      });
    }
  }

  // Text with level-specific styling
  slide.addText(text, {
    x: x + config.indent + config.iconSize + gap,
    y,
    w: 9 - x - config.indent - config.iconSize - gap,
    h: 0.3,
    fontSize: config.fontSize,
    fontFace: theme.typography.fontFamily.body,
    color: config.color.replace('#', '')
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
  // Ensure colorHex is a string (handle objects or other types gracefully)
  const colorString = typeof colorHex === 'string' ? colorHex : String(colorHex || '');

  return {
    fontSize: typography.fontSize,
    bold: typography.bold || false,
    italic: typography.italic || false,
    fontFace: fontFamily,
    color: colorString.replace('#', ''),
    ...(typography.charSpacing && { charSpacing: typography.charSpacing }),
    ...(typography.lineSpacing && { lineSpacing: typography.lineSpacing }),
    ...additionalOptions
  };
}

/**
 * Calculate adaptive typography based on content length
 * Dynamically adjusts font size and line spacing to fit content
 */
function calculateAdaptiveTypography(text, baseTypography, constraints = {}) {
  const {
    maxLength = 500,
    minFontSize = 14,
    maxFontSize = null,
    minScaleFactor = 0.8
  } = constraints;

  const textLength = typeof text === 'string' ? text.length : 0;

  if (textLength > maxLength) {
    // Calculate scale factor based on text length
    const scaleFactor = Math.max(minScaleFactor, maxLength / textLength);

    const adaptedFontSize = Math.max(
      minFontSize,
      Math.round(baseTypography.fontSize * scaleFactor)
    );

    const adaptedLineSpacing = baseTypography.lineSpacing
      ? Math.round(baseTypography.lineSpacing * scaleFactor)
      : undefined;

    return {
      ...baseTypography,
      fontSize: maxFontSize ? Math.min(adaptedFontSize, maxFontSize) : adaptedFontSize,
      ...(adaptedLineSpacing && { lineSpacing: adaptedLineSpacing })
    };
  }

  return baseTypography;
}

/**
 * Merge custom slide styles with theme defaults
 * Custom styles take precedence over theme styles
 * Performs deep merge for nested objects
 *
 * @param {Object} themeStyle - Default styles from theme
 * @param {Object} customStyle - Custom styles from slides.json
 * @returns {Object} Merged style object
 *
 * @example
 * const theme = { title: { fontSize: 48, color: "#FFF" } };
 * const custom = { title: { fontSize: 60 } };
 * mergeSlideStyles(theme, custom);
 * // Returns: { title: { fontSize: 60, color: "#FFF" } }
 */
function mergeSlideStyles(themeStyle, customStyle) {
  // No custom style - return theme defaults
  if (!customStyle || Object.keys(customStyle).length === 0) {
    return themeStyle;
  }

  // Start with theme defaults
  const merged = { ...themeStyle };

  // Override with custom styles
  for (const key in customStyle) {
    if (customStyle[key] && typeof customStyle[key] === 'object' && !Array.isArray(customStyle[key])) {
      // Nested object - deep merge to preserve unspecified properties
      merged[key] = {
        ...(merged[key] || {}),
        ...customStyle[key]
      };
    } else {
      // Primitive value or array - direct override
      merged[key] = customStyle[key];
    }
  }

  return merged;
}

/**
 * Apply background to slide from custom style configuration
 * Supports: HEX color, gradient (by name or custom), and image backgrounds
 *
 * @param {Object} slide - PptxGenJS slide instance
 * @param {string|Object} backgroundConfig - Background configuration
 *   - string: HEX color (e.g., "#2563EB")
 *   - { gradient: "hero" }: Theme gradient by name
 *   - { gradient: { angle, stops } }: Custom gradient definition
 *   - { image: "path", overlay: { color, transparency } }: Image with overlay
 * @param {Object} theme - Theme object with colors and gradients
 *
 * @example
 * applyBackground(slide, "#2563EB", theme); // Solid color
 * applyBackground(slide, { gradient: "hero" }, theme); // Theme gradient
 * applyBackground(slide, { image: "bg.jpg", overlay: { transparency: 50 } }, theme);
 */
function applyBackground(slide, backgroundConfig, theme) {
  // Import convertGradientToPptxGenJS on demand to avoid circular dependency
  const { convertGradientToPptxGenJS } = require('./theme-system');

  if (!backgroundConfig) {
    // No background specified - use theme default
    slide.background = { fill: theme.colors.primary.replace('#', '') };
    return;
  }

  // Case 1: Simple HEX color string
  if (typeof backgroundConfig === 'string') {
    slide.background = { fill: backgroundConfig.replace('#', '') };
    return;
  }

  // Case 2: Gradient by name (from theme)
  // TODO: PptxGenJS gradient support needs more investigation
  // Currently falling back to solid color
  if (backgroundConfig.gradient && typeof backgroundConfig.gradient === 'string') {
    console.warn(`⚠️ Gradient backgrounds not yet fully supported. Using primary color. (Requested: ${backgroundConfig.gradient})`);
    slide.background = { fill: theme.colors.primary.replace('#', '') };
    return;
  }

  // Case 3: Custom gradient definition
  // TODO: PptxGenJS gradient support needs more investigation
  if (backgroundConfig.gradient && typeof backgroundConfig.gradient === 'object') {
    console.warn(`⚠️ Custom gradient backgrounds not yet fully supported. Using primary color.`);
    slide.background = { fill: theme.colors.primary.replace('#', '') };
    return;
  }

  // Case 4: Image with optional overlay
  if (backgroundConfig.image) {
    slide.background = { path: backgroundConfig.image };
    if (backgroundConfig.overlay) {
      addOverlay(
        slide,
        backgroundConfig.overlay.color || '000000',
        backgroundConfig.overlay.transparency || 40
      );
    }
    return;
  }

  // Fallback: use theme primary color
  slide.background = { fill: theme.colors.primary.replace('#', '') };
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
  applyTypography,
  calculateAdaptiveTypography,
  mergeSlideStyles,
  applyBackground
};
