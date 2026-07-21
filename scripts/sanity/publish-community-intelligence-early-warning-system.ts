import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {
  communityIntelligenceEarlyWarningArticle,
  communityIntelligenceEarlyWarningBody,
  communityIntelligenceEarlyWarningRelated,
} from '../../lib/articles/community-intelligence-early-warning-system'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='research-community-intelligence-early-warning-system'
const publishedAt='2026-07-21T12:00:00.000Z'
const assetPath=path.resolve('public/community-intelligence-early-warning-system.webp')
const canonicalUrl=`https://blog.theredditrepreneur.com/${communityIntelligenceEarlyWarningArticle.slug}`

const duplicate=await client.fetch<Array<{_id:string}>>(
  '*[slug.current==$slug && _id!=$documentId && _id!=$draftId]{_id}',
  {slug:communityIntelligenceEarlyWarningArticle.slug,documentId,draftId:`drafts.${documentId}`},
)
if(duplicate.length)throw new Error(`Slug already belongs to ${duplicate.map(item=>item._id).join(', ')}`)

const author=await client.fetch<{_id:string}|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]{_id}')
if(!author)throw new Error('Tonte Bo Douglas author document was not found')

const topicTitles=[...new Set([communityIntelligenceEarlyWarningArticle.topic,...(communityIntelligenceEarlyWarningArticle.tags||[])].filter((value):value is string=>Boolean(value)))]
const topicRefs=[] as Array<{_type:'reference',_key:string,_ref:string}>
for(const title of topicTitles){
  const slug=title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
  const id=`topic-${slug}`
  await client.createIfNotExists({
    _id:id,
    _type:'topic',
    title,
    slug:{_type:'slug',current:slug},
    introduction:`Research and analysis about ${title} through a Community Intelligence perspective.`,
    seo:{_type:'seo',title:`${title} Research | The Redditrepreneur`,description:`Explore The Redditrepreneur research and analysis about ${title}.`},
  })
  topicRefs.push({_type:'reference',_key:slug,_ref:id})
}

const existing=await client.fetch<{assetId?:string}|null>('*[_id==$documentId][0]{"assetId":coverImage.asset._ref}',{documentId})
const imageAsset=existing?.assetId?{_id:existing.assetId}:await client.assets.upload('image',fs.createReadStream(assetPath),{
  filename:'community-intelligence-early-warning-system.webp',
  contentType:'image/webp',
  title:communityIntelligenceEarlyWarningArticle.title,
})

const related=await client.fetch<Array<{_id:string,slug:string}>>(
  '*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","weekly","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',
  {slugs:communityIntelligenceEarlyWarningRelated},
)

await client.createOrReplace({
  _id:documentId,
  _type:'researchReport',
  title:communityIntelligenceEarlyWarningArticle.title,
  slug:{_type:'slug',current:communityIntelligenceEarlyWarningArticle.slug},
  excerpt:communityIntelligenceEarlyWarningArticle.excerpt,
  coverImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:communityIntelligenceEarlyWarningArticle.imageAlt},
  author:{_type:'reference',_ref:author._id},
  publishedAt,
  updatedAt:publishedAt,
  topics:topicRefs,
  frameworks:[],
  relatedContent:communityIntelligenceEarlyWarningRelated.map(slug=>related.find(item=>item.slug===slug)).filter((item):item is {_id:string,slug:string}=>Boolean(item)).map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),
  featured:false,
  executiveSummary:communityIntelligenceEarlyWarningArticle.excerpt,
  dataLimitations:'This editorial analysis interprets public community conversations and one cited academic study. It does not claim that every community conversation predicts market change.',
  seo:{
    _type:'seo',
    title:communityIntelligenceEarlyWarningArticle.seoTitle,
    description:communityIntelligenceEarlyWarningArticle.metaDescription,
    canonicalUrl,
    ogImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id}},
  },
  body:[{_type:'legacyHtml',_key:'article-body',html:communityIntelligenceEarlyWarningBody,reviewStatus:'reviewed',notes:'Final supplied research article formatted and published with editorial approval.'}],
})

const result=await client.fetch('*[_id==$documentId][0]{_id,_type,title,"slug":slug.current,publishedAt,"author":author->name,"image":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->{title,"slug":slug.current},seo}',{documentId})
console.log(JSON.stringify(result,null,2))
