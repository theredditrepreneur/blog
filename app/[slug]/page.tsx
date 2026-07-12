import {notFound} from 'next/navigation'
import {ArticlePage} from '@/components/article-page'
import {ScorecardPage} from '@/components/scorecard-page'
import {FrameworkPage} from '@/components/framework-page'
import {content} from '@/lib/content'
import {client} from '@/sanity/lib/client'

export function generateStaticParams(){return content.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=content.find(x=>x.slug===slug);return item?{title:item.title,description:item.excerpt}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=content.find(x=>x.slug===slug);if(!item)notFound();let cms:{bodyHtml?:string,coverImageUrl?:string}|null=null;try{cms=await client.fetch(`*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","weekly","indexIssue","newsBrief"] && slug.current==$slug][0]{"bodyHtml":body[0].html,"coverImageUrl":coverImage.asset->url}`,{slug})}catch(error){console.error('Sanity article query failed',error)}if(item.type==='Scorecard')return <ScorecardPage item={item} bodyHtml={cms?.bodyHtml} coverImageUrl={cms?.coverImageUrl}/>;if(item.type==='Framework')return <FrameworkPage item={item} bodyHtml={cms?.bodyHtml} coverImageUrl={cms?.coverImageUrl}/>;return <ArticlePage item={item} bodyHtml={cms?.bodyHtml} coverImageUrl={cms?.coverImageUrl}/>}
