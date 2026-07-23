const BARCLAYS='the-barclays-bank-community-intelligence-scorecard-says-expectations-are-even-higher-than-trust'
const GYMSHARK='the-redditrepreneur-community-intelligence-scorecard-gymshark'

function replaceAll(value:string,replacements:Record<string,string>){
  return Object.entries(replacements).reduce((html,[from,to])=>html.replaceAll(from,to),value)
}

export function migrateLegacyScorecardBody(slug:string,html:string){
  if(slug===BARCLAYS)return replaceAll(html,{
    'Community Presence':'Community Engagement',
    'Share of Consensus':'Advocacy',
    'Insight Responsiveness':'Customer Support',
    'Community Trust – 9.0/10':'Brand Trust – 9.0/10',
    'Community Authority – 8.5/10':'Competitive Position – 8.5/10',
    '>Community Presence<':'>Community Engagement<','19/20':'9.5/10',
    '>Community Trust<':'>Brand Trust<','15/20':'9.0/10',
    '>Share of Consensus<':'>Advocacy<','16/20':'8.0/10',
    '>Insight Responsiveness<':'>Customer Support<','13/20':'6.5/10',
    '>Community Authority<':'>Competitive Position<','18/20':'8.5/10',
    'five dimensions':'nine criteria across three pillars','Five Dimensions':'Nine Criteria',
    'Tier 1':'Excellent',
  })
  if(slug===GYMSHARK)return replaceAll(html,{
    'Community Presence':'Community Engagement',
    'Share of Consensus':'Advocacy',
    'Insight Responsiveness':'Customer Support',
    'Community Trust – 9.5/10':'Brand Trust – 9.5/10',
    'Community Authority – 9.0/10':'Competitive Position – 9.0/10',
    '>Community Presence<':'>Community Engagement<','19/20':'9.5/10',
    '>Community Trust<':'>Brand Trust<',
    '>Share of Consensus<':'>Advocacy<','18/20':'9.0/10',
    '>Insight Responsiveness<':'>Customer Support<','17/20':'8.5/10',
    '>Community Authority<':'>Competitive Position<',
    'five dimensions':'nine criteria across three pillars','Five Dimensions':'Nine Criteria',
    'Tier 1':'Exceptional',
  })
  return html
}
