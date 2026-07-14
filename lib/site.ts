export const site = {
  name: 'The Redditrepreneur Research',
  shortName: 'The Redditrepreneur',
  description: 'Original Community Intelligence research, frameworks, scorecards and analysis from The Redditrepreneur.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.theredditrepreneur.com',
  main: process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://www.theredditrepreneur.com',
  app: process.env.NEXT_PUBLIC_APP_URL || 'https://app.theredditrepreneur.com',
  research: process.env.NEXT_PUBLIC_RESEARCH_URL || 'https://research.theredditrepreneur.com',
  newsletter: process.env.NEXT_PUBLIC_NEWSLETTER_URL || 'https://theredditrepreneur.substack.com/',
  audit: 'https://www.theredditrepreneur.com/services/community-intelligence-audit',
  aiAuthorityAudit: 'https://www.theredditrepreneur.com/services/ai-authority-audit',
  redditAuthenticityAudit: 'https://www.theredditrepreneur.com/services/reddit-authenticity-risk-audit',
}

export const nav = [
  ['Home', '/'], ['Research', '/research'], ['Scorecards', '/scorecards'], ['Case Studies', '/case-studies'],
  ['Frameworks', '/frameworks'], ['Benchmarks', '/benchmarks'], ['Glossary', '/glossary'],
  ['Weekly', '/community-intelligence-weekly'],
] as const
