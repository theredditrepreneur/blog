# Local content to Sanity migration

## Inventory

- Source: the repository's published `ContentItem` records and article body modules.
- Published source documents: 73.
- Documents already in Sanity before this migration: 37.
- Documents to add: 36.
- Authors: Tonte Bo Douglas.
- Relationships: author, topics/tags, featured content and homepage selections.
- Assets: local cover images in `public/` are uploaded to Sanity and reused by filename on reruns.

## Mapping

| Source type | Sanity type |
| --- | --- |
| Article | `article` |
| Research | `researchReport` |
| Scorecard | `scorecard` |
| Case Study | `caseStudy` |
| Framework | `framework` |
| Benchmark | `benchmark` |
| Weekly | `weekly` |
| Index | `indexIssue` |

Article HTML is converted into editable Portable Text. Existing slugs, dates, excerpts, SEO values and URLs are preserved. Topics become references. Cover images become Sanity image assets.

## Import and reruns

Run the dry run first:

```bash
npx sanity exec scripts/sanity/migrate-local-content.ts --with-user-token -- --dry-run
```

Run the import only after reviewing the dry-run count:

```bash
npx sanity exec scripts/sanity/migrate-local-content.ts --with-user-token
```

The importer skips slugs already present in Sanity. Stable source-backed IDs and image filename lookups make interrupted runs safe to repeat.

## Validation and cutover

After import, run `scripts/sanity/audit-content.ts`, schema validation, document validation, site tests and the production build. Existing public URLs remain unchanged. The frontend continues to support local content while newly published Sanity content is added automatically.
