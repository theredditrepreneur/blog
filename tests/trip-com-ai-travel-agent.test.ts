import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  tripComAiTravelAgentArticle,
  tripComAiTravelAgentBody,
  tripComAiTravelAgentFaqs,
  tripComAiTravelAgentRelated,
} from '../lib/articles/trip-com-ai-travel-agent'

describe('Trip.com AI travel agent industry article',()=>{
  it('uses the requested published metadata',()=>{
    expect(tripComAiTravelAgentArticle.slug).toBe('trip-com-wants-to-be-your-ai-travel-agent')
    expect(tripComAiTravelAgentArticle.topic).toBe('Industry News')
    expect(tripComAiTravelAgentArticle.date).toBe('2026-07-26')
    expect(tripComAiTravelAgentArticle.draft).toBe(false)
    expect(tripComAiTravelAgentArticle.featured).toBe(true)
    expect(tripComAiTravelAgentArticle.readingMinutes).toBeGreaterThanOrEqual(8)
    expect(tripComAiTravelAgentArticle.readingMinutes).toBeLessThanOrEqual(10)
  })

  it('states the verified product facts with availability limits',()=>{
    expect(tripComAiTravelAgentBody).toContain('AI travel assistant called TripGenie')
    expect(tripComAiTravelAgentBody).toContain('first launched as TripGen in February 2023')
    expect(tripComAiTravelAgentBody).toContain('Features can also vary by language, market and app version')
    expect(tripComAiTravelAgentBody).toContain('the traveller still chooses and completes the booking')
    expect(tripComAiTravelAgentBody).not.toContain('TripGenie books the entire holiday')
  })

  it('links current primary sources and separates facts from analysis',()=>{
    expect(tripComAiTravelAgentBody).toContain('https://www.trip.com/newsroom/?locale=en')
    expect(tripComAiTravelAgentBody).toContain('introducing-tripgenie-groundbreaking-ai-travel-assistant')
    expect(tripComAiTravelAgentBody).toContain('met-tripgenie-this-ai-assistant-is-all-you-need-to-plan-for-your-next-trip')
    expect(tripComAiTravelAgentBody).toContain('TCOM%2020F_04282026.pdf')
    expect(tripComAiTravelAgentBody).toContain('privacy-policy.html')
    expect(tripComAiTravelAgentBody).toContain('<h2>What Trip.com Has Confirmed</h2>')
    expect(tripComAiTravelAgentBody).toContain('<h2>The Neutrality Illusion</h2>')
  })

  it('includes services, FAQ and relevant related reading',()=>{
    expect(tripComAiTravelAgentBody).toContain('href="/what-is-community-intelligence"')
    expect(tripComAiTravelAgentBody).toContain('community-intelligence-audit')
    expect(tripComAiTravelAgentBody).toContain('ai-authority-audit')
    expect(tripComAiTravelAgentBody).toContain('reddit-authenticity-risk-audit')
    expect(tripComAiTravelAgentFaqs).toHaveLength(6)
    expect(tripComAiTravelAgentRelated).toEqual([
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'community-intelligence-is-an-early-warning-system',
      'metas-ai-search-is-another-signal-that-community-intelligence-is-becoming-essential',
    ])
  })

  it('contains one template heading and no prohibited editorial text',()=>{
    expect(tripComAiTravelAgentBody).not.toMatch(/—/)
    expect(tripComAiTravelAgentBody).not.toContain('<h1')
    expect(tripComAiTravelAgentBody).not.toContain('Continue reading')
    expect(tripComAiTravelAgentArticle.title).not.toMatch(/—/)
    expect(tripComAiTravelAgentArticle.metaDescription).not.toMatch(/—/)
  })

  it('ships the supplied 16 by 9 cover image',()=>{
    const image=path.resolve('public/trip-com-ai-travel-agent.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(tripComAiTravelAgentArticle.imageWidth).toBe(1280)
    expect(tripComAiTravelAgentArticle.imageHeight).toBe(720)
  })
})
