import {getCliClient} from 'sanity/cli'
import {bookingComScorecardBody,bookingComScorecardDraft} from '../../lib/drafts/booking-com-scorecard'
import {nikeCommunityScorecardBody,nikeCommunityScorecardDraft} from '../../lib/drafts/nike-community-scorecard'
import {barclaysScorecard,gymsharkScorecard} from '../../lib/scorecard-records'
import {deriveScorecard,scorecardCriteria,scorecardPillars,scorecardRatingBands,type CommunityIntelligenceScorecard,type ScorecardPillar} from '../../lib/community-intelligence-scorecard'
import {migrateLegacyScorecardBody} from '../../lib/scorecard-body-migration'

const client=getCliClient({apiVersion:'2024-01-01'})
const records=[
  {slug:bookingComScorecardDraft.slug,data:bookingComScorecardDraft.scorecard!,body:bookingComScorecardBody},
  {slug:nikeCommunityScorecardDraft.slug,data:nikeCommunityScorecardDraft.scorecard!,body:nikeCommunityScorecardBody},
  {slug:'the-barclays-bank-community-intelligence-scorecard-says-expectations-are-even-higher-than-trust',data:barclaysScorecard},
  {slug:'the-redditrepreneur-community-intelligence-scorecard-gymshark',data:gymsharkScorecard},
] satisfies Array<{slug:string,data:CommunityIntelligenceScorecard,body?:string}>

for(const record of records){
  const document=await client.fetch<{_id:string,bodyHtml?:string}|null>('*[_type=="scorecard" && slug.current==$slug][0]{_id,"bodyHtml":body[0].html}',{slug:record.slug})
  if(!document)throw new Error(`Scorecard not found: ${record.slug}`)
  const derived=deriveScorecard(record.data)
  const body=record.body||migrateLegacyScorecardBody(record.slug,document.bodyHtml||'')
  await client.patch(document._id).set({
    brandName:record.data.brandName,
    criteria:{_type:'scorecardCriteria',...record.data.criteria},
    criterionAnalysis:record.data.analysis,
    overallScore:derived.overallScore,
    rating:derived.rating,
    methodologyVersion:'Nine criterion methodology',
    keyInsight:record.data.keyInsight,
    primaryStrength:record.data.primaryStrength,
    primaryRisk:record.data.primaryRisk,
    body:[{_type:'legacyHtml',_key:'scorecard-body',html:body,reviewStatus:'reviewed',notes:'Migrated to the nine criterion Community Intelligence Scorecard methodology.'}],
  }).unset(['grade','tier','dimensions']).commit()
  console.log(`${record.data.brandName}: ${derived.overallScore}, ${derived.rating}`)
}

const methodologySlug='the-redditrepreneur-community-intelligence-scorecard'
const methodology=await client.fetch<{_id:string}|null>('*[_type=="page" && slug.current==$slug][0]{_id}',{slug:methodologySlug})
if(methodology){
  const pillarIds=(Object.keys(scorecardPillars) as ScorecardPillar[]).sort((a,b)=>scorecardPillars[a].order-scorecardPillars[b].order)
  const pillarHtml=pillarIds.map(id=>`<h2>${scorecardPillars[id].name}</h2><p>${scorecardPillars[id].description}</p>${scorecardCriteria.filter(item=>item.pillar===id).map(item=>`<h3>${item.name}</h3><p>${item.description}</p>`).join('')}`).join('')
  const bands=scorecardRatingBands.map(band=>`<li><strong>${band.minimum} to ${band.maximum}</strong>: ${band.label}</li>`).join('')
  const html=`<p>The Community Intelligence Scorecard is a structured framework for measuring how a brand is understood, experienced and discussed across public online communities.</p><p>It goes beyond general sentiment by examining nine distinct dimensions of the relationship between a brand and the communities around it.</p>${pillarHtml}<h2>Scoring formula</h2><p>Each criterion is scored out of 10. The nine scores create a maximum raw total of 90. The raw result is normalised into an overall score out of 100.</p><p><strong>Overall score = round((sum of nine criterion scores divided by 90) multiplied by 100)</strong></p><p>Pillar scores improve readability and are not counted separately.</p><h2>Rating bands</h2><ul>${bands}</ul><h2>Editorial methodology note</h2><p>Community Intelligence Scorecards are based on publicly available community conversations, customer reviews, forum discussions, social content, public brand signals and relevant editorial evidence. The score represents an evidence led assessment at a particular point in time and may change as community narratives evolve.</p><p>The score is an analytical assessment rather than an official company rating and should be read alongside the written report, not in isolation.</p>`
  await client.patch(methodology._id).set({title:'The Community Intelligence Scorecard',excerpt:'Nine criteria across Perception, Participation and Strategic Value.',body:[{_type:'legacyHtml',_key:'methodology-body',html,reviewStatus:'reviewed',notes:'Current nine criterion methodology.'}]}).commit()
  console.log('Methodology page: migrated')
}
