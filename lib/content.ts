export type ContentType = 'Research' | 'Scorecard' | 'Case Study' | 'Framework' | 'Benchmark' | 'Weekly' | 'Index' | 'Article'

export type ContentItem = {
  title: string
  slug: string
  type: ContentType
  excerpt: string
  date: string
  image?: string
  topic?: string
}

import migrated from '@/data/migrated-content.json'

const curated: ContentItem[] = [
  {title: 'The Barclays Bank Community Intelligence Scorecard', slug: 'the-barclays-bank-community-intelligence-scorecard-says-expectations-are-even-higher-than-trust', type: 'Scorecard', excerpt: 'A structured analysis of how expectations, trust and community authority shape perceptions of Barclays Bank.', date: '2026-07-12', topic: 'Brand Intelligence'},
  {title: 'Community Intelligence Weekly: The Death Of Social Listening, B2B SaaS Community Intelligence Benchmarks and More', slug: 'community-intelligence-weekly-3', type: 'Weekly', excerpt: 'This week: why social listening is giving way to Community Intelligence, new B2B SaaS benchmarks and the signals reshaping how brands understand communities.', date: '2026-07-08', topic: 'Community Strategy', image: '/community-intelligence-weekly.jpg'},
  {title: 'What Streamer University Teaches Us About Community Intelligence', slug: 'what-streamer-university-teaches-us-about-community-intelligence', type: 'Case Study', excerpt: 'What a creator-led institution reveals about belonging, authority and community-led growth.', date: '2026-07-08', topic: 'Creator Economy'},
  {title: 'The Redditrepreneur Community Intelligence Scorecard: Gymshark', slug: 'the-redditrepreneur-community-intelligence-scorecard-gymshark', type: 'Scorecard', excerpt: 'How Gymshark performs across the five dimensions of Community Intelligence.', date: '2026-07-06', topic: 'Consumer Brands'},
  {title: 'The 2026 B2B SaaS Community Intelligence Benchmarks', slug: 'the-2026-b2b-saas-community-intelligence-benchmarks-tracking-share-of-consensus', type: 'Benchmark', excerpt: 'Tracking Share of Consensus and the community signals influencing B2B SaaS discovery.', date: '2026-07-03', topic: 'B2B SaaS'},
  {title: 'The Community Intelligence Stack', slug: 'the-community-intelligence-stack-turning-conversations-into-competitive-advantage', type: 'Framework', excerpt: 'A practical framework for turning online conversations into competitive advantage.', date: '2026-06-27', topic: 'Community Strategy'},
  {title: 'What Is Community Gravity?', slug: 'what-is-community-gravity', type: 'Framework', excerpt: 'Why some communities naturally pull people in, keep them engaged and become difficult to leave.', date: '2026-06-25', topic: 'Community Strategy'},
  {title: 'Community Intelligence Index #1', slug: 'community-intelligence-index-1-the-state-of-online-communities-june-2026', type: 'Index', excerpt: 'The state of online communities in June 2026 and the movements shaping brands and culture.', date: '2026-07-01', topic: 'Market Research'},
  {title: 'What Is Community Intelligence?', slug: 'what-is-community-intelligence', type: 'Research', excerpt: 'Understanding the conversations that shape brands before brands even realise they are happening.', date: '2026-06-25', topic: 'Community Intelligence'},
]

const labels:Record<string,ContentType>={article:'Article',researchReport:'Research',scorecard:'Scorecard',caseStudy:'Case Study',framework:'Framework',benchmark:'Benchmark',weekly:'Weekly',indexIssue:'Index',page:'Article',newsBrief:'Article'}
const curatedBySlug=new Map(curated.map(x=>[x.slug,x]))
const removeWordHyphens=(value:string)=>value.replace(/([A-Za-z])-([A-Za-z])/g,'$1 $2')
export const content:ContentItem[]=(migrated as Array<{title:string;slug:string;type:string;excerpt:string;date:string;topic:string}>).filter(x=>x.type!=='page').map(x=>{
  const item=(curatedBySlug.get(x.slug)||{...x,type:labels[x.type]||'Article'}) as ContentItem
  return {...item,title:removeWordHyphens(item.title),excerpt:removeWordHyphens(item.excerpt),topic:item.topic?removeWordHyphens(item.topic):undefined}
}).sort((a,b)=>b.date.localeCompare(a.date))

export const frameworks = ['Community Gravity', 'Market Gravity', 'Trust Collapse', 'Narrative Compression', 'Belief Correction', 'Mission Premium', 'Hype Hangover', 'Expectation Gravity', 'Community Intelligence Stack', 'Share of Consensus']
export const topics = ['AI Search', 'Brand Intelligence', 'Customer Insights', 'Community Strategy', 'Reddit', 'Creator Economy', 'B2B SaaS', 'Consumer Brands']
