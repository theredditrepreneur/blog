import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {deriveScorecard,scorecardCriterionIds} from '../lib/community-intelligence-scorecard'
import {robloxCommunityScorecardBody,robloxCommunityScorecardDraft,robloxCommunityScorecardFaqs} from '../lib/drafts/roblox-community-scorecard'

const visible=robloxCommunityScorecardBody.replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ')

describe('Roblox Community Intelligence Scorecard',()=>{
  it('calculates the approved score and rating',()=>{
    const scorecard=deriveScorecard(robloxCommunityScorecardDraft.scorecard!)
    expect(scorecard.overallScore).toBe(88)
    expect(scorecard.rating).toBe('Excellent')
    expect(Object.keys(scorecard.criteria).sort()).toEqual([...scorecardCriterionIds].sort())
  })
  it('meets the editorial length and punctuation requirements',()=>{
    const words=visible.trim().split(/\s+/).length
    expect(words).toBeGreaterThanOrEqual(2500)
    expect(words).toBeLessThanOrEqual(3500)
    expect(visible).not.toMatch(/[\-\u2013\u2014]/)
  })
  it('contains visible FAQ copy matching schema',()=>{
    for(const faq of robloxCommunityScorecardFaqs){
      expect(robloxCommunityScorecardBody).toContain(faq.question)
      expect(robloxCommunityScorecardBody).toContain(faq.answer)
    }
  })
  it('uses the optimised official cover',()=>{
    const asset=path.resolve('public/roblox-community-intelligence-scorecard.webp')
    expect(fs.existsSync(asset)).toBe(true)
    expect(fs.statSync(asset).size).toBeLessThan(150_000)
  })
})
