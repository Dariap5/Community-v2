# Landing Rhythm Pattern

## Metadata
- Name: Landing rhythm
- Category: Pattern
- Status: active

## Overview
The page should move from emotional hook to trust, then to proof, then to conversion. Mobile should compress each step without changing the order.

## Anatomy
- Hero
- Problem framing sections
- Solution / value sections
- FAQ
- Final CTA
- Footer legal block

## Tokens used
- `--space-200`
- `--space-300`
- `--space-400`
- `--space-500`
- `--space-600`
- `--primary`
- `--foreground`

## Props/API
Not applicable. This is a composition pattern for `LandingPage.tsx`.

## States
- Desktop: editorial spacing and stronger visual hierarchy
- Mobile: shorter blocks, fewer decorative layers, larger tap targets

## Code example
```tsx
<Hero />
<Problem />
<FAQ />
<FinalCTA />
```

## Cross-references
- `specs/components/hero.md`
- `specs/components/faq.md`
- `specs/components/footer.md`
