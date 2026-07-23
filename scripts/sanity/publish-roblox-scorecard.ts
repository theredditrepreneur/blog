import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {deriveScorecard} from '../../lib/community-intelligence-scorecard'
import {robloxCommunityScorecardBody,robloxCommunityScorecardDraft,robloxCommunityScorecardRelated} from '../../lib/drafts/roblox-community-scorecard'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='scorecard-roblox-community-intelligence'
const scorecard=deriveScorecard(robloxCommunityScorecardDraft.scorecard!)
const canonicalUrl=`https://blog.theredditrepreneur.com/${robloxCommunityScorecardDraft.slug}`

const conflict=await client.fetch<{_id:string}|null>('*[slug.current==$slug && !(_id in [$documentId,$draftId])][0]{_id}',{slug:robloxCommunityScorecardDraft.slug,documentId,draftId:`drafts.${documentId}`})
if(conflict)throw new Error(`Slug already belongs to ${conflict._id}`)

const author=await client.fetch<{_id:string}|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]{_id}')
if(!author)throw new Error('Tonte Bo Douglas author document was not found')

const topicDefinitions=[
  ['Community Intelligence Scorecards','community-intelligence-scorecards','Editorial assessments of how brands perform across nine Community Intelligence criteria.'],
  ['Roblox','roblox','Community Intelligence research about Roblox, its players, creators and ecosystem.'],
  ['Gaming','gaming','Community Intelligence research about games, platforms and player communities.'],
  ['Creator Economy','creator-economy','Research about creators, platforms and community driven value creation.'],
  ['AI Search','ai-search','Research about how AI systems discover, interpret and recommend brands and information.'],
] as const

const topics=[] as Array<{_type:'reference',_key:string,_ref:string}>
for(const [title,slug,introduction] of topicDefinitions){
  let topic=await client.fetch<{_id:string}|null>('*[_type=="topic" && (slug.current==$slug || title==$title)][0]{_id}',{slug,title})
  if(!topic){
    const topicId=`topic-${slug}`
    await client.createIfNotExists({_id:topicId,_type:'topic',title,slug:{_type:'slug',current:slug},introduction,seo:{_type:'seo',title:`${title} Research`,description:`Explore The Redditrepreneur research and analysis about ${title.toLowerCase()}.`}})
    topic={_id:topicId}
  }
  topics.push({_type:'reference',_key:slug,_ref:topic._id})
}

const existing=await client.fetch<{coverRef?:string}|null>('*[_id==$documentId][0]{"coverRef":coverImage.asset._ref}',{documentId})
const imageAsset=existing?.coverRef?{_id:existing.coverRef}:await client.assets.upload('image',fs.createReadStream(path.resolve('public/roblox-community-intelligence-scorecard.webp')),{
  filename:'roblox-community-intelligence-scorecard.webp',contentType:'image/webp',title:robloxCommunityScorecardDraft.title,
})
const coverImage={_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:robloxCommunityScorecardDraft.imageAlt}
const related=await client.fetch<Array<{_id:string,slug:string}>>('*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',{slugs:robloxCommunityScorecardRelated})

await client.createOrReplace({
  _id:documentId,_type:'scorecard',title:robloxCommunityScorecardDraft.title,slug:{_type:'slug',current:robloxCommunityScorecardDraft.slug},excerpt:robloxCommunityScorecardDraft.excerpt,coverImage,
  author:{_type:'reference',_ref:author._id},publishedAt:'2026-07-23T12:00:00.000Z',updatedAt:new Date().toISOString(),topics,frameworks:[],relatedContent:related.map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),featured:false,
  brandName:scorecard.brandName,criteria:{_type:'scorecardCriteria',...scorecard.criteria},criterionAnalysis:scorecard.analysis,overallScore:scorecard.overallScore,rating:scorecard.rating,assessmentStatus:'Editorial Community Intelligence assessment',methodologyVersion:'Nine criterion methodology',keyInsight:scorecard.keyInsight,primaryStrength:scorecard.primaryStrength,primaryRisk:scorecard.primaryRisk,
  recommendations:['Improve transparency around moderation','Continue investing in creator tools','Improve customer support','Surface community feedback more quickly','Strengthen communication with parents','Continue building educational resources for developers'],
  dataLimitations:'This is an evidence led editorial assessment based on publicly available material. It does not claim complete coverage of every Roblox player, parent, developer, creator or community.',
  seo:{_type:'seo',title:robloxCommunityScorecardDraft.seoTitle,description:robloxCommunityScorecardDraft.metaDescription,canonicalUrl,ogImage:coverImage},
  body:[{_type:'legacyHtml',_key:'scorecard-body',html:robloxCommunityScorecardBody,reviewStatus:'reviewed',notes:'Production Roblox Scorecard using the nine criterion methodology.'}],
})
await client.delete(`drafts.${documentId}`).catch(()=>undefined)
console.log(JSON.stringify(await client.fetch('*[_id==$documentId][0]{_id,title,"slug":slug.current,overallScore,rating,criteria,"cover":coverImage.asset->url,publishedAt}',{documentId}),null,2))
