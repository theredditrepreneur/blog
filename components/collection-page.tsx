import {ContentCard} from './cards'
import {content, type ContentType} from '@/lib/content'

export function CollectionPage({eyebrow, title, intro, types}: {eyebrow: string, title: string, intro: string, types?: ContentType[]}) {
  const items = types ? content.filter(x => types.includes(x.type)) : content
  return <><header className="page-hero shell"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{intro}</p></header><section className="section shell"><div className="card-grid">{items.map(item=><ContentCard item={item} key={item.slug}/>)}</div></section></>
}
