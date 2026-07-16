import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {englandCommunityCourtroomBody,englandCommunityCourtroomDraft,englandCommunityCourtroomRelated} from '../lib/drafts/england-community-courtroom'
import migrated from '../data/migrated-content.json'

describe('England Community Courtroom article draft',()=>{
  it('uses the unique requested slug and remains unpublished',()=>{
    expect(englandCommunityCourtroomDraft.draft).toBe(true)
    expect(englandCommunityCourtroomDraft.date).toBe('2026-07-16')
    expect(englandCommunityCourtroomDraft.slug).toBe('england-lost-the-match-community-courtroom')
    expect(migrated.some(item=>item.slug===englandCommunityCourtroomDraft.slug)).toBe(false)
    const registry=fs.readFileSync(path.resolve('lib/content.ts'),'utf8')
    expect(registry).toContain('export const draftContent:ContentItem[]=[englandCommunityCourtroomDraft]')
    expect(registry).not.toMatch(/export const content:ContentItem\[\]=\[[^\n]*englandCommunityCourtroomDraft/)
  })

  it('preserves the supplied heading structure',()=>{
    const headings=[...englandCommunityCourtroomBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'What Is the Community Courtroom?',
      'The Incident',
      'The First Defendant: Thomas Tuchel',
      'The Defence',
      'The Second Defendant: The Players',
      'The Third Defendant: England’s Mentality',
      'The Star Witness',
      'Why Communities Need Someone to Blame',
      'The Community Courtroom Creates Narrative Winners',
      'The Relationship with Narrative Compression',
      'Why This Matters Beyond Football',
      'Community Intelligence Isn’t About the Event',
      'Final Thought',
      'Editor’s Note',
    ])
  })

  it('uses the approved canonical links and deliberate related content',()=>{
    expect(englandCommunityCourtroomBody).toContain('https://research.theredditrepreneur.com/Community-Courtroom-383026b0422280509b02dc95d11a62ac?pvs=25')
    expect(englandCommunityCourtroomBody).toContain('https://research.theredditrepreneur.com/Narrative-Compression-388026b0422280178e89ee70e3aeb49e?pvs=25')
    expect(englandCommunityCourtroomBody).toContain('https://www.theredditrepreneur.com/community-intelligence')
    expect(englandCommunityCourtroomBody).toContain('https://app.theredditrepreneur.com')
    expect(englandCommunityCourtroomRelated).toEqual(['france-hype-hangover-spain-belief-correction','what-is-community-gravity','what-is-community-intelligence'])
  })

  it('uses the requested social image and accessible image metadata',()=>{
    expect(englandCommunityCourtroomDraft.image).toBe('/england-community-courtroom.png')
    expect(englandCommunityCourtroomDraft.imageAlt).toBe("England flag illustrating The Community Courtroom framework after England's World Cup semi final defeat.")
    expect(englandCommunityCourtroomDraft.imageWidth).toBe(1280)
    expect(englandCommunityCourtroomDraft.imageHeight).toBe(720)
    const image=path.resolve('public/england-community-courtroom.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(500_000)
  })
})
