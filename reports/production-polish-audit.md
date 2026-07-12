# Production polish audit

Date: 12 July 2026

## Scope

Homepage, archives, glossary, search, About, author, article, Scorecard and framework templates; newsletter, footer and navigation; metadata, structured data, feeds, sitemap, redirects, canonicals, accessibility and responsive behaviour.

## Resolved in the preview

- Homepage filters are operable buttons with result announcements and empty states.
- The newest publication remains the featured story.
- Cards include real covers, author, date and content-specific calls to action.
- Archives include collection purpose, featured work, archive structure and relevant methodology or subscription links.
- Scorecards include the editorial-assessment disclosure, cover, methodology explanation and preserved historical body values.
- Imported article H1 headings are demoted and long articles receive heading-based tables of contents and Back to top links.
- Related content uses explainable shared topic or content-type signals.
- Audit links route through the service page rather than Stripe.
- Thirty-four glossary terms have searchable, filterable index entries, valid alphabet states and DefinedTerm pages.
- Search includes correct result wording, query heading, type/topic filters, relevance/newest sorting, highlighting and empty-state guidance.
- About, author, newsletter, footer and editorial-trust navigation are expanded.
- Page canonicals, article metadata, Open Graph, X cards, Report/Article, WebSite/SearchAction and DefinedTerm schema are implemented.
- Legacy Ghost tag routes and `/weekly` permanently redirect to canonical archives.
- Preview hosts remain protected and `noindex, nofollow`.

## Known limitations

- Structured Scorecard, framework, benchmark and Weekly fields exist in Sanity but the migrated documents still need editorial population before those fields can replace values embedded in legacy HTML.
- Framework definitions drafted in the blog glossary require comparison with the Knowledge Base before production approval.
- The protected preview requires a Vercel team login.
- PostHog remains disabled; no new analytics collection was enabled.
- Browser-based Lighthouse field data requires a public or authenticated test surface and should be repeated immediately before production promotion.

## Validation

- TypeScript: passed
- ESLint: passed
- Automated tests: 4 passed
- Next.js production build: passed; 98 routes generated
- Mobile overflow: none at 390px viewport
- Scorecard heading hierarchy: one H1
- Scorecard cover, disclosure, TOC and Report schema: present
- Glossary: 34 terms, 11 active alphabet letters, 15 disabled letters
- Search: correct `25 results` wording; topic and sort controls present
- Preview root: 200 through authenticated Vercel check
- Preview indexing header: `noindex, nofollow`
- Legacy redirects: permanent 308 with correct destination

## Rollback

Do not promote the preview. If a later production promotion must be reversed, redeploy the previous production commit `035e7bc` or use Vercel’s deployment history to promote deployment `dpl_DpPC1cWQQ9rmc7NuoP6EFLZcxxPo`.
