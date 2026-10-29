# Replay player

The session-replay player from docstream (`@brett_lamy/docstream` 1.32.0, `src/replay/`), copied in so the bug
gallery plays recordings exactly as the Replay QA bug catalog does, without the rest of docstream.
`replay.css` is the `docstream.replay` layer from docstream's `styles.css`, verbatim. Pages import
`replay.scoped.css`, which `node scripts/scope-replay-css.mjs` generates from it: docstream layers its rules
so a host's CSS wins, but this site's Tailwind 3 resets are unlayered and would beat every rule, so the
generated copy drops the layer and scopes each selector to the `.replay-host` wrapper instead. Wrap the
player in `.replay-host` and set the color tokens it reads (see `src/app/bugs/bugs.css`).

`HighlightedCode.tsx` is docstream's `src/docs/HighlightedCode.tsx` (marked `'use client'`), and `tokens.css` its
`.docs-tok-*` colors, which the DevTools bodies and sources use too: import it wherever the player or
`HighlightedCode` renders.

Changes from upstream: `ReplayFile` takes URLs as they are (no `AssetResolverProvider`), `ReplayPlayer` has its
own `useReducedMotion` instead of framer-motion's, the client entry is marked `'use client'`, and
`ReplayDevtools` spells `JSX.Element` as `import('react').JSX.Element` for React 19's types. Prefer
re-copying from docstream over editing these files.
