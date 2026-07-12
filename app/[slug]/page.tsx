import {notFound} from 'next/navigation'
import {ArticlePage} from '@/components/article-page'
import {ScorecardPage} from '@/components/scorecard-page'
import {FrameworkPage} from '@/components/framework-page'
import {content} from '@/lib/content'

export function generateStaticParams(){return content.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=content.find(x=>x.slug===slug);return item?{title:item.title,description:item.excerpt}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=content.find(x=>x.slug===slug);if(!item)notFound();if(item.type==='Scorecard')return <ScorecardPage item={item}/>;if(item.type==='Framework')return <FrameworkPage item={item}/>;return <ArticlePage item={item}/>}
