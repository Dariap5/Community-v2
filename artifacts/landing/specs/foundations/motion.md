# Motion Foundation

## Metadata
- Name: Motion foundation
- Category: Foundations
- Status: active

## Overview
Motion should support clarity, not compete with the message. Keep transitions soft and purposeful.

## Anatomy
- Entrance animations
- Hover feedback
- Sticky CTA transitions
- Accordion expansion

## Tokens used
- `--motion-fast`
- `--motion-normal`
- `--motion-slow`
- `--motion-slower`

## Props/API
Not applicable. Use motion tokens for future CSS transitions and keep JS animations restrained.

## States
- Default: mostly still
- Hover: subtle scale or tint
- In view: gentle stagger and fade
- Reduced motion: no dependence on movement

## Code example
```css
.fade {
  transition-duration: var(--motion-normal);
}
```

## Cross-references
- `specs/components/cta.md`
- `specs/components/faq.md`
