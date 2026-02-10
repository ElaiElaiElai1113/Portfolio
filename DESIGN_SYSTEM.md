# Design System & Style Guide

## Color Palette

### Primary Colors (HSL Format)

#### Light Mode
```css
--background: 42 25% 96%;      /* Warm cream-white */
--foreground: 28 20% 18%;      /* Near-black charcoal */
--card: 40 22% 97%;            /* Slightly darker cream */
--primary: 24 65% 48%;         /* Terracotta/rust */
--secondary: 35 15% 92%;       /* Warm gray */
--muted: 38 18% 90%;           /* Medium warm gray */
--accent: 175 45% 42%;         /* Sage green */
```

#### Dark Mode
```css
--background: 225 20% 8%;      /* Deep charcoal */
--foreground: 40 20% 94%;      /* Off-white */
--card: 225 20% 10%;          /* Slightly lighter charcoal */
--primary: 24 70% 55%;         /* Lighter terracotta */
--secondary: 225 18% 14%;      /* Medium charcoal */
--muted: 225 18% 14%;         /* Muted charcoal */
--accent: 175 50% 48%;         /* Lighter sage */
```

### Accent Colors

```css
--terracotta: 18 75% 52%;      /* Warm earthy red-orange */
--sage: 165 35% 45%;          /* Muted green */
--indigo: 235 55% 55%;         /* Deep purple-blue */
--clay: 25 60% 55%;           /* Earthy brown */
--forest: 155 40% 35%;        /* Dark green */
```

### Color Usage Guidelines

#### Primary (Terracotta)
- **Use for**: CTAs, links, important actions, active states
- **Avoid for**: Large backgrounds, secondary information
- **Accessibility**: Meets WCAG AA on light backgrounds

#### Sage
- **Use for**: Success states, calm accents, secondary CTAs
- **Associations**: Growth, automation, efficiency
- **Pairs well with**: Terracotta, charcoal

#### Indigo
- **Use for**: Information, technical content, professional elements
- **Associations**: Technology, innovation, depth
- **Pairs well with**: All accent colors

#### Clay
- **Use for**: Tertiary accents, subtle highlights
- **Associations**: Earthiness, reliability, warmth
- **Pairs well with**: Terracotta, sage

#### Forest
- **Use for**: Dark accents, professional touches
- **Associations**: Growth, stability, nature
- **Pairs well with**: Sage, clay

## Typography

### Font Families

```css
/* Headings */
font-family: "Playfair Display", Georgia, serif;

/* Body Text */
font-family: "Space Grotesk", system-ui, sans-serif;

/* Monospace/Code */
font-family: "JetBrains Mono", monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 60-72px | 600 (semi-bold) | 1.05 | Page titles |
| H2 | 48-60px | 500 (medium) | 1.1 | Section titles |
| H3 | 24-36px | 600 (semi-bold) | 1.15 | Subsection titles |
| H4 | 20-24px | 500 (medium) | 1.2 | Card titles |
| Body | 16px | 400 (regular) | 1.6 | Paragraph text |
| Small | 14px | 400 (regular) | 1.5 | Captions, labels |
| Tiny | 12px | 400 (regular) | 1.4 | Fine print |

### Typography Best Practices

1. **Use Playfair Display for**:
   - All page titles and section headings
   - Quote highlights
   - Decorative text elements

2. **Use Space Grotesk for**:
   - Body text and paragraphs
   - Navigation items
   - UI labels and buttons
   - Card descriptions

3. **Use JetBrains Mono for**:
   - Code snippets
   - Keyboard shortcuts
   - Technical labels
   - Data/numbers

4. **Avoid**:
   - Mixing more than 2 typefaces in one context
   - Using all caps for body text
   - Tight letter-spacing on headings
   - Overly small font sizes for body text

## Spacing System

### Base Unit
- **Base**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

### Usage Guidelines

| Context | Spacing | Purpose |
|---------|---------|---------|
| Section padding | 96px vertical | Major sections |
| Card padding | 24px | Content cards |
| Gap between elements | 16-32px | Related elements |
| Gap between sections | 64-96px | Separate sections |
| Text spacing | 8-16px | Text-related elements |

## Layout

### Container Widths
```css
.container {
  max-width: 1280px; /* Large containers */
  margin: 0 auto;
  padding: 0 24px;   /* Mobile side padding */
}

.container-narrow {
  max-width: 768px;  /* Text-heavy content */
}

.container-wide {
  max-width: 1536px; /* Full-width layouts */
}
```

### Grid Systems
```css
/* 2-column grid */
.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

/* 3-column grid */
.grid-cols-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Responsive grid */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

## Components

### Buttons

#### Primary Button
```tsx
<Button className="rounded-full px-8">
  Button Text
</Button>
```
- **Use for**: Main CTAs, primary actions
- **Style**: Filled with primary color
- **States**: Hover (slightly darker), Active (pressed)

#### Secondary Button
```tsx
<Button variant="outline" className="rounded-full px-8">
  Button Text
</Button>
```
- **Use for**: Secondary actions, alternatives
- **Style**: Outlined with border
- **States**: Hover (background fill)

#### Ghost Button
```tsx
<Button variant="ghost">
  Button Text
</Button>
```
- **Use for**: Low-emphasis actions
- **Style**: Transparent with hover effect
- **States**: Hover (subtle background)

### Cards

#### Surface Paper Card
```tsx
<Card className="surface-paper p-6">
  Card content
</Card>
```
- **Features**: Subtle texture, paper-like appearance
- **Use for**: Content cards, feature boxes
- **Padding**: 24px default

#### Interactive Card
```tsx
<Card className="surface-paper p-6 hover-organic">
  Card content
</Card>
```
- **Features**: Organic rotation on hover
- **Use for**: Interactive elements, links
- **Animation**: Subtle rotation and lift

### Badges

#### Default Badge
```tsx
<Badge>
  Badge Text
</Badge>
```

#### Outline Badge
```tsx
<Badge variant="outline">
  Badge Text
</Badge>
```

#### Custom Color Badge
```tsx
<Badge className="bg-primary/10 text-primary border-primary/20">
  Badge Text
</Badge>
```

## Visual Effects

### Shadows

#### Soft Shadow
```css
.shadow-soft {
  box-shadow: 0 2px 8px -2px hsla(var(--foreground) / 0.08),
              0 4px 12px -2px hsla(var(--foreground) / 0.04);
}
```
- **Use for**: Cards, buttons
- **Characteristics**: Subtle, natural

#### Deep Shadow
```css
.shadow-deep {
  box-shadow: 0 8px 24px -4px hsla(var(--foreground) / 0.12),
              0 4px 12px -2px hsla(var(--foreground) / 0.08);
}
```
- **Use for**: Elevated elements, modals
- **Characteristics**: More pronounced

#### Float Shadow
```css
.shadow-float {
  box-shadow: 8px 8px 24px -4px hsla(var(--foreground) / 0.1),
              -4px -4px 16px -2px hsla(var(--foreground) / 0.02);
}
```
- **Use for**: Floating elements, stickers
- **Characteristics**: Directional, dynamic

### Border Radius

#### Standard
```css
border-radius: 0.5rem;  /* 8px */
```
- **Use for**: Cards, buttons, inputs

#### Organic Variations
```css
.radius-organic-1 { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
.radius-organic-2 { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
.radius-organic-3 { border-radius: 70% 30% 50% 50% / 30% 50% 70% 50%; }
```
- **Use for**: Decorative elements, badges
- **Characteristics**: Handcrafted, imperfect

### Textures

#### Grain Texture
```css
.texture-grain {
  background-image: url("data:image/svg+xml,...");
  opacity: 0.025;
}
```
- **Use for**: Adding subtle character
- **Application**: Overlay on surfaces

#### Paper Texture
```css
.surface-paper::before {
  content: '';
  background-image: url("data:image/svg+xml,...");
  opacity: 0.03;
}
```
- **Use for**: Card surfaces
- **Characteristics**: Subtle noise

## Animations

### Hover Effects

#### Organic Hover
```css
.hover-organic {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hover-organic:hover {
  transform: translateY(-4px) rotate(-0.5deg);
}
```
- **Characteristics**: Spring-like, natural
- **Duration**: 400ms
- **Use for**: Cards, interactive elements

#### Link Underline
```css
.text-accent-underline::after {
  content: '';
  height: 2px;
  background: hsl(var(--terracotta));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.text-accent-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```
- **Characteristics**: Animated from right to left
- **Duration**: 300ms
- **Use for**: Text links

### Page Transitions

#### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- **Use for**: Page content, sections
- **Duration**: 400-600ms
- **Easing**: cubic-bezier(0.25, 0.46, 0.45, 0.94)

#### Stagger Reveal
```css
.stagger-reveal > * {
  animation: fadeInUp 0.5s ease backwards;
}

.stagger-reveal > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-reveal > *:nth-child(2) { animation-delay: 0.2s; }
/* etc. */
```
- **Use for**: Lists, grids
- **Effect**: Sequential appearance

## Icons

### Icon Library
- **Primary**: Lucide React
- **Size**: 16px (small), 20px (medium), 24px (large)
- **Stroke**: 2px default

### Common Icons

| Icon | Usage |
|------|-------|
| Mail | Email links, contact |
| Github | GitHub links, repo |
| Linkedin | LinkedIn links |
| ArrowRight | Forward navigation |
| ExternalLink | External links |
| CheckCircle2 | Success, completion |
| Zap | Energy, automation |
| Code | Development, technical |
| Sparkles | Featured, special |

### Icon Usage
- Keep consistent sizing within contexts
- Use appropriate icons for meaning
- Add labels for screen readers
- Consider color for semantic meaning

## Accessibility

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Primary buttons meet WCAG AAA (7:1 minimum)
- Test with contrast checker tools

### Focus States
```css
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
- Use semantic HTML
- Provide ARIA labels where needed
- Include alt text for images
- Test with screen readers

## Breakpoints

```css
/* Mobile first */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

## Best Practices

### Do's
- Use consistent spacing
- Maintain visual hierarchy
- Test on multiple devices
- Consider accessibility
- Use semantic HTML
- Optimize images
- Test dark mode
- Validate color contrast

### Don'ts
- Don't use too many colors
- Don't mix font families excessively
- Don't make text too small
- Don't ignore mobile experience
- Don't skip accessibility
- Don't over-animate
- Don't use generic gradients
- Don't forget to test

## File Structure

```
src/
├── components/
│   ├── UniqueNavigation.tsx
│   ├── UniqueHero.tsx
│   ├── UniqueProjectCard.tsx
│   ├── UniqueFooter.tsx
│   └── AutomationShowcase.tsx
├── pages/
│   ├── UniqueHomePage.tsx
│   ├── UniqueAboutPage.tsx
│   └── AutomationPage.tsx
├── layouts/
│   └── UniquePublicLayout.tsx
├── index.css
└── ...
```

---

**Remember**: This design system is a foundation. Customize it to fit your needs while maintaining consistency and the distinctive, handcrafted feel.
