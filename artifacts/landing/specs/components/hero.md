# Hero Component

## Metadata
- Name: Landing hero
- Category: Component
- Status: active

## Overview
The hero is the first emotional read of the page. It should feel premium, restrained, and immediately understandable on mobile.

## Anatomy
- Eyebrow / live status
- Compact social proof counter
- Main headline
- Short supporting copy
- Primary CTA
- Micro-markers below the CTA

## Tokens used
- `--background`
- `--foreground`
- `--primary`
- `--muted-foreground`
- `--app-font-serif`
- `--space-100`
- `--space-200`
- `--space-300`
- `--space-400`
- `--radius`
- `--shadow-xl`

## Props/API
Not applicable. The hero is composed inside `LandingPage.tsx`.

## States
- Default: calm and centered
- Mobile: fewer words, smaller visual noise, more breathing room
- CTA hover: gentle lift and glow only

## Code example
```tsx
<h1 className="font-serif text-4xl leading-tight text-foreground">
  Закрытое комьюнити для 40 человек
</h1>
```

## Cross-references
- `specs/components/cta.md`
- `specs/foundations/typography.md`
- `specs/patterns/landing-rhythm.md`
