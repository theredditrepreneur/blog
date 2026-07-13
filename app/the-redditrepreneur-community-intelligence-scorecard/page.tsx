import {ArticlePage} from '@/components/article-page'
import type {ContentItem} from '@/lib/content'
import {client} from '@/sanity/lib/client'

const slug='the-redditrepreneur-community-intelligence-scorecard'
export const metadata={title:'The Redditrepreneur Community Intelligence Scorecard',description:'The methodology for assessing Community Presence, Community Trust, Share of Consensus, Insight Responsiveness and Community Authority.',alternates:{canonical:`/${slug}`}}

export default async function Page(){
  const cms=await client.fetch<{title?:string,excerpt?:string,bodyHtml?:string,coverImageUrl?:string,publishedAt?:string}>(`*[_type=="page" && slug.current==$slug][0]{title,excerpt,"bodyHtml":body[0].html,"coverImageUrl":coverImage.asset->url,publishedAt}`,{slug})
  const item:ContentItem={title:cms?.title||'The Redditrepreneur Community Intelligence Scorecard',slug,type:'Research',excerpt:cms?.excerpt||'How The Redditrepreneur assesses the five dimensions of Community Intelligence.',date:cms?.publishedAt||'2026-07-01',topic:'Community Intelligence'}
  return <ArticlePage item={item} bodyHtml={cms?.bodyHtml} coverImageUrl={cms?.coverImageUrl}/>
}
