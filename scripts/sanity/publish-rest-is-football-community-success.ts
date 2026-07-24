import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {
  restIsFootballCommunitySuccessArticle,
  restIsFootballCommunitySuccessBody,
  restIsFootballCommunitySuccessRelated,
} from '../../lib/articles/rest-is-football-community-success'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='article-rest-is-football-community-success'
const ctaId='cta-rest-is-football-community-intelligence-services'
const publishedAt='2026-07-24T12:00:00.000Z'
const assetPath=path.resolve('public/the-rest-is-football-community-success-cover.webp')
const canonicalUrl=`https://blog.theredditrepreneur.com/${restIsFootballCommunitySuccessArticle.slug}`

const duplicate=await client.fetch<Array<{_id:string}>>(
  '*[slug.current==$slug && _id!=$documentId && _id!=$draftId]{_id}',
  {slug:restIsFootballCommunitySuccessArticle.slug,documentId,draftId:`drafts.${documentId}`},
)
if(duplicate.length)throw new Error(`Slug already belongs to ${duplicate.map(item=>item._id).join(', ')}`)

const author=await client.fetch<{_id:string}|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]{_id}')
if(!author)throw new Error('Tonte Bo Douglas author document was not found')

const topicTitles=[...new Set([restIsFootballCommunitySuccessArticle.topic,...(restIsFootballCommunitySuccessArticle.tags||[])].filter((value):value is string=>Boolean(value)))]
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
  filename:'the-rest-is-football-community-success-cover.webp',
  contentType:'image/webp',
  title:restIsFootballCommunitySuccessArticle.title,
})

const related=await client.fetch<Array<{_id:string,slug:string}>>(
  '*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","weekly","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',
  {slugs:restIsFootballCommunitySuccessRelated},
)

await client.createOrReplace({
  _id:ctaId,
  _type:'callToAction',
  title:'Understand What Your Market Is Already Telling You',
  label:'Explore Community Intelligence Services',
  url:'https://theredditrepreneur.com',
  style:'primary',
})

await client.createOrReplace({
  _id:documentId,
  _type:'article',
  title:restIsFootballCommunitySuccessArticle.title,
  slug:{_type:'slug',current:restIsFootballCommunitySuccessArticle.slug},
  excerpt:restIsFootballCommunitySuccessArticle.excerpt,
  coverImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:restIsFootballCommunitySuccessArticle.imageAlt},
  author:{_type:'reference',_ref:author._id},
  publishedAt,
  updatedAt:publishedAt,
  topics:topicRefs,
  frameworks:[],
  relatedContent:restIsFootballCommunitySuccessRelated.map(slug=>related.find(item=>item.slug===slug)).filter((item):item is {_id:string,slug:string}=>Boolean(item)).map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),
  primaryCta:{_type:'reference',_ref:ctaId},
  featured:false,
  seo:{
    _type:'seo',
    title:restIsFootballCommunitySuccessArticle.seoTitle,
    description:restIsFootballCommunitySuccessArticle.metaDescription,
    canonicalUrl,
    ogImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id}},
  },
  body:[{_type:'legacyHtml',_key:'article-body',html:restIsFootballCommunitySuccessBody,reviewStatus:'reviewed',notes:'Final supplied article formatted and published with editorial approval.'}],
})

const result=await client.fetch('*[_id==$documentId][0]{_id,_type,title,"slug":slug.current,publishedAt,"author":author->name,"image":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->{title,"slug":slug.current},seo}',{documentId})
console.log(JSON.stringify(result,null,2))
