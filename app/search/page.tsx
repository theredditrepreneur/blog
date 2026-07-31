import type {Metadata} from 'next'
import {SearchExperience} from '@/components/search-experience'
import {content} from '@/lib/content'
import {getSanityArticles,mergeContent} from '@/lib/sanity-content'

export const metadata:Metadata={title:'Search Community Intelligence Research',description:'Search The Redditrepreneur Research by industry, framework, company, brand, keyword and topic.',alternates:{canonical:'/search'}}

export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q=''}=await searchParams
  const items=mergeContent(content,await getSanityArticles())
  return <SearchExperience initialQuery={q} items={items}/>
}
