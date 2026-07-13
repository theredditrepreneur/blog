import Link from 'next/link'
import Image from 'next/image'
import type {ContentItem} from '@/lib/content'

export function ContentCard({item, featured = false}: {item: ContentItem, featured?: boolean}) {
  const cta=item.type==='Scorecard'?'Read the Scorecard':item.type==='Case Study'?'Read the case study':item.type==='Framework'?'Explore the framework':item.type==='Benchmark'?'Read the report':item.type==='Weekly'?'Read the issue':'Read the analysis'
  return <article className={featured ? 'content-card featured-card' : 'content-card'}>
    <Link className={`card-art${item.image?' has-image':''}`} href={`/${item.slug}`} aria-label={`Read ${item.title}`}>
      {item.image?<Image src={item.image} alt="" fill sizes={featured?'(max-width: 700px) 100vw, 60vw':'(max-width: 700px) 100vw, 33vw'}/>:<span>{item.type}</span>}
    </Link>
    <div className="card-copy"><div className="eyebrow">{item.type}{item.topic ? ` · ${item.topic}` : ''}</div><h3><Link href={`/${item.slug}`}>{item.title}</Link></h3><p>{item.excerpt}</p><div className="card-meta"><span>By Tonte Bo Douglas</span><time dateTime={item.date}>{new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(item.date))}</time></div><Link className="card-cta" href={`/${item.slug}`}>{cta}<span aria-hidden="true"> →</span></Link></div>
  </article>
}
