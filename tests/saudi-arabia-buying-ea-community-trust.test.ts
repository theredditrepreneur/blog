import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  saudiEaCommunityTrustArticle,
  saudiEaCommunityTrustBody,
  saudiEaCommunityTrustRelated,
} from '../lib/articles/saudi-arabia-buying-ea-community-trust'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')

describe('Saudi Arabia and EA community trust article',()=>{
  it('uses the requested published metadata',()=>{
    expect(saudiEaCommunityTrustArticle.slug).toBe('saudi-arabia-buying-ea-community-trust')
    expect(saudiEaCommunityTrustArticle.topic).toBe('Community Intelligence')
    expect(saudiEaCommunityTrustArticle.date).toBe('2026-07-27')
    expect(saudiEaCommunityTrustArticle.draft).toBe(false)
    expect(saudiEaCommunityTrustArticle.featured).toBe(true)
    expect(saudiEaCommunityTrustArticle.seoTitle).toBe('Saudi Arabia Is Buying EA. What Happens to Community Trust?')
    expect(contentRegistry).toContain('saudiEaCommunityTrustArticle,christopherNolanOdysseyArticle')
  })

  it('carefully describes the transaction as proposed and not completed',()=>{
    expect(saudiEaCommunityTrustBody).toContain('proposed acquisition')
    expect(saudiEaCommunityTrustBody).toContain('has not been confirmed as legally completed')
    expect(saudiEaCommunityTrustBody).toContain('Public Investment Fund')
    expect(saudiEaCommunityTrustBody).toContain('Silver Lake')
    expect(saudiEaCommunityTrustBody).toContain('Affinity Partners')
    expect(saudiEaCommunityTrustBody).toContain('www.ea.com/news/ea-announces-agreement-to-be-acquired')
    expect(saudiEaCommunityTrustBody).toContain('live.euronext.com/en/financial-news')
  })

  it('keeps the requested plain editorial conventions',()=>{
    expect(saudiEaCommunityTrustBody).not.toContain('<h1')
    expect(saudiEaCommunityTrustBody).not.toContain('—')
    expect(saudiEaCommunityTrustBody).not.toMatch(/[™®]/)
    expect(saudiEaCommunityTrustBody).not.toContain('Continue reading')
    expect(saudiEaCommunityTrustBody).toContain('<strong>Ownership Legitimacy Gap</strong>')
    expect(saudiEaCommunityTrustBody).toContain('<strong>Community-Backed Asset Value</strong>')
    expect(saudiEaCommunityTrustBody).toContain('<strong>Ownership Opacity</strong>')
    expect(saudiEaCommunityTrustBody).toContain('<strong>Cultural Distribution Power</strong>')
  })

  it('opens external links safely',()=>{
    const externalLinks=[...saudiEaCommunityTrustBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied cover and curated related articles',()=>{
    const image=path.resolve('public/saudi-arabia-buying-ea-community-trust.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(148352)
    expect(saudiEaCommunityTrustArticle.imageWidth).toBe(1280)
    expect(saudiEaCommunityTrustArticle.imageHeight).toBe(720)
    expect(saudiEaCommunityTrustRelated).toEqual([
      'xbox-game-pass-more-for-less',
      'amazon-games-inside-prime-video',
      'community-intelligence-is-an-early-warning-system',
    ])
  })
})
