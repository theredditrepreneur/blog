import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {headOfCommunityIntelligenceBody,headOfCommunityIntelligenceDraft,headOfCommunityIntelligenceRelated} from '../../lib/drafts/head-of-community-intelligence'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='article-head-of-community-intelligence'
const draftId=`drafts.${documentId}`
const proposedPublicationDate='2026-07-13T12:00:00.000Z'
const assetPath=path.resolve('public/why-every-company-will-hire-a-head-of-community-intelligence.webp')
const canonicalUrl=`https://blog.theredditrepreneur.com/${headOfCommunityIntelligenceDraft.slug}`

const existing=await client.fetch<Array<{_id:string}>>('*[slug.current==$slug && !(_id in [$draftId,$documentId])]{_id}',{slug:headOfCommunityIntelligenceDraft.slug,draftId,documentId})
if(existing.length)throw new Error(`Slug already belongs to ${existing.map(item=>item._id).join(', ')}`)

const author=await client.fetch<{_id:string}|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]{_id}')
if(!author)throw new Error('Tonte Bo Douglas author document was not found')

const topicDefinitions=[
  ['Community Intelligence','community-intelligence','Research and analysis about understanding and acting on evidence from online communities.'],
  ['Leadership','leadership','Community Intelligence research for executives, leadership teams and strategic decision makers.'],
  ['Customer Insights','customer-insights','Research about customer beliefs, language, experience and decision making.'],
  ['AI Search','ai-search','Research about how AI systems discover, interpret and recommend brands and information.'],
  ['Brand Intelligence','brand-intelligence','Research about the community evidence shaping brand perception, trust and authority.'],
  ['Market Research','market-research','Research using community evidence to understand markets, categories and competitors.'],
  ['Community Strategy','community-strategy','Frameworks and analysis for turning community understanding into practical strategy.'],
] as const

const topicRefs=[] as Array<{_type:'reference',_key:string,_ref:string}>
for(const [title,slug,introduction] of topicDefinitions){
  let topic=await client.fetch<{_id:string}|null>('*[_type=="topic" && (slug.current==$slug || title==$title)][0]{_id}',{slug,title})
  if(!topic){
    const topicId=`topic-${slug}`
    await client.createIfNotExists({_id:topicId,_type:'topic',title,slug:{_type:'slug',current:slug},introduction,seo:{_type:'seo',title:`${title} Research`,description:`Explore The Redditrepreneur research and analysis about ${title.toLowerCase()}.`}})
    topic={_id:topicId}
  }
  topicRefs.push({_type:'reference',_key:slug,_ref:topic._id})
}

const existingDraft=await client.fetch<{coverRef?:string}|null>('*[_id==$draftId][0]{"coverRef":coverImage.asset._ref}',{draftId})
const imageAsset=existingDraft?.coverRef?{_id:existingDraft.coverRef}:await client.assets.upload('image',fs.createReadStream(assetPath),{
  filename:'why-every-company-will-hire-a-head-of-community-intelligence.webp',
  contentType:'image/webp',
  title:headOfCommunityIntelligenceDraft.title,
})

const related=await client.fetch<Array<{_id:string,slug:string}>>('*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',{slugs:headOfCommunityIntelligenceRelated})

await client.createOrReplace({
  _id:draftId,
  _type:'article',
  title:headOfCommunityIntelligenceDraft.title,
  slug:{_type:'slug',current:headOfCommunityIntelligenceDraft.slug},
  excerpt:headOfCommunityIntelligenceDraft.excerpt,
  coverImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:headOfCommunityIntelligenceDraft.imageAlt},
  author:{_type:'reference',_ref:author._id},
  publishedAt:proposedPublicationDate,
  updatedAt:proposedPublicationDate,
  topics:topicRefs,
  frameworks:[],
  relatedContent:related.map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),
  featured:false,
  seo:{_type:'seo',title:headOfCommunityIntelligenceDraft.seoTitle,description:headOfCommunityIntelligenceDraft.metaDescription,canonicalUrl},
  body:[{_type:'legacyHtml',_key:'article-body',html:headOfCommunityIntelligenceBody,reviewStatus:'reviewed',notes:'Supplied article formatted as an unpublished editorial draft. Do not publish without explicit approval.'}],
})

const result=await client.fetch('*[_id==$draftId][0]{_id,_type,title,"slug":slug.current,publishedAt,"author":author->name,"cover":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->title,seo}',{draftId})
fs.mkdirSync(path.resolve('reports/generated'),{recursive:true})
fs.writeFileSync(path.resolve('reports/generated/head-of-community-intelligence-draft.json'),JSON.stringify(result,null,2))
console.log(JSON.stringify(result,null,2))
