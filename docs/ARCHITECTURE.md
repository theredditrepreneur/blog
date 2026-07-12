# Architecture

## Decision

The platform uses Next.js App Router, TypeScript, Sanity, Vercel and Pagefind. Substack remains responsible for newsletter delivery.

Sanity stores structured editorial content and relationships. The public site renders published documents server-side or statically, with publish webhooks triggering revalidation or a deployment. Draft content is available only through a protected preview. Pagefind indexes only generated public pages.

## Content model

The Studio includes Article, Research Report, Scorecard, Case Study, Framework, Benchmark, Community Intelligence Weekly, Community Intelligence Index, Glossary Entry, News Brief, Page, Author, Topic and reusable CTA schemas.

Manual related-content selections override the automatic system. Automatic ranking is deterministic: shared frameworks, topics, brands, glossary terms and content type receive declared weights; random posts are never used.

## Design tokens sampled from the supplied logo

- Dominant brand blue: `#166AA8`
- Deep sampled blue: `#0A3E70`
- Bright brand orange: `#FF4B00`
- Deep orange: `#DD4401`
- Publication navy: `#061B36`
- Paper: `#FFFDF9`
- Pale surface: `#F3F5F7`

Bright brand colours are retained for large accents. Darker accessible variants are used where text contrast requires them.

## Search and feeds

The first release uses Pagefind for low-cost, static public search. Sanity webhooks trigger a rebuild after publication. RSS routes exist for the main publication, Research, Scorecards, Frameworks and Weekly. Next.js generates `sitemap.xml`, `robots.txt` and `llms.txt`.

## Security and privacy

Imported HTML is sanitised; scripts, event handlers and JavaScript URLs are removed. Legacy embeds require allow-list review. CMS tokens remain server-side. CSP and other defensive headers are configured. PostHog defaults to disabled and no analytics code is loaded while disabled.
