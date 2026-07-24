import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  restIsFootballCommunitySuccessArticle,
  restIsFootballCommunitySuccessBody,
  restIsFootballCommunitySuccessRelated,
} from '../lib/articles/rest-is-football-community-success'

describe('The Rest Is Football community success article',()=>{
  it('uses the approved published metadata',()=>{
    expect(restIsFootballCommunitySuccessArticle.slug).toBe('the-rest-is-football-community-success-business-opportunities')
    expect(restIsFootballCommunitySuccessArticle.topic).toBe('Community Intelligence')
    expect(restIsFootballCommunitySuccessArticle.date).toBe('2026-07-24')
    expect(restIsFootballCommunitySuccessArticle.draft).toBe(false)
  })

  it('preserves the supplied section structure',()=>{
    const headings=[...restIsFootballCommunitySuccessBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'Communities Create Evidence Before Businesses Make Decisions',
      'Community Success Becomes Business Confidence',
      'Communities Are Constantly Running Market Research',
      'The Best Products Often Earn Their Next Opportunity',
      'Community Validation Reduces Risk',
      'This Happens Far Beyond Football',
      'AI Makes Community Evidence Even More Valuable',
      'Community Intelligence Is About Recognising Evidence Early',
      'Editor&rsquo;s Note',
    ])
  })

  it('contains verified source, internal links, closing insight and CTA',()=>{
    expect(restIsFootballCommunitySuccessBody).toContain('https://podnews.net/press-release/trif-netflix-renew')
    expect(restIsFootballCommunitySuccessBody).toContain('href="/what-is-community-intelligence"')
    expect(restIsFootballCommunitySuccessBody).toContain('href="/glossary/community-validation"')
    expect(restIsFootballCommunitySuccessBody).toContain('href="/the-ai-evidence-layer-is-more-important-than-any-single-platform"')
    expect(restIsFootballCommunitySuccessBody).toContain('The strongest business case is not always the best pitch.')
    expect(restIsFootballCommunitySuccessBody).toContain('https://theredditrepreneur.com')
    expect(restIsFootballCommunitySuccessRelated).toHaveLength(3)
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(restIsFootballCommunitySuccessBody).not.toMatch(/[—™®]/)
    expect(restIsFootballCommunitySuccessArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the original aspect ratio cover in the established format',()=>{
    const image=path.resolve('public/the-rest-is-football-community-success-cover.webp')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(180_000)
    expect(restIsFootballCommunitySuccessArticle.imageWidth).toBe(1280)
    expect(restIsFootballCommunitySuccessArticle.imageHeight).toBe(705)
  })
})
