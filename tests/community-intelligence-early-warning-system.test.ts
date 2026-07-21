import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import readingTime from 'reading-time'
import {
  communityIntelligenceEarlyWarningArticle,
  communityIntelligenceEarlyWarningBody,
  communityIntelligenceEarlyWarningRelated,
} from '../lib/articles/community-intelligence-early-warning-system'

describe('Community Intelligence early warning system research article',()=>{
  it('is published with the requested identity and metadata',()=>{
    expect(communityIntelligenceEarlyWarningArticle.draft).toBe(false)
    expect(communityIntelligenceEarlyWarningArticle.date).toBe('2026-07-21')
    expect(communityIntelligenceEarlyWarningArticle.slug).toBe('community-intelligence-is-an-early-warning-system')
    expect(communityIntelligenceEarlyWarningArticle.type).toBe('Research')
    expect(communityIntelligenceEarlyWarningArticle.topic).toBe('Community Intelligence')
    expect(communityIntelligenceEarlyWarningArticle.seoTitle).toBe('Community Intelligence Is an Early Warning System | The Redditrepreneur')
  })

  it('preserves the requested table of contents headings',()=>{
    const headings=[...communityIntelligenceEarlyWarningBody.matchAll(/<h2(?: id="[^"]+")?>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'Communities Talk Before Markets Move',
      'Research Is Beginning To Support This',
      'Markets Leave Signals Before They Shift',
      'What Community Intelligence Detects',
      'From Monitoring To Decision Making',
      'Why AI Makes Early Warning More Valuable',
      'The Community Intelligence Cycle',
      'Community Intelligence Is Strategic Infrastructure',
      "Editor's Note",
    ])
  })

  it('contains the cited study, internal links and branded call to action',()=>{
    expect(communityIntelligenceEarlyWarningBody).toContain('https://arxiv.org/abs/2511.16028')
    expect(communityIntelligenceEarlyWarningBody).toContain('/what-is-community-intelligence')
    expect(communityIntelligenceEarlyWarningBody).toContain('/research')
    expect(communityIntelligenceEarlyWarningBody).toContain('https://theredditrepreneur.com/services/community-intelligence-audit')
    expect(communityIntelligenceEarlyWarningBody).toContain('Turn Community Conversations Into Strategic Advantage')
  })

  it('uses relevant existing related content',()=>{
    expect(communityIntelligenceEarlyWarningRelated).toEqual([
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'the-community-intelligence-convergence-of-meta-reddit-and-google',
      'the-community-intelligence-stack-turning-conversations-into-competitive-advantage',
      'the-redditrepreneur-community-intelligence-scorecard',
    ])
  })

  it('calculates reading time and ships an optimised cover',()=>{
    const plain=communityIntelligenceEarlyWarningBody.replace(/<[^>]+>/g,' ')
    expect(communityIntelligenceEarlyWarningArticle.readingMinutes).toBe(Math.max(1,Math.ceil(readingTime(plain).minutes)))
    const image=path.resolve('public/community-intelligence-early-warning-system.webp')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(150_000)
    expect(communityIntelligenceEarlyWarningArticle.imageWidth).toBe(1280)
    expect(communityIntelligenceEarlyWarningArticle.imageHeight).toBe(720)
  })
})
