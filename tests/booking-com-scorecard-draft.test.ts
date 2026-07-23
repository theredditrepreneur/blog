import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {bookingComScorecardBody,bookingComScorecardDraft,bookingComScorecardRelated} from '../lib/drafts/booking-com-scorecard'
import {deriveScorecard,scorecardCriterionIds} from '../lib/community-intelligence-scorecard'

describe('Booking.com Community Intelligence Scorecard',()=>{
  it('uses the complete nine criterion methodology',()=>{
    const result=deriveScorecard(bookingComScorecardDraft.scorecard!)
    expect(result.overallScore).toBe(84)
    expect(result.rating).toBe('Excellent')
    expect(Object.keys(result.criteria).sort()).toEqual([...scorecardCriterionIds].sort())
    expect(result.pillars).toHaveLength(3)
  })
  it('uses current public methodology copy',()=>{
    expect(bookingComScorecardBody).toContain('nine criteria grouped into Perception, Participation and Strategic Value')
    expect(bookingComScorecardBody).toContain('<strong>Rating: Excellent</strong>')
    expect(bookingComScorecardBody).not.toContain('<strong>Grade: A-</strong>')
  })
  it('uses confirmed links and optimised cover',()=>{
    expect(bookingComScorecardRelated).toHaveLength(3)
    const asset=path.resolve('public/booking-com-community-intelligence-scorecard.webp')
    expect(fs.existsSync(asset)).toBe(true)
    expect(fs.statSync(asset).size).toBeLessThan(120_000)
  })
})
