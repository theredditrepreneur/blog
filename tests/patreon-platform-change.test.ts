import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  patreonPlatformChangeArticle,
  patreonPlatformChangeBody,
  patreonPlatformChangeFaqs,
  patreonPlatformChangeRelated,
} from '../lib/articles/patreon-platform-change'

describe('Patreon platform change industry article',()=>{
  it('uses the requested published metadata',()=>{
    expect(patreonPlatformChangeArticle.slug).toBe('patreon-was-built-to-protect-creators-from-platform-change')
    expect(patreonPlatformChangeArticle.topic).toBe('Industry News')
    expect(patreonPlatformChangeArticle.date).toBe('2026-07-26')
    expect(patreonPlatformChangeArticle.draft).toBe(false)
    expect(patreonPlatformChangeArticle.featured).toBe(true)
    expect(patreonPlatformChangeArticle.readingMinutes).toBeGreaterThanOrEqual(8)
    expect(patreonPlatformChangeArticle.readingMinutes).toBeLessThanOrEqual(10)
  })

  it('states the verified restructuring facts carefully',()=>{
    expect(patreonPlatformChangeBody).toContain('23 July 2026')
    expect(patreonPlatformChangeBody).toContain('93 roles')
    expect(patreonPlatformChangeBody).toContain('20% of its team')
    expect(patreonPlatformChangeBody).toContain('was not making the cuts because it believed AI could replace people')
    expect(patreonPlatformChangeBody).toContain('https://www.patreon.com/jackconte/posts/painful-update-164628951')
    expect(patreonPlatformChangeBody).toContain('https://au.variety.com/2026/biz/news/patreon-cuts-20-percent-of-employees-restructuring-38826/')
  })

  it('links the official policies and uses plain framework explanations',()=>{
    expect(patreonPlatformChangeBody).toContain('https://www.patreon.com/patreon/posts/patreon-to-ai-164027757')
    expect(patreonPlatformChangeBody).toContain('https://www.patreon.com/policy/legal')
    expect(patreonPlatformChangeBody).toContain('https://support.patreon.com/hc/en-us/articles/34784011795469-Exporting-your-audience-s-emails-from-Patreon')
    expect(patreonPlatformChangeBody).toContain('Borrowed independence happens when a platform gives someone more control')
    expect(patreonPlatformChangeBody).toContain('Community Gravity is the force that makes people stay')
    expect(patreonPlatformChangeBody).toContain('Mission Premium means people expect more')
    expect(patreonPlatformChangeBody).toContain('Narrative Compression happens when a complicated event becomes one short belief')
  })

  it('includes the requested links, FAQ and related reading',()=>{
    expect(patreonPlatformChangeBody).toContain('href="/what-is-community-intelligence"')
    expect(patreonPlatformChangeBody).toContain('community-intelligence-audit')
    expect(patreonPlatformChangeBody).toContain('ai-authority-audit')
    expect(patreonPlatformChangeBody).toContain('reddit-authenticity-risk-audit')
    expect(patreonPlatformChangeFaqs).toHaveLength(5)
    expect(patreonPlatformChangeRelated).toEqual([
      'facebook-becoming-more-like-tiktok',
      'community-intelligence-is-an-early-warning-system',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
    ])
  })

  it('contains no em dashes, duplicate heading or unwanted text',()=>{
    expect(patreonPlatformChangeBody).not.toMatch(/—/)
    expect(patreonPlatformChangeBody).not.toContain('<h1')
    expect(patreonPlatformChangeBody).not.toContain('Continue reading')
    expect(patreonPlatformChangeArticle.title).not.toMatch(/—/)
    expect(patreonPlatformChangeArticle.metaDescription).not.toMatch(/—/)
  })

  it('ships the supplied 16 by 9 cover image',()=>{
    const image=path.resolve('public/patreon-platform-change.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(patreonPlatformChangeArticle.imageWidth).toBe(1280)
    expect(patreonPlatformChangeArticle.imageHeight).toBe(720)
  })
})
