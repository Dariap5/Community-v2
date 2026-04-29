# Spacing Foundation

## Metadata
- Name: Spacing foundation
- Category: Foundations
- Status: active

## Overview
Spacing should feel generous on desktop and compact on mobile without becoming cramped. Use the token scale rather than ad hoc pixel values.

## Anatomy
- Page rhythm
- Section spacing
- Component padding
- Inline gaps
- Tap targets

## Tokens used
- `--space-000`
- `--space-025`
- `--space-050`
- `--space-100`
- `--space-150`
- `--space-200`
- `--space-300`
- `--space-400`
- `--space-500`
- `--space-600`

## Props/API
Not applicable. Use aliases from `tokens.css` in CSS and utility classes in JSX.

## States
- Default: balanced vertical rhythm
- Compact: tighter hero and FAQ spacing on mobile
- Spacious: section breaks and CTA breathing room

## Code example
```css
.section {
  padding-block: var(--space-600);
}
```

## Cross-references
- `specs/tokens/token-reference.md`
- `specs/components/hero.md`
- `specs/patterns/landing-rhythm.md`
