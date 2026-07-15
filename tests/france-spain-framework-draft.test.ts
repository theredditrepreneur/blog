import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {franceSpainFrameworkBody,franceSpainFrameworkDraft,franceSpainFrameworkRelated} from '../lib/drafts/france-spain-framework'
import migrated from '../data/migrated-content.json'

describe('France and Spain framework article',()=>{
  it('uses the unique requested slug and is marked for publication',()=>{
    expect(franceSpainFrameworkDraft.draft).toBe(false)
    expect(franceSpainFrameworkDraft.date).toBe('2026-07-15')
    expect(franceSpainFrameworkDraft.slug).toBe('france-hype-hangover-spain-belief-correction')
    expect(migrated.some(item=>item.slug===franceSpainFrameworkDraft.slug)).toBe(false)
  })

  it('preserves the requested table of contents structure',()=>{
    const headings=[...franceSpainFrameworkBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'France Entered With the Weight of Expectation',
      'What Is Hype Hangover?',
      'France’s Semi Final Became a Hype Hangover',
      'Expectations Change the Meaning of Results',
      'Spain Entered With a Different Narrative',
      'What Is Belief Correction?',
      'Spain Forced the Football World to Recalculate',
      'One Match. Two Community Narratives.',
      'Why Communities Update Some Beliefs Faster Than Others',
      'The Business Lesson Behind the Football',
      'Community Intelligence Is About Narrative Movement',
      'Final Thought',
      'Editor’s Note',
    ])
  })

  it('uses the approved framework links and selected related content',()=>{
    expect(franceSpainFrameworkBody).toContain('https://research.theredditrepreneur.com/Hype-Hangover-388026b04222805e8508c7f3f434ba82?pvs=25')
    expect(franceSpainFrameworkBody).toContain('https://research.theredditrepreneur.com/Belief-Correction-388026b0422280249396c6fb9ec32a6d?pvs=25')
    expect(franceSpainFrameworkBody).toContain('https://www.theredditrepreneur.com/community-intelligence')
    expect(franceSpainFrameworkBody).toContain('https://app.theredditrepreneur.com')
    expect(franceSpainFrameworkRelated).toEqual(['spacex-and-the-hype-hangover','the-world-cup-is-the-greatest-community-event-on-earth','what-is-community-intelligence'])
  })

  it('contains no em dash or trademark symbol',()=>{
    expect(franceSpainFrameworkBody).not.toContain('—')
    expect(franceSpainFrameworkBody).not.toContain('™')
    expect(franceSpainFrameworkBody).not.toContain('®')
  })

  it('ships the optimised 16 by 9 cover asset',()=>{
    const image=path.resolve('public/france-hype-hangover-spain-belief-correction.webp')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(150_000)
  })
})
