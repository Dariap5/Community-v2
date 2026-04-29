# Color Foundation

## Metadata
- Name: Color foundation
- Category: Foundations
- Status: active

## Overview
The landing page uses a warm, editorial palette. Keep the interface calm, soft, and high-contrast enough to read quickly on mobile.

## Anatomy
- Background: warm off-white
- Foreground: deep ink / charcoal
- Primary accent: terracotta
- Secondary surfaces: soft beige / muted sand
- Borders: low-contrast neutral lines

## Tokens used
- `--background`
- `--foreground`
- `--primary`
- `--primary-foreground`
- `--secondary`
- `--secondary-foreground`
- `--muted`
- `--muted-foreground`
- `--border`
- `--ring`

## Props/API
Not applicable. This foundation is consumed through CSS variables and Tailwind theme aliases.

## States
- Default: calm, warm, readable
- Hover: subtle elevation or tint only
- Focus: visible ring using `--ring`
- Disabled: lower contrast, never fully invisible

## Code example
```css
.hero-eyebrow {
  color: hsl(var(--muted-foreground));
}
```

## Cross-references
- `specs/tokens/token-reference.md`
- `specs/foundations/spacing.md`
- `specs/components/hero.md`
