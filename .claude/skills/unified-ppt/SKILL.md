---
name: unified-ppt
description: This skill should be used when users want to generate PowerPoint presentations that reflect their project's design system (CSS variables, colors, fonts). The skill analyzes the project's design system and creates brand-consistent presentations using PptxGenJS native approach, ensuring fully editable and high-quality output.
license: MIT
---

# Unified PPT Generator

Analyze a project's design system (CSS variables, colors, fonts) and automatically generate brand-consistent PowerPoint presentations using PptxGenJS native approach.

## When to Use This Skill

Use this skill when:
- Creating presentations that should match a project's visual identity
- Converting project documentation into presentation format
- Generating design system showcases
- Building product introduction slides with consistent branding
- Creating presentations from structured slide definitions

## Key Capabilities

- **Design System Analysis**: Automatically extract CSS variables, color palettes, and typography
- **Framework Detection**: Support for React, Next.js, Vue, Nuxt, Svelte, and plain HTML
- **Style Conversion**: Handle shadcn/ui HSL format and Tailwind CSS variables
- **Native PPTX Generation**: Use PptxGenJS directly for fully editable PowerPoint files
- **12 Slide Types**: title, section, content, bullet, twoColumn, image, chart, table, quote, comparison, timeline, thankYou
- **3 Theme Presets**: professional, minimal, corporate
- **Master Layout System**: Reusable layout patterns for consistent design

## Technical Approach

### PptxGenJS Native (Current Implementation)

The skill uses PptxGenJS API directly to create native PowerPoint objects:

**Benefits**:
- ✅ Fully editable text and objects in PowerPoint
- ✅ High quality with no conversion artifacts
- ✅ Lightweight dependency (pptxgenjs ~2MB only)
- ✅ Fast generation (~0.5 seconds per slide)
- ✅ Precise layout control with inch-based positioning

**Why Not HTML → PPTX**:
- ❌ CSS compatibility issues (Flexbox, Grid unsupported)
- ❌ Quality degradation (text may become images)
- ❌ Heavy dependencies (Playwright ~200MB, Sharp ~20MB)
- ❌ Limited editability in final output

## Workflow

### Phase 1: Design System Analysis

Extract design information from the project:

1. Detect project framework (React, Next.js, Vue, etc.)
2. Locate and parse CSS files with `:root` blocks
3. Extract color variables and convert formats (HEX/RGB/HSL → HEX)
4. Extract font families and normalize to PowerPoint-safe fonts
5. Identify spacing and layout patterns

**Supported CSS Sources**:
- `src/index.css`
- `src/app/globals.css`
- `src/styles/globals.css`
- `styles/globals.css`
- `app/globals.css`

**Supported CSS Variable Formats**:
```css
:root {
  --primary: #3b82f6;                  /* Standard HEX */
  --secondary: rgb(124, 58, 237);      /* RGB */
  --accent: hsl(271, 91%, 65%);        /* HSL function */
  --brand: 221.2 83.2% 53.3%;         /* shadcn/ui HSL */
  --font-sans: Inter, sans-serif;      /* Font families */
}
```

**Font Normalization**:
| Web Font | PowerPoint Font |
|----------|----------------|
| Inter, Roboto, Open Sans | Arial |
| JetBrains Mono, Fira Code, Consolas | Courier New |
| Georgia, Merriweather | Georgia |
| Others | Arial (default) |

### Phase 2: PPTX Generation

Generate PowerPoint file using PptxGenJS:

1. Convert design system to PptxGenJS theme format
2. Create slides using native PptxGenJS methods:
   - `addText()` for text boxes
   - `addShape()` for shapes and dividers
   - `background` property for colors and images
3. Apply theme colors and fonts consistently
4. Save native `.pptx` file

### Phase 3: Output

Produce fully editable PowerPoint file with:
- Native text objects (editable in PowerPoint)
- Theme colors from project design system
- PowerPoint-safe fonts
- 16:9 aspect ratio (default)

## Using the Skill

### Basic Usage

To generate a presentation with sample slides:

```bash
node scripts/unified-ppt.js
```

This will:
1. Analyze the current directory's design system
2. Generate 6 sample slides
3. Output `presentation.pptx` in the current directory

### With Slide Definition File

To generate from a JSON slide definition:

```bash
node scripts/unified-ppt.js --slides slides.json --output my-presentation.pptx
```

### With Theme Selection

Choose from 3 theme presets:

```bash
node scripts/unified-ppt.js --theme professional  # Modern blue (default)
node scripts/unified-ppt.js --theme minimal       # Clean monochrome
node scripts/unified-ppt.js --theme corporate     # Professional navy
```

### Analyzing Different Project

To analyze a different project's design system:

```bash
node scripts/unified-ppt.js --project /path/to/project --slides slides.json --output output.pptx
```

### Automatic Dependency Installation

On first run, the skill automatically installs required dependencies (`pptxgenjs`). No manual `npm install` is needed. The installation happens once and is reused for all subsequent runs.

## Slide Definition Format

Define slides in JSON format:

```json
{
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "Presentation Title",
        "subtitle": "Optional subtitle",
        "backgroundImage": "path/to/image.jpg"
      }
    },
    {
      "type": "bullet",
      "props": {
        "title": "Key Points",
        "bullets": [
          { "text": "First point", "level": 0 },
          { "text": "Sub-point", "level": 1 },
          { "text": "Sub-sub-point", "level": 2 }
        ]
      }
    },
    {
      "type": "content",
      "props": {
        "title": "Content Slide",
        "body": ["First line", "Second line", "Third line"]
      }
    },
    {
      "type": "twoColumn",
      "props": {
        "title": "Two Column Layout",
        "leftContent": "Left side content\nMultiple lines supported",
        "rightContent": "Right side content\nMultiple lines supported"
      }
    },
    {
      "type": "section",
      "props": {
        "title": "Section Divider"
      }
    },
    {
      "type": "thankYou",
      "props": {
        "message": "Thank You",
        "contact": "contact@example.com"
      }
    }
  ]
}
```

## Slide Types (12 Total)

### Basic Slides

#### 1. Title Slide (`type: 'title'`)
- Centered title with optional subtitle
- Optional background image support
- Corner decoration
- Props: `title`, `subtitle`, `backgroundImage`

#### 2. Section Slide (`type: 'section'`)
- Section divider with primary color background
- Optional section number badge
- Large centered title
- Props: `title`, `number`

#### 3. Content Slide (`type: 'content'`)
- Standard layout with accent bar
- Title with underline
- Body text (string or array)
- Props: `title`, `body`

#### 4. Bullet Slide (`type: 'bullet'`)
- Hierarchical bullet points (3 levels)
- Styled bullets with icons (arrows for level 0)
- Props: `title`, `bullets: [{text, level}]`

#### 5. Two Column Slide (`type: 'twoColumn'`)
- Split layout with center divider
- Independent text content per column
- Props: `title`, `leftContent`, `rightContent`

#### 6. Thank You Slide (`type: 'thankYou'`)
- Light background with corner decorations
- Centered message with decorative underline
- Props: `message`, `contact`

### Advanced Slides

#### 7. Image Slide (`type: 'image'`)
- 4 arrangement modes: `full`, `sideBySide`, `grid`, `imageLeft`
- **full**: Single full-width image + caption
- **sideBySide**: 2 images side-by-side + caption
- **grid**: 2x2 grid (up to 4 images)
- **imageLeft**: Image on left, text on right
- Props: `title`, `arrangement`, `image`, `images`, `caption`, `text`

#### 8. Chart Slide (`type: 'chart'`)
- Native PptxGenJS charts (4 types)
- Types: `bar`, `line`, `pie`, `area`
- Theme-based colors
- Props: `title`, `chartType`, `data: [{name, labels, values}]`

#### 9. Table Slide (`type: 'table'`)
- Structured data display
- Theme-based styling
- Custom column widths
- Props: `title`, `headers`, `rows`, `columnWidths`

#### 10. Quote Slide (`type: 'quote'`)
- Large centered quote text (italic, Georgia font)
- Decorative quote mark
- Author attribution (right-aligned)
- Props: `quote`, `author`, `showQuoteMark`

#### 11. Comparison Slide (`type: 'comparison'`)
- Side-by-side comparison with center divider
- Custom labels (default: Before/After)
- Supports text or images on both sides
- Props: `title`, `leftLabel`, `rightLabel`, `leftContent`, `rightContent`, `leftImage`, `rightImage`

#### 12. Timeline Slide (`type: 'timeline'`)
- Horizontal timeline with nodes
- Event titles and descriptions
- Dynamic layout based on item count
- Props: `title`, `items: [{title, description}]`

## Bundled Resources

### `scripts/analyzer.js`

Design system analyzer that:
- Detects project framework
- Parses CSS `:root` blocks
- Extracts and converts color variables
- Normalizes font families
- Handles shadcn/ui HSL format

### `scripts/pptx-generator.js`

Native PowerPoint generator that:
- Converts design system to PptxGenJS theme
- Creates slides using native PptxGenJS API
- Applies consistent styling
- Generates fully editable `.pptx` files

### `scripts/unified-ppt.js`

Main entry point that:
- Checks and installs dependencies automatically
- Orchestrates analysis and generation workflow
- Handles command-line arguments
- Provides progress feedback

## Limitations

- **Slide Types**: Currently 6 types (chart, table, image planned for future)
- **CSS Source**: Only `:root` CSS variables supported
- **CSS Variable References**: `var()` functions not supported (direct values only)
- **Layout Complexity**: Simple layouts only (complex layouts require manual editing)

## Troubleshooting

### CSS Variables Not Found

If no CSS variables are detected:
1. Check CSS file locations match supported paths
2. Ensure `:root` blocks exist in CSS
3. Verify variable format is supported (no `var()` references)

Example of supported format:
```css
/* ✅ Supported */
:root {
  --primary: #3b82f6;
  --secondary: rgb(124, 58, 237);
  --font-sans: Inter, sans-serif;
}

/* ❌ Not supported */
:root {
  --primary: var(--blue-500);           /* CSS variable reference */
  --secondary: theme('colors.blue');    /* Tailwind function */
}
```

### Font Not Displaying Correctly

Web fonts are automatically converted to PowerPoint-safe fonts:
- All text remains fully editable in PowerPoint
- Fonts can be manually changed in PowerPoint if needed
- System fonts can be used for better appearance

### Dependency Installation Failed

If automatic installation fails:
```bash
cd ~/.claude/skills/unified-ppt
npm install
```

Ensure Node.js version >= 18.0.0:
```bash
node --version
```

## Performance Characteristics

- **Design System Analysis**: ~1 second
- **PPTX Generation**: ~0.5 seconds per slide
- **Memory Usage**: ~80MB total
- **File Size**: ~50-200KB depending on slide count
- **Installation Size**: ~2MB (pptxgenjs only)

## Future Enhancements

### Planned Features
- Chart slide type (bar, line, pie charts)
- Table slide type with styling
- Image slide type with captions
- Natural language slide generation
- Thumbnail preview generation
- More slide templates

### Possible Extensions
- Styled Components theme support
- Real-time preview
- Template marketplace
- Animation support
- Master slide customization
