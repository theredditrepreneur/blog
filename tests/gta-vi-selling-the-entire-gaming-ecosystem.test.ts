import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  gtaViGamingEcosystemArticle,
  gtaViGamingEcosystemBody,
  gtaViGamingEcosystemRelated,
} from '../lib/articles/gta-vi-selling-the-entire-gaming-ecosystem'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('GTA VI gaming ecosystem article',()=>{
  it('uses the requested published metadata',()=>{
    expect(gtaViGamingEcosystemArticle.slug).toBe('gta-vi-selling-the-entire-gaming-ecosystem')
    expect(gtaViGamingEcosystemArticle.topic).toBe('Community Intelligence')
    expect(gtaViGamingEcosystemArticle.date).toBe('2026-07-29')
    expect(gtaViGamingEcosystemArticle.draft).toBe(false)
    expect(gtaViGamingEcosystemArticle.featured).toBe(true)
    expect(gtaViGamingEcosystemArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('gtaViGamingEcosystemArticle,xboxGameDiscInternetPermissionArticle')
    expect(routeRegistry).toContain('[gtaViGamingEcosystemArticle.slug]:gtaViGamingEcosystemBody')
    expect(routeRegistry).toContain('isGtaViGamingEcosystem')
    expect(articlePage).toContain('[gtaViGamingEcosystemArticle.slug]:gtaViGamingEcosystemRelated')
    expect(articlePage).toContain('item.slug!==gtaViGamingEcosystemArticle.slug')
  })

  it('keeps the requested cautions, frameworks and CTA',()=>{
    expect(gtaViGamingEcosystemBody).not.toContain('<h1')
    expect(gtaViGamingEcosystemBody).not.toContain('—')
    expect(gtaViGamingEcosystemBody).not.toMatch(/[™®]/)
    expect(gtaViGamingEcosystemBody).not.toContain('Continue reading')
    expect(gtaViGamingEcosystemBody).toContain('This does not mean GTA VI will definitely sell a particular number of consoles')
    expect(gtaViGamingEcosystemBody).toContain('Participation Hardware')
    expect(gtaViGamingEcosystemBody).toContain('Community Gravity')
    expect(gtaViGamingEcosystemBody).toContain('Launch Day Belonging Premium')
    expect(gtaViGamingEcosystemBody).toContain('Borrowed Demand Problem')
    expect(gtaViGamingEcosystemBody).toContain('Fear of Arriving Late')
    expect(gtaViGamingEcosystemBody).toContain('What This Means')
    expect(gtaViGamingEcosystemBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses current primary evidence and safe external links',()=>{
    expect(gtaViGamingEcosystemBody).toContain('19 November 2026')
    expect(gtaViGamingEcosystemBody).toContain('PlayStation 5 and Xbox Series X|S')
    expect(gtaViGamingEcosystemBody).toContain('rockstargames.com/VI')
    expect(gtaViGamingEcosystemBody).toContain('take2games.com/ir/news/rockstar-games-announces-pre-orders')
    const externalLinks=[...gtaViGamingEcosystemBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied cover and real related articles',()=>{
    const image=path.resolve('public/gta-vi-gaming-ecosystem-cover.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(1486634)
    expect(gtaViGamingEcosystemArticle.imageWidth).toBe(1672)
    expect(gtaViGamingEcosystemArticle.imageHeight).toBe(941)
    expect(gtaViGamingEcosystemArticle.imageAlt).toBe('Illustration showing one game attracting consoles, accessories and players across the gaming ecosystem.')
    expect(gtaViGamingEcosystemRelated).toEqual([
      'xbox-game-disc-needs-internet-permission',
      'playstation-fans-planning-blackout',
      'halo-playstation-community-intelligence',
    ])
  })
})
