import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {headOfCommunityIntelligenceBody,headOfCommunityIntelligenceDraft} from '../lib/drafts/head-of-community-intelligence'
import migrated from '../data/migrated-content.json'

describe('Head of Community Intelligence article draft',()=>{
  it('has a unique slug and remains explicitly marked as a draft',()=>{
    expect(headOfCommunityIntelligenceDraft.draft).toBe(true)
    expect(headOfCommunityIntelligenceDraft.readingMinutes).toBe(5)
    expect(headOfCommunityIntelligenceDraft.slug).toBe('why-every-company-will-eventually-hire-a-head-of-community-intelligence')
    expect(migrated.some(item=>item.slug===headOfCommunityIntelligenceDraft.slug)).toBe(false)
  })

  it('preserves the requested table of contents structure',()=>{
    const headings=[...headOfCommunityIntelligenceBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'The Blind Spot Inside Modern Businesses',
      'AI Has Made Community Conversations More Valuable Than Ever',
      'Every Executive Already Uses Community Intelligence',
      'The Cost of Having Nobody Responsible',
      'Community Intelligence Is Becoming a Leadership Function',
      'What a Head of Community Intelligence Actually Does',
      'The Future Is Already Here',
      'Until You Hire One, Borrow One',
      'Editor’s Note',
    ])
  })

  it('contains the approved contextual destinations and no em dash',()=>{
    expect(headOfCommunityIntelligenceBody).toContain('https://www.theredditrepreneur.com/community-intelligence')
    expect(headOfCommunityIntelligenceBody).toContain('/the-redditrepreneur-community-intelligence-scorecard/')
    expect(headOfCommunityIntelligenceBody).toContain('https://www.theredditrepreneur.com/services/ai-authority-audit')
    expect(headOfCommunityIntelligenceBody).toContain('https://www.theredditrepreneur.com/services/fractional-chief-community-intelligence-officer')
    expect(headOfCommunityIntelligenceBody).not.toContain('—')
  })

  it('ships the optimised 16 by 9 cover asset',()=>{
    const image=path.resolve('public/why-every-company-will-hire-a-head-of-community-intelligence.webp')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(150_000)
  })
})
