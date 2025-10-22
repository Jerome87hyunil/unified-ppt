---
name: create-ppt
description: Create professional PowerPoint presentations using reusable design components and themes. This skill should be used when users want to generate PPTX files from structured content, with support for multiple slide types (title, content, charts, tables, etc.) and customizable themes (professional, creative, minimal, corporate).
license: MIT
---

# Create PPT

Create professional PowerPoint presentations using a component-based design system with PptxGenJS.

## About This Skill

This skill provides a complete PPT generation system with:
- 10 reusable slide components (title, content, charts, tables, etc.)
- 4 customizable theme presets with color and font variations
- TypeScript-based type safety
- Simple JSON-based presentation definitions

## When to Use This Skill

Use this skill when:
- Creating PowerPoint presentations from structured data
- Generating reports, proposals, or documentation as PPTX files
- Building slide decks with consistent design and theming
- Automating presentation creation workflows

Do NOT use this skill for:
- Editing existing PPTX files (use a different tool)
- Creating other document formats (PDF, Word, etc.)
- Presentation design without actual file generation

## How to Use

### Prerequisites

Before using this skill, ensure the project is built:

```bash
cd /Users/a/Documents/dev/PPT_auto
npm install
npm run build
```

### Basic Usage

To create a presentation, run the generation script:

```bash
node .claude/skills/create-ppt/scripts/create-ppt.js \
  --content '<JSON_DEFINITION>' \
  --theme professional \
  --filename output.pptx
```

### Content Format

Presentations are defined using JSON with the following structure:

```json
{
  "metadata": {
    "title": "Presentation Title",
    "author": "Author Name",
    "subject": "Optional Subject",
    "company": "Optional Company"
  },
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "Main Title",
        "subtitle": "Optional Subtitle"
      }
    },
    {
      "type": "content",
      "props": {
        "title": "Slide Title",
        "body": "Slide content text"
      }
    }
  ]
}
```

### Available Slide Types

1. **title** - Title slide with main title and optional subtitle
   ```json
   {
     "type": "title",
     "props": {
       "title": "Presentation Title",
       "subtitle": "Subtitle",
       "backgroundImage": "/path/to/image.jpg" // optional
     }
   }
   ```

2. **content** - Content slide with title and body text
   ```json
   {
     "type": "content",
     "props": {
       "title": "Slide Title",
       "body": "Body text or array of paragraphs"
     }
   }
   ```

3. **bullet** - Bullet point slide
   ```json
   {
     "type": "bullet",
     "props": {
       "title": "Key Points",
       "bullets": [
         { "text": "First point", "level": 0 },
         { "text": "Nested point", "level": 1 }
       ]
     }
   }
   ```

4. **twoColumn** - Two-column layout
   ```json
   {
     "type": "twoColumn",
     "props": {
       "title": "Comparison",
       "leftContent": "Left side content",
       "rightContent": "Right side content"
     }
   }
   ```

5. **chart** - Data visualization (bar, line, pie, area)
   ```json
   {
     "type": "chart",
     "props": {
       "title": "Chart Title",
       "chartType": "bar",
       "data": {
         "labels": ["Q1", "Q2", "Q3"],
         "datasets": [{
           "name": "Sales",
           "values": [100, 150, 200]
         }]
       }
     }
   }
   ```

6. **table** - Data table
   ```json
   {
     "type": "table",
     "props": {
       "title": "Data Table",
       "headers": ["Column 1", "Column 2"],
       "rows": [["Data 1", "Data 2"]]
     }
   }
   ```

7. **image** - Image slide with caption
   ```json
   {
     "type": "image",
     "props": {
       "title": "Image Title",
       "imagePath": "/path/to/image.jpg",
       "caption": "Optional caption"
     }
   }
   ```

8. **quote** - Quote slide
   ```json
   {
     "type": "quote",
     "props": {
       "quote": "Quote text",
       "author": "Author Name"
     }
   }
   ```

9. **section** - Section divider
   ```json
   {
     "type": "section",
     "props": {
       "title": "Section Name",
       "subtitle": "Optional subtitle"
     }
   }
   ```

10. **thankYou** - Closing slide
    ```json
    {
      "type": "thankYou",
      "props": {
        "message": "Thank You",
        "contact": "email@example.com"
      }
    }
    ```

### Available Themes

Choose from 4 preset themes:

- **professional** - Business-appropriate blue/gray color scheme
- **creative** - Vibrant, energetic colors for creative presentations
- **minimal** - Clean black and white design
- **corporate** - Stable corporate color scheme

Specify theme using `--theme` parameter (default: professional).

### Custom Themes

To create presentations with custom themes, use the TypeScript API directly. See `references/api-usage.md` for details.

## Workflow

When creating presentations:

1. **Parse user requirements** - Understand what slides are needed
2. **Map to slide types** - Choose appropriate slide components
3. **Build JSON structure** - Create the presentation definition
4. **Select theme** - Choose or customize theme
5. **Execute script** - Run `scripts/create-ppt.js`
6. **Return file path** - Provide the generated PPTX file location

## Examples

See `references/examples.md` for detailed examples of:
- Simple presentations
- Charts and data visualization
- Custom layouts
- Theme customization

## Troubleshooting

If generation fails:

1. **Verify project is built**: Run `npm run build` in project root
2. **Check JSON syntax**: Ensure content is valid JSON
3. **Validate file paths**: Image paths must be absolute or relative to working directory
4. **Review error messages**: The script provides detailed error information

## Additional Resources

- `references/api-usage.md` - TypeScript API documentation
- `references/examples.md` - Comprehensive usage examples
- `references/theme-guide.md` - Theme customization guide
- Project root: `/Users/a/Documents/dev/PPT_auto`
