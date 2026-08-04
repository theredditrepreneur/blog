import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  metaSmartGlassesBystanderTrustArticle,
  metaSmartGlassesBystanderTrustBody,
  metaSmartGlassesBystanderTrustRelated,
} from '../lib/articles/meta-smart-glasses-bystander-trust-problem'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')+fs.readFileSync('lib/local-bodies.ts','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Meta smart glasses bystander trust article',()=>{
  it('uses the requested published metadata',()=>{
    expect(metaSmartGlassesBystanderTrustArticle.slug).toBe('meta-smart-glasses-bystander-trust-problem')
    expect(metaSmartGlassesBystanderTrustArticle.topic).toBe('Community Intelligence')
    expect(metaSmartGlassesBystanderTrustArticle.date).toBe('2026-07-28')
    expect(metaSmartGlassesBystanderTrustArticle.draft).toBe(false)
    expect(metaSmartGlassesBystanderTrustArticle.featured).toBe(true)
    expect(metaSmartGlassesBystanderTrustArticle.seoTitle).toBe("Meta's Smart Glasses Have a Bystander Trust Problem | The Redditrepreneur")
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('metaSmartGlassesBystanderTrustArticle,playstationBlackoutArticle')
    expect(routeRegistry).toContain('[metaSmartGlassesBystanderTrustArticle.slug]:metaSmartGlassesBystanderTrustBody')
    expect(routeRegistry).toContain('isMetaSmartGlassesBystanderTrust')
    expect(articlePage).toContain('[metaSmartGlassesBystanderTrustArticle.slug]:metaSmartGlassesBystanderTrustRelated')
  })

  it('keeps the requested editorial and framework conventions',()=>{
    expect(metaSmartGlassesBystanderTrustBody).not.toContain('<h1')
    expect(metaSmartGlassesBystanderTrustBody).not.toContain('—')
    expect(metaSmartGlassesBystanderTrustBody).not.toMatch(/[™®]/)
    expect(metaSmartGlassesBystanderTrustBody).not.toContain('Continue reading')
    expect(metaSmartGlassesBystanderTrustBody).toContain('The Bystander Trust Gap')
    expect(metaSmartGlassesBystanderTrustBody).toContain('Person wears product &rarr; People nearby notice it &rarr; Trust is formed &rarr; Community opinion spreads')
    expect(metaSmartGlassesBystanderTrustBody).toContain('Understand What Communities Really Think')
  })

  it('uses verified sources and safe external links',()=>{
    expect(metaSmartGlassesBystanderTrustBody).toContain('about.fb.com/news/2026/07/metas-ai-glasses-your-questions-answered')
    expect(metaSmartGlassesBystanderTrustBody).toContain('petapixel.com/2026/07/27/instagram-is-banning')
    const externalLinks=[...metaSmartGlassesBystanderTrustBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied cover and existing related articles',()=>{
    const image=path.resolve('public/meta-smart-glasses-bystander-trust-problem.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(159298)
    expect(metaSmartGlassesBystanderTrustArticle.imageWidth).toBe(1280)
    expect(metaSmartGlassesBystanderTrustArticle.imageHeight).toBe(720)
    expect(metaSmartGlassesBystanderTrustArticle.imageAlt).toBe('Meta smart glasses and the growing challenge of bystander trust.')
    expect(metaSmartGlassesBystanderTrustRelated).toEqual([
      'meta-glasses-monthly-charge-ownership',
      'facebook-becoming-more-like-tiktok',
      'openai-agent-hugging-face-community-oversight',
    ])
  })
})
