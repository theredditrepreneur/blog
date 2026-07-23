import type {Metadata} from 'next'
import Link from 'next/link'
import {scorecardCriteria,scorecardPillars,scorecardRatingBands,type ScorecardPillar} from '@/lib/community-intelligence-scorecard'

const slug='the-redditrepreneur-community-intelligence-scorecard'
export const metadata:Metadata={
  title:'The Redditrepreneur Community Intelligence Scorecard Methodology',
  description:'How The Redditrepreneur assesses nine Community Intelligence criteria across Perception, Participation and Strategic Value.',
  alternates:{canonical:`/${slug}`},
}

export default function Page(){
  const pillars=(Object.keys(scorecardPillars) as ScorecardPillar[]).sort((a,b)=>scorecardPillars[a].order-scorecardPillars[b].order)
  return <main>
    <header className="framework-hero shell">
      <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/scorecards">Scorecards</Link> / Methodology</nav>
      <div className="eyebrow">Current methodology</div>
      <h1>The Community Intelligence Scorecard</h1>
      <blockquote>The Community Intelligence Scorecard is a structured framework for measuring how a brand is understood, experienced and discussed across public online communities.</blockquote>
      <p>It goes beyond general sentiment by examining nine distinct dimensions of the relationship between a brand and the communities around it.</p>
    </header>
    <section className="section shell methodology-page">
      <div className="methodology-callout"><h2>Scoring formula</h2><p>Each criterion is scored from 0 to 10. The nine scores create a maximum raw total of 90.</p><p><strong>Overall score = round((sum of nine criterion scores ÷ 90) × 100)</strong></p><p>Pillar scores are calculated from their three criteria and shown for readability. They are not counted a second time.</p></div>
      <div className="scorecard-pillars">{pillars.map(id=><section className="scorecard-pillar" key={id}>
        <header><div><span>Pillar {scorecardPillars[id].order}</span><h2>{scorecardPillars[id].name}</h2></div></header>
        <p>{scorecardPillars[id].description}</p>
        <div className="pillar-criteria">{scorecardCriteria.filter(item=>item.pillar===id).map(item=><article key={item.id}><div><h3>{item.name}</h3><strong>0–10</strong></div><p>{item.description}</p></article>)}</div>
      </section>)}</div>
      <section className="rating-method" aria-labelledby="ratings-heading"><div className="section-heading"><div><div className="eyebrow">Interpretation</div><h2 id="ratings-heading">Overall rating bands</h2></div></div><div className="rating-band-grid">{scorecardRatingBands.map(band=><div key={band.label}><strong>{band.minimum}–{band.maximum}</strong><span>{band.label}</span></div>)}</div></section>
      <section className="methodology-callout"><h2>Editorial methodology note</h2><p>Community Intelligence Scorecards are based on publicly available community conversations, customer reviews, forum discussions, social content, public brand signals and relevant editorial evidence. The score represents an evidence led assessment at a particular point in time and may change as community narratives evolve.</p><p>The score is an analytical assessment rather than an official company rating and should be read alongside the written report, not in isolation.</p></section>
    </section>
  </main>
}
