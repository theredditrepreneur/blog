import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  metaGlassesOwnershipArticle,
  metaGlassesOwnershipBody,
  metaGlassesOwnershipRelated,
} from '../lib/articles/meta-glasses-monthly-charge-ownership'

describe('Meta glasses ownership case study',()=>{
  it('uses the requested published metadata',()=>{
    expect(metaGlassesOwnershipArticle.slug).toBe('meta-glasses-monthly-charge-ownership')
    expect(metaGlassesOwnershipArticle.type).toBe('Case Study')
    expect(metaGlassesOwnershipArticle.topic).toBe('Community Intelligence')
    expect(metaGlassesOwnershipArticle.date).toBe('2026-07-26')
    expect(metaGlassesOwnershipArticle.draft).toBe(false)
  })

  it('states the verified limits and current status of the test',()=>{
    expect(metaGlassesOwnershipBody).toContain('three free hours each month')
    expect(metaGlassesOwnershipBody).toContain('fifteen hours')
    expect(metaGlassesOwnershipBody).toContain('$19.99')
    expect(metaGlassesOwnershipBody).toContain('on device processing')
    expect(metaGlassesOwnershipBody).toContain('paused that test')
    expect(metaGlassesOwnershipBody).toContain('not promised that the feature will always remain free')
    expect(metaGlassesOwnershipBody).toContain('early access feature')
    expect(metaGlassesOwnershipBody).toContain('Ray Ban Meta glasses and Oakley Meta HSTN glasses')
  })

  it('includes useful internal links, takeaways and related cases',()=>{
    expect(metaGlassesOwnershipBody).toContain('href="/what-is-community-intelligence"')
    expect(metaGlassesOwnershipBody).toContain('href="/glossary/trust-collapse"')
    expect(metaGlassesOwnershipBody).toContain('Belief-Correction-388026b0422280249396c6fb9ec32a6d')
    expect(metaGlassesOwnershipBody).toContain('Narrative-Compression-388026b0422280178e89ee70e3aeb49e')
    expect(metaGlassesOwnershipBody).toContain('What This Means')
    expect(metaGlassesOwnershipRelated).toEqual([
      'squarespace-price-increase-community-intelligence',
      'hubspot-community-governance-product-decision',
      'facebook-becoming-more-like-tiktok',
    ])
  })

  it('contains no em dashes, fake quotation marks or trademark symbols',()=>{
    expect(metaGlassesOwnershipBody).not.toMatch(/[—™®]/)
    expect(metaGlassesOwnershipArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the original 16 by 9 cover image',()=>{
    const image=path.resolve('public/meta-glasses-monthly-charge-ownership.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(metaGlassesOwnershipArticle.imageWidth).toBe(1280)
    expect(metaGlassesOwnershipArticle.imageHeight).toBe(720)
  })
})
