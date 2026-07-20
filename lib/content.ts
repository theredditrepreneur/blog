export type ContentType = 'Research' | 'Scorecard' | 'Case Study' | 'Framework' | 'Benchmark' | 'Weekly' | 'Index' | 'Article'

export type ScorecardDimension = {
  name: string
  score: number
  displayScore?: string
  interpretation: string
}

export type ScorecardData = {
  brandName: string
  overallScore: number
  grade: string
  tier: string
  dimensions: ScorecardDimension[]
  keyInsight: string
  primaryStrength: string
  primaryRisk: string
}

export type ContentItem = {
  title: string
  slug: string
  type: ContentType
  excerpt: string
  subtitle?: string
  date: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  topic?: string
  seoTitle?: string
  metaDescription?: string
  socialTitle?: string
  socialDescription?: string
  tags?: string[]
  draft?: boolean
  readingMinutes?: number
  scorecard?: ScorecardData
}

import migrated from '@/data/migrated-content.json'
import {headOfCommunityIntelligenceDraft} from '@/lib/drafts/head-of-community-intelligence'
import {bookingComScorecardDraft} from '@/lib/drafts/booking-com-scorecard'
import {redditAiSlopArticle} from '@/lib/articles/reddit-ai-slop'
import {aiEvidenceLayerArticle} from '@/lib/articles/ai-evidence-layer'
import {franceSpainFrameworkDraft} from '@/lib/drafts/france-spain-framework'
import {englandCommunityCourtroomDraft} from '@/lib/drafts/england-community-courtroom'
import {communityIntelligenceWeeklyPlatformLiveDraft} from '@/lib/drafts/community-intelligence-weekly-platform-live'
import {bbcRadioCommunityDraft} from '@/lib/drafts/bbc-radio-community'
import {nikeCommunityScorecardDraft} from '@/lib/drafts/nike-community-scorecard'

export const latestWeeklySlug=communityIntelligenceWeeklyPlatformLiveDraft.slug
export const previousWeeklySlug='community-intelligence-weekly-the-death-of-social-listening-b2b-saas-community-intelligence-benchmarks-and-more'
export const latestWeeklyLegacySlug='community-intelligence-weekly-3'

const curated: ContentItem[] = [
  {title:'The AI Authority Formula',slug:'the-ai-authority-formula',type:'Article',excerpt:'AI does not invent trust. It interprets the public evidence surrounding a brand. The AI Authority Formula explains the six signals that shape whether AI systems recommend one company and ignore another.',date:'2026-07-13',topic:'AI Search',image:'/ai-authority-formula-cover.webp',imageAlt:'The AI Authority Formula showing Community Trust, Evidence Quality, Recommendation Frequency, Third Party Validation, Content Credibility and Expert Consensus'},
  {title: 'The Barclays Bank Community Intelligence Scorecard', slug: 'the-barclays-bank-community-intelligence-scorecard-says-expectations-are-even-higher-than-trust', type: 'Scorecard', excerpt: 'A structured analysis of how expectations, trust and community authority shape perceptions of Barclays Bank.', date: '2026-07-12', topic: 'Brand Intelligence'},
  {title: 'Community Intelligence Weekly: The Death Of Social Listening, B2B SaaS Community Intelligence Benchmarks and More', slug: previousWeeklySlug, type: 'Weekly', excerpt: 'This week: why social listening is giving way to Community Intelligence, new B2B SaaS benchmarks and the signals reshaping how brands understand communities.', date: '2026-07-08', topic: 'Community Strategy', image: '/community-intelligence-weekly.jpg'},
  {title: 'What Streamer University Teaches Us About Community Intelligence', slug: 'what-streamer-university-teaches-us-about-community-intelligence', type: 'Case Study', excerpt: 'What a creator-led institution reveals about belonging, authority and community-led growth.', date: '2026-07-08', topic: 'Creator Economy'},
  {title: 'The Redditrepreneur Community Intelligence Scorecard: Gymshark', slug: 'the-redditrepreneur-community-intelligence-scorecard-gymshark', type: 'Scorecard', excerpt: 'How Gymshark performs across the five dimensions of Community Intelligence.', date: '2026-07-06', topic: 'Consumer Brands'},
  {title: 'The 2026 B2B SaaS Community Intelligence Benchmarks', slug: 'the-2026-b2b-saas-community-intelligence-benchmarks-tracking-share-of-consensus', type: 'Benchmark', excerpt: 'Tracking Share of Consensus and the community signals influencing B2B SaaS discovery.', date: '2026-07-03', topic: 'B2B SaaS'},
  {title: 'The Community Intelligence Stack', slug: 'the-community-intelligence-stack-turning-conversations-into-competitive-advantage', type: 'Framework', excerpt: 'A practical framework for turning online conversations into competitive advantage.', date: '2026-06-27', topic: 'Community Strategy'},
  {title: 'What Is Community Gravity?', slug: 'what-is-community-gravity', type: 'Framework', excerpt: 'Why some communities naturally pull people in, keep them engaged and become difficult to leave.', date: '2026-06-25', topic: 'Community Strategy'},
  {title: 'Community Intelligence Index #1', slug: 'community-intelligence-index-1-the-state-of-online-communities-june-2026', type: 'Index', excerpt: 'The state of online communities in June 2026 and the movements shaping brands and culture.', date: '2026-07-01', topic: 'Market Research'},
  {title: 'What Is Community Intelligence?', slug: 'what-is-community-intelligence', type: 'Research', excerpt: 'Understanding the conversations that shape brands before brands even realise they are happening.', date: '2026-06-25', topic: 'Community Intelligence'},
]

const labels:Record<string,ContentType>={article:'Article',researchReport:'Research',scorecard:'Scorecard',caseStudy:'Case Study',framework:'Framework',benchmark:'Benchmark',weekly:'Weekly',indexIssue:'Index',page:'Article',newsBrief:'Article'}
const curatedBySlug=new Map(curated.map(x=>[x.slug===previousWeeklySlug?latestWeeklyLegacySlug:x.slug,x]))
const excerptDrafts:Record<string,string>={
  'spacex-and-the-hype-hangover':'What SpaceX reveals about the gap between intense community anticipation, lived experience and the trust left behind when hype begins to fade.',
  'why-british-people-are-flocking-to-paris-for-fete-de-la-musique':'How shared experience, community storytelling and social proof are turning a Paris music festival into a powerful cross-border cultural draw.',
  'the-world-cup-is-the-greatest-community-event-on-earth':'Why the World Cup demonstrates the extraordinary power of shared identity, ritual and participation to unite communities at global scale.',
  'apple-the-trust-vs-excitement-gap':'An analysis of the gap between Apple’s enduring community trust and the changing level of excitement surrounding its products and announcements.',
  'the-rise-of-tiktok-shop-how-communities-are-creating-a-new-era-of-commerce':'How TikTok Shop shows communities moving from product discovery and validation to participation in a new form of community-led commerce.',
  'the-interpretation-economy-why-authority-belongs-to-those-who-help-others-understand-reality':'Why authority increasingly belongs to people and communities that make complex events understandable, useful and relevant to others.',
  'reddit-just-launched-community-intelligence-tools-heres-what-they-cant-do':'What Reddit’s new intelligence tools reveal about the value of community data, and where software still requires human context and interpretation.',
  'metas-ai-search-is-another-signal-that-community-intelligence-is-becoming-essential':'Why Meta’s move into AI search strengthens the case for understanding the community conversations that influence discovery and trust.',
  'gen-z-isnt-leaving-search-theyre-redefining-it':'How Gen Z is reshaping search through communities, creators and trusted interpretation rather than abandoning search altogether.',
  'community-intelligence-weekly-reddits-new-community-intelligence-tools-gen-zs-search-shift-and-the-rise-of-community-commerce':'This week: Reddit’s intelligence tools, Gen Z’s changing discovery behaviour and the rise of commerce shaped by community trust.',
  'google-just-brought-communities-into-ai-search-heres-why-it-matters':'Why Google’s integration of community perspectives into AI search changes how brands earn visibility, authority and trust.',
  'gta-6-the-weight-of-expectation':'What the anticipation surrounding GTA 6 reveals about Expectation Gravity, community identity and the pressure placed on a cultural release.',
  'the-community-intelligence-convergence-of-meta-reddit-and-google':'How Meta, Reddit and Google are converging around community signals, and what that shift means for discovery and brand intelligence.',
  'why-cernuccis-pop-up-was-more-valuable-than-the-sales':'Why Cernucci’s pop-up created value beyond transactions by strengthening belonging, cultural visibility and community validation.',
  'the-post-gummysearch-playbook':'What the end of GummySearch signals about the next era of Reddit research, community evidence and competitive intelligence.',
  'the-death-of-social-listening-why-brands-are-switching-to-community-intelligence':'Why brands need context, belief and trusted community interpretation in addition to conventional mention and sentiment monitoring.',
}
const removeWordHyphens=(value:string)=>value.replace(/([A-Za-z])-([A-Za-z])/g,'$1 $2')
const migratedItems=(migrated as Array<{title:string;slug:string;type:string;excerpt:string;date:string;topic:string}>).filter(x=>x.type!=='page').map(x=>{
  const item=(curatedBySlug.get(x.slug)||{...x,type:labels[x.type]||'Article'}) as ContentItem
  return {...item,title:removeWordHyphens(item.title),excerpt:removeWordHyphens(excerptDrafts[item.slug]||item.excerpt),topic:item.topic?removeWordHyphens(item.topic):undefined}
})
const migratedSlugs=new Set((migrated as Array<{slug:string}>).map(item=>item.slug))
const curatedExtras=curated.filter(item=>!migratedSlugs.has(item.slug===previousWeeklySlug?latestWeeklyLegacySlug:item.slug))
export const content:ContentItem[]=[...migratedItems,...curatedExtras,nikeCommunityScorecardDraft,bbcRadioCommunityDraft,communityIntelligenceWeeklyPlatformLiveDraft,englandCommunityCourtroomDraft,franceSpainFrameworkDraft,aiEvidenceLayerArticle,redditAiSlopArticle,headOfCommunityIntelligenceDraft,bookingComScorecardDraft].sort((a,b)=>b.date.localeCompare(a.date))
export const draftContent:ContentItem[]=[]
export const allContent:ContentItem[]=[...content,...draftContent]

export const frameworks = ['Community Gravity', 'Market Gravity', 'Trust Collapse', 'Narrative Compression', 'Belief Correction', 'Mission Premium', 'Hype Hangover', 'Expectation Gravity', 'Community Intelligence Stack', 'Share of Consensus']
export const topics = ['AI Search', 'Brand Intelligence', 'Customer Insights', 'Community Strategy', 'Reddit', 'Creator Economy', 'B2B SaaS', 'Consumer Brands']
