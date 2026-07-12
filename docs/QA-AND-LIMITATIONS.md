# QA and Known Limitations

## Current verified results

- Ghost export: 26 posts, 3 pages, 9 tags, 1 author and 27 feature images.
- Development transformation: 30 documents including the author.
- Verification: 29 of 29 content records passed title, slug and publication-date checks.
- Images: 38 source URLs downloaded, 37 unique files after hashing, 0 failures.
- No duplicate slugs.
- Unit tests, type checking, linting and the production build pass.
- Desktop and 390px mobile homepage/article checks found no homepage horizontal overflow.

## Manual work still required

- Review 11 uncertain content-type mappings.
- Convert sanitised legacy HTML into fully native Portable Text blocks.
- Extract the two brand Scorecard tables into verified dimension fields without changing scores.
- Reconcile Weekly issues #1, #2 and #3 using the final Ghost delta export.
- Add approved article cover-image alt text and captions.
- Replace the legal operational summaries with legally approved text.
- Audit duplication against `research.theredditrepreneur.com` before canonical consolidation.
- Complete real Chrome, Safari and Firefox checks on the hosted preview.
- Run Lighthouse and automated WCAG checks on the hosted preview.

## Connected development services

- Sanity project: `zoust8g9`, dataset: `development`.
- Sanity development import: 30 documents, 27 attached cover images and the approved founder image.
- Sanity schema validation: no error-level failures.
- Protected Vercel preview: `https://reddit-research-platform-i9j5rb263-the-redditrepreneur.vercel.app`.
- Hosted homepage, `robots.txt` and `rss.xml` return HTTP 200 through authenticated preview verification.
- Vercel applies `X-Robots-Tag: noindex` to the protected preview.

Production remains blocked until editorial review, legal approval, preview approval and explicit domain-cutover approval.
