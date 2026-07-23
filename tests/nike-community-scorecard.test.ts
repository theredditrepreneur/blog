import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {nikeCommunityScorecardBody,nikeCommunityScorecardDraft,nikeCommunityScorecardFaqs} from '../lib/drafts/nike-community-scorecard'
import {deriveScorecard,scorecardCriterionIds} from '../lib/community-intelligence-scorecard'

const visibleCopy=nikeCommunityScorecardBody.replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ')
const metadata=[nikeCommunityScorecardDraft.title,nikeCommunityScorecardDraft.excerpt,nikeCommunityScorecardDraft.subtitle,nikeCommunityScorecardDraft.imageAlt,nikeCommunityScorecardDraft.seoTitle,nikeCommunityScorecardDraft.metaDescription,nikeCommunityScorecardDraft.socialTitle,nikeCommunityScorecardDraft.socialDescription,...nikeCommunityScorecardFaqs.flatMap(item=>[item.question,item.answer])].filter(Boolean).join(' ')

describe('Nike Community Intelligence Scorecard',()=>{
  it('is registered for publication',()=>{
    expect(nikeCommunityScorecardDraft.draft).toBe(false)
    const registry=fs.readFileSync(path.resolve('lib/content.ts'),'utf8')
    expect(registry).toContain('export const draftContent:ContentItem[]=[]')
    expect(registry).toMatch(/export const content:ContentItem\[\]=\[[^\n]*nikeCommunityScorecardDraft/)
  })

  it('preserves every supplied score',()=>{
    const result=deriveScorecard(nikeCommunityScorecardDraft.scorecard!)
    expect(result.overallScore).toBe(84)
    expect(result.rating).toBe('Excellent')
    expect(Object.keys(result.criteria).sort()).toEqual([...scorecardCriterionIds].sort())
  })

  it('contains no visible hyphens or dashes',()=>{
    expect(`${visibleCopy} ${metadata}`).not.toMatch(/[\-\u2013\u2014]/)
  })

  it('contains matching visible FAQ content',()=>{
    for(const item of nikeCommunityScorecardFaqs){
      expect(nikeCommunityScorecardBody).toContain(item.question)
      expect(nikeCommunityScorecardBody).toContain(item.answer)
    }
  })
})
