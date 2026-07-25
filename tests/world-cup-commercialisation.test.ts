import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  worldCupCommercialisationArticle,
  worldCupCommercialisationBody,
  worldCupCommercialisationRelated,
} from '../lib/articles/world-cup-commercialisation'

describe('2026 World Cup commercialisation case study',()=>{
  it('uses the approved published metadata',()=>{
    expect(worldCupCommercialisationArticle.slug).toBe('the-commercialisation-of-the-2026-world-cup')
    expect(worldCupCommercialisationArticle.type).toBe('Case Study')
    expect(worldCupCommercialisationArticle.topic).toBe('Community Intelligence')
    expect(worldCupCommercialisationArticle.date).toBe('2026-07-25')
    expect(worldCupCommercialisationArticle.draft).toBe(false)
  })

  it('preserves the concise supplied section structure',()=>{
    const headings=[...worldCupCommercialisationBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'Fans Were Talking About More Than One Thing',
      'The Biggest Risk Isn&rsquo;t One Bad Decision',
      'Football Is More Than a Product',
      'Success Doesn&rsquo;t Always Mean Trust',
      'What Businesses Can Learn',
      'What Community Intelligence Reveals About This World Cup',
      'Final Thoughts',
    ])
  })

  it('contains the Community Intelligence link, related content and inline CTA',()=>{
    expect(worldCupCommercialisationBody).toContain('href="/what-is-community-intelligence"')
    expect(worldCupCommercialisationBody).toContain('https://theredditrepreneur.com')
    expect(worldCupCommercialisationRelated).toEqual([
      'france-hype-hangover-spain-belief-correction',
      'england-lost-the-match-community-courtroom',
      'what-is-community-intelligence',
    ])
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(worldCupCommercialisationBody).not.toMatch(/[—™®]/)
    expect(worldCupCommercialisationArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships an optimised 16 by 9 cover image',()=>{
    const image=path.resolve('public/world-cup-commercialisation.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(200_000)
    expect(worldCupCommercialisationArticle.imageWidth).toBe(1280)
    expect(worldCupCommercialisationArticle.imageHeight).toBe(720)
  })
})
