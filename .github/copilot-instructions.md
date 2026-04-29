Read these rules before changing any UI in this repo.

- Start with the relevant file in `artifacts/landing/specs/` before editing landing UI.
- Use only tokens defined in `artifacts/landing/src/tokens.css` for colors, spacing, radius, z-index, shadows, and motion.
- Prefer the existing warm editorial style: off-white surfaces, terracotta accents, serif headlines, quiet ink text, and generous whitespace.
- Keep the mobile version lighter than desktop: fewer words, clearer hierarchy, wider tap targets, and less decorative noise.
- Run `pnpm --dir artifacts/landing run token:audit` before committing CSS changes.
- Zero audit errors required before merge.
