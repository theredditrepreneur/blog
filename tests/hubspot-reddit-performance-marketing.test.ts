import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  hubspotRedditPerformanceArticle,
  hubspotRedditPerformanceBody,
  hubspotRedditPerformanceRelated,
} from '../lib/articles/hubspot-reddit-performance-marketing'

describe('HubSpot Reddit performance marketing article',()=>{
  it('uses the approved published metadata',()=>{
    expect(hubspotRedditPerformanceArticle.slug).toBe('hubspot-just-made-reddit-a-performance-marketing-channel')
    expect(hubspotRedditPerformanceArticle.topic).toBe('Industry Analysis')
    expect(hubspotRedditPerformanceArticle.date).toBe('2026-07-24')
    expect(hubspotRedditPerformanceArticle.draft).toBe(false)
  })

  it('preserves the supplied section structure',()=>{
    const headings=[...hubspotRedditPerformanceBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'Editor&rsquo;s Note',
      'The Job Description That Changes Everything',
      'Reddit Has Left the Social Media Team',
      'Performance Marketing Is Expanding',
      'Community Is Becoming Performance',
      'The Measurement Problem',
      'Community Intelligence Becomes Essential',
      'Reddit Is Only the Beginning',
      'The New Marketing Journey',
      'Why This Matters for Every Brand',
      'A Prediction',
      'Something to Remember',
      'Understand the Conversations Shaping Customer Trust',
    ])
  })

  it('contains the source, internal link, insight and audit CTA',()=>{
    expect(hubspotRedditPerformanceBody).toContain('https://www.indeed.com/viewjob?jk=9c5a7c769dbd520f')
    expect(hubspotRedditPerformanceBody).toContain('href="/what-is-community-intelligence"')
    expect(hubspotRedditPerformanceBody).toContain('Performance marketing tells you where the click came from.')
    expect(hubspotRedditPerformanceBody).toContain('https://www.theredditrepreneur.com/services/community-intelligence-audit')
    expect(hubspotRedditPerformanceRelated).toHaveLength(3)
  })

  it('contains no em dashes, trademark symbols or continue reading copy',()=>{
    expect(hubspotRedditPerformanceBody).not.toMatch(/[—™®]/)
    expect(hubspotRedditPerformanceArticle.metaDescription).not.toMatch(/[—™®]/)
    expect(hubspotRedditPerformanceBody.toLowerCase()).not.toContain('continue reading')
  })

  it('ships an optimised 16 by 9 cover',()=>{
    const image=path.resolve('public/hubspot-reddit-performance-marketing-channel.webp')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(150_000)
    expect(hubspotRedditPerformanceArticle.imageWidth).toBe(1280)
    expect(hubspotRedditPerformanceArticle.imageHeight).toBe(720)
  })
})
