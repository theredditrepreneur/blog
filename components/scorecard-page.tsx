import Image from 'next/image'
import Link from 'next/link'
import type {ContentItem} from '@/lib/content'
import {ArticlePage} from './article-page'

const dimensions=[
  ['Community Presence','How visible, relevant and meaningfully represented the brand is within the communities that shape its market.'],
  ['Community Trust','The confidence communities place in the brand, its behaviour and the claims made on its behalf.'],
  ['Share of Consensus','How consistently the brand appears within trusted recommendations and repeated community agreement.'],
  ['Insight Responsiveness','How effectively the brand recognises, interprets and responds to meaningful community insight.'],
  ['Community Authority','The degree of credibility and influence the brand holds within relevant community conversations.'],
] as const

export function ScorecardPage({item,bodyHtml,coverImageUrl}:{item:ContentItem,bodyHtml?:string,coverImageUrl?:string}){
  const scorecard=item.scorecard
  const displayedDimensions=scorecard?.dimensions||dimensions.map(([name,interpretation])=>({name,interpretation,score:undefined}))

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
    {coverImageUrl&&<div className="article-image shell"><Image src={coverImageUrl} width={1600} height={900} sizes="(max-width: 960px) calc(100vw - 28px), 920px" alt={item.imageAlt||item.title} priority/></div>}
    {scorecard&&<section className="scorecard-summary shell" aria-labelledby="scorecard-summary-title">
      <div className="score-total" aria-label={`${scorecard.brandName} overall Community Intelligence Score ${scorecard.overallScore} out of 100, grade ${scorecard.grade}`}>
        <span>Overall Community Intelligence Score</span>
        <strong>{scorecard.overallScore}<small>/100</small></strong>
      </div>
      <div className="scorecard-summary-copy">
        <div className="eyebrow">Scorecard summary</div>
        <h2 id="scorecard-summary-title">{scorecard.brandName}</h2>
        <dl><div><dt>Grade</dt><dd>{scorecard.grade}</dd></div><div><dt>Tier</dt><dd>{scorecard.tier}</dd></div></dl>
        <p><strong>Key insight:</strong> {scorecard.keyInsight}</p>
        <p><strong>Primary strength:</strong> {scorecard.primaryStrength}</p>
        <p><strong>Primary risk:</strong> {scorecard.primaryRisk}</p>
      </div>
    </section>}
    <section className="section shell">
      <div className="section-heading"><div><div className="eyebrow">Structured assessment</div><h2>Five dimensions of Community Intelligence</h2></div></div>
      <div className="dimension-grid">{displayedDimensions.map(({name,interpretation,score},i)=><article key={name}><span>0{i+1}{score!==undefined?` | ${score}/100`:''}</span><h3>{name}</h3><p>{interpretation}</p></article>)}</div>
      {!scorecard&&<div className="methodology-callout"><h2>How This Score Was Calculated</h2><p>The report explains the research approach, evidence considered, research period, limitations and confidence available when the assessment was published.</p><Link className="text-link" href="/the-redditrepreneur-community-intelligence-scorecard">Read the full Scorecard methodology</Link></div>}
    </section>
    <ArticlePage item={item} embedded bodyHtml={bodyHtml} coverImageUrl={coverImageUrl}/>
  </>
}
