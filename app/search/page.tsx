import type {Metadata} from 'next'
import {SearchExperience} from '@/components/search-experience'

export const metadata:Metadata={title:'Search Community Intelligence Research',description:'Search The Redditrepreneur Research by industry, framework, company, brand, keyword and topic.',alternates:{canonical:'/search'}}

export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q=''}=await searchParams
  return <SearchExperience initialQuery={q}/>
}
