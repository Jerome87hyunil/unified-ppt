# PPT Creation Examples

Comprehensive examples for using the create-ppt skill.

## Example 1: Simple Business Presentation

```json
{
  "metadata": {
    "title": "Q4 Business Review",
    "author": "John Doe",
    "company": "Acme Corp"
  },
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "Q4 2024 Business Review",
        "subtitle": "Financial Performance & Strategic Outlook"
      }
    },
    {
      "type": "bullet",
      "props": {
        "title": "Key Highlights",
        "bullets": [
          { "text": "Revenue up 25% YoY", "level": 0 },
          { "text": "Expanded to 3 new markets", "level": 0 },
          { "text": "Launched 5 new products", "level": 0 }
        ]
      }
    },
    {
      "type": "chart",
      "props": {
        "title": "Quarterly Revenue Trend",
        "chartType": "bar",
        "data": {
          "labels": ["Q1", "Q2", "Q3", "Q4"],
          "datasets": [{
            "name": "Revenue ($M)",
            "values": [12, 15, 18, 22]
          }]
        }
      }
    },
    {
      "type": "thankYou",
      "props": {
        "message": "Thank You",
        "contact": "john.doe@acmecorp.com"
      }
    }
  ]
}
```

## Example 2: Product Launch Presentation

```json
{
  "metadata": {
    "title": "Product Launch",
    "author": "Product Team"
  },
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "Introducing Widget Pro",
        "subtitle": "The Future of Productivity"
      }
    },
    {
      "type": "section",
      "props": {
        "title": "Problem Statement"
      }
    },
    {
      "type": "content",
      "props": {
        "title": "Current Challenges",
        "body": "Teams spend 40% of their time on manual tasks that could be automated. Our research shows productivity losses of $50K per team annually."
      }
    },
    {
      "type": "section",
      "props": {
        "title": "Our Solution"
      }
    },
    {
      "type": "twoColumn",
      "props": {
        "title": "Widget Pro Features",
        "leftContent": ["✓ AI-powered automation", "✓ Real-time collaboration", "✓ Advanced analytics"],
        "rightContent": ["✓ 99.9% uptime SLA", "✓ Enterprise security", "✓ 24/7 support"]
      }
    },
    {
      "type": "quote",
      "props": {
        "quote": "Widget Pro increased our team productivity by 60%",
        "author": "Sarah Chen, CTO at TechCorp"
      }
    }
  ]
}
```

## Example 3: Data-Heavy Report

```json
{
  "metadata": {
    "title": "Monthly Analytics Report",
    "author": "Analytics Team"
  },
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "October 2024 Analytics",
        "subtitle": "User Engagement & Growth Metrics"
      }
    },
    {
      "type": "chart",
      "props": {
        "title": "Daily Active Users",
        "chartType": "line",
        "data": {
          "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
          "datasets": [{
            "name": "DAU",
            "values": [12500, 13200, 14100, 15300]
          }]
        }
      }
    },
    {
      "type": "chart",
      "props": {
        "title": "User Distribution by Platform",
        "chartType": "pie",
        "data": {
          "labels": ["Web", "iOS", "Android", "Desktop"],
          "datasets": [{
            "name": "Users",
            "values": [35, 28, 25, 12]
          }]
        }
      }
    },
    {
      "type": "table",
      "props": {
        "title": "Top Features by Engagement",
        "headers": ["Feature", "Users", "Sessions", "Avg Duration"],
        "rows": [
          ["Dashboard", "15,234", "42,156", "8m 32s"],
          ["Reports", "12,891", "28,445", "12m 15s"],
          ["Settings", "8,567", "15,234", "3m 45s"]
        ]
      }
    }
  ]
}
```

## Example 4: Educational/Training Content

```json
{
  "metadata": {
    "title": "TypeScript Training",
    "author": "Engineering Team"
  },
  "slides": [
    {
      "type": "title",
      "props": {
        "title": "Introduction to TypeScript",
        "subtitle": "Type-Safe JavaScript Development"
      }
    },
    {
      "type": "content",
      "props": {
        "title": "What is TypeScript?",
        "body": [
          "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
          "",
          "Key benefits:",
          "• Static type checking",
          "• Enhanced IDE support",
          "• Better code documentation",
          "• Improved refactoring"
        ]
      }
    },
    {
      "type": "bullet",
      "props": {
        "title": "Core Concepts",
        "bullets": [
          { "text": "Basic Types", "level": 0 },
          { "text": "string, number, boolean", "level": 1 },
          { "text": "Interfaces & Types", "level": 0 },
          { "text": "Defining object shapes", "level": 1 },
          { "text": "Generics", "level": 0 },
          { "text": "Reusable type-safe components", "level": 1 }
        ]
      }
    }
  ]
}
```

## Command Line Examples

### Simple presentation
```bash
node scripts/create-ppt.js \
  --content '{"metadata":{"title":"My PPT"},"slides":[{"type":"title","props":{"title":"Hello World"}}]}' \
  --theme professional \
  --filename hello.pptx
```

### With creative theme
```bash
node scripts/create-ppt.js \
  --content '@presentation.json' \
  --theme creative \
  --filename creative-presentation.pptx
```

### Using JSON file
```bash
# Create presentation.json with your content first
node scripts/create-ppt.js \
  --content "$(cat presentation.json)" \
  --theme minimal \
  --filename output.pptx
```
