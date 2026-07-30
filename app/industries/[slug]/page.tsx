import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import {ContentCard} from '@/components/cards'
import {FrameworkCard,ScorecardPlaceholder} from '@/components/publication'
import {content} from '@/lib/content'
import {getIndustryBySlug,getIndustryContent,getPopularTopics,industries} from '@/lib/industries'
import {withCoverImages} from '@/lib/covers'

export function generateStaticParams(){return industries.map(industry=>({slug:industry.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params
  const industry=getIndustryBySlug(slug)
  if(!industry)return {}
  return {title:industry.deskName,description:industry.longDescription,alternates:{canonical:`/industries/${industry.slug}`},openGraph:{title:industry.deskName,description:industry.longDescription}}
}

export default async function IndustryDeskPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const industry=getIndustryBySlug(slug)
  if(!industry)notFound()
  const industryItems=getIndustryContent(content,industry)
  const illustrated=await withCoverImages(industryItems)
  const featured=illustrated.filter(item=>item.featured).slice(0,2)
  const featuredItems=featured.length?featured:illustrated.slice(0,2)
  const latest=illustrated.slice(0,6)
  const recent=illustrated.slice(6,12)
  const topics=getPopularTopics(industryItems)

  return <>
    <header className="industry-desk-hero"><div className="shell">
      <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link></nav>
      <span className="publication-kicker">The {industry.name} desk</span>
      <h1>{industry.deskName}</h1>
      <p>{industry.longDescription}</p>
      <div className="desk-stat"><strong>{industryItems.length}</strong><span>published pieces and counting</span></div>
    </div></header>

    <section className="publication-section shell" aria-labelledby="latest-industry"><header className="publication-section-heading"><div><span>Latest articles</span><h2 id="latest-industry">Latest {industry.name} research</h2></div></header><div className="card-grid">{latest.map(item=><ContentCard key={item.slug} item={item}/>)}</div></section>

    {featuredItems.length>0&&<section className="publication-section featured-publication" aria-labelledby="featured-industry"><div className="shell"><header className="publication-section-heading"><div><span>Essential reading</span><h2 id="featured-industry">Featured research</h2></div></header><div className="featured-publication-grid">{featuredItems.map(item=><ContentCard key={item.slug} item={item} featured/>)}</div></div></section>}

    <section className="publication-section shell" aria-labelledby="industry-frameworks"><header className="publication-section-heading"><div><span>Ways to understand the conversation</span><h2 id="industry-frameworks">Related frameworks</h2></div><Link href="/frameworks">All frameworks</Link></header><div className="publication-framework-grid">{industry.frameworks.map(name=><FrameworkCard key={name} name={name}/>)}</div></section>

    <section className="desk-topics shell" aria-labelledby="popular-topics"><div><span className="publication-kicker">Coverage</span><h2 id="popular-topics">Popular topics</h2></div><div>{topics.map(topic=><Link href={`/search?q=${encodeURIComponent(topic)}`} key={topic}>{topic}</Link>)}</div></section>

    {recent.length>0&&<section className="publication-section shell" aria-labelledby="recent-analysis"><header className="publication-section-heading"><div><span>From the archive</span><h2 id="recent-analysis">Recent analysis</h2></div></header><div className="card-grid">{recent.map(item=><ContentCard key={item.slug} item={item}/>)}</div></section>}

    <section className="publication-section shell"><ScorecardPlaceholder industry={industry}/></section>

    <section className="industry-description"><div className="shell"><span className="publication-kicker">Why this desk exists</span><h2>Understanding the people shaping {industry.name.toLowerCase()}</h2><p>{industry.longDescription}</p><p>We study the conversations, trusted voices and changing beliefs that ordinary business data cannot fully explain.</p></div></section>
  </>
}
