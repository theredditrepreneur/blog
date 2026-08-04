import type {ContentItem,ContentType} from './content'
import type {IndustrySlug} from './industries'
import {client} from '@/sanity/lib/client'

export type SanityBody = Array<Record<string,unknown>>

export type SanityArticle = {
  item: ContentItem
  body?: SanityBody
  bodyHtml?: string
  updatedAt?: string
}

type SanityRecord = {
  _type:string
  _updatedAt?:string
  title:string
  slug:string
  excerpt?:string
  publishedAt:string
  updatedAt?:string
  industry?:IndustrySlug
  featured?:boolean
  image?:string
  imageAlt?:string
  imageWidth?:number
  imageHeight?:number
  authorName?:string
  tags?:string[]
  seoTitle?:string
  metaDescription?:string
  body?:SanityBody
  bodyHtml?:string
}

const documentTypes=['article','researchReport','scorecard','caseStudy','framework','benchmark','weekly','indexIssue','newsBrief']
const labels:Record<string,ContentType>={article:'Article',researchReport:'Research',scorecard:'Scorecard',caseStudy:'Case Study',framework:'Framework',benchmark:'Benchmark',weekly:'Weekly',indexIssue:'Index',newsBrief:'Article'}

const projection=`{
  _type,_updatedAt,title,"slug":slug.current,excerpt,publishedAt,updatedAt,industry,featured,
  "image":coverImage.asset->url,"imageAlt":coverImage.alt,
  "imageWidth":coverImage.asset->metadata.dimensions.width,
  "imageHeight":coverImage.asset->metadata.dimensions.height,
  "authorName":author->name,"tags":topics[]->title,
  "seoTitle":seo.title,"metaDescription":seo.description,
  body,"bodyHtml":body[_type == "legacyHtml"][0].html
}`

function textFromBody(body:SanityBody|undefined){
  return (body||[]).flatMap(block=>Array.isArray(block.children)?block.children:[]).map(child=>typeof child==='object'&&child&&'text' in child?String(child.text):'').join(' ')
}

function mapRecord(record:SanityRecord):SanityArticle {
  const bodyText=textFromBody(record.body)
  return {
    item:{
      title:record.title,
      slug:record.slug,
      type:labels[record._type]||'Article',
      excerpt:record.excerpt||bodyText.slice(0,300)||'Community Intelligence analysis from The Redditrepreneur.',
      date:record.publishedAt.slice(0,10),
      industry:record.industry,
      topic:record.tags?.[0]||'Community Intelligence',
      tags:record.tags,
      featured:record.featured,
      image:record.image,
      imageAlt:record.imageAlt,
      imageWidth:record.imageWidth,
      imageHeight:record.imageHeight,
      seoTitle:record.seoTitle,
      metaDescription:record.metaDescription,
      readingMinutes:Math.max(1,Math.ceil(bodyText.split(/\s+/).filter(Boolean).length/220)),
    },
    body:record.body,
    bodyHtml:record.bodyHtml,
    updatedAt:record.updatedAt||record._updatedAt,
  }
}

export async function getSanityArticles():Promise<SanityArticle[]> {
  try {
    const records=await client.fetch<SanityRecord[]>(`*[_type in $types && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) ${projection}`,{types:documentTypes},{next:{revalidate:300}})
    return records.map(mapRecord)
  } catch(error) {
    console.error('Sanity content query failed',error)
    return []
  }
}

export async function getSanityArticle(slug:string):Promise<SanityArticle|null> {
  try {
    const record=await client.fetch<SanityRecord|null>(`*[_type in $types && slug.current == $slug && defined(publishedAt)][0] ${projection}`,{types:documentTypes,slug},{next:{revalidate:300}})
    return record?mapRecord(record):null
  } catch(error) {
    console.error('Sanity article query failed',error)
    return null
  }
}

export function mergeContent(local:ContentItem[],sanity:SanityArticle[]) {
  const merged=new Map<string,ContentItem>()
  local.forEach(item=>merged.set(item.slug,item))
  sanity.forEach(({item})=>merged.set(item.slug,item))
  return [...merged.values()].sort((a,b)=>b.date.localeCompare(a.date))
}
