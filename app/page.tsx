import type {Metadata} from 'next'
import Link from 'next/link'
import {ContentCard} from '@/components/cards'
import {FrameworkCard,IndustryCard} from '@/components/publication'
import {Newsletter} from '@/components/newsletter'
import {content,frameworks} from '@/lib/content'
import {industries} from '@/lib/industries'
import {withCoverImages} from '@/lib/covers'

export const metadata:Metadata={
  title:'The Redditrepreneur Research',
  description:'Community Intelligence research covering Gaming, AI, Sport, SaaS, Consumer Brands and Entertainment.',
  alternates:{canonical:'/'},
}

const frameworkDescriptions:Record<string,string>={
  'Community Intelligence Stack':'A practical system for turning community conversations into evidence, insight and action.',
  'Community Intelligence Scorecard':'A consistent way to measure community trust, participation and strategic value.',
  'Customer Insight Triangle':'A model connecting what customers say, what they do and what they believe.',
  'Community Gravity':'Why some communities naturally pull people in and become difficult to leave.',
  'Belief Correction':'How communities change their minds when new evidence becomes impossible to ignore.',
  'Narrative Compression':'How complicated events become one simple story that spreads through a community.',
}

export default async function Home() {
  const illustrated=await withCoverImages(content.slice(0,18))
  const latest=illustrated.slice(0,6)
  const weeklySpotlight=content.find(item=>item.image==='/community-intelligence-weekly-trust.jpg'&&item.title==='Community Intelligence Weekly: Christopher Nolan, AI Advice, Platform Change and Gaming Trust')
  const featured=illustrated.filter(item=>item.featured).slice(0,2)
  const featuredItems=(weeklySpotlight?[weeklySpotlight,...featured]:featured).filter((item,index,items)=>items.findIndex(candidate=>candidate.slug===item.slug)===index).slice(0,2)

  return <>
    <section className="publication-hero shell">
      <div className="publication-kicker">The Redditrepreneur Research</div>
      <h1>We publish Community Intelligence for the world&apos;s most important industries.</h1>
      <p>Understanding what online communities really think and what businesses should do next.</p>
      <div className="actions"><Link className="button" href="/research">Explore the latest research</Link><Link className="publication-secondary" href="/industries">Explore industries</Link></div>
    </section>

    <section className="publication-section industries-section shell" aria-labelledby="industries-heading">
      <header className="publication-section-heading"><div><span>Editorial desks</span><h2 id="industries-heading">Industries We Track</h2></div><Link href="/industries">View all industries</Link></header>
      <div className="industry-grid">{industries.map(industry=><IndustryCard key={industry.slug} industry={industry}/>)}</div>
    </section>

    <section className="publication-section shell" aria-labelledby="frameworks-heading">
      <header className="publication-section-heading"><div><span>Original thinking</span><h2 id="frameworks-heading">Community Intelligence Frameworks</h2></div><Link href="/frameworks">Explore all frameworks</Link></header>
      <div className="publication-framework-grid">{frameworks.slice(0,6).map(name=><FrameworkCard key={name} name={name} description={frameworkDescriptions[name]}/>)}</div>
    </section>

    <section className="publication-section latest-publication shell" aria-labelledby="latest-heading">
      <header className="publication-section-heading"><div><span>New analysis</span><h2 id="latest-heading">Latest Research</h2></div><Link href="/research">View all research</Link></header>
      <div className="card-grid">{latest.map(item=><ContentCard key={item.slug} item={item}/>)}</div>
    </section>

    <section className="publication-section featured-publication" aria-labelledby="featured-heading"><div className="shell">
      <header className="publication-section-heading"><div><span>Editor&apos;s selection</span><h2 id="featured-heading">Featured Research</h2></div></header>
      <div className="featured-publication-grid">{featuredItems.map(item=><ContentCard key={item.slug} item={item} featured/>)}</div>
    </div></section>

    <section className="community-intelligence-explainer" aria-labelledby="community-intelligence-heading"><div className="shell explainer-grid">
      <div><span className="publication-kicker">The discipline</span><h2 id="community-intelligence-heading">What is Community Intelligence?</h2><p>Community Intelligence turns online conversations into practical business insight.</p><Link className="button" href="/frameworks">Explore Frameworks</Link></div>
      <div><p>It helps organisations understand:</p><ul><li>What people believe</li><li>Who they trust</li><li>Why opinions change</li><li>What customers want</li><li>Where risks are emerging</li><li>What action should be taken</li></ul></div>
    </div></section>

    <div className="shell publication-newsletter"><Newsletter/></div>
  </>
}
