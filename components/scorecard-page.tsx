import Image from 'next/image'
import Link from 'next/link'
import type {ContentItem} from '@/lib/content'
import {deriveScorecard,formatCriterionScore,scorecardCriteria,scorecardPillars,type ScorecardPillar} from '@/lib/community-intelligence-scorecard'
import {ArticlePage} from './article-page'

export function ScorecardPage({item,bodyHtml,coverImageUrl}:{item:ContentItem,bodyHtml?:string,coverImageUrl?:string}){
  const scorecard=item.scorecard?deriveScorecard(item.scorecard):null

  return <>
    <section className="scorecard-hero">
      <div className="shell">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/scorecards">Scorecards</Link></nav>
        <div className="eyebrow light">Community Intelligence Scorecard</div>
        <h1>{item.title}</h1>
        <p>{item.excerpt}</p>
        <div className="byline">
          <Image src="/tonte-bo-douglas.jpg" width={48} height={48} alt="Tonte Bo Douglas"/>
          <span>By <Link href="/authors/tonte-bo-douglas">Tonte Bo Douglas</Link><small>{item.draft?'Proposed':'Published'} <time dateTime={item.date}>{new Intl.DateTimeFormat('en-GB',{dateStyle:'long'}).format(new Date(item.date))}</time> | {item.readingMinutes||8} min read</small></span>
        </div>
        <div className="score-status"><strong>Editorial assessment</strong><span>This is an editorial Community Intelligence assessment produced by The Redditrepreneur. It is not an automated live SaaS score.</span></div>
      </div>
    </section>
    {coverImageUrl&&<div className="article-image shell"><Image src={coverImageUrl} width={item.imageWidth||1600} height={item.imageHeight||900} sizes="(max-width: 960px) calc(100vw - 28px), 920px" alt={item.imageAlt||item.title} priority/></div>}
    {scorecard&&<>
      <section className="scorecard-summary shell" aria-labelledby="scorecard-summary-title">
        <div className="score-total" aria-label={`${scorecard.brandName} overall Community Intelligence Score ${scorecard.overallScore} out of 100, rating ${scorecard.rating}`}>
          <span>Overall Community Intelligence Score</span>
          <strong>{scorecard.overallScore}<small>/100</small></strong>
        </div>
        <div className="scorecard-summary-copy">
          <div className="eyebrow">Scorecard summary</div>
          <h2 id="scorecard-summary-title">{scorecard.brandName}</h2>
          <dl><div><dt>Overall rating</dt><dd>{scorecard.rating}</dd></div><div><dt>Methodology</dt><dd>Nine criteria across three pillars</dd></div></dl>
          <p><strong>Key insight:</strong> {scorecard.keyInsight}</p>
          <p><strong>Primary strength:</strong> {scorecard.primaryStrength}</p>
          <p><strong>Primary risk:</strong> {scorecard.primaryRisk}</p>
        </div>
      </section>
      <section className="section shell scorecard-assessment" aria-labelledby="scorecard-criteria-title">
        <div className="section-heading"><div><div className="eyebrow">Structured assessment</div><h2 id="scorecard-criteria-title">Nine Community Intelligence criteria</h2></div></div>
        <div className="scorecard-pillars">{scorecard.pillars.map(pillar=><section className="scorecard-pillar" key={pillar.id} aria-labelledby={`pillar-${pillar.id}`}>
          <header><div><span>Pillar {scorecardPillars[pillar.id].order}</span><h3 id={`pillar-${pillar.id}`}>{pillar.name}</h3></div><strong aria-label={`${pillar.name} pillar score ${pillar.score} out of 100`}>{pillar.score}<small>/100</small></strong></header>
          <p>{pillar.description}</p>
          <div className="pillar-criteria">{pillar.criteria.map(criterion=>{
            const score=scorecard.criteria[criterion.id]
            return <article key={criterion.id}>
              <div><h4>{criterion.name}</h4><strong>{formatCriterionScore(score)}<small>/10</small></strong></div>
              <meter min="0" max="10" value={score} aria-label={`${criterion.name} score: ${formatCriterionScore(score)} out of 10`}/>
              <p>{scorecard.analysis?.[criterion.id]||criterion.description}</p>
            </article>
          })}</div>
        </section>)}</div>
        <div className="methodology-callout"><h2>How the Scorecard works</h2><p>Each criterion is scored out of 10. The nine scores create a maximum raw total of 90, which is normalised into an overall score out of 100. Pillar scores improve readability but are not counted separately.</p><p>The score is an evidence led analytical assessment and should be read alongside the written report.</p><Link className="text-link" href="/the-redditrepreneur-community-intelligence-scorecard">Read the full Scorecard methodology</Link></div>
      </section>
    </>}
    {!scorecard&&<section className="section shell"><div className="methodology-callout"><h2>Scorecard data unavailable</h2><p>This historical report requires editorial review before it can be represented using the current nine criterion methodology.</p><Link className="text-link" href="/the-redditrepreneur-community-intelligence-scorecard">Read the full Scorecard methodology</Link></div></section>}
    <ArticlePage item={item} embedded bodyHtml={bodyHtml} coverImageUrl={coverImageUrl}/>
  </>
}

export const scorecardCriterionCount=scorecardCriteria.length
export const scorecardPillarIds=Object.keys(scorecardPillars) as ScorecardPillar[]
