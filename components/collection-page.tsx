import {ContentCard} from './cards'
import {content, type ContentType} from '@/lib/content'
import {withCoverImages} from '@/lib/covers'

export async function CollectionPage({eyebrow, title, intro, types}: {eyebrow: string, title: string, intro: string, types?: ContentType[]}) {
  const items = types ? content.filter(x => types.includes(x.type)) : content
  const illustratedItems=await withCoverImages(items)
  return <><header className="page-hero shell"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{intro}</p></header><section className="section shell"><div className="card-grid">{illustratedItems.map(item=><ContentCard item={item} key={item.slug}/>)}</div></section></>
}
