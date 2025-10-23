/**
 * Theme System 2.0
 * Advanced theming with gradients, effects, typography, and assets
 */

/**
 * Base64 Icon Library
 * Essential icons for professional presentations
 */
const ICON_LIBRARY = {
  // Check mark icon
  check: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTYuMTdMNC44MyAxMkwzLjQxIDEzLjQxTDkgMTlMMjEgN0wxOS41OSA1LjU5TDkgMTYuMTdaIiBmaWxsPSIjMTBCOTgxIi8+Cjwvc3ZnPgo=',

  // Warning icon
  warning: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMjFIMjNMMTIgMkwxIDIxWk0xMyAxOEgxMVYxNkgxM1YxOFpNMTMgMTRIMTFWMTBIMTNWMTRaIiBmaWxsPSIjRjU5RTBCIi8+Cjwvc3ZnPgo=',

  // Info icon
  info: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTMgMTdIMTFWMTFIMTNWMTdaTTEzIDlIMTFWN0gxM1Y5WiIgZmlsbD0iIzM5ODhGRiIvPgo8L3N2Zz4K',

  // Error icon
  error: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NyAyIDIgNi40NyAyIDEyQzIgMTcuNTMgNi40NyAyMiAxMiAyMkMxNy41MyAyMiAyMiAxNy41MyAyMiAxMkMyMiA2LjQ3IDE3LjUzIDIgMTIgMlpNMTcgMTUuNTlMMTUuNTkgMTdMMTIgMTMuNDFMOC40MSAxN0w3IDE1LjU5TDEwLjU5IDEyTDcgOC40MUw4LjQxIDdMMTIgMTAuNTlMMTUuNTkgN0wxNyA4LjQxTDEzLjQxIDEyTDE3IDE1LjU5WiIgZmlsbD0iI0VGNDQ0NCIvPgo8L3N2Zz4K',

  // Star icon
  star: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDE3LjI3TDE4LjE4IDIxTDE2LjU0IDEzLjk3TDIyIDkuMjRMMTQuODEgOC42M0wxMiAyTDkuMTkgOC42M0wyIDkuMjRMNy40NiAxMy45N0w1LjgyIDIxTDEyIDE3LjI3WiIgZmlsbD0iI0ZBQ0MxNSIvPgo8L3N2Zz4K',

  // Chart icon
  chart: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNSAxOC40OUw5LjUgMTIuNDlMMTMuNSAxNi40OUwyMi41IDYuOTJMMjEuMDkgNS41TDEzLjUgMTMuNTFMOS41IDkuNTFMMiAxN1YxOUgxNFYyMUgySDE5VjE5SDIxVjE3SDIyVjE1SDIxLjA5TDMuNSAxOC40OVoiIGZpbGw9IiM4QjVDRjYiLz4KPC9zdmc+Cg==',

  // Image icon
  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDE5VjVDMjEgMy45IDE5LjkgMyAxOSAzSDVDMy45IDMgMyAzLjkgMyA1VjE5QzMgMjAuMSAzLjkgMjEgNSAyMUgxOUMyMC4xIDIxIDIxIDIwLjEgMjEgMTlaTTguNSAxMy41TDExIDE2LjUxTDE0LjUgMTJMMTkgMThINUw4LjUgMTMuNVoiIGZpbGw9IiNFQzQ4OTkiLz4KPC9zdmc+Cg==',

  // User icon
  user: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIxIDEyIDE2IDEwLjIxIDE2IDhDMTYgNS43OSAxNC4yMSA0IDEyIDRDOS43OSA0IDggNS43OSA4IDhDOCAxMC4yMSA5Ljc5IDEyIDEyIDEyWk0xMiAxNEMxMC4yNSAxNCA1LjY3IDE0LjY3IDQgMTZWMThIMjBWMTZDMTguMzMgMTQuNjcgMTMuNzUgMTQgMTIgMTRaIiBmaWxsPSIjNjM2NkYxIi8+Cjwvc3ZnPgo=',

  // Settings icon
  settings: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjE0IDEyLjk0QzE5LjE4IDEyLjY0IDE5LjIgMTIuMzMgMTkuMiAxMkMxOS4yIDExLjY3IDE5LjE4IDExLjM2IDE5LjEzIDExLjA2TDIxLjE2IDkuNDhDMjEuMzQgOS4zNCAyMS4zOSA5LjA3IDIxLjI4IDguODZMMTkuMzYgNS41NUMxOS4yNCA1LjMzIDE4Ljk4IDUuMjYgMTguNzcgNS4zNUwxNi4zOCA2LjI5QzE1Ljg4IDUuOTEgMTUuMzUgNS41OSAxNC43NiA1LjM1TDE0LjQgMi44MUMxNC4zNiAyLjU3IDE0LjE2IDIuNCAxMy45MiAyLjRIMTAuMDhDOS44NCAyLjQgOS42NCAyLjU3IDkuNiAyLjgxTDkuMjQgNS4zNUM4LjY2IDUuNTkgOC4xMiA1LjkyIDcuNjMgNi4yOUw1LjI0IDUuMzVDNS4wMyA1LjI2IDQuNzcgNS4zMyA0LjY1IDUuNTVMMi43NCA4Ljg2QzIuNjIgOS4wOCAyLjY2IDkuMzQgMi44NiA5LjQ4TDQuODkgMTEuMDZDNC44NCAxMS4zNiA0LjggMTEuNjggNC44IDEyQzQuOCAxMi4zMiA0LjgyIDEyLjY0IDQuODcgMTIuOTRMMi44NCAxNC41MkMyLjY2IDE0LjY2IDIuNjEgMTQuOTMgMi43MiAxNS4xNEw0LjY0IDE4LjQ1QzQuNzYgMTguNjcgNS4wMiAxOC43NCA1LjIzIDE4LjY1TDcuNjIgMTcuNzFDOC4xMiAxOC4wOSA4LjY1IDE4LjQxIDkuMjQgMTguNjVMOS42IDIxLjE5QzkuNjQgMjEuNDMgOS44NCAyMS42IDEwLjA4IDIxLjZIMTMuOTJDMTQuMTYgMjEuNiAxNC4zNiAyMS40MyAxNC40IDIxLjE5TDE0Ljc2IDE4LjY1QzE1LjM0IDE4LjQxIDE1Ljg4IDE4LjA5IDE2LjM3IDE3LjcxTDE4Ljc2IDE4LjY1QzE4Ljk3IDE4Ljc0IDE5LjIzIDE4LjY3IDE5LjM1IDE4LjQ1TDIxLjI3IDE1LjE0QzIxLjM5IDE0LjkzIDIxLjM0IDE0LjY2IDIxLjE1IDE0LjUyTDE5LjE0IDEyLjk0Wk0xMiAxNS42QzkuNjggMTUuNiA3LjggMTMuNzIgNy44IDExLjRDNy44IDkuMDggOS42OCA3LjIgMTIgNy4yQzE0LjMyIDcuMiAxNi4yIDkuMDggMTYuMiAxMS40QzE2LjIgMTMuNzIgMTQuMzIgMTUuNiAxMiAxNS42WiIgZmlsbD0iIzY0NzQ4QiIvPgo8L3N2Zz4K',

  // Arrow right icon
  arrow: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDRMMTAuNTkgNS40MUwxNi4xNyAxMUg0VjEzSDE2LjE3TDEwLjU5IDE4LjU5TDEyIDIwTDIwIDEyTDEyIDRaIiBmaWxsPSIjMjU2M0VCIi8+Cjwvc3ZnPgo='
};

/**
 * Gradient Presets
 */
const GRADIENT_PRESETS = {
  modern: {
    angle: 135,
    stops: [
      { position: 0, color: '2563EB', transparency: 0 },
      { position: 100, color: '7C3AED', transparency: 0 }
    ]
  },
  sunset: {
    angle: 45,
    stops: [
      { position: 0, color: 'FF6B6B', transparency: 0 },
      { position: 50, color: 'FFA500', transparency: 0 },
      { position: 100, color: 'FFD700', transparency: 0 }
    ]
  },
  ocean: {
    angle: 90,
    stops: [
      { position: 0, color: '0EA5E9', transparency: 0 },
      { position: 100, color: '06B6D4', transparency: 0 }
    ]
  },
  forest: {
    angle: 180,
    stops: [
      { position: 0, color: '10B981', transparency: 0 },
      { position: 100, color: '059669', transparency: 0 }
    ]
  },
  subtle: {
    angle: 135,
    stops: [
      { position: 0, color: 'F9FAFB', transparency: 0 },
      { position: 100, color: 'E5E7EB', transparency: 0 }
    ]
  }
};

/**
 * Effect Presets
 */
const EFFECT_PRESETS = {
  textShadow: {
    soft: {
      type: 'outer',
      blur: 3,
      offset: 1,
      angle: 45,
      color: '000000',
      opacity: 0.2
    },
    medium: {
      type: 'outer',
      blur: 6,
      offset: 2,
      angle: 45,
      color: '000000',
      opacity: 0.3
    },
    strong: {
      type: 'outer',
      blur: 10,
      offset: 3,
      angle: 45,
      color: '000000',
      opacity: 0.4
    },
    dramatic: {
      type: 'outer',
      blur: 15,
      offset: 5,
      angle: 45,
      color: '000000',
      opacity: 0.5
    }
  },
  shapeShadow: {
    subtle: {
      type: 'outer',
      blur: 8,
      offset: 2,
      angle: 90,
      color: '000000',
      opacity: 0.1
    },
    elevated: {
      type: 'outer',
      blur: 12,
      offset: 4,
      angle: 90,
      color: '000000',
      opacity: 0.15
    },
    floating: {
      type: 'outer',
      blur: 20,
      offset: 8,
      angle: 90,
      color: '000000',
      opacity: 0.2
    },
    deep: {
      type: 'outer',
      blur: 30,
      offset: 12,
      angle: 90,
      color: '000000',
      opacity: 0.25
    }
  },
  glow: {
    soft: {
      type: 'outer',
      blur: 10,
      offset: 0,
      angle: 0,
      color: 'FFFFFF',
      opacity: 0.3
    },
    strong: {
      type: 'outer',
      blur: 20,
      offset: 0,
      angle: 0,
      color: 'FFFFFF',
      opacity: 0.5
    }
  }
};

/**
 * Typography Scale
 */
const TYPOGRAPHY_SCALE = {
  hero: {
    fontSize: 60,
    bold: true,
    charSpacing: 2,
    lineSpacing: 32
  },
  h1: {
    fontSize: 44,
    bold: true,
    lineSpacing: 28
  },
  h2: {
    fontSize: 32,
    bold: true,
    lineSpacing: 24
  },
  h3: {
    fontSize: 24,
    bold: true,
    lineSpacing: 20
  },
  body: {
    fontSize: 18,
    lineSpacing: 20
  },
  bodyLarge: {
    fontSize: 20,
    lineSpacing: 22
  },
  bodySmall: {
    fontSize: 16,
    lineSpacing: 18
  },
  caption: {
    fontSize: 14,
    italic: true,
    lineSpacing: 16
  },
  code: {
    fontSize: 16,
    lineSpacing: 18
    // Use theme.typography.fontFamily.mono for Courier New
  },
  highlight: {
    fontSize: 18,
    bold: true,
    lineSpacing: 20
  },
  subtitle: {
    fontSize: 22,
    italic: true,
    lineSpacing: 24
  }
};

/**
 * Convert gradient definition to PptxGenJS format
 * Transforms theme gradient format to native PptxGenJS gradient API
 *
 * PptxGenJS gradient format (from official GitHub example):
 * {
 *   type: 'gradient',
 *   linearAngle: 90,  // Note: linearAngle, not angle!
 *   stops: [          // Note: stops with 'pos', not 'position'!
 *     { pos: 0, color: 'C1F15E' },
 *     { pos: 100, color: '7FA03E' }
 *   ]
 * }
 * Source: https://github.com/gitbrent/PptxGenJS/issues/102
 */
function convertGradientToPptxGenJS(gradientDef) {
  if (!gradientDef || !gradientDef.stops) return null;

  // Convert 'position' to 'pos' and map to PptxGenJS format
  return {
    type: 'gradient',
    linearAngle: gradientDef.angle || 90,
    stops: gradientDef.stops.map(stop => ({
      pos: stop.position,
      color: stop.color
      // PptxGenJS doesn't support transparency in stops for backgrounds
    }))
  };
}

/**
 * Layout Patterns
 */
const LAYOUT_PATTERNS = {
  accentBar: {
    left: { x: 0, y: 0, w: 0.1, h: 7.5 },
    right: { x: 9.9, y: 0, w: 0.1, h: 7.5 },
    top: { x: 0, y: 0, w: 10, h: 0.1 },
    bottom: { x: 0, y: 7.4, w: 10, h: 0.1 }
  },
  divider: {
    thin: { h: 0.02 },
    medium: { h: 0.05 },
    thick: { h: 0.1 }
  },
  spacing: {
    margin: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 },
    padding: { top: 0.3, right: 0.3, bottom: 0.3, left: 0.3 },
    gap: { small: 0.2, medium: 0.4, large: 0.8 }
  }
};

/**
 * Create Professional Theme (Modern style)
 */
function createProfessionalTheme(designSystem) {
  const { colors, fonts } = designSystem;

  return {
    name: 'professional',
    colors: {
      primary: colors.primary || '#2563EB',
      secondary: colors.secondary || '#7C3AED',
      accent: colors.accent || '#FF6B6B',
      text: {
        dark: colors.foreground || '#1F2937',
        light: '#FFFFFF'
      },
      background: {
        main: colors.background || '#FFFFFF',
        alt: '#F9FAFB'
      },
      muted: colors.muted || '#6B7280'
    },
    gradients: {
      hero: GRADIENT_PRESETS.modern,
      accent: GRADIENT_PRESETS.sunset,
      subtle: GRADIENT_PRESETS.subtle
    },
    effects: {
      textShadow: EFFECT_PRESETS.textShadow.soft,
      textShadowStrong: EFFECT_PRESETS.textShadow.strong,
      shapeShadow: EFFECT_PRESETS.shapeShadow.elevated
    },
    typography: {
      ...TYPOGRAPHY_SCALE,
      fontFamily: {
        heading: extractFontFamily(fonts.sans) || 'Arial',
        body: extractFontFamily(fonts.sans) || 'Arial',
        mono: extractFontFamily(fonts.mono) || 'Courier New'
      }
    },
    layout: LAYOUT_PATTERNS,
    assets: {
      icons: ICON_LIBRARY
    }
  };
}

/**
 * Create Minimal Theme
 */
function createMinimalTheme(designSystem) {
  const { colors, fonts } = designSystem;

  return {
    name: 'minimal',
    colors: {
      primary: colors.primary || '#000000',
      secondary: colors.secondary || '#4B5563',
      accent: colors.accent || '#6B7280',
      text: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      background: {
        main: '#FFFFFF',
        alt: '#F9FAFB'
      },
      muted: '#9CA3AF'
    },
    gradients: {
      hero: GRADIENT_PRESETS.subtle,
      accent: {
        angle: 90,
        stops: [
          { position: 0, color: '000000', transparency: 0 },
          { position: 100, color: '4B5563', transparency: 0 }
        ]
      },
      subtle: GRADIENT_PRESETS.subtle
    },
    effects: {
      textShadow: null,  // No shadows in minimal
      textShadowStrong: null,
      shapeShadow: EFFECT_PRESETS.shapeShadow.subtle
    },
    typography: {
      ...TYPOGRAPHY_SCALE,
      fontFamily: {
        heading: extractFontFamily(fonts.sans) || 'Arial',
        body: extractFontFamily(fonts.sans) || 'Arial',
        mono: extractFontFamily(fonts.mono) || 'Courier New'
      }
    },
    layout: LAYOUT_PATTERNS,
    assets: {
      icons: ICON_LIBRARY
    }
  };
}

/**
 * Create Corporate Theme
 */
function createCorporateTheme(designSystem) {
  const { colors, fonts } = designSystem;

  return {
    name: 'corporate',
    colors: {
      primary: colors.primary || '#1E40AF',
      secondary: colors.secondary || '#1E3A8A',
      accent: colors.accent || '#3B82F6',
      text: {
        dark: '#1F2937',
        light: '#FFFFFF'
      },
      background: {
        main: '#FFFFFF',
        alt: '#F3F4F6'
      },
      muted: '#6B7280'
    },
    gradients: {
      hero: {
        angle: 90,
        stops: [
          { position: 0, color: '1E40AF', transparency: 0 },
          { position: 100, color: '1E3A8A', transparency: 0 }
        ]
      },
      accent: GRADIENT_PRESETS.ocean,
      subtle: GRADIENT_PRESETS.subtle
    },
    effects: {
      textShadow: EFFECT_PRESETS.textShadow.soft,
      textShadowStrong: EFFECT_PRESETS.textShadow.medium,
      shapeShadow: EFFECT_PRESETS.shapeShadow.subtle
    },
    typography: {
      ...TYPOGRAPHY_SCALE,
      fontFamily: {
        heading: extractFontFamily(fonts.sans) || 'Arial',
        body: extractFontFamily(fonts.sans) || 'Arial',
        mono: extractFontFamily(fonts.mono) || 'Courier New'
      }
    },
    layout: LAYOUT_PATTERNS,
    assets: {
      icons: ICON_LIBRARY
    }
  };
}

/**
 * Extract font family from CSS font string
 */
function extractFontFamily(fontString) {
  if (!fontString) return null;
  const first = fontString.split(',')[0].trim();

  // Normalize common web fonts to PowerPoint-safe fonts
  const fontMap = {
    'Inter': 'Arial',
    'Roboto': 'Arial',
    'Open Sans': 'Arial',
    'Helvetica': 'Arial',
    'JetBrains Mono': 'Courier New',
    'Fira Code': 'Courier New',
    'Consolas': 'Courier New',
    'Monaco': 'Courier New',
    'Georgia': 'Georgia',
    'Merriweather': 'Georgia'
  };

  const normalized = first.replace(/['"]/g, '');
  return fontMap[normalized] || normalized;
}

/**
 * Create theme based on theme name
 */
function createTheme(themeName, designSystem) {
  switch (themeName) {
    case 'minimal':
      return createMinimalTheme(designSystem);
    case 'corporate':
      return createCorporateTheme(designSystem);
    case 'professional':
    default:
      return createProfessionalTheme(designSystem);
  }
}

module.exports = {
  createTheme,
  createProfessionalTheme,
  createMinimalTheme,
  createCorporateTheme,
  convertGradientToPptxGenJS,
  ICON_LIBRARY,
  GRADIENT_PRESETS,
  EFFECT_PRESETS,
  TYPOGRAPHY_SCALE,
  LAYOUT_PATTERNS
};
