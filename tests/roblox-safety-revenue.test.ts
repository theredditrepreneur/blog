import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  robloxSafetyRevenueArticle,
  robloxSafetyRevenueBody,
  robloxSafetyRevenueRelated,
} from '../lib/articles/roblox-safety-changes-hurt-revenue'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')
const industryRegistry=fs.readFileSync('lib/industries.ts','utf8')

describe('Roblox safety and revenue article',()=>{
  it('uses the requested published metadata',()=>{
    expect(robloxSafetyRevenueArticle.title).toContain('Safety Changes Hurt Revenue')
    expect(robloxSafetyRevenueArticle.slug).toBe('roblox-safety-changes-hurt-revenue')
    expect(robloxSafetyRevenueArticle.topic).toBe('Community Intelligence')
    expect(robloxSafetyRevenueArticle.industry).toBe('gaming')
    expect(robloxSafetyRevenueArticle.date).toBe('2026-07-31')
    expect(robloxSafetyRevenueArticle.draft).toBe(false)
    expect(robloxSafetyRevenueArticle.featured).toBe(true)
    expect(robloxSafetyRevenueArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for routing, listings and the Gaming desk',()=>{
    expect(contentRegistry).toContain('robloxSafetyRevenueArticle,jakePaulCulturalLegitimacyArticle')
    expect(routeRegistry).toContain('[robloxSafetyRevenueArticle.slug]:robloxSafetyRevenueBody')
    expect(articlePage).toContain('[robloxSafetyRevenueArticle.slug]:robloxSafetyRevenueRelated')
    expect(industryRegistry).toContain("'roblox-safety-changes-hurt-revenue': 'gaming'")
  })

  it('keeps safety claims careful and includes the requested sections',()=>{
    expect(robloxSafetyRevenueBody).not.toContain('<h1')
    expect(robloxSafetyRevenueBody).not.toContain('—')
    expect(robloxSafetyRevenueBody).toContain('Lower revenue alone does not prove that the system works')
    expect(robloxSafetyRevenueBody).toContain('Community Intelligence Frameworks')
    expect(robloxSafetyRevenueBody).toContain('Harm-Adjusted Engagement')
    expect(robloxSafetyRevenueBody).toContain('What This Means')
    expect(robloxSafetyRevenueBody).toContain('Understand What Your Community Really Thinks')
  })

  it('uses valid internal and safe external links',()=>{
    expect(robloxSafetyRevenueBody).toContain('href="/what-is-community-intelligence"')
    expect(robloxSafetyRevenueBody).toContain('href="/roblox-community-intelligence-scorecard"')
    expect(robloxSafetyRevenueBody).toContain('href="/fortnite-ai-characters-community-members"')
    expect(robloxSafetyRevenueBody).toContain('target="_blank" rel="noopener noreferrer"')
    expect(robloxSafetyRevenueRelated).toEqual([
      'roblox-ai-game-creation-discovery',
      'roblox-community-intelligence-scorecard',
      'fortnite-ai-characters-community-members',
    ])
  })

  it('uses the complete supplied 16:9 cover image',()=>{
    const image=path.resolve('public/roblox-safety-changes-hurt-revenue-cover.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeGreaterThan(100000)
    expect(robloxSafetyRevenueArticle.imageWidth).toBe(1672)
    expect(robloxSafetyRevenueArticle.imageHeight).toBe(941)
    expect(robloxSafetyRevenueArticle.imageAlt).toBe('Roblox-style characters beside a safety shield, falling revenue chart and coins.')
  })
})
