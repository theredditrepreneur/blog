export type ScorecardCriterionId=
  |'brandTrust'
  |'productSatisfaction'
  |'innovationPerception'
  |'customerSupport'
  |'communityEngagement'
  |'competitivePosition'
  |'advocacy'
  |'aiSearchReadiness'
  |'narrativeConsistency'

export type ScorecardPillar='perception'|'participation'|'strategicValue'

export type ScorecardCriterion={
  id:ScorecardCriterionId
  name:string
  description:string
  pillar:ScorecardPillar
  order:number
  maximumScore:10
  icon?:string
}

export type ScorecardCriterionScores=Record<ScorecardCriterionId,number>
export type ScorecardCriterionAnalysis=Partial<Record<ScorecardCriterionId,string>>

export type CommunityIntelligenceScorecard={
  brandName:string
  criteria:ScorecardCriterionScores
  analysis?:ScorecardCriterionAnalysis
  keyInsight:string
  primaryStrength:string
  primaryRisk:string
  storedOverallScore?:number
  storedRating?:string
}

export const scorecardPillars:Record<ScorecardPillar,{name:string,description:string,order:number}>={
  perception:{name:'Perception',description:'Measures what communities believe about the brand, its products and its ability to move forward.',order:1},
  participation:{name:'Participation',description:'Measures how communities interact with the brand, recommend it and shape its public narrative.',order:2},
  strategicValue:{name:'Strategic Value',description:'Measures how community conversations affect competitive decisions, customer experience and visibility within AI generated recommendations.',order:3},
}

export const scorecardCriteria:readonly ScorecardCriterion[]=[
  {id:'brandTrust',name:'Brand Trust',description:"Measures whether communities consider the brand credible, dependable and likely to act in customers' interests.",pillar:'perception',order:1,maximumScore:10,icon:'trust'},
  {id:'productSatisfaction',name:'Product Satisfaction',description:"Measures how positively communities describe the experience, quality and usefulness of the company's products or services.",pillar:'perception',order:2,maximumScore:10,icon:'product'},
  {id:'innovationPerception',name:'Innovation Perception',description:'Measures whether communities believe the brand is progressing, adapting and providing meaningful innovation.',pillar:'perception',order:3,maximumScore:10,icon:'innovation'},
  {id:'communityEngagement',name:'Community Engagement',description:'Measures the volume, depth and continuity of organic participation surrounding the brand.',pillar:'participation',order:4,maximumScore:10,icon:'community'},
  {id:'advocacy',name:'Advocacy',description:'Measures the willingness of customers and community members to recommend, defend or promote the brand without being asked.',pillar:'participation',order:5,maximumScore:10,icon:'advocacy'},
  {id:'narrativeConsistency',name:'Narrative Consistency',description:'Measures whether different communities describe the brand in a coherent way or whether fragmented and conflicting narratives are developing.',pillar:'participation',order:6,maximumScore:10,icon:'narrative'},
  {id:'competitivePosition',name:'Competitive Position',description:'Measures how the brand is compared with alternatives and where communities believe it wins or loses.',pillar:'strategicValue',order:7,maximumScore:10,icon:'position'},
  {id:'customerSupport',name:'Customer Support',description:'Measures community experiences with support, issue resolution, account recovery, refunds and post-purchase service.',pillar:'strategicValue',order:8,maximumScore:10,icon:'support'},
  {id:'aiSearchReadiness',name:'AI Search Readiness',description:'Measures the strength, credibility and accessibility of the public evidence layer available to AI answer engines.',pillar:'strategicValue',order:9,maximumScore:10,icon:'ai'},
] as const

export const scorecardCriterionIds=scorecardCriteria.map(criterion=>criterion.id)

export const scorecardRatingBands=[
  {minimum:90,maximum:100,label:'Exceptional'},
  {minimum:80,maximum:89,label:'Excellent'},
  {minimum:70,maximum:79,label:'Strong'},
  {minimum:60,maximum:69,label:'Developing'},
  {minimum:50,maximum:59,label:'Mixed'},
  {minimum:0,maximum:49,label:'At Risk'},
] as const

function assertScore(value:unknown,label:string):asserts value is number{
  if(typeof value!=='number'||!Number.isFinite(value))throw new Error(`${label} must be a numeric score`)
  if(value<0||value>10)throw new Error(`${label} must be between 0 and 10`)
}

export function validateCriterionScores(value:unknown):asserts value is ScorecardCriterionScores{
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Scorecard criteria must be an object')
  const scores=value as Record<string,unknown>
  const unknown=Object.keys(scores).filter(id=>!scorecardCriterionIds.includes(id as ScorecardCriterionId))
  if(unknown.length)throw new Error(`Unknown Scorecard criteria: ${unknown.join(', ')}`)
  const missing=scorecardCriterionIds.filter(id=>!(id in scores))
  if(missing.length)throw new Error(`Missing Scorecard criteria: ${missing.join(', ')}`)
  for(const criterion of scorecardCriteria)assertScore(scores[criterion.id],criterion.name)
}

export function calculateOverallScore(scores:ScorecardCriterionScores){
  validateCriterionScores(scores)
  return Math.round((scorecardCriteria.reduce((total,criterion)=>total+scores[criterion.id],0)/90)*100)
}

export function calculatePillarScore(scores:ScorecardCriterionScores,pillar:ScorecardPillar){
  validateCriterionScores(scores)
  const criteria=scorecardCriteria.filter(criterion=>criterion.pillar===pillar)
  return Math.round((criteria.reduce((total,criterion)=>total+scores[criterion.id],0)/30)*100)
}

export function getOverallRating(overallScore:number){
  if(!Number.isInteger(overallScore)||overallScore<0||overallScore>100)throw new Error('Overall Scorecard score must be a whole number between 0 and 100')
  return scorecardRatingBands.find(band=>overallScore>=band.minimum&&overallScore<=band.maximum)!.label
}

export function deriveScorecard(scorecard:CommunityIntelligenceScorecard){
  validateCriterionScores(scorecard.criteria)
  const overallScore=calculateOverallScore(scorecard.criteria)
  const rating=getOverallRating(overallScore)
  if(scorecard.storedOverallScore!==undefined&&scorecard.storedOverallScore!==overallScore)throw new Error(`${scorecard.brandName} stored overall score ${scorecard.storedOverallScore} conflicts with calculated score ${overallScore}`)
  if(scorecard.storedRating!==undefined&&scorecard.storedRating!==rating)throw new Error(`${scorecard.brandName} stored rating ${scorecard.storedRating} conflicts with calculated rating ${rating}`)
  return {
    ...scorecard,
    overallScore,
    rating,
    pillars:(Object.keys(scorecardPillars) as ScorecardPillar[]).sort((a,b)=>scorecardPillars[a].order-scorecardPillars[b].order).map(id=>({id,...scorecardPillars[id],score:calculatePillarScore(scorecard.criteria,id),criteria:scorecardCriteria.filter(criterion=>criterion.pillar===id)})),
  }
}

export function formatCriterionScore(score:number){return Number.isInteger(score)?score.toFixed(1):String(score)}
