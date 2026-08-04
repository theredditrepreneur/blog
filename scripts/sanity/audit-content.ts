import {client} from '../../sanity/lib/client'
import {content} from '../../lib/content'

const documentTypes=['article','researchReport','scorecard','caseStudy','framework','benchmark','weekly','indexIssue','newsBrief']

const sanity=await client.fetch<Array<{_id:string;_type:string;slug:string;publishedAt?:string;hasImage:boolean}>>(
  `*[_type in $types && defined(slug.current)]{
    _id,_type,"slug":slug.current,publishedAt,"hasImage":defined(coverImage.asset)
  }`,
  {types:documentTypes},
)
const settings=await client.fetch<{_id:string;title?:string;navigationCount:number;featuredSlug?:string}|null>(
  `*[_id == "siteSettings"][0]{_id,title,"navigationCount":count(navigation),"featuredSlug":featuredContent->slug.current}`,
)

const sanitySlugs=new Set(sanity.map(item=>item.slug))
const sourceSlugs=new Set(content.map(item=>item.slug))
const missingFromSanity=content.filter(item=>!sanitySlugs.has(item.slug)).map(item=>item.slug)
const sanityOnly=sanity.filter(item=>!sourceSlugs.has(item.slug)).map(item=>item.slug)

console.log(JSON.stringify({
  source:{total:content.length,byType:Object.fromEntries([...new Set(content.map(item=>item.type))].map(type=>[type,content.filter(item=>item.type===type).length]))},
  sanity:{total:sanity.length,published:sanity.filter(item=>item.publishedAt).length,withImages:sanity.filter(item=>item.hasImage).length},
  siteSettings:settings,
  missingFromSanity,
  sanityOnly,
},null,2))
