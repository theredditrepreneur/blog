import {notFound} from 'next/navigation'
import {CollectionPage} from '@/components/collection-page'
import {topics} from '@/lib/content'
const slugify=(x:string)=>x.toLowerCase().replaceAll(' ','-')
export function generateStaticParams(){return topics.map(x=>({slug:slugify(x)}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const topic=topics.find(x=>slugify(x)===slug);if(!topic)notFound();return <CollectionPage eyebrow="Topic" title={topic} intro={`Research, frameworks and analysis exploring ${topic} through a Community Intelligence lens.`} topic={topic}/>}
