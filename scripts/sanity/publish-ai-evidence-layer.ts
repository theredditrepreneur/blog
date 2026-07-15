import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {aiEvidenceLayerArticle,aiEvidenceLayerBody,aiEvidenceLayerRelated} from '../../lib/articles/ai-evidence-layer'

const client=getCliClient({apiVersion:'2024-01-01'})
const articleId='article-ai-evidence-layer'
const ctaId='cta-ai-evidence-layer-audit'
const authorId='ghost-author-6a3c71f79974230008809877'
const publishedAt='2026-07-15T12:00:00.000Z'
const assetPath=path.resolve('public/ai-evidence-layer-cover.webp')

const topicTitles=[aiEvidenceLayerArticle.topic,...(aiEvidenceLayerArticle.tags||[])].filter((value):value is string=>Boolean(value))
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

const existing=await client.fetch<{assetId?:string}|null>('*[_id==$articleId][0]{"assetId":coverImage.asset._ref}',{articleId})
const imageAsset=existing?.assetId?{_id:existing.assetId}:await client.assets.upload('image',fs.createReadStream(assetPath),{
  filename:'ai-evidence-layer-cover.webp',
  contentType:'image/webp',
  title:aiEvidenceLayerArticle.title,
})

const related=await client.fetch<Array<{_id:string,slug:string}>>(
  '*[_type in ["article","researchReport","framework","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',
  {slugs:aiEvidenceLayerRelated},
)

await client.createOrReplace({
  _id:ctaId,
  _type:'callToAction',
  title:'Understand The Evidence Surrounding Your Brand',
  label:'Explore the AI Authority Audit',
  url:'https://www.theredditrepreneur.com/services/ai-authority-audit',
  style:'primary',
})

await client.createOrReplace({
  _id:articleId,
  _type:'article',
  title:aiEvidenceLayerArticle.title,
  slug:{_type:'slug',current:aiEvidenceLayerArticle.slug},
  excerpt:aiEvidenceLayerArticle.excerpt,
  coverImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:aiEvidenceLayerArticle.imageAlt},
  author:{_type:'reference',_ref:authorId},
  publishedAt,
  updatedAt:publishedAt,
  topics:topicRefs,
  frameworks:[],
  relatedContent:aiEvidenceLayerRelated.map(slug=>related.find(item=>item.slug===slug)).filter((item):item is {slug:string,_id:string}=>Boolean(item)).map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),
  primaryCta:{_type:'reference',_ref:ctaId},
  featured:false,
  seo:{
    _type:'seo',
    title:aiEvidenceLayerArticle.seoTitle,
    description:aiEvidenceLayerArticle.metaDescription,
    canonicalUrl:`https://blog.theredditrepreneur.com/${aiEvidenceLayerArticle.slug}/`,
    ogImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id}},
  },
  body:[{_type:'legacyHtml',_key:'article-body',html:aiEvidenceLayerBody,reviewStatus:'reviewed',notes:'Final supplied article formatted for the publishing platform.'}],
})

const result=await client.fetch('*[_id==$articleId][0]{_id,title,"slug":slug.current,publishedAt,"image":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->{title,"slug":slug.current}}',{articleId})
console.log(JSON.stringify(result,null,2))
