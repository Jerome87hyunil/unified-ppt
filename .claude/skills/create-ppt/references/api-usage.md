# TypeScript API Usage

Direct TypeScript API usage for advanced customization.

## Installation

```bash
cd /Users/a/Documents/dev/PPT_auto
npm install
npm run build
```

## Basic Usage

```typescript
import { createPresentation, themes } from './src';

const presentation = createPresentation({
  metadata: {
    title: 'My Presentation',
    author: 'Author Name',
  },
  theme: themes.professional,
  slides: [
    {
      type: 'title',
      props: {
        title: 'Main Title',
        subtitle: 'Subtitle',
      },
    },
  ],
});

presentation.generate();
await presentation.save('output.pptx');
```

## Custom Themes

Create a fully custom theme:

```typescript
import { Theme } from './src/types';

const customTheme: Theme = {
  name: 'Custom Theme',
  colors: {
    primary: '#6C63FF',
    secondary: '#A29BFE',
    accent: '#FDCB6E',
    text: {
      dark: '#2D3436',
      light: '#FFFFFF',
    },
    background: {
      main: '#FFFFFF',
      alt: '#F8F9FA',
    },
    chart: ['#6C63FF', '#A29BFE', '#FDCB6E', '#74B9FF', '#FF7675'],
  },
  fonts: {
    heading: {
      face: 'Arial',
      size: 40,
      bold: true,
    },
    body: {
      face: 'Arial',
      size: 18,
    },
    emphasis: {
      face: 'Arial',
      size: 22,
      bold: true,
    },
  },
  spacing: {
    margin: {
      top: 0.6,
      right: 0.6,
      bottom: 0.6,
      left: 0.6,
    },
    gap: {
      small: 0.15,
      medium: 0.3,
      large: 0.6,
    },
  },
};

const pres = createPresentation({
  metadata: { title: 'Custom Theme' },
  theme: customTheme,
  slides: [/* ... */],
});
```

## Per-Slide Theme Override

Override theme for specific slides:

```typescript
{
  type: 'content',
  props: {
    title: 'Special Slide',
    body: 'This slide has custom colors',
    theme: {
      colors: {
        primary: '#FF5733'
      }
    }
  }
}
```

## TypeScript Types

All types are available from `./src/types`:

```typescript
import {
  Theme,
  ColorPalette,
  FontSet,
  PresentationDefinition,
  SlideComponent,
  TitleSlideProps,
  ContentSlideProps,
  // ... and more
} from './src/types';
```

## Error Handling

```typescript
import { PptError, PptErrorCode } from './src/types';

try {
  const pres = createPresentation(definition);
  pres.generate();
  await pres.save('output.pptx');
} catch (error) {
  if (error instanceof PptError) {
    console.error('PPT Error:', error.code, error.message);
    console.error('Context:', error.context);
  }
}
```

## Available Exports

From `./src`:
- `createPresentation` - Main function
- `PresentationGenerator` - Generator class
- `themes` - All preset themes
- All types from `./src/types`
- Utility functions from `./src/utils`
