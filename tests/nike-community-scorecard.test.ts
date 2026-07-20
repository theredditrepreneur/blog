import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {nikeCommunityScorecardBody,nikeCommunityScorecardDraft,nikeCommunityScorecardFaqs} from '../lib/drafts/nike-community-scorecard'

const visibleCopy=nikeCommunityScorecardBody.replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ')
const metadata=[nikeCommunityScorecardDraft.title,nikeCommunityScorecardDraft.excerpt,nikeCommunityScorecardDraft.subtitle,nikeCommunityScorecardDraft.imageAlt,nikeCommunityScorecardDraft.seoTitle,nikeCommunityScorecardDraft.metaDescription,nikeCommunityScorecardDraft.socialTitle,nikeCommunityScorecardDraft.socialDescription,...nikeCommunityScorecardFaqs.flatMap(item=>[item.question,item.answer])].filter(Boolean).join(' ')

describe('Nike Community Intelligence Scorecard',()=>{
  it('remains a private draft',()=>{
    expect(nikeCommunityScorecardDraft.draft).toBe(true)
    const registry=fs.readFileSync(path.resolve('lib/content.ts'),'utf8')
    expect(registry).toContain('export const draftContent:ContentItem[]=[nikeCommunityScorecardDraft]')
    expect(registry).not.toMatch(/export const content:ContentItem\[\]=\[[^\n]*nikeCommunityScorecardDraft/)
  })

  it('preserves every supplied score',()=>{
    expect(nikeCommunityScorecardDraft.scorecard?.overallScore).toBe(84)
    expect(nikeCommunityScorecardDraft.scorecard?.dimensions.map(item=>item.displayScore)).toEqual(['9.2 / 10','8.1 / 10','7.6 / 10','7.2 / 10','9.1 / 10','8.5 / 10','9.0 / 10','9.3 / 10','7.8 / 10'])
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
