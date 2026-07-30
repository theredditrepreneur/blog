import Link from 'next/link'
import type {ContentItem} from '@/lib/content'
import type {Industry} from '@/lib/industries'
import {IndustryIcon} from './industry-icon'

export function IndustryCard({industry}:{industry:Industry}) {
  return <article className="industry-card">
    <IndustryIcon industry={industry}/>
    <h3>{industry.name}</h3>
    <p>{industry.description}</p>
    <Link className="industry-card-action" href={`/industries/${industry.slug}`}>Explore research <span aria-hidden="true">→</span></Link>
  </article>
}

export function FrameworkCard({name,description,href='/frameworks'}:{name:string,description?:string,href?:string}) {
  return <article className="publication-framework-card">
    <span>Framework</span>
    <h3>{name}</h3>
    {description&&<p>{description}</p>}
    <Link href={href}>Explore framework <span aria-hidden="true">→</span></Link>
  </article>
}

export function ScorecardPlaceholder({industry}:{industry:Industry}) {
  return <aside className="scorecard-placeholder">
    <div><span>Community Intelligence Scorecards</span><h2>{industry.name} benchmarks are coming next</h2></div>
    <p>Future Scorecards will compare community trust, participation and strategic value across the {industry.name.toLowerCase()} industry.</p>
  </aside>
}

export function ArticleDeskLink({industry,item}:{industry:Industry,item:ContentItem}) {
  return <section className="article-desk-link shell" aria-labelledby={`desk-${item.slug}`}>
    <div>
      <span className="industry-badge">{industry.name} desk</span>
      <h2 id={`desk-${item.slug}`}>Continue exploring {industry.deskName}</h2>
      <p>{industry.description}</p>
    </div>
    <Link className="button" href={`/industries/${industry.slug}`}>Visit the {industry.name} desk</Link>
  </section>
}
