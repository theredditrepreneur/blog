import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  jakePaulCulturalLegitimacyArticle,
  jakePaulCulturalLegitimacyBody,
  jakePaulCulturalLegitimacyRelated,
} from '../lib/articles/jake-paul-next-fight-cultural-legitimacy'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')
const industryRegistry=fs.readFileSync('lib/industries.ts','utf8')

describe('Jake Paul cultural legitimacy article',()=>{
  it('uses the requested published metadata',()=>{
    expect(jakePaulCulturalLegitimacyArticle.title).toBe('Jake Paul’s Next Fight Is for Cultural Legitimacy')
    expect(jakePaulCulturalLegitimacyArticle.slug).toBe('jake-paul-next-fight-cultural-legitimacy')
    expect(jakePaulCulturalLegitimacyArticle.topic).toBe('Community Intelligence')
    expect(jakePaulCulturalLegitimacyArticle.industry).toBe('sport')
    expect(jakePaulCulturalLegitimacyArticle.date).toBe('2026-07-31')
    expect(jakePaulCulturalLegitimacyArticle.draft).toBe(false)
    expect(jakePaulCulturalLegitimacyArticle.featured).toBe(true)
    expect(jakePaulCulturalLegitimacyArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing and the Sport desk',()=>{
    expect(contentRegistry).toContain('jakePaulCulturalLegitimacyArticle,fortniteAiCharactersCommunityArticle')
    expect(routeRegistry).toContain('[jakePaulCulturalLegitimacyArticle.slug]:jakePaulCulturalLegitimacyBody')
    expect(articlePage).toContain('[jakePaulCulturalLegitimacyArticle.slug]:jakePaulCulturalLegitimacyRelated')
    expect(industryRegistry).toContain("'jake-paul-next-fight-cultural-legitimacy': 'sport'")
  })

  it('contains the direct answer, frameworks and custom CTA',()=>{
    expect(jakePaulCulturalLegitimacyBody).not.toContain('<h1')
    expect(jakePaulCulturalLegitimacyBody).not.toContain('—')
    expect(jakePaulCulturalLegitimacyBody).toContain('Jake Paul’s next challenge is cultural legitimacy because')
    expect(jakePaulCulturalLegitimacyBody).toContain('Community Intelligence Frameworks')
    expect(jakePaulCulturalLegitimacyBody).toContain('Institutional Community Memory')
    expect(jakePaulCulturalLegitimacyBody).toContain('What This Means')
    expect(jakePaulCulturalLegitimacyBody).toContain('Understand What Your Fans Really Care About')
    expect(jakePaulCulturalLegitimacyBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses real internal links and safe external links',()=>{
    expect(jakePaulCulturalLegitimacyBody).toContain('href="/what-is-community-intelligence"')
    expect(jakePaulCulturalLegitimacyBody).toContain('href="/every-community-has-its-own-david-ornstein"')
    expect(jakePaulCulturalLegitimacyBody).toContain('href="/netflix-has-become-britains-default-tv-channel"')
    expect(jakePaulCulturalLegitimacyBody).toContain('href="/the-commercialisation-of-the-2026-world-cup"')
    expect(jakePaulCulturalLegitimacyBody).toContain('target="_blank" rel="noopener noreferrer"')
    expect(jakePaulCulturalLegitimacyRelated).toEqual([
      'every-community-has-its-own-david-ornstein',
      'the-rest-is-football-community-success-business-opportunities',
      'the-commercialisation-of-the-2026-world-cup',
    ])
  })

  it('uses the supplied complete cover image',()=>{
    const image=path.resolve('public/jake-paul-cultural-legitimacy-cover.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeGreaterThan(100000)
    expect(jakePaulCulturalLegitimacyArticle.imageWidth).toBe(1672)
    expect(jakePaulCulturalLegitimacyArticle.imageHeight).toBe(941)
    expect(jakePaulCulturalLegitimacyArticle.imageAlt).toBe('Editorial illustration of Jake Paul representing audience growth, boxing and cultural legitimacy.')
  })
})
