import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  fortniteAiCharactersCommunityArticle,
  fortniteAiCharactersCommunityBody,
  fortniteAiCharactersCommunityRelated,
} from '../lib/articles/fortnite-ai-characters-community-members'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Fortnite AI characters community article',()=>{
  it('uses the requested published metadata',()=>{
    expect(fortniteAiCharactersCommunityArticle.slug).toBe('fortnite-ai-characters-community-members')
    expect(fortniteAiCharactersCommunityArticle.topic).toBe('Community Intelligence')
    expect(fortniteAiCharactersCommunityArticle.date).toBe('2026-07-30')
    expect(fortniteAiCharactersCommunityArticle.draft).toBe(false)
    expect(fortniteAiCharactersCommunityArticle.featured).toBe(true)
    expect(fortniteAiCharactersCommunityArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('fortniteAiCharactersCommunityArticle,davidOrnsteinCommunityTrustArticle')
    expect(routeRegistry).toContain('[fortniteAiCharactersCommunityArticle.slug]:fortniteAiCharactersCommunityBody')
    expect(routeRegistry).toContain('isFortniteAiCharactersCommunity')
    expect(articlePage).toContain('[fortniteAiCharactersCommunityArticle.slug]:fortniteAiCharactersCommunityRelated')
    expect(articlePage).toContain('item.slug!==fortniteAiCharactersCommunityArticle.slug')
  })

  it('keeps the required frameworks, direct answer, cautions and CTA',()=>{
    expect(fortniteAiCharactersCommunityBody).not.toContain('<h1')
    expect(fortniteAiCharactersCommunityBody).not.toContain('—')
    expect(fortniteAiCharactersCommunityBody).not.toContain('Continue reading')
    expect(fortniteAiCharactersCommunityBody).toContain("Fortnite's AI characters are more than smarter NPCs")
    expect(fortniteAiCharactersCommunityBody).toContain('Community Intelligence Frameworks')
    for(const framework of ['Synthetic Community Membership','Persistent Social Role','Character Authority Transfer','Persona Fragmentation','Unwritten Canon','Synthetic Confidant Risk','Delegated Community Authority','Voice-Behaviour Gap']){
      expect(fortniteAiCharactersCommunityBody).toContain(framework)
    }
    expect(fortniteAiCharactersCommunityBody).toContain('What This Means')
    expect(fortniteAiCharactersCommunityBody).toContain('Book a Community Intelligence Audit')
    expect(fortniteAiCharactersCommunityBody).toContain("does not mean the character remembers them permanently")
    expect(fortniteAiCharactersCommunityBody).toContain("Epic has not said that every conversational character is a moderator")
  })

  it('uses current primary evidence and safe external links',()=>{
    expect(fortniteAiCharactersCommunityBody).toContain('30 July 2026')
    expect(fortniteAiCharactersCommunityBody).toContain('current game session')
    expect(fortniteAiCharactersCommunityBody).toContain('36 Fortnite characters')
    expect(fortniteAiCharactersCommunityBody).toContain('fortnite.com/news/publish-islands-with-llm-conversations-starting-july-30')
    expect(fortniteAiCharactersCommunityBody).toContain('dev.epicgames.com/documentation/fortnite/developing-personas-overview')
    const externalLinks=[...fortniteAiCharactersCommunityBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses real internal links, related articles and the supplied cover',()=>{
    for(const href of ['/what-is-community-intelligence','/roblox-ai-game-creation-discovery','/cyera-invisible-ai-workforce','/netflix-has-become-britains-default-tv-channel']){
      expect(fortniteAiCharactersCommunityBody).toContain(`href="${href}"`)
    }
    expect(fortniteAiCharactersCommunityRelated).toEqual([
      'roblox-ai-game-creation-discovery',
      'cyera-invisible-ai-workforce',
      'meta-smart-glasses-bystander-trust-problem',
    ])
    const image=path.resolve('public/fortnite-ai-characters-cover.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(1808006)
    expect(fortniteAiCharactersCommunityArticle.imageWidth).toBe(1672)
    expect(fortniteAiCharactersCommunityArticle.imageHeight).toBe(941)
    expect(fortniteAiCharactersCommunityArticle.imageAlt).toBe('Fortnite style AI characters shown as permanent members of a gaming community.')
  })
})
