import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {communityIntelligenceWeeklyPlatformLiveBody,communityIntelligenceWeeklyPlatformLiveDraft,communityIntelligenceWeeklyPlatformLiveRelated} from '../lib/drafts/community-intelligence-weekly-platform-live'
import migrated from '../data/migrated-content.json'

const visibleText=communityIntelligenceWeeklyPlatformLiveBody.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()

describe('Community Intelligence Weekly platform launch draft',()=>{
  it('uses the requested slug and is marked for publication',()=>{
    expect(communityIntelligenceWeeklyPlatformLiveDraft.draft).toBe(false)
    expect(communityIntelligenceWeeklyPlatformLiveDraft.type).toBe('Weekly')
    expect(communityIntelligenceWeeklyPlatformLiveDraft.date).toBe('2026-07-17')
    expect(communityIntelligenceWeeklyPlatformLiveDraft.slug).toBe('community-intelligence-weekly-platform-live-vision-becoming-real')
    expect(migrated.some(item=>item.slug===communityIntelligenceWeeklyPlatformLiveDraft.slug)).toBe(false)
    const registry=fs.readFileSync(path.resolve('lib/content.ts'),'utf8')
    expect(registry).toContain('export const draftContent:ContentItem[]=')
    expect(registry).toMatch(/export const content:ContentItem\[\]=\[[^\n]*communityIntelligenceWeeklyPlatformLiveDraft/)
  })

  it('preserves the supplied heading structure',()=>{
    const headings=[...communityIntelligenceWeeklyPlatformLiveBody.matchAll(/<h([23])(?: [^>]*)?>(.*?)<\/h\1>/g)].map(match=>match[2].replace(/<[^>]*>/g,''))
    expect(headings).toEqual([
      "This Week's Headlines",
      'The Community Intelligence Platform Is Live',
      'Analyse',
      'Discover',
      'Alerts',
      'The Redditrepreneur Is Becoming a Community Intelligence Ecosystem',
      'Framework Spotlight',
      'The Community Courtroom',
      'The Role of Narrative Compression',
      'New Community Intelligence Scorecards',
      'Booking.com',
      'Barclays',
      'What I Am Thinking About',
      'The Community Intelligence Take',
      'Turn Community Conversations Into Strategic Intelligence',
      'Explore The Redditrepreneur',
    ])
  })

  it('contains no dash characters or word hyphens in visible copy or metadata',()=>{
    const metadata=[communityIntelligenceWeeklyPlatformLiveDraft.title,communityIntelligenceWeeklyPlatformLiveDraft.excerpt,communityIntelligenceWeeklyPlatformLiveDraft.seoTitle,communityIntelligenceWeeklyPlatformLiveDraft.metaDescription,communityIntelligenceWeeklyPlatformLiveDraft.socialTitle,communityIntelligenceWeeklyPlatformLiveDraft.socialDescription,communityIntelligenceWeeklyPlatformLiveDraft.imageAlt].join(' ')
    expect(visibleText).not.toMatch(/[\-–—]/)
    expect(metadata).not.toMatch(/[\-–—]/)
    expect(visibleText).not.toMatch(/\bIssue 4\b|\bWeekly 4\b/i)
    expect(metadata).not.toMatch(/\bIssue 4\b|\bWeekly 4\b/i)
  })

  it('uses each supplied framework link once and selects relevant related content',()=>{
    const courtroom='https://research.theredditrepreneur.com/Community-Courtroom-383026b0422280509b02dc95d11a62ac?pvs=25'
    const compression='https://research.theredditrepreneur.com/Narrative-Compression-388026b0422280178e89ee70e3aeb49e?pvs=25'
    expect(communityIntelligenceWeeklyPlatformLiveBody.split(courtroom)).toHaveLength(2)
    expect(communityIntelligenceWeeklyPlatformLiveBody.split(compression)).toHaveLength(2)
    expect(communityIntelligenceWeeklyPlatformLiveRelated).toEqual([
      'england-lost-the-match-community-courtroom',
      'booking-com-community-intelligence-scorecard',
      'the-barclays-bank-community-intelligence-scorecard-says-expectations-are-even-higher-than-trust',
      'what-is-community-intelligence',
      'the-community-intelligence-stack-turning-conversations-into-competitive-advantage',
    ])
  })

  it('shows the relevant existing blog covers within the matching sections',()=>{
    expect(communityIntelligenceWeeklyPlatformLiveBody).toContain('/england-community-courtroom.png')
    expect(communityIntelligenceWeeklyPlatformLiveBody).toContain('/booking-com-community-intelligence-scorecard.webp')
    expect(communityIntelligenceWeeklyPlatformLiveBody).toContain('/barclays-community-intelligence-scorecard.webp')
    expect((communityIntelligenceWeeklyPlatformLiveBody.match(/class="weekly-inline-cover"/g)||[])).toHaveLength(3)
    expect(fs.existsSync(path.resolve('public/barclays-community-intelligence-scorecard.webp'))).toBe(true)
  })

  it('ships the optimised 16 by 9 cover asset',()=>{
    expect(communityIntelligenceWeeklyPlatformLiveDraft.image).toBe('/community-intelligence-weekly-platform-live.png')
    expect(communityIntelligenceWeeklyPlatformLiveDraft.imageWidth).toBe(1280)
    expect(communityIntelligenceWeeklyPlatformLiveDraft.imageHeight).toBe(720)
    const image=path.resolve('public/community-intelligence-weekly-platform-live.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(400_000)
  })
})
