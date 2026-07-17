import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {bbcRadioCommunityBody,bbcRadioCommunityDraft,bbcRadioCommunityRelated} from '../lib/drafts/bbc-radio-community'
import migrated from '../data/migrated-content.json'

describe('BBC Radio 1 community article draft',()=>{
  it('uses the requested unique slug and is marked for publication',()=>{
    expect(bbcRadioCommunityDraft.slug).toBe('bbc-radio-1-is-hiring-communities')
    expect(bbcRadioCommunityDraft.draft).toBe(false)
    expect(bbcRadioCommunityDraft.date).toBe('2026-07-17')
    expect(migrated.some(item=>item.slug===bbcRadioCommunityDraft.slug)).toBe(false)
    const registry=fs.readFileSync(path.resolve('lib/content.ts'),'utf8')
    expect(registry).toContain('export const draftContent:ContentItem[]=[]')
    expect(registry).toMatch(/export const content:ContentItem\[\]=\[[^\n]*bbcRadioCommunityDraft/)
  })

  it('preserves the supplied headings and adds one contextual call to action',()=>{
    const headings=[...bbcRadioCommunityBody.matchAll(/<h([23])(?: [^>]*)?>(.*?)<\/h\1>/g)].map(match=>match[2].replace(/<[^>]*>/g,''))
    expect(headings).toEqual([
      "Editor's Note",
      'The New Qualification',
      'Followers Are Not the Asset',
      'Community Authority Is Becoming a Hiring Credential',
      'The Rise of the Evidence Layer',
      'Community Has Become Transferable Capital',
      'This Shift Will Not Stop With Radio',
      'The Risk for Traditional Talent',
      'What This Means for Organisations',
      'What This Means for Professionals',
      'The Community Intelligence Take',
      'Understand the Communities Shaping Your Market',
    ])
    expect((bbcRadioCommunityBody.match(/class="inline-cta"/g)||[])).toHaveLength(1)
  })

  it('uses verified internal links and deliberate related content',()=>{
    for(const href of ['/research','/what-is-community-intelligence','/glossary/community-authority','/the-ai-evidence-layer-is-more-important-than-any-single-platform'])expect(bbcRadioCommunityBody).toContain(`href="${href}"`)
    expect(bbcRadioCommunityRelated).toEqual([
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'what-streamer-university-teaches-us-about-community-intelligence',
      'the-community-intelligence-stack-turning-conversations-into-competitive-advantage',
      'what-is-community-intelligence',
      'the-rise-of-tiktok-shop-how-communities-are-creating-a-new-era-of-commerce',
    ])
  })

  it('ships the optimised uncropped 16 by 9 cover',()=>{
    expect(bbcRadioCommunityDraft.image).toBe('/radio-is-hiring-communities.png')
    expect(bbcRadioCommunityDraft.imageWidth).toBe(1280)
    expect(bbcRadioCommunityDraft.imageHeight).toBe(720)
    const image=path.resolve('public/radio-is-hiring-communities.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(400_000)
  })
})
