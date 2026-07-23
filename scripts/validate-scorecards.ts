import fs from 'node:fs'
import path from 'node:path'
import {content} from '../lib/content'
import {deriveScorecard,scorecardCriterionIds} from '../lib/community-intelligence-scorecard'

const scorecards=content.filter(item=>item.type==='Scorecard')
const expected=['roblox-community-intelligence-scorecard','nike-community-intelligence-scorecard','booking-com-community-intelligence-scorecard','the-barclays-bank-community-intelligence-scorecard-says-expectations-are-even-higher-than-trust','the-redditrepreneur-community-intelligence-scorecard-gymshark']
for(const slug of expected){
  const item=scorecards.find(candidate=>candidate.slug===slug)
  if(!item?.scorecard)throw new Error(`Missing nine criterion Scorecard data for ${slug}`)
  const derived=deriveScorecard(item.scorecard)
  if(Object.keys(derived.criteria).length!==scorecardCriterionIds.length)throw new Error(`${slug} does not contain nine criteria`)
  if(Object.keys(derived.analysis||{}).length!==scorecardCriterionIds.length)throw new Error(`${slug} requires analysis for all nine criteria`)
}
const publicFiles=['app/page.tsx','app/scorecards/page.tsx','app/the-redditrepreneur-community-intelligence-scorecard/page.tsx','components/scorecard-page.tsx','lib/drafts/booking-com-scorecard.ts','lib/drafts/nike-community-scorecard.ts','lib/drafts/community-intelligence-weekly-platform-live.ts','lib/glossary.ts']
const legacy=/measures how brands perform across Community Presence|evaluates five dimensions|dimensions of Community Intelligence/i
for(const file of publicFiles){
  const source=fs.readFileSync(path.resolve(file),'utf8')
  if(legacy.test(source))throw new Error(`Legacy five dimension copy remains in ${file}`)
}
console.log(`Validated ${expected.length} published Scorecards against the nine criterion methodology.`)
