import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {xMen97Season2Article,xMen97Season2Body,xMen97Season2Related} from '../lib/articles/x-men-97-season-2-community-intelligence'

describe("X-Men '97 Season 2 Community Intelligence article",()=>{
  it('uses the approved published metadata',()=>{
    expect(xMen97Season2Article.slug).toBe('x-men-97-season-2-community-intelligence-episode-6')
    expect(xMen97Season2Article.topic).toBe('Community Intelligence')
    expect(xMen97Season2Article.date).toBe('2026-07-24')
    expect(xMen97Season2Article.draft).toBe(false)
    expect(xMen97Season2Article.subtitle).toContain('spoiler free')
  })

  it('preserves the supplied editorial structure and references',()=>{
    for(const reference of ['Polaris','Apocalypse','X&#45;Factor','Age of Apocalypse','Fatal Attractions','The Twelve','Astonishing X&#45;Men']){
      expect(xMen97Season2Body).toContain(reference)
    }
    expect(xMen97Season2Body).toContain('Editor&rsquo;s Note')
    expect(xMen97Season2Body).toContain('Understand What Your Community Is Really Telling You')
  })

  it('uses real related content and the established CTA',()=>{
    expect(xMen97Season2Related).toEqual([
      'community-intelligence-is-an-early-warning-system',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'what-is-community-intelligence',
    ])
    expect(xMen97Season2Body).toContain('href="/what-is-community-intelligence"')
    expect(xMen97Season2Body).toContain('https://theredditrepreneur.com')
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(xMen97Season2Body).not.toMatch(/[—™®]/)
    expect(xMen97Season2Article.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the supplied 16 by 9 cover',()=>{
    const image=path.resolve('public/x-men-97-season-2-community-intelligence.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(xMen97Season2Article.imageWidth).toBe(1280)
    expect(xMen97Season2Article.imageHeight).toBe(720)
  })
})
