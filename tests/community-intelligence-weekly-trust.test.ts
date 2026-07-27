import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  communityIntelligenceWeeklyTrustArticle,
  communityIntelligenceWeeklyTrustBody,
  communityIntelligenceWeeklyTrustRelated,
} from '../lib/articles/community-intelligence-weekly-trust'

const registry=fs.readFileSync('lib/content.ts','utf8')
const homepage=fs.readFileSync('app/page.tsx','utf8')

describe('Community Intelligence Weekly trust edition',()=>{
  it('uses the expanded topic-led Weekly title without Weekly 4 in the title',()=>{
    expect(communityIntelligenceWeeklyTrustArticle.title).toBe('Community Intelligence Weekly: Christopher Nolan, AI Advice, Platform Change and Gaming Trust')
    expect(communityIntelligenceWeeklyTrustArticle.subtitle).toBe('The biggest stories from the past week, the smartest conversations and what they mean for businesses.')
    expect(communityIntelligenceWeeklyTrustArticle.slug).toBe('community-intelligence-trust-becoming-biggest-advantage')
    expect(communityIntelligenceWeeklyTrustArticle.type).toBe('Weekly')
    expect(communityIntelligenceWeeklyTrustArticle.topic).toBe('Community Intelligence Weekly')
    expect(communityIntelligenceWeeklyTrustArticle.date).toBe('2026-07-27')
    expect(communityIntelligenceWeeklyTrustArticle.draft).toBe(false)
    expect(communityIntelligenceWeeklyTrustArticle.featured).toBe(true)
    expect(communityIntelligenceWeeklyTrustArticle.title).not.toMatch(/Weekly\s*#?4/i)
  })

  it('becomes the latest Weekly edition everywhere',()=>{
    expect(registry).toContain('export const latestWeeklySlug=communityIntelligenceWeeklyTrustArticle.slug')
    expect(registry).toContain('communityIntelligenceWeeklyTrustArticle,saudiEaCommunityTrustArticle')
    expect(homepage).toContain('/community-intelligence-weekly-trust.jpg')
    expect(homepage).toContain('Community Intelligence Weekly: Christopher Nolan, AI Advice, Platform Change and Gaming Trust')
  })

  it('uses simple semantic copy and the requested editorial elements',()=>{
    expect(communityIntelligenceWeeklyTrustBody).not.toContain('<h1')
    expect(communityIntelligenceWeeklyTrustBody).not.toContain('—')
    expect(communityIntelligenceWeeklyTrustBody).toContain("<h2>Welcome</h2>")
    expect(communityIntelligenceWeeklyTrustBody).toContain('<h2>Stories From the Past Week</h2>')
    expect(communityIntelligenceWeeklyTrustBody).not.toMatch(/\bthis week(?:'s)?\b/i)
    expect(communityIntelligenceWeeklyTrustBody).toContain('This is the fourth edition of Community Intelligence Weekly.')
    expect(communityIntelligenceWeeklyTrustBody).toContain('class="editors-note"')
    expect(communityIntelligenceWeeklyTrustBody).toContain('Understand What Your Community Is Really Saying')
    expect(communityIntelligenceWeeklyTrustBody).toContain('Explore Community Intelligence Services')
    expect(communityIntelligenceWeeklyTrustBody).toContain('https://app.theredditrepreneur.com')
    expect(communityIntelligenceWeeklyTrustBody).toContain('Explore the Community Intelligence Platform')
  })

  it('links the stories and selected related reading to real routes',()=>{
    expect(communityIntelligenceWeeklyTrustBody).toContain('/christopher-nolan-the-odyssey-trust-conversation')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/x-men-97-season-2-community-intelligence-episode-6')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/adobe-ai-photo-critique')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/trip-com-wants-to-be-your-ai-travel-agent')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/saudi-arabia-buying-ea-community-trust')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/youtube-is-fighting-ai-slop-while-teaching-creators-to-make-more-ai-content')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/patreon-was-built-to-protect-creators-from-platform-change')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/meta-glasses-monthly-charge-ownership')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/amazon-games-inside-prime-video')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/xbox-game-pass-more-for-less')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/facebook-becoming-more-like-tiktok')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/hubspot-community-governance-product-decision')
    expect(communityIntelligenceWeeklyTrustBody).toContain('/squarespace-price-increase-community-intelligence')
    expect(communityIntelligenceWeeklyTrustRelated).toEqual([
      'christopher-nolan-the-odyssey-trust-conversation',
      'x-men-97-season-2-community-intelligence-episode-6',
      'community-intelligence-is-an-early-warning-system',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'what-is-community-gravity',
    ])
  })

  it('ships the supplied 16 by 9 cover image',()=>{
    const image=path.resolve('public/community-intelligence-weekly-trust.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(169702)
    expect(communityIntelligenceWeeklyTrustArticle.imageWidth).toBe(1280)
    expect(communityIntelligenceWeeklyTrustArticle.imageHeight).toBe(720)
    expect(communityIntelligenceWeeklyTrustArticle.imageAlt).toBe('Community Intelligence Weekly editorial cover by The Redditrepreneur')
  })
})
