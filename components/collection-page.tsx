import {ContentCard} from './cards'
import {content, type ContentType} from '@/lib/content'
import {withCoverImages} from '@/lib/covers'
import Link from 'next/link'
import {getSanityArticles,mergeContent} from '@/lib/sanity-content'

export async function CollectionPage({eyebrow,title,intro,types,topic,explainerHref,explainerLabel,collectionNote}:{eyebrow:string,title:string,intro:string,types?:ContentType[],topic?:string,explainerHref?:string,explainerLabel?:string,collectionNote?:string}) {
  const merged=mergeContent(content,await getSanityArticles())
  const items = merged.filter(item=>(!types||types.includes(item.type))&&(!topic||item.topic===topic||item.tags?.includes(topic)))
  const illustratedItems=await withCoverImages(items)
  return <><header className="page-hero shell"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{intro}</p>{explainerHref&&<Link className="text-link" href={explainerHref}>{explainerLabel||'Read the explainer'}</Link>}</header><section className="section shell">{collectionNote&&<p className="collection-note">{collectionNote}</p>}{illustratedItems.length>1&&<><div className="section-heading"><div><div className="eyebrow">Featured</div><h2>Start here</h2></div></div><ContentCard item={illustratedItems[0]} featured/></>}<div className="section-heading archive-heading"><div><div className="eyebrow">Archive</div><h2>{illustratedItems.length>1?'More from the collection':'Available now'}</h2></div></div>{illustratedItems.length?<div className="card-grid">{(illustratedItems.length>1?illustratedItems.slice(1):illustratedItems).map(item=><ContentCard item={item} key={item.slug}/>)}</div>:<div className="empty-state"><h3>New work is in development</h3><p>This archive will grow as new Community Intelligence research is published.</p></div>}</section></>
}
