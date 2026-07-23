# Community Intelligence Scorecard Migration Report

## Methodology change

The previous five dimension model has been replaced by nine equally weighted criteria across three pillars.

- Perception: Brand Trust, Product Satisfaction and Innovation Perception
- Participation: Community Engagement, Advocacy and Narrative Consistency
- Strategic Value: Competitive Position, Customer Support and AI Search Readiness

Each criterion is scored out of 10. The raw total out of 90 is normalised to an overall score out of 100. Pillar scores are calculated for readability and are not counted separately.

## Migrated Scorecards

| Scorecard | Previous overall | Current overall | Current rating | Migration note |
| --- | ---: | ---: | --- | --- |
| Nike | 84 | 84 | Excellent | The supplied nine criterion values were preserved. The rating changed from Strong to Excellent under the current rating bands. |
| Booking.com | 84 | 84 | Excellent | Existing trust, recommendation, support, presence and authority evidence was mapped to the current model. Product Satisfaction, Innovation Perception, AI Search Readiness and Narrative Consistency use conservative editorial interpretations of the published article. |
| Barclays Bank | 81 | 81 | Excellent | Existing evidence was mapped into all nine criteria. Product Satisfaction, Innovation Perception, AI Search Readiness and Narrative Consistency should receive editorial review when new research is available. |
| Gymshark | 91 | 91 | Exceptional | Existing evidence was mapped into all nine criteria. Product Satisfaction, Innovation Perception, Customer Support, AI Search Readiness and Narrative Consistency should be reviewed during the next research update. |

## New Scorecard

Roblox has been added using the approved nine criterion values. The central formula calculates an overall score of **88, Excellent**. This is a new research report rather than a migrated five dimension article.

## Editorial safeguards

- Unknown, missing, non numeric and out of range criteria fail validation.
- Overall scores and ratings are derived from the central methodology and cannot be supplied independently without a consistency check.
- Cards, article summaries and methodology pages use the same calculation functions.
- The build runs a migration validator and fails if any published Scorecard lacks all nine scores and interpretations, or if designated public surfaces reintroduce the legacy five dimension wording.
- Historical mappings preserve published overall scores where the evidence supports an honest translation. They do not claim new samples, research periods or statistical precision.

## Content management migration

The Sanity Scorecard schema now stores a fixed nine field criteria object, calculated overall score, calculated rating and optional analysis for every criterion. Legacy grade, tier and free form dimension fields are no longer part of the active schema.
