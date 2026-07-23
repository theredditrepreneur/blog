import {nikeCommunityScorecardBody,nikeCommunityScorecardDraft,nikeCommunityScorecardFaqs} from '../lib/drafts/nike-community-scorecard'

const visibleBody=nikeCommunityScorecardBody
  .replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<style[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ')
  .replace(/&[a-z]+;/gi,' ')

const visibleMetadata=[
  nikeCommunityScorecardDraft.title,
  nikeCommunityScorecardDraft.excerpt,
  nikeCommunityScorecardDraft.subtitle,
  nikeCommunityScorecardDraft.imageAlt,
  nikeCommunityScorecardDraft.seoTitle,
  nikeCommunityScorecardDraft.metaDescription,
  nikeCommunityScorecardDraft.socialTitle,
  nikeCommunityScorecardDraft.socialDescription,
  ...nikeCommunityScorecardFaqs.flatMap(item=>[item.question,item.answer]),
  ...Object.values(nikeCommunityScorecardDraft.scorecard!.analysis||{}),
].filter(Boolean).join(' ')

const prohibited=/[\-\u2013\u2014]/g
const matches=[...`${visibleBody} ${visibleMetadata}`.matchAll(prohibited)]
if(matches.length)throw new Error(`Nike Scorecard contains ${matches.length} visible hyphen or dash characters`)

const words=visibleBody.trim().split(/\s+/).filter(Boolean).length
if(words<2500||words>3500)throw new Error(`Nike Scorecard contains ${words} words. Expected between 2500 and 3500.`)

console.log(`Nike Scorecard validation passed with ${words} words and no visible hyphens or dashes.`)
