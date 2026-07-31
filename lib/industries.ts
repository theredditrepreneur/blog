import type {ContentItem} from './content'

export type IndustrySlug = 'gaming' | 'ai' | 'sport' | 'saas' | 'consumer-brands' | 'entertainment'

export type Industry = {
  slug: IndustrySlug
  name: string
  deskName: string
  description: string
  longDescription: string
  icon: 'controller' | 'spark' | 'ball' | 'window' | 'bag' | 'screen'
  frameworks: string[]
}

export const industries: Industry[] = [
  {
    slug: 'gaming',
    name: 'Gaming',
    deskName: 'Gaming Community Intelligence',
    description: 'Understanding gaming communities, launches, player behaviour and industry shifts.',
    longDescription: 'Research into the communities shaping games, platforms, launches, digital ownership and the relationships between players and publishers.',
    icon: 'controller',
    frameworks: ['Community Gravity', 'Trust Collapse', 'Belief Correction', 'Narrative Compression'],
  },
  {
    slug: 'ai',
    name: 'AI',
    deskName: 'AI Community Intelligence',
    description: 'Understanding how people use, trust and discuss artificial intelligence.',
    longDescription: 'Research into how people experience artificial intelligence, how trust forms around AI products and how communities respond as automated systems enter everyday life.',
    icon: 'spark',
    frameworks: ['Community Intelligence Stack', 'Share of Consensus', 'Trust Collapse', 'Belief Correction'],
  },
  {
    slug: 'sport',
    name: 'Sport',
    deskName: 'Sport Community Intelligence',
    description: 'Understanding fans, trusted voices and community behaviour.',
    longDescription: 'Research into fan identity, trusted voices, sporting events and the communities that shape reputation, loyalty and commercial value across sport.',
    icon: 'ball',
    frameworks: ['Community Gravity', 'Mission Premium', 'Narrative Compression', 'Belief Correction'],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    deskName: 'SaaS Community Intelligence',
    description: 'Understanding customers, competitors and product conversations.',
    longDescription: 'Research into the customer conversations, product expectations and competitive recommendations shaping software businesses.',
    icon: 'window',
    frameworks: ['Community Intelligence Stack', 'Share of Consensus', 'Trust Collapse', 'Customer Insight Triangle'],
  },
  {
    slug: 'consumer-brands',
    name: 'Consumer Brands',
    deskName: 'Consumer Brand Community Intelligence',
    description: 'Understanding reputation, trust and buying decisions.',
    longDescription: 'Research into how communities influence brand reputation, customer trust, product discovery and buying decisions.',
    icon: 'bag',
    frameworks: ['Mission Premium', 'Share of Consensus', 'Trust Collapse', 'Community Gravity'],
  },
  {
    slug: 'entertainment',
    name: 'Entertainment',
    deskName: 'Entertainment Community Intelligence',
    description: 'Understanding fandoms, streaming, creators and culture.',
    longDescription: 'Research into the audiences, fandoms, creators and cultural conversations shaping film, television, streaming and media.',
    icon: 'screen',
    frameworks: ['Community Gravity', 'Narrative Compression', 'Expectation Gravity', 'Hype Hangover'],
  },
]

const explicitIndustry: Record<string, IndustrySlug> = {
  'jake-paul-next-fight-cultural-legitimacy': 'sport',
  'fortnite-ai-characters-community-members': 'gaming',
  'every-community-has-its-own-david-ornstein': 'sport',
  'gta-vi-selling-the-entire-gaming-ecosystem': 'gaming',
  'xbox-game-disc-needs-internet-permission': 'gaming',
  'netflix-has-become-britains-default-tv-channel': 'entertainment',
  'cyera-invisible-ai-workforce': 'ai',
  'roblox-ai-game-creation-discovery': 'gaming',
  'reddit-google-community-knowledge-structure': 'ai',
  'apple-leasing-future-of-ownership': 'consumer-brands',
  'x-money-social-reputation-financial-trust': 'consumer-brands',
  'london-robotaxi-race-community-trust': 'ai',
  'halo-playstation-community-intelligence': 'gaming',
  'fanatics-building-the-sports-super-app': 'sport',
  'meta-smart-glasses-bystander-trust-problem': 'ai',
  'playstation-fans-planning-blackout': 'gaming',
  'saudi-arabia-buying-ea-community-trust': 'gaming',
  'christopher-nolan-the-odyssey-trust-conversation': 'entertainment',
  'adobe-ai-photo-critique': 'ai',
  'trip-com-wants-to-be-your-ai-travel-agent': 'ai',
  'patreon-was-built-to-protect-creators-from-platform-change': 'saas',
  'youtube-is-fighting-ai-slop-while-teaching-creators-to-make-more-ai-content': 'entertainment',
  'openai-agent-hugging-face-community-oversight': 'ai',
  'xbox-game-pass-is-becoming-more-for-less': 'gaming',
  'amazon-is-putting-games-inside-prime-video': 'gaming',
  'metas-smart-glasses-are-turning-ownership-into-a-monthly-charge': 'ai',
  'facebook-is-becoming-more-like-tiktok': 'consumer-brands',
  'the-world-cup-is-becoming-more-commercial': 'sport',
  'hubspot-is-letting-its-community-help-govern-product-decisions': 'saas',
  'squarespace-is-testing-how-much-its-community-will-tolerate': 'saas',
  'x-men-97-season-2-isnt-just-living-up-to-season-1': 'entertainment',
  'the-rest-is-football-community-success': 'sport',
  'hubspot-reddit-performance-marketing': 'saas',
  'the-2026-b2b-saas-community-intelligence-benchmarks-tracking-share-of-consensus': 'saas',
  'the-redditrepreneur-community-intelligence-scorecard-gymshark': 'consumer-brands',
  'the-barclays-bank-community-intelligence-scorecard-says-expectations-are-even-higher-than-trust': 'consumer-brands',
}

const keywordRules: Array<[IndustrySlug, RegExp]> = [
  ['gaming', /gaming|game\b|xbox|playstation|roblox|fortnite|halo|gta|electronic arts|\bea\b|nintendo|steam/i],
  ['sport', /sport|football|world cup|fanatics|ornstein|premier league|fifa|arsenal|chelsea|liverpool/i],
  ['saas', /saas|software|hubspot|squarespace|patreon|b2b|subscription platform/i],
  ['entertainment', /netflix|film|television|streaming|radio|x-men|odyssey|creator|music|cinema|bbc/i],
  ['ai', /artificial intelligence|\bai\b|openai|robotaxi|agent|algorithm|smart glasses|adobe|google search/i],
]

export function getIndustry(item: ContentItem): Industry {
  const explicit = item.industry || explicitIndustry[item.slug]
  if (explicit) return industries.find(industry => industry.slug === explicit)!

  const haystack = [item.title, item.excerpt, item.topic, ...(item.tags || [])].filter(Boolean).join(' ')
  const matched = keywordRules.find(([, rule]) => rule.test(haystack))?.[0]
  if (matched) return industries.find(industry => industry.slug === matched)!

  return industries.find(industry => industry.slug === 'consumer-brands')!
}

export function getIndustryBySlug(slug: string) {
  return industries.find(industry => industry.slug === slug)
}

export function getIndustryContent(items: ContentItem[], industry: Industry | IndustrySlug) {
  const slug = typeof industry === 'string' ? industry : industry.slug
  return items.filter(item => getIndustry(item).slug === slug)
}

export function getPopularTopics(items: ContentItem[]) {
  const counts = new Map<string, number>()
  items.forEach(item => [item.topic, ...(item.tags || [])].filter(Boolean).forEach(value => counts.set(value!, (counts.get(value!) || 0) + 1)))
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name]) => name)
}
