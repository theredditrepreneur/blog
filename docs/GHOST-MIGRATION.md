# Ghost Migration Guide

## Safe sequence

1. Preserve the original Ghost JSON and the complete `content/images` archive.
2. Run the audit and review `reports/generated/ghost-audit.json`.
3. Review the proposed mappings and manual-review queue.
4. Run the dry import and verification.
5. Download and hash authorised images; review `image-migration.json`.
6. Import into the Sanity `development` dataset only.
7. Review every legacy HTML block, embed, table and missing SEO field.
8. Compare totals, titles, slugs, dates, metadata, body integrity, links and images.
9. Repeat after the Ghost content freeze using a final export.

The importer uses stable `ghost-<id>` document IDs and `createOrReplace`, making reruns idempotent. Unsupported elements remain visible in a sanitised `legacyHtml` block and are always flagged for review.

## Image handling

The downloader resolves `__GHOST_URL__`, retrieves originals, calculates SHA-256 hashes, deduplicates identical bytes and records every using article. Upload to Sanity happens only after the development project and write token are configured. Confirm alt text and captions manually.

## Exporting from Sanity later

Use Sanity’s dataset export command to create a full NDJSON export plus assets. Keep the schema source, migration files and redirect map in Git so content remains interpretable outside the vendor.
