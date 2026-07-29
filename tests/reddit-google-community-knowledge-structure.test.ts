import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  redditGoogleKnowledgeStructureArticle,
  redditGoogleKnowledgeStructureBody,
  redditGoogleKnowledgeStructureRelated,
} from '../lib/articles/reddit-google-community-knowledge-structure'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Reddit and Google community knowledge structure article',()=>{
  it('uses the requested published metadata',()=>{
    expect(redditGoogleKnowledgeStructureArticle.slug).toBe('reddit-google-community-knowledge-structure')
    expect(redditGoogleKnowledgeStructureArticle.topic).toBe('Community Intelligence')
    expect(redditGoogleKnowledgeStructureArticle.date).toBe('2026-07-29')
    expect(redditGoogleKnowledgeStructureArticle.draft).toBe(false)
    expect(redditGoogleKnowledgeStructureArticle.featured).toBe(true)
    expect(redditGoogleKnowledgeStructureArticle.seoTitle).toBe('How Reddit Gives Google Structure for AI Search')
    expect(redditGoogleKnowledgeStructureArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('redditGoogleKnowledgeStructureArticle,appleLeasingOwnershipArticle')
    expect(routeRegistry).toContain('[redditGoogleKnowledgeStructureArticle.slug]:redditGoogleKnowledgeStructureBody')
    expect(routeRegistry).toContain('isRedditGoogleKnowledgeStructure')
    expect(articlePage).toContain('[redditGoogleKnowledgeStructureArticle.slug]:redditGoogleKnowledgeStructureRelated')
    expect(articlePage).toContain('item.slug!==redditGoogleKnowledgeStructureArticle.slug')
  })

  it('keeps the requested editorial, framework and CTA requirements',()=>{
    expect(redditGoogleKnowledgeStructureBody).not.toContain('<h1')
    expect(redditGoogleKnowledgeStructureBody).not.toContain('—')
    expect(redditGoogleKnowledgeStructureBody).not.toMatch(/[™®]/)
    expect(redditGoogleKnowledgeStructureBody).not.toContain('Continue reading')
    expect(redditGoogleKnowledgeStructureBody).toContain('Community Knowledge Structure')
    expect(redditGoogleKnowledgeStructureBody).toContain('Community Context Layer')
    expect(redditGoogleKnowledgeStructureBody).toContain('Community Judgement Signal')
    expect(redditGoogleKnowledgeStructureBody).toContain('Repeated Question Signal')
    expect(redditGoogleKnowledgeStructureBody).toContain('Community-to-Search Pipeline')
    expect(redditGoogleKnowledgeStructureBody).toContain('Search Reputation Transfer')
    expect(redditGoogleKnowledgeStructureBody).toContain("Editor's Note")
    expect(redditGoogleKnowledgeStructureBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses primary partnership sources and safe external links',()=>{
    expect(redditGoogleKnowledgeStructureBody).toContain('blog.google/company-news/inside-google/company-announcements/expanded-reddit-partnership')
    expect(redditGoogleKnowledgeStructureBody).toContain('redditinc.com/news/reddit-and-google-expand-partnership')
    const externalLinks=[...redditGoogleKnowledgeStructureBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied 16:9 cover and real related articles',()=>{
    const image=path.resolve('public/reddit-google-community-knowledge-structure.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(146231)
    expect(redditGoogleKnowledgeStructureArticle.imageWidth).toBe(1280)
    expect(redditGoogleKnowledgeStructureArticle.imageHeight).toBe(720)
    expect(redditGoogleKnowledgeStructureArticle.imageAlt).toBe('Reddit and Google puzzle pieces connected through a structured community network, with The Redditrepreneur logo.')
    expect(redditGoogleKnowledgeStructureRelated).toEqual([
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'google-just-brought-communities-into-ai-search-heres-why-it-matters',
      'the-community-intelligence-convergence-of-meta-reddit-and-google',
    ])
  })
})
