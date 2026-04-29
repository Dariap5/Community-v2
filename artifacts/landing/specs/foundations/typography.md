# Typography Foundation

## Metadata
- Name: Typography foundation
- Category: Foundations
- Status: active

## Overview
The page mixes expressive serif headlines with clean sans-serif body copy. Keep the contrast deliberate and avoid over-decorating the copy.

## Anatomy
- Serif display headlines for emotion and emphasis
- Sans-serif body copy for readability
- Mono labels for status, counts, and utility metadata

## Tokens used
- `--app-font-serif`
- `--app-font-sans`
- `--app-font-mono`
- `--tracking-normal`

## Props/API
Not applicable. Use the theme aliases already exposed by Tailwind.

## States
- Display: strong, editorial, short when possible
- Body: readable line length and relaxed leading
- Meta: compact mono, lower visual weight

## Code example
```css
h1 {
  font-family: var(--app-font-serif);
}
```

## Cross-references
- `specs/foundations/color.md`
- `specs/components/hero.md`
