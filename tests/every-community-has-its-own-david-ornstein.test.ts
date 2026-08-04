import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  davidOrnsteinCommunityTrustArticle,
  davidOrnsteinCommunityTrustBody,
  davidOrnsteinCommunityTrustRelated,
} from '../lib/articles/every-community-has-its-own-david-ornstein'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')+fs.readFileSync('lib/local-bodies.ts','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('David Ornstein community trust article',()=>{
  it('uses the requested published metadata',()=>{
    expect(davidOrnsteinCommunityTrustArticle.title).toBe('Every Community Has Its Own David Ornstein')
    expect(davidOrnsteinCommunityTrustArticle.slug).toBe('every-community-has-its-own-david-ornstein')
    expect(davidOrnsteinCommunityTrustArticle.topic).toBe('Community Intelligence')
    expect(davidOrnsteinCommunityTrustArticle.date).toBe('2026-07-29')
    expect(davidOrnsteinCommunityTrustArticle.draft).toBe(false)
    expect(davidOrnsteinCommunityTrustArticle.featured).toBe(true)
    expect(davidOrnsteinCommunityTrustArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('davidOrnsteinCommunityTrustArticle,gtaViGamingEcosystemArticle')
    expect(routeRegistry).toContain('[davidOrnsteinCommunityTrustArticle.slug]:davidOrnsteinCommunityTrustBody')
    expect(routeRegistry).toContain('isDavidOrnsteinCommunityTrust')
    expect(articlePage).toContain('[davidOrnsteinCommunityTrustArticle.slug]:davidOrnsteinCommunityTrustRelated')
    expect(articlePage).toContain('item.slug!==davidOrnsteinCommunityTrustArticle.slug')
  })

  it('keeps the requested copy, framework and CTA',()=>{
    expect(davidOrnsteinCommunityTrustBody).not.toContain('<h1')
    expect(davidOrnsteinCommunityTrustBody).not.toContain('â€”')
    expect(davidOrnsteinCommunityTrustBody).not.toMatch(/[â„¢Â®]/)
    expect(davidOrnsteinCommunityTrustBody).not.toContain('Continue reading')
    expect(davidOrnsteinCommunityTrustBody).toContain('Trust Concentration')
    expect(davidOrnsteinCommunityTrustBody).toContain('Who Does Your Community Trust?')
    expect(davidOrnsteinCommunityTrustBody).toContain('Explore Community Intelligence Audits')
    expect(davidOrnsteinCommunityTrustBody).toContain('href="https://theredditrepreneur.com"')
  })

  it('uses real internal links and the supplied cover',()=>{
    expect(davidOrnsteinCommunityTrustBody).toContain('href="/what-is-community-intelligence"')
    expect(davidOrnsteinCommunityTrustBody).toContain('href="/the-rest-is-football-community-success-business-opportunities"')
    expect(davidOrnsteinCommunityTrustBody).toContain('href="/christopher-nolan-the-odyssey-trust-conversation"')
    expect(davidOrnsteinCommunityTrustRelated).toEqual([
      'the-rest-is-football-community-success-business-opportunities',
      'christopher-nolan-the-odyssey-trust-conversation',
      'community-intelligence-is-an-early-warning-system',
    ])

    const image=path.resolve('public/every-community-david-ornstein-cover.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(177063)
    expect(davidOrnsteinCommunityTrustArticle.imageWidth).toBe(1280)
    expect(davidOrnsteinCommunityTrustArticle.imageHeight).toBe(720)
  })
})
