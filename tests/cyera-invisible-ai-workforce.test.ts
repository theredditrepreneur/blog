import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  cyeraInvisibleAiWorkforceArticle,
  cyeraInvisibleAiWorkforceBody,
  cyeraInvisibleAiWorkforceRelated,
} from '../lib/articles/cyera-invisible-ai-workforce'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Cyera invisible AI workforce article',()=>{
  it('uses the requested published metadata',()=>{
    expect(cyeraInvisibleAiWorkforceArticle.slug).toBe('cyera-invisible-ai-workforce')
    expect(cyeraInvisibleAiWorkforceArticle.topic).toBe('Community Intelligence')
    expect(cyeraInvisibleAiWorkforceArticle.date).toBe('2026-07-29')
    expect(cyeraInvisibleAiWorkforceArticle.draft).toBe(false)
    expect(cyeraInvisibleAiWorkforceArticle.featured).toBe(true)
    expect(cyeraInvisibleAiWorkforceArticle.seoTitle).toBe('Cyera and the Rise of the Invisible AI Workforce')
    expect(cyeraInvisibleAiWorkforceArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('cyeraInvisibleAiWorkforceArticle,robloxAiGameCreationDiscoveryArticle')
    expect(routeRegistry).toContain('[cyeraInvisibleAiWorkforceArticle.slug]:cyeraInvisibleAiWorkforceBody')
    expect(routeRegistry).toContain('isCyeraInvisibleAiWorkforce')
    expect(articlePage).toContain('[cyeraInvisibleAiWorkforceArticle.slug]:cyeraInvisibleAiWorkforceRelated')
    expect(articlePage).toContain('item.slug!==cyeraInvisibleAiWorkforceArticle.slug')
  })

  it('keeps the editorial, framework and CTA requirements',()=>{
    expect(cyeraInvisibleAiWorkforceBody).not.toContain('<h1')
    expect(cyeraInvisibleAiWorkforceBody).not.toContain('—')
    expect(cyeraInvisibleAiWorkforceBody).not.toMatch(/[™®]/)
    expect(cyeraInvisibleAiWorkforceBody).not.toContain('Continue reading')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Invisible Organisational Community')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Agent Ownership Gap')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Machine Role Ambiguity')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Permission Without Belonging')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Recursive Accountability Gap')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Dormant Authority Risk')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Agent Biography')
    expect(cyeraInvisibleAiWorkforceBody).toContain('Organisational Legibility')
    expect(cyeraInvisibleAiWorkforceBody).toContain("Editor's Note")
    expect(cyeraInvisibleAiWorkforceBody).toContain('Book a Community Intelligence Audit')
  })

  it('states the transaction accurately and uses safe primary-source links',()=>{
    expect(cyeraInvisibleAiWorkforceBody).toContain('signed a letter of intent')
    expect(cyeraInvisibleAiWorkforceBody).toContain('transaction was still being completed')
    expect(cyeraInvisibleAiWorkforceBody).toContain('oasis.security/blog/next-generation-ai-security-platform')
    expect(cyeraInvisibleAiWorkforceBody).toContain('cyera.com/platform/identity-access')
    const externalLinks=[...cyeraInvisibleAiWorkforceBody.matchAll(/<a href="https:\/\/[^"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the user-approved 16:9 cover and real related articles',()=>{
    const image=path.resolve('public/cyera-invisible-ai-workforce.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(164195)
    expect(cyeraInvisibleAiWorkforceArticle.imageWidth).toBe(1280)
    expect(cyeraInvisibleAiWorkforceArticle.imageHeight).toBe(720)
    expect(cyeraInvisibleAiWorkforceArticle.imageAlt).toBe('AI agents, bots and machine identities forming a hidden workforce beneath a company, with The Redditrepreneur logo.')
    expect(cyeraInvisibleAiWorkforceRelated).toEqual([
      'openai-agent-hugging-face-community-oversight',
      'meta-smart-glasses-bystander-trust-problem',
      'london-robotaxi-race-community-trust',
    ])
  })
})
