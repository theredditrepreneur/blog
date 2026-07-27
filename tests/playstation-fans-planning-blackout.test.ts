import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  playstationBlackoutArticle,
  playstationBlackoutBody,
  playstationBlackoutRelated,
} from '../lib/articles/playstation-fans-planning-blackout'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('PlayStation blackout article',()=>{
  it('uses the requested published metadata',()=>{
    expect(playstationBlackoutArticle.slug).toBe('playstation-fans-planning-blackout')
    expect(playstationBlackoutArticle.title).toBe('PlayStation Fans Are Planning a Blackout')
    expect(playstationBlackoutArticle.subtitle).toBe('When Community Anger Tries to Become Economic Power')
    expect(playstationBlackoutArticle.topic).toBe('Community Intelligence')
    expect(playstationBlackoutArticle.date).toBe('2026-07-27')
    expect(playstationBlackoutArticle.draft).toBe(false)
    expect(playstationBlackoutArticle.featured).toBe(true)
    expect(playstationBlackoutArticle.seoTitle).toBe('PlayStation Fans Are Planning a Blackout | The Redditrepreneur')
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('playstationBlackoutArticle,communityIntelligenceWeeklyTrustArticle')
    expect(routeRegistry).toContain('[playstationBlackoutArticle.slug]:playstationBlackoutBody')
    expect(routeRegistry).toContain('isPlaystationBlackout')
    expect(articlePage).toContain('[playstationBlackoutArticle.slug]:playstationBlackoutRelated')
  })

  it('keeps the requested editorial and framework conventions',()=>{
    expect(playstationBlackoutBody).not.toContain('<h1')
    expect(playstationBlackoutBody).not.toContain('—')
    expect(playstationBlackoutBody).not.toMatch(/[™®]/)
    expect(playstationBlackoutBody).not.toContain('Continue reading')
    expect(playstationBlackoutBody).toContain('The Behavioural Dissent Gap')
    expect(playstationBlackoutBody).toContain('Community anger &rarr; Public support &rarr; Decision to participate &rarr; Behaviour changes &rarr; Business signal')
    expect(playstationBlackoutBody).toContain('23 to 30 August 2026')
    expect(playstationBlackoutBody).toContain('Do You Know What Your Community Is Really Telling You?')
  })

  it('uses verified sources and safe external links',()=>{
    expect(playstationBlackoutBody).toContain('blog.playstation.com/2026/07/01/physical-disc-production-ending')
    expect(playstationBlackoutBody).toContain('vandal.elespanol.com/noticia/1350791870')
    const externalLinks=[...playstationBlackoutBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied cover and existing related articles',()=>{
    const image=path.resolve('public/playstation-fans-planning-blackout.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(172209)
    expect(playstationBlackoutArticle.imageWidth).toBe(1280)
    expect(playstationBlackoutArticle.imageHeight).toBe(720)
    expect(playstationBlackoutArticle.imageAlt).toBe('PlayStation fans are planning a blackout as community anger tries to become economic power')
    expect(playstationBlackoutRelated).toEqual([
      'amazon-games-inside-prime-video',
      'meta-glasses-monthly-charge-ownership',
      'xbox-game-pass-more-for-less',
    ])
  })
})
