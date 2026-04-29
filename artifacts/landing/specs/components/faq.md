# FAQ Component

## Metadata
- Name: FAQ
- Category: Component
- Status: active

## Overview
The FAQ is the trust layer. It should reduce friction quickly, keep answers short, and remain easy to scan on mobile.

## Anatomy
- Section heading
- Accordion list
- Question row
- Answer panel
- Divider rhythm

## Tokens used
- `--foreground`
- `--muted-foreground`
- `--primary`
- `--border`
- `--space-200`
- `--space-300`
- `--space-400`
- `--radius`

## Props/API
- Controlled open state
- One open item at a time

## States
- Closed: compact question row
- Open: expanded answer with calm contrast
- Hover: question gains emphasis
- Focus: keyboard-friendly button focus

## Code example
```tsx
<button aria-expanded={isOpen} className="w-full text-left">
  Сколько времени это займёт?
</button>
```

## Cross-references
- `specs/foundations/color.md`
- `specs/foundations/spacing.md`
