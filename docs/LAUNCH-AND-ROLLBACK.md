# Launch, DNS and Rollback

## Content freeze and final import

1. Announce the freeze time and stop publishing or editing in Ghost.
2. Record the final live URL count and download a new Ghost JSON export and full image archive.
3. Back up Ghost configuration, redirects, theme and member/newsletter data where applicable.
4. Run audit, dry run, image migration and verification against the final export.
5. Import the delta into Sanity development, review it, then promote the verified dataset/configuration.
6. Run redirect, canonical, RSS, sitemap, structured-data, broken-link and visual checks against the preview.

## DNS cutover

Do not change `www`, `app` or `research`. Reduce only the `blog` record TTL in advance. Add the domain to the approved Vercel project, verify ownership, then replace the current `blog` target with the exact value Vercel supplies. HTTPS must be healthy before approval is complete.

## Rollback

Keep the previous Ghost deployment and DNS target recorded. If critical content, redirect, security or availability failures occur, restore the previous `blog` DNS target, pause new publishing, verify Ghost health and investigate on the preview deployment. Because existing paths are preserved, rollback does not require mass URL changes.

## Monitoring

For at least 30 days, monitor uptime, server errors, 404s, redirect chains, indexing, sitemap processing, canonical selection, traffic changes and newsletter/RSS delivery. Keep Ghost and its backups for at least 30 days after a stable cutover; 60–90 days is safer for SEO validation. Do not cancel it automatically.
