import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  robloxAiGameCreationDiscoveryArticle,
  robloxAiGameCreationDiscoveryBody,
  robloxAiGameCreationDiscoveryRelated,
} from '../lib/articles/roblox-ai-game-creation-discovery'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')+fs.readFileSync('lib/local-bodies.ts','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Roblox AI game creation and discovery article',()=>{
  it('uses the requested published metadata',()=>{
    expect(robloxAiGameCreationDiscoveryArticle.slug).toBe('roblox-ai-game-creation-discovery')
    expect(robloxAiGameCreationDiscoveryArticle.topic).toBe('Community Intelligence')
    expect(robloxAiGameCreationDiscoveryArticle.date).toBe('2026-07-29')
    expect(robloxAiGameCreationDiscoveryArticle.draft).toBe(false)
    expect(robloxAiGameCreationDiscoveryArticle.featured).toBe(true)
    expect(robloxAiGameCreationDiscoveryArticle.seoTitle).toBe('Roblox AI Makes Game Creation Easy but Discovery Harder')
    expect(robloxAiGameCreationDiscoveryArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('robloxAiGameCreationDiscoveryArticle,redditGoogleKnowledgeStructureArticle')
    expect(routeRegistry).toContain('[robloxAiGameCreationDiscoveryArticle.slug]:robloxAiGameCreationDiscoveryBody')
    expect(routeRegistry).toContain('isRobloxAiGameCreationDiscovery')
    expect(articlePage).toContain('[robloxAiGameCreationDiscoveryArticle.slug]:robloxAiGameCreationDiscoveryRelated')
    expect(articlePage).toContain('item.slug!==robloxAiGameCreationDiscoveryArticle.slug')
  })

  it('keeps the editorial, framework and CTA requirements',()=>{
    expect(robloxAiGameCreationDiscoveryBody).not.toContain('<h1')
    expect(robloxAiGameCreationDiscoveryBody).not.toContain('—')
    expect(robloxAiGameCreationDiscoveryBody).not.toMatch(/[™®]/)
    expect(robloxAiGameCreationDiscoveryBody).not.toContain('Continue reading')
    expect(robloxAiGameCreationDiscoveryBody).toContain('Creation-Discovery Inversion')
    expect(robloxAiGameCreationDiscoveryBody).toContain('Community Attention Scarcity')
    expect(robloxAiGameCreationDiscoveryBody).toContain('Community Legitimacy Filter')
    expect(robloxAiGameCreationDiscoveryBody).toContain('Prompt-to-Platform Compression')
    expect(robloxAiGameCreationDiscoveryBody).toContain('Creator Identity Dilution')
    expect(robloxAiGameCreationDiscoveryBody).toContain('Participation-to-Production Shift')
    expect(robloxAiGameCreationDiscoveryBody).toContain('AI Slop Saturation Point')
    expect(robloxAiGameCreationDiscoveryBody).toContain("Editor's Note")
    expect(robloxAiGameCreationDiscoveryBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses official Roblox sources and safe external links',()=>{
    expect(robloxAiGameCreationDiscoveryBody).toContain('about.roblox.com/newsroom/2026/07/build-without-limits-on-roblox')
    expect(robloxAiGameCreationDiscoveryBody).toContain('about.roblox.com/en-nz/newsroom/2026/06/optimizing-discovery-great-games-reach-millions-players-roblox')
    const externalLinks=[...robloxAiGameCreationDiscoveryBody.matchAll(/<a href="https:\/\/[^"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied 16:9 cover and real related articles',()=>{
    const image=path.resolve('public/roblox-ai-game-creation-discovery.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(156600)
    expect(robloxAiGameCreationDiscoveryArticle.imageWidth).toBe(1280)
    expect(robloxAiGameCreationDiscoveryArticle.imageHeight).toBe(720)
    expect(robloxAiGameCreationDiscoveryArticle.imageAlt).toBe('A Roblox-style creator surrounded by games, community and platform features, with The Redditrepreneur logo.')
    expect(robloxAiGameCreationDiscoveryRelated).toEqual([
      'roblox-community-intelligence-scorecard',
      'reddit-is-using-ai-to-fight-ai-slop',
      'youtube-is-fighting-ai-slop-while-teaching-creators-to-make-more-ai-content',
    ])
  })
})
