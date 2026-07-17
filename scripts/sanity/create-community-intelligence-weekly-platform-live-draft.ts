import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {communityIntelligenceWeeklyPlatformLiveBody,communityIntelligenceWeeklyPlatformLiveDraft,communityIntelligenceWeeklyPlatformLiveRelated} from '../../lib/drafts/community-intelligence-weekly-platform-live'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='weekly-community-intelligence-platform-live-vision-real'
const draftId=`drafts.${documentId}`
const proposedPublicationDate='2026-07-17T12:00:00.000Z'
const assetPath=path.resolve('public/community-intelligence-weekly-platform-live.png')
const canonicalUrl=`https://blog.theredditrepreneur.com/${communityIntelligenceWeeklyPlatformLiveDraft.slug}`

const existing=await client.fetch<Array<{_id:string}>>('*[slug.current==$slug && !(_id in [$draftId,$documentId])]{_id}',{slug:communityIntelligenceWeeklyPlatformLiveDraft.slug,draftId,documentId})
if(existing.length)throw new Error(`Slug already belongs to ${existing.map(item=>item._id).join(', ')}`)

const published=await client.fetch<{_id:string}|null>('*[_id==$documentId][0]{_id}',{documentId})
if(published)throw new Error('A published document already exists for this draft')

const author=await client.fetch<{_id:string}|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]{_id}')
if(!author)throw new Error('Tonte Bo Douglas author document was not found')

const topicTitles=[...new Set([communityIntelligenceWeeklyPlatformLiveDraft.topic,...(communityIntelligenceWeeklyPlatformLiveDraft.tags||[])].filter((value):value is string=>Boolean(value)))]
const topicRefs=[] as Array<{_type:'reference',_key:string,_ref:string}>
for(const title of topicTitles){
  const slug=title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
  const id=`topic-${slug}`
  await client.createIfNotExists({_id:id,_type:'topic',title,slug:{_type:'slug',current:slug},introduction:`Research and analysis about ${title} through a Community Intelligence perspective.`,seo:{_type:'seo',title:`${title} Research | The Redditrepreneur`,description:`Explore The Redditrepreneur research and analysis about ${title}.`}})
  topicRefs.push({_type:'reference',_key:slug,_ref:id})
}

const existingDraft=await client.fetch<{coverRef?:string}|null>('*[_id==$draftId][0]{"coverRef":coverImage.asset._ref}',{draftId})
const imageAsset=existingDraft?.coverRef?{_id:existingDraft.coverRef}:await client.assets.upload('image',fs.createReadStream(assetPath),{filename:'community-intelligence-weekly-platform-live.png',contentType:'image/png',title:communityIntelligenceWeeklyPlatformLiveDraft.title})

const related=await client.fetch<Array<{_id:string,slug:string}>>('*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","weekly","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',{slugs:communityIntelligenceWeeklyPlatformLiveRelated})

await client.createOrReplace({
  _id:draftId,
  _type:'weekly',
  title:communityIntelligenceWeeklyPlatformLiveDraft.title,
  slug:{_type:'slug',current:communityIntelligenceWeeklyPlatformLiveDraft.slug},
  excerpt:communityIntelligenceWeeklyPlatformLiveDraft.excerpt,
  issueNumber:4,
  issueDate:'2026-07-17',
  coverImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:communityIntelligenceWeeklyPlatformLiveDraft.imageAlt},
  author:{_type:'reference',_ref:author._id},
  publishedAt:proposedPublicationDate,
  updatedAt:proposedPublicationDate,
  topics:topicRefs,
  frameworks:[],
  relatedContent:communityIntelligenceWeeklyPlatformLiveRelated.map(slug=>related.find(item=>item.slug===slug)).filter((item):item is {_id:string,slug:string}=>Boolean(item)).map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),
  featured:false,
  seo:{_type:'seo',title:communityIntelligenceWeeklyPlatformLiveDraft.seoTitle,description:communityIntelligenceWeeklyPlatformLiveDraft.metaDescription,canonicalUrl,ogImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id}}},
  body:[{_type:'legacyHtml',_key:'article-body',html:communityIntelligenceWeeklyPlatformLiveBody,reviewStatus:'reviewed',notes:'Supplied edition formatted as an unpublished editorial draft. Do not publish without explicit approval.'}],
})

const result=await client.fetch('*[_id==$draftId][0]{_id,_type,title,"slug":slug.current,issueNumber,issueDate,publishedAt,"author":author->name,"cover":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->{title,"slug":slug.current},seo}',{draftId})
fs.mkdirSync(path.resolve('reports/generated'),{recursive:true})
fs.writeFileSync(path.resolve('reports/generated/community-intelligence-weekly-platform-live-draft.json'),JSON.stringify(result,null,2))
console.log(JSON.stringify(result,null,2))
