import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  xMoneySocialReputationArticle,
  xMoneySocialReputationBody,
  xMoneySocialReputationRelated,
} from '../lib/articles/x-money-social-reputation-financial-trust'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('X Money social reputation article',()=>{
  it('uses the requested published metadata',()=>{
    expect(xMoneySocialReputationArticle.slug).toBe('x-money-social-reputation-financial-trust')
    expect(xMoneySocialReputationArticle.topic).toBe('Community Intelligence')
    expect(xMoneySocialReputationArticle.date).toBe('2026-07-29')
    expect(xMoneySocialReputationArticle.draft).toBe(false)
    expect(xMoneySocialReputationArticle.featured).toBe(true)
    expect(xMoneySocialReputationArticle.seoTitle).toBe('X Money Is Turning Social Reputation Into Financial Trust')
    expect(xMoneySocialReputationArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('xMoneySocialReputationArticle,londonRobotaxiCommunityTrustArticle')
    expect(routeRegistry).toContain('[xMoneySocialReputationArticle.slug]:xMoneySocialReputationBody')
    expect(routeRegistry).toContain('isXMoneySocialReputation')
    expect(articlePage).toContain('[xMoneySocialReputationArticle.slug]:xMoneySocialReputationRelated')
  })

  it('keeps the editorial, framework and CTA requirements',()=>{
    expect(xMoneySocialReputationBody).not.toContain('<h1')
    expect(xMoneySocialReputationBody).not.toContain('—')
    expect(xMoneySocialReputationBody).not.toMatch(/[™®]/)
    expect(xMoneySocialReputationBody).not.toContain('Continue reading')
    expect(xMoneySocialReputationBody).toContain('Social Trust Collateral')
    expect(xMoneySocialReputationBody).toContain('Reputation-to-Transaction Pipeline')
    expect(xMoneySocialReputationBody).toContain('Community Verification Layer')
    expect(xMoneySocialReputationBody).toContain('Moderation-to-Money Risk')
    expect(xMoneySocialReputationBody).toContain('Platform Trust Transfer')
    expect(xMoneySocialReputationBody).toContain('Community Fraud Surface')
    expect(xMoneySocialReputationBody).toContain("Editor's Note")
    expect(xMoneySocialReputationBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses current sources and safe external links',()=>{
    expect(xMoneySocialReputationBody).toContain('apnews.com/article/elon-musk-x-money-cross-river-payments')
    expect(xMoneySocialReputationBody).toContain('help.x.com/en/managing-your-account/suspended-x-accounts')
    expect(xMoneySocialReputationBody).toContain('help.x.com/en/rules-and-policies/authenticity')
    const externalLinks=[...xMoneySocialReputationBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied 16:9 cover and existing related articles',()=>{
    const image=path.resolve('public/x-money-social-reputation-financial-trust.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(169825)
    expect(xMoneySocialReputationArticle.imageWidth).toBe(1280)
    expect(xMoneySocialReputationArticle.imageHeight).toBe(720)
    expect(xMoneySocialReputationArticle.imageAlt).toBe('An X Money app and payment card surrounded by community, security and reputation symbols, with The Redditrepreneur logo.')
    expect(xMoneySocialReputationRelated).toEqual([
      'patreon-was-built-to-protect-creators-from-platform-change',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'community-intelligence-is-an-early-warning-system',
    ])
  })
})
