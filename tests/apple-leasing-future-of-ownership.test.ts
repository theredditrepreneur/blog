import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  appleLeasingOwnershipArticle,
  appleLeasingOwnershipBody,
  appleLeasingOwnershipRelated,
} from '../lib/articles/apple-leasing-future-of-ownership'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Apple leasing and ownership article',()=>{
  it('uses the requested published metadata',()=>{
    expect(appleLeasingOwnershipArticle.slug).toBe('apple-leasing-future-of-ownership')
    expect(appleLeasingOwnershipArticle.topic).toBe('Community Intelligence')
    expect(appleLeasingOwnershipArticle.date).toBe('2026-07-29')
    expect(appleLeasingOwnershipArticle.draft).toBe(false)
    expect(appleLeasingOwnershipArticle.featured).toBe(true)
    expect(appleLeasingOwnershipArticle.seoTitle).toBe('Apple Leasing Is Redefining Technology Ownership')
    expect(appleLeasingOwnershipArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('appleLeasingOwnershipArticle,xMoneySocialReputationArticle')
    expect(routeRegistry).toContain('[appleLeasingOwnershipArticle.slug]:appleLeasingOwnershipBody')
    expect(routeRegistry).toContain('isAppleLeasingOwnership')
    expect(articlePage).toContain('[appleLeasingOwnershipArticle.slug]:appleLeasingOwnershipRelated')
    expect(articlePage).toContain('item.slug!==appleLeasingOwnershipArticle.slug')
  })

  it('keeps the editorial, framework and CTA requirements',()=>{
    expect(appleLeasingOwnershipBody).not.toContain('<h1')
    expect(appleLeasingOwnershipBody).not.toContain('—')
    expect(appleLeasingOwnershipBody).not.toMatch(/[™®]/)
    expect(appleLeasingOwnershipBody).not.toContain('Continue reading')
    expect(appleLeasingOwnershipBody).toContain('Ownership Relationship Drift')
    expect(appleLeasingOwnershipBody).toContain('Financial Ecosystem Lock-in')
    expect(appleLeasingOwnershipBody).toContain('Permanent Upgrade Cycle')
    expect(appleLeasingOwnershipBody).toContain('Access Affordability Illusion')
    expect(appleLeasingOwnershipBody).toContain('Return Condition Anxiety')
    expect(appleLeasingOwnershipBody).toContain('Product-to-Finance Trust Transfer')
    expect(appleLeasingOwnershipBody).toContain("Editor's Note")
    expect(appleLeasingOwnershipBody).toContain('Book a Community Intelligence Audit')
  })

  it('states the confirmed limited launch and uses safe source links',()=>{
    expect(appleLeasingOwnershipBody).toContain('limited to eligible customers in the United States')
    expect(appleLeasingOwnershipBody).toContain('Apple has not announced availability outside the United States')
    expect(appleLeasingOwnershipBody).toContain('apple.com/newsroom/2026/07/apple-upgrade-launches-in-the-united-states')
    expect(appleLeasingOwnershipBody).toContain('9to5mac.com/2026/07/28/apple-upgrade-leasing-program-debuts-how-it-works')
    const externalLinks=[...appleLeasingOwnershipBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied 16:9 cover and real related articles',()=>{
    const image=path.resolve('public/apple-leasing-future-of-ownership.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(103182)
    expect(appleLeasingOwnershipArticle.imageWidth).toBe(1280)
    expect(appleLeasingOwnershipArticle.imageHeight).toBe(720)
    expect(appleLeasingOwnershipArticle.imageAlt).toBe('Apple Is Leasing the Future cover image with a large Apple symbol and The Redditrepreneur logo.')
    expect(appleLeasingOwnershipRelated).toEqual([
      'apple-the-trust-vs-excitement-gap',
      'meta-glasses-monthly-charge-ownership',
      'patreon-was-built-to-protect-creators-from-platform-change',
    ])
  })
})
