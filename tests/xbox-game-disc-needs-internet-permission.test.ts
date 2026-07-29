import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  xboxGameDiscInternetPermissionArticle,
  xboxGameDiscInternetPermissionBody,
  xboxGameDiscInternetPermissionRelated,
} from '../lib/articles/xbox-game-disc-needs-internet-permission'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Xbox game disc internet permission article',()=>{
  it('uses the requested published metadata',()=>{
    expect(xboxGameDiscInternetPermissionArticle.slug).toBe('xbox-game-disc-needs-internet-permission')
    expect(xboxGameDiscInternetPermissionArticle.topic).toBe('Community Intelligence')
    expect(xboxGameDiscInternetPermissionArticle.date).toBe('2026-07-29')
    expect(xboxGameDiscInternetPermissionArticle.draft).toBe(false)
    expect(xboxGameDiscInternetPermissionArticle.featured).toBe(true)
    expect(xboxGameDiscInternetPermissionArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('xboxGameDiscInternetPermissionArticle,netflixBritainDefaultTvChannelArticle')
    expect(routeRegistry).toContain('[xboxGameDiscInternetPermissionArticle.slug]:xboxGameDiscInternetPermissionBody')
    expect(routeRegistry).toContain('isXboxGameDiscInternetPermission')
    expect(articlePage).toContain('[xboxGameDiscInternetPermissionArticle.slug]:xboxGameDiscInternetPermissionRelated')
    expect(articlePage).toContain('item.slug!==xboxGameDiscInternetPermissionArticle.slug')
  })

  it('keeps the factual cautions and requested editorial structure',()=>{
    expect(xboxGameDiscInternetPermissionBody).not.toContain('<h1')
    expect(xboxGameDiscInternetPermissionBody).not.toContain('—')
    expect(xboxGameDiscInternetPermissionBody).not.toMatch(/[™®]/)
    expect(xboxGameDiscInternetPermissionBody).not.toContain('Continue reading')
    expect(xboxGameDiscInternetPermissionBody).toContain('This does not apply to every Xbox game')
    expect(xboxGameDiscInternetPermissionBody).toContain('Some physical games can be installed and played without a permanent internet connection')
    expect(xboxGameDiscInternetPermissionBody).toContain('This article does not claim that every Xbox disc becomes useless during every outage')
    expect(xboxGameDiscInternetPermissionBody).toContain('Community Intelligence Frameworks')
    expect(xboxGameDiscInternetPermissionBody).toContain('What This Means')
    expect(xboxGameDiscInternetPermissionBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses current reliable sources and safe external links',()=>{
    expect(xboxGameDiscInternetPermissionBody).toContain('27 July 2026')
    expect(xboxGameDiscInternetPermissionBody).toContain('learn.microsoft.com/en-us/gaming/game-publishing/concepts/licensing')
    expect(xboxGameDiscInternetPermissionBody).toContain('support.microsoft.com/en-us/topic/play-backward-compatible-games')
    expect(xboxGameDiscInternetPermissionBody).toContain('tomshardware.com/video-games/xbox')
    const externalLinks=[...xboxGameDiscInternetPermissionBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied cover and real related articles',()=>{
    const image=path.resolve('public/xbox-outages-cover.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(1376211)
    expect(xboxGameDiscInternetPermissionArticle.imageWidth).toBe(1672)
    expect(xboxGameDiscInternetPermissionArticle.imageHeight).toBe(941)
    expect(xboxGameDiscInternetPermissionArticle.imageAlt).toBe('Xbox outages illustrated with a controller, broken cloud connection and warning symbol.')
    expect(xboxGameDiscInternetPermissionRelated).toEqual([
      'xbox-game-pass-more-for-less',
      'playstation-fans-planning-blackout',
      'halo-playstation-community-intelligence',
    ])
  })
})
