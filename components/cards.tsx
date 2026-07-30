import Link from 'next/link'
import Image from 'next/image'
import type {ContentItem} from '@/lib/content'
import {deriveScorecard} from '@/lib/community-intelligence-scorecard'
import {getIndustry} from '@/lib/industries'

export function ContentCard({item,featured=false}:{item:ContentItem,featured?:boolean}){
  const cta=item.type==='Scorecard'?'Read the Scorecard':item.type==='Case Study'?'Read the case study':item.type==='Framework'?'Explore the framework':item.type==='Benchmark'?'Read the report':item.type==='Weekly'?'Read the issue':'Read the analysis'
  const scorecard=item.scorecard?deriveScorecard(item.scorecard):null
  const industry=getIndustry(item)
  return <article className={featured?'content-card featured-card':'content-card'}>
    <Link className={`card-art${item.image?' has-image':''}`} href={`/${item.slug}`} aria-label={`Read ${item.title}`}>
      {item.image?<Image src={item.image} alt="" fill sizes={featured?'(max-width: 700px) 100vw, 60vw':'(max-width: 700px) 100vw, 33vw'}/>:<span>{item.type}</span>}
    </Link>
    <div className="card-copy">
      <div className="card-taxonomy"><Link className="industry-badge" href={`/industries/${industry.slug}`}>{industry.name}</Link><span>{item.type}{item.topic?` · ${item.topic}`:''}</span></div>
      <h3><Link href={`/${item.slug}`}>{item.title}</Link></h3>
      {scorecard&&<dl className="scorecard-card-summary"><div><dt>Score</dt><dd>{scorecard.overallScore}/100</dd></div><div><dt>Rating</dt><dd>{scorecard.rating}</dd></div></dl>}
      <p>{item.excerpt}</p>
      <div className="card-meta"><time dateTime={item.date}>{new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date(item.date))}</time><span>{item.readingMinutes||8} min read</span></div>
      <Link className="card-cta" href={`/${item.slug}`}>{cta}<span aria-hidden="true"> →</span></Link>
    </div>
  </article>
}
