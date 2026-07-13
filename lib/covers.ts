import type {ContentItem} from '@/lib/content'
import {client} from '@/sanity/lib/client'

type Cover={slug:string,url:string}

export async function withCoverImages(items:ContentItem[]):Promise<ContentItem[]> {
  try {
    const covers=await client.fetch<Cover[]>(`*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","weekly","indexIssue","newsBrief"] && defined(coverImage.asset)]{"slug":slug.current,"url":coverImage.asset->url}`)
    const bySlug=new Map(covers.map(cover=>[cover.slug,cover.url]))
    return items.map(item=>({...item,image:item.image||bySlug.get(item.slug)}))
  } catch(error) {
    console.error('Sanity cover query failed',error)
    return items
  }
}
