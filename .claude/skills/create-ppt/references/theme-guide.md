# Theme Customization Guide

Comprehensive guide to theme system and customization.

## Preset Themes

### Professional (Default)
**Best for**: Business presentations, corporate reports
**Color Scheme**: Blue/Gray professional palette

```typescript
colors: {
  primary: '#2E5090',    // Deep blue
  secondary: '#5B7FB8',  // Medium blue
  accent: '#F0A500',     // Gold accent
}
```

### Creative
**Best for**: Marketing, design presentations, startups
**Color Scheme**: Vibrant, energetic colors

```typescript
colors: {
  primary: '#E74C3C',    // Red
  secondary: '#3498DB',  // Bright blue
  accent: '#F39C12',     // Orange
}
```

### Minimal
**Best for**: Clean, modern presentations
**Color Scheme**: Black and white base

```typescript
colors: {
  primary: '#000000',    // Black
  secondary: '#4A4A4A',  // Dark gray
  accent: '#FF6B6B',     // Soft red
}
```

### Corporate
**Best for**: Official company presentations
**Color Scheme**: Stable corporate colors

```typescript
colors: {
  primary: '#004B87',    // Corporate blue
  secondary: '#6C8EBF',  // Light blue
  accent: '#D6A51A',     // Gold
}
```

## Theme Structure

### Colors
```typescript
interface ColorPalette {
  primary: string;         // Main brand color
  secondary: string;       // Supporting color
  accent: string;          // Highlight/emphasis color
  text: {
    dark: string;          // Dark text (for light backgrounds)
    light: string;         // Light text (for dark backgrounds)
  };
  background: {
    main: string;          // Main background
    alt: string;           // Alternative background
  };
  chart: string[];         // Array of colors for charts
}
```

### Fonts
```typescript
interface FontSet {
  heading: {
    face: string;          // Font family
    size: number;          // Size in points
    bold?: boolean;        // Bold weight
  };
  body: {
    face: string;
    size: number;
  };
  emphasis: {
    face: string;
    size: number;
    bold?: boolean;
  };
  code?: {                 // Optional code font
    face: string;
    size: number;
  };
}
```

### Spacing
```typescript
interface SpacingSystem {
  margin: {
    top: number;           // Inches
    right: number;
    bottom: number;
    left: number;
  };
  gap: {
    small: number;         // Small spacing
    medium: number;        // Medium spacing
    large: number;         // Large spacing
  };
}
```

## Customization Examples

### Brand Colors
```typescript
const brandTheme: Theme = {
  name: 'Brand Theme',
  colors: {
    primary: '#YOUR_BRAND_COLOR',
    secondary: '#YOUR_SECONDARY',
    accent: '#YOUR_ACCENT',
    // ... rest of colors
  },
  // ... fonts and spacing
};
```

### Custom Fonts
```typescript
const customFonts: Theme = {
  // ... other properties
  fonts: {
    heading: {
      face: 'Montserrat',
      size: 42,
      bold: true,
    },
    body: {
      face: 'Open Sans',
      size: 16,
    },
    emphasis: {
      face: 'Montserrat',
      size: 20,
      bold: true,
    },
  },
};
```

### Tight Spacing
```typescript
const compactTheme: Theme = {
  // ... other properties
  spacing: {
    margin: {
      top: 0.3,
      right: 0.3,
      bottom: 0.3,
      left: 0.3,
    },
    gap: {
      small: 0.1,
      medium: 0.2,
      large: 0.4,
    },
  },
};
```

## Per-Slide Overrides

Override theme for individual slides:

```typescript
{
  type: 'section',
  props: {
    title: 'Important Section',
    theme: {
      colors: {
        primary: '#FF0000',  // Red for this slide only
      }
    }
  }
}
```

## Color Selection Tips

1. **Contrast**: Ensure sufficient contrast between text and background
2. **Accessibility**: Consider color-blind friendly palettes
3. **Consistency**: Use 3-5 main colors maximum
4. **Charts**: Provide 5-6 distinct colors for data visualization
5. **Brand Alignment**: Match company brand guidelines

## Font Selection Tips

1. **Readability**: Choose clear, professional fonts
2. **Hierarchy**: Use size and weight to create visual hierarchy
3. **Pairing**: Combine sans-serif heading with serif/sans-serif body
4. **Availability**: Ensure fonts are available on target systems
5. **Size**: Minimum 14pt for body text, 28pt+ for headings

## Common Pitfalls

❌ **Avoid**: Too many colors (>5 primary colors)
✅ **Better**: 2-3 main colors + 1-2 accents

❌ **Avoid**: Decorative fonts for body text
✅ **Better**: Clear, readable sans-serif fonts

❌ **Avoid**: Inconsistent spacing
✅ **Better**: Use theme spacing consistently

❌ **Avoid**: Poor contrast (light text on light background)
✅ **Better**: High contrast ratios (minimum 4.5:1)
