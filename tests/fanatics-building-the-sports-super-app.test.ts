import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  fanaticsSportsSuperAppArticle,
  fanaticsSportsSuperAppBody,
  fanaticsSportsSuperAppRelated,
} from '../lib/articles/fanatics-building-the-sports-super-app'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Fanatics sports super app article',()=>{
  it('uses the requested published metadata',()=>{
    expect(fanaticsSportsSuperAppArticle.slug).toBe('fanatics-building-the-sports-super-app')
    expect(fanaticsSportsSuperAppArticle.topic).toBe('Community Intelligence')
    expect(fanaticsSportsSuperAppArticle.date).toBe('2026-07-28')
    expect(fanaticsSportsSuperAppArticle.draft).toBe(false)
    expect(fanaticsSportsSuperAppArticle.featured).toBe(true)
    expect(fanaticsSportsSuperAppArticle.seoTitle).toBe('Fanatics Is Building the Sports Super App')
    expect(fanaticsSportsSuperAppArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('fanaticsSportsSuperAppArticle,metaSmartGlassesBystanderTrustArticle')
    expect(routeRegistry).toContain('[fanaticsSportsSuperAppArticle.slug]:fanaticsSportsSuperAppBody')
    expect(routeRegistry).toContain('isFanaticsSportsSuperApp')
    expect(articlePage).toContain('[fanaticsSportsSuperAppArticle.slug]:fanaticsSportsSuperAppRelated')
  })

  it('keeps the requested editorial conventions and CTA',()=>{
    expect(fanaticsSportsSuperAppBody).not.toContain('<h1')
    expect(fanaticsSportsSuperAppBody).not.toContain('—')
    expect(fanaticsSportsSuperAppBody).not.toMatch(/[™®]/)
    expect(fanaticsSportsSuperAppBody).not.toContain('Continue reading')
    expect(fanaticsSportsSuperAppBody).toContain('Community Gravity')
    expect(fanaticsSportsSuperAppBody).toContain('Something to Remember')
    expect(fanaticsSportsSuperAppBody).toContain('Understand Your Community')
  })

  it('uses official sources and safe external links',()=>{
    expect(fanaticsSportsSuperAppBody).toContain('fanaticsinc.com/our-businesses')
    expect(fanaticsSportsSuperAppBody).toContain('fanaticsinc.com/all-partners')
    const externalLinks=[...fanaticsSportsSuperAppBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied cover and existing related articles',()=>{
    const image=path.resolve('public/fanatics-building-the-sports-super-app.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(137507)
    expect(fanaticsSportsSuperAppArticle.imageWidth).toBe(1280)
    expect(fanaticsSportsSuperAppArticle.imageHeight).toBe(720)
    expect(fanaticsSportsSuperAppArticle.imageAlt).toBe('Fanatics logo with sports league logos and the headline Fanatics Is Building the Sports Super App.')
    expect(fanaticsSportsSuperAppRelated).toEqual([
      'the-commercialisation-of-the-2026-world-cup',
      'xbox-game-pass-more-for-less',
      'amazon-games-inside-prime-video',
    ])
  })
})
