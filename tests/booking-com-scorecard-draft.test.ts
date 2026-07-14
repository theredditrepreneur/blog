import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {bookingComScorecardBody,bookingComScorecardDraft,bookingComScorecardRelated} from '../lib/drafts/booking-com-scorecard'
import migrated from '../data/migrated-content.json'

describe('Booking.com Community Intelligence Scorecard',()=>{
  it('has a unique slug and is marked for publication',()=>{
    expect(bookingComScorecardDraft.draft).toBe(false)
    expect(bookingComScorecardDraft.slug).toBe('booking-com-community-intelligence-scorecard')
    expect(migrated.some(item=>item.slug===bookingComScorecardDraft.slug)).toBe(false)
  })

  it('preserves every supplied score and the grade',()=>{
    expect(bookingComScorecardDraft.scorecard).toMatchObject({overallScore:84,grade:'A-',tier:'Strong Community Authority'})
    expect(bookingComScorecardDraft.scorecard?.dimensions.map(item=>[item.name,item.score])).toEqual([
      ['Community Presence',94],['Community Trust',82],['Share of Consensus',88],['Insight Responsiveness',75],['Community Authority',81],
    ])
    expect(bookingComScorecardBody).toContain('<strong>84/100</strong>')
    expect(bookingComScorecardBody).toContain('<strong>Grade: A-</strong>')
  })

  it('contains all seventeen requested H2 sections',()=>{
    expect([...bookingComScorecardBody.matchAll(/<h2>/g)]).toHaveLength(17)
    for(const heading of ['Executive Summary','The Redditrepreneur Community Intelligence Scorecard','What This Score Means','Community Presence','Community Trust','Share of Consensus','Insight Responsiveness','Community Authority','What Communities Love','Where Community Friction Exists','Competitive Landscape','AI Authority Assessment','If I Were Booking.com’s Head of Community Intelligence Tomorrow Morning','Final Verdict','Booking.com Community Intelligence Score','Editor’s Note','How This Score Was Calculated'])expect(bookingComScorecardBody).toContain(`<h2>${heading}</h2>`)
  })

  it('uses only confirmed internal and service links',()=>{
    for(const href of ['https://www.theredditrepreneur.com/community-intelligence','/the-redditrepreneur-community-intelligence-scorecard/','/glossary/','/glossary/community-authority','https://www.theredditrepreneur.com/services/community-intelligence-audit','https://www.theredditrepreneur.com/services/ai-authority-audit','https://www.theredditrepreneur.com/services/fractional-chief-community-intelligence-officer'])expect(bookingComScorecardBody).toContain(href)
    expect(bookingComScorecardRelated).toHaveLength(3)
  })

  it('uses the optimised 16:9 cover asset',()=>{
    const asset=path.resolve('public/booking-com-community-intelligence-scorecard.webp')
    expect(fs.existsSync(asset)).toBe(true)
    expect(fs.statSync(asset).size).toBeLessThan(120_000)
    expect(bookingComScorecardDraft.imageAlt).toContain('84 out of 100')
  })
})
