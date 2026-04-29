# CTA Component

## Metadata
- Name: Primary CTA
- Category: Component
- Status: active

## Overview
The primary CTA should feel strong but not loud. It is the conversion point of the landing page and should stay visually consistent across the hero and final section.

## Anatomy
- Rounded button
- Arrow icon
- Optional floating/morphing presentation

## Tokens used
- `--primary`
- `--primary-foreground`
- `--space-200`
- `--space-300`
- `--space-400`
- `--radius`
- `--shadow-xl`
- `--motion-normal`

## Props/API
- Variant: default or quiet
- Placement: inline, footer, final section, or floating

## States
- Default: filled primary button
- Hover: subtle lift and highlight sweep
- Active: slight scale-down
- Focus: visible focus ring
- Disabled: not used in the current landing flow

## Code example
```tsx
<a className="rounded-full bg-primary px-8 py-4 text-primary-foreground">
  Вступить через Telegram
</a>
```

## Cross-references
- `specs/components/hero.md`
- `specs/components/footer.md`
