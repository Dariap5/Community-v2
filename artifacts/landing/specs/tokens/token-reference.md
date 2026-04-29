# Token Reference

## Metadata
- Name: Token reference
- Category: Tokens
- Status: active

## Overview
This project uses a two-layer token model inside `src/tokens.css`:
- `--ds-*` variables store the raw design values
- semantic aliases expose the values used by components and theme utilities

## Anatomy
- Color primitives and semantic colors
- Spacing scale
- Typography aliases
- Radius and shadow scale
- Motion and z-index tokens

## Tokens used
### Colors
- `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- `--border`, `--input`, `--ring`
- `--card`, `--popover`, `--sidebar`

### Spacing
- `--space-000`, `--space-025`, `--space-050`, `--space-100`, `--space-150`, `--space-200`, `--space-300`, `--space-400`, `--space-500`, `--space-600`, `--space-700`, `--space-800`

### Typography
- `--app-font-sans`, `--app-font-serif`, `--app-font-mono`

### Radius / elevation / motion
- `--radius`
- `--shadow-2xs`, `--shadow-xs`, `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`
- `--motion-fast`, `--motion-normal`, `--motion-slow`, `--motion-slower`
- `--z-base`, `--z-behind`, `--z-overlay`

## Props/API
Not applicable. Tokens are read directly in CSS and via Tailwind theme aliases.

## States
- Light and dark mode values are defined upstream in `src/tokens.css`
- Components should not create their own colors or spacing constants

## Code example
```css
.cta {
  background: hsl(var(--primary));
  padding: var(--space-200) var(--space-400);
  border-radius: var(--radius);
}
```

## Cross-references
- `specs/foundations/color.md`
- `specs/foundations/spacing.md`
- `specs/foundations/typography.md`
