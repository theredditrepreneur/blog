import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {redditAiSlopArticle,redditAiSlopBody,redditAiSlopRelated} from '../lib/articles/reddit-ai-slop'

describe('Reddit AI slop research article',()=>{
  it('is published through the established article collection',()=>{
    expect(redditAiSlopArticle.draft).toBe(false)
    expect(redditAiSlopArticle.slug).toBe('reddit-is-using-ai-to-fight-ai-slop')
    expect(redditAiSlopArticle.topic).toBe('AI Search')
  })

  it('preserves the requested section structure',()=>{
    const headings=[...redditAiSlopBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'Reddit Has a Problem',
      'Reddit Is Fighting AI With AI',
      'Why Brands Should Care',
      'Authenticity Is Becoming a Competitive Advantage',
      'Community Intelligence Comes Before Community Marketing',
      'AI Authority Depends on Authentic Communities',
      'The Future Belongs to Brands That Deserve Attention',
      'Final Thought',
      'Discover How Authentic Your Reddit Strategy Really Is',
      'About The Redditrepreneur',
    ])
  })

  it('contains the approved links, callouts and disclaimer',()=>{
    expect(redditAiSlopBody).toContain('https://www.theredditrepreneur.com/community-intelligence')
    expect(redditAiSlopBody).toContain('/the-ai-authority-formula')
    expect(redditAiSlopBody).toContain('https://www.theredditrepreneur.com/services/reddit-authenticity-risk-audit')
    expect(redditAiSlopBody).toContain('The better question is: Do we deserve to participate?')
    expect(redditAiSlopBody).toContain('It is not affiliated with, endorsed by or produced by Reddit.')
    expect(redditAiSlopRelated).toEqual([
      'the-ai-authority-formula',
      'the-post-gummysearch-playbook',
      'the-death-of-social-listening-why-brands-are-switching-to-community-intelligence',
    ])
  })

  it('contains no prohibited typography or unsupported badge',()=>{
    expect(redditAiSlopBody).not.toContain('—')
    expect(redditAiSlopBody).not.toContain('™')
    expect(redditAiSlopBody).not.toContain('®')
  })

  it('ships the optimised cover',()=>{
    const image=path.resolve('public/reddit-ai-fight-ai-slop-cover.webp')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(150_000)
  })
})
