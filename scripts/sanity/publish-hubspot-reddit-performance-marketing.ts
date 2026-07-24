import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {
  hubspotRedditPerformanceArticle,
  hubspotRedditPerformanceBody,
  hubspotRedditPerformanceRelated,
} from '../../lib/articles/hubspot-reddit-performance-marketing'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='article-hubspot-reddit-performance-marketing'
const ctaId='cta-hubspot-community-intelligence-audit'
const publishedAt='2026-07-24T12:00:00.000Z'
const assetPath=path.resolve('public/hubspot-reddit-performance-marketing-channel.webp')
const canonicalUrl=`https://blog.theredditrepreneur.com/${hubspotRedditPerformanceArticle.slug}`

const duplicate=await client.fetch<Array<{_id:string}>>(
  '*[slug.current==$slug && _id!=$documentId && _id!=$draftId]{_id}',
  {slug:hubspotRedditPerformanceArticle.slug,documentId,draftId:`drafts.${documentId}`},
)
if(duplicate.length)throw new Error(`Slug already belongs to ${duplicate.map(item=>item._id).join(', ')}`)

const author=await client.fetch<{_id:string}|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]{_id}')
if(!author)throw new Error('Tonte Bo Douglas author document was not found')

const topicTitles=[...new Set([hubspotRedditPerformanceArticle.topic,...(hubspotRedditPerformanceArticle.tags||[])].filter((value):value is string=>Boolean(value)))]
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
  filename:'hubspot-reddit-performance-marketing-channel.webp',
  contentType:'image/webp',
  title:hubspotRedditPerformanceArticle.title,
})

const related=await client.fetch<Array<{_id:string,slug:string}>>(
  '*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","weekly","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',
  {slugs:hubspotRedditPerformanceRelated},
)

await client.createOrReplace({
  _id:ctaId,
  _type:'callToAction',
  title:'Understand the Conversations Shaping Customer Trust',
  label:'Book a Community Intelligence Audit',
  url:'https://www.theredditrepreneur.com/services/community-intelligence-audit',
  style:'primary',
})

await client.createOrReplace({
  _id:documentId,
  _type:'article',
  title:hubspotRedditPerformanceArticle.title,
  slug:{_type:'slug',current:hubspotRedditPerformanceArticle.slug},
  excerpt:hubspotRedditPerformanceArticle.excerpt,
  coverImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:hubspotRedditPerformanceArticle.imageAlt},
  author:{_type:'reference',_ref:author._id},
  publishedAt,
  updatedAt:publishedAt,
  topics:topicRefs,
  frameworks:[],
  relatedContent:hubspotRedditPerformanceRelated.map(slug=>related.find(item=>item.slug===slug)).filter((item):item is {_id:string,slug:string}=>Boolean(item)).map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),
  primaryCta:{_type:'reference',_ref:ctaId},
  featured:false,
  seo:{
    _type:'seo',
    title:hubspotRedditPerformanceArticle.seoTitle,
    description:hubspotRedditPerformanceArticle.metaDescription,
    canonicalUrl,
    ogImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id}},
  },
  body:[{_type:'legacyHtml',_key:'article-body',html:hubspotRedditPerformanceBody,reviewStatus:'reviewed',notes:'Final supplied article formatted and published with editorial approval.'}],
})

const result=await client.fetch('*[_id==$documentId][0]{_id,_type,title,"slug":slug.current,publishedAt,"author":author->name,"image":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->{title,"slug":slug.current},seo}',{documentId})
console.log(JSON.stringify(result,null,2))
