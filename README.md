# The Redditrepreneur Research Platform

The new publishing platform for `blog.theredditrepreneur.com`, built with Next.js, TypeScript, Sanity and Pagefind.

## Local development

1. Copy `.env.example` to `.env.local` and add the development Sanity project values.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`; the embedded Studio is at `/studio` once Sanity is configured.

## Verification

```text
npm run ghost:audit -- --file=<ghost-export.json>
npm run ghost:dry-run -- --file=<ghost-export.json>
npm run ghost:images -- --file=<ghost-export.json>
npm run ghost:verify -- --file=<ghost-export.json> --imported=reports/generated/ghost-dry-run.ndjson
npm test
npm run typecheck
npm run lint
npm run build
```

Never place API tokens in the repository. Production deployment and domain cutover require explicit approval.

## Documentation

- [Publishing guide](docs/HOW-TO-PUBLISH.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Ghost migration](docs/GHOST-MIGRATION.md)
- [Launch, DNS and rollback](docs/LAUNCH-AND-ROLLBACK.md)
- [QA and known limitations](docs/QA-AND-LIMITATIONS.md)
