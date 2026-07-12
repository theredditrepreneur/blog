import Link from 'next/link'
import type {ContentItem} from '@/lib/content'

export function ContentCard({item, featured = false}: {item: ContentItem, featured?: boolean}) {
  return <article className={featured ? 'content-card featured-card' : 'content-card'}>
    <div className="card-art" aria-hidden="true"><span>{item.type}</span></div>
    <div className="card-copy"><div className="eyebrow">{item.type}{item.topic ? ` · ${item.topic}` : ''}</div><h3><Link href={`/${item.slug}`}>{item.title}</Link></h3><p>{item.excerpt}</p><time dateTime={item.date}>{new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(item.date))}</time></div>
  </article>
}
