import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  haloPlaystationCommunityIntelligenceArticle,
  haloPlaystationCommunityIntelligenceBody,
  haloPlaystationCommunityIntelligenceRelated,
} from '../lib/articles/halo-playstation-community-intelligence'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')+fs.readFileSync('lib/local-bodies.ts','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Halo PlayStation Community Intelligence article',()=>{
  it('uses the requested published metadata',()=>{
    expect(haloPlaystationCommunityIntelligenceArticle.slug).toBe('halo-playstation-community-intelligence')
    expect(haloPlaystationCommunityIntelligenceArticle.topic).toBe('Community Intelligence')
    expect(haloPlaystationCommunityIntelligenceArticle.date).toBe('2026-07-29')
    expect(haloPlaystationCommunityIntelligenceArticle.draft).toBe(false)
    expect(haloPlaystationCommunityIntelligenceArticle.featured).toBe(true)
    expect(haloPlaystationCommunityIntelligenceArticle.seoTitle).toBe('Halo Comes to PlayStation: What It Means for Gaming Communities')
    expect(haloPlaystationCommunityIntelligenceArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('haloPlaystationCommunityIntelligenceArticle,fanaticsSportsSuperAppArticle')
    expect(routeRegistry).toContain('[haloPlaystationCommunityIntelligenceArticle.slug]:haloPlaystationCommunityIntelligenceBody')
    expect(routeRegistry).toContain('isHaloPlaystationCommunityIntelligence')
    expect(articlePage).toContain('[haloPlaystationCommunityIntelligenceArticle.slug]:haloPlaystationCommunityIntelligenceRelated')
  })

  it('keeps the editorial, framework and CTA requirements',()=>{
    expect(haloPlaystationCommunityIntelligenceBody).not.toContain('<h1')
    expect(haloPlaystationCommunityIntelligenceBody).not.toContain('—')
    expect(haloPlaystationCommunityIntelligenceBody).not.toMatch(/[™®]/)
    expect(haloPlaystationCommunityIntelligenceBody).not.toContain('Continue reading')
    expect(haloPlaystationCommunityIntelligenceBody).toContain('Community Identity Unbundling')
    expect(haloPlaystationCommunityIntelligenceBody).toContain("Editor's Note")
    expect(haloPlaystationCommunityIntelligenceBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses current official sources and safe external links',()=>{
    expect(haloPlaystationCommunityIntelligenceBody).toContain('news.xbox.com/en-us/2026/06/07/halo-campaign-evolved')
    expect(haloPlaystationCommunityIntelligenceBody).toContain('support.halowaypoint.com/hc/en-us/articles/50818310869268')
    const externalLinks=[...haloPlaystationCommunityIntelligenceBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied 16:9 cover and existing related articles',()=>{
    const image=path.resolve('public/halo-playstation-community-intelligence.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(237221)
    expect(haloPlaystationCommunityIntelligenceArticle.imageWidth).toBe(1280)
    expect(haloPlaystationCommunityIntelligenceArticle.imageHeight).toBe(720)
    expect(haloPlaystationCommunityIntelligenceArticle.imageAlt).toBe('Halo Comes to PlayStation cover image by The Redditrepreneur showing the shift from Xbox exclusivity to shared gaming communities.')
    expect(haloPlaystationCommunityIntelligenceRelated).toEqual([
      'xbox-game-pass-more-for-less',
      'playstation-fans-planning-blackout',
      'amazon-games-inside-prime-video',
    ])
  })
})
