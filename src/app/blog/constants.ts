/**
 * Posts server-rendered on /blog before client-side pagination loads the rest.
 * Also the number of post pages pre-rendered at build time; older posts are
 * generated on first request via ISR (see blog/[slug]/page.tsx).
 */
export const BLOG_INITIAL_PAGE_SIZE = 24
