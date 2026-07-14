import Image from 'next/image'
import Link from 'next/link'
import type {ContentItem} from '@/lib/content'
import {content} from '@/lib/content'
import {site} from '@/lib/site'
import {prepareImportedHtml} from '@/lib/sanitise'
import {headOfCommunityIntelligenceDraft,headOfCommunityIntelligenceRelated} from '@/lib/drafts/head-of-community-intelligence'
import {bookingComScorecardDraft,bookingComScorecardRelated} from '@/lib/drafts/booking-com-scorecard'
import {redditAiSlopArticle,redditAiSlopRelated} from '@/lib/articles/reddit-ai-slop'
import {Newsletter} from './newsletter'
import {SharePost} from './share-post'

export function ArticlePage({item,embedded=false,bodyHtml,coverImageUrl}:{item:ContentItem,embedded?:boolean,bodyHtml?:string,coverImageUrl?:string}){
  const prepared=bodyHtml?prepareImportedHtml(bodyHtml):null
  const manualRelated:Record<string,string[]>={
    'the-ai-authority-formula':['the-community-intelligence-convergence-of-meta-reddit-and-google','the-community-intelligence-stack-turning-conversations-into-competitive-advantage','google-just-brought-communities-into-ai-search-heres-why-it-matters'],
    [headOfCommunityIntelligenceDraft.slug]:headOfCommunityIntelligenceRelated,
    [bookingComScorecardDraft.slug]:bookingComScorecardRelated,
    [redditAiSlopArticle.slug]:redditAiSlopRelated,
  }
  const related=manualRelated[item.slug]?.map(slug=>content.find(candidate=>candidate.slug===slug)).filter((candidate):candidate is ContentItem=>Boolean(candidate))||content.filter(candidate=>candidate.slug!==item.slug&&(candidate.topic===item.topic||candidate.type===item.type)).slice(0,3)
  const archiveHref:Record<ContentItem['type'],string>={Research:'/research',Scorecard:'/scorecards','Case Study':'/case-studies',Framework:'/frameworks',Benchmark:'/benchmarks',Weekly:'/community-intelligence-weekly',Index:'/community-intelligence-index',Article:'/research'}
  const isAiAuthority=item.slug==='the-ai-authority-formula'
  const isHeadOfCommunityIntelligence=item.slug===headOfCommunityIntelligenceDraft.slug
  const isBookingScorecard=item.slug===bookingComScorecardDraft.slug
  const isRedditAiSlop=item.slug===redditAiSlopArticle.slug
  const tocLimit=isBookingScorecard?20:12

  return <article id="top">
    {!embedded&&<>
      <header className="article-header shell">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={archiveHref[item.type]}>{item.type}</Link></nav>
        <div className="eyebrow">{item.topic||item.type}</div>
        <h1>{item.title}</h1>
        {(item.subtitle||isAiAuthority)&&<p className="article-subtitle">{item.subtitle||'Why AI Recommends Some Brands and Ignores Others'}</p>}
        <p className="dek">{item.excerpt}</p>
        <div className="byline"><Image src="/tonte-bo-douglas.jpg" width={48} height={48} alt="Tonte Bo Douglas"/><span>By <Link href="/authors/tonte-bo-douglas">Tonte Bo Douglas</Link><small>{item.draft?'Proposed':'Published'} <time dateTime={item.date}>{new Intl.DateTimeFormat('en-GB',{dateStyle:'long'}).format(new Date(item.date))}</time> · {item.readingMinutes||8} min read</small></span></div>
      </header>
      {coverImageUrl?<div className="article-image shell"><Image src={coverImageUrl} width={item.imageWidth||1600} height={item.imageHeight||900} sizes="(max-width: 960px) calc(100vw - 28px), 920px" alt={item.imageAlt||item.title} priority/></div>:<div className="article-cover"><div className="eyebrow light">The Redditrepreneur Research</div><strong>{item.title}</strong></div>}
    </>}

    <div className="article-layout shell">
      <aside><strong>On this page</strong>{prepared?.headings.filter(heading=>heading.level===2).slice(0,tocLimit).map(heading=><a href={`#${heading.id}`} key={heading.id}>{heading.label}</a>)}<a className="back-top" href="#top">Back to top</a></aside>
      <div id="article-content" className="prose">
        {prepared?<div className="legacy-content" dangerouslySetInnerHTML={{__html:prepared.html}}/>:<><h2>Overview</h2><p>{item.excerpt}</p><p>This item is awaiting final editorial conversion from the migration source.</p></>}
        {isRedditAiSlop?null:isBookingScorecard?<div className="inline-cta booking-scorecard-cta"><h3>Understand What Your Customers Recommend When You Are Not in the Room</h3><p>The Redditrepreneur helps organisations turn online community conversations into customer insight, competitor intelligence and better strategic decisions.</p><div className="actions"><a className="button" href={site.audit}>Learn About the Community Intelligence Audit</a><a className="text-link" href={site.app}>Explore the Community Intelligence Platform</a></div></div>:isHeadOfCommunityIntelligence?<div className="inline-cta"><h3>Bring Community Intelligence Into the Leadership Team</h3><p>Work with The Redditrepreneur as your external Head of Community Intelligence and turn community conversations into executive insight, competitive advantage and better strategic decisions.</p><div className="actions"><a className="button" href="https://www.theredditrepreneur.com/services/fractional-chief-community-intelligence-officer">Explore the Fractional CCI Officer Engagement</a><a className="text-link" href={site.app}>Explore the Community Intelligence Platform</a></div></div>:isAiAuthority?<div className="inline-cta ai-authority-cta"><h3>Discover What AI Believes About Your Brand</h3><p>The AI Authority Audit analyses AI generated recommendations, community conversations, competitor authority and the evidence shaping how your brand is represented before customers ever visit your website.</p><a className="button" href={site.aiAuthorityAudit}>Explore the AI Authority Audit</a></div>:<div className="inline-cta"><h3>Turn conversations into clarity</h3><p>{item.type==='Scorecard'?'Learn how a focused Community Intelligence Audit can reveal the forces shaping your brand.':'Explore the Community Intelligence platform or commission a focused audit of your brand, competitors and market.'}</p><div className="actions"><a className="button" href={item.type==='Scorecard'?site.audit:site.app}>{item.type==='Scorecard'?'Learn About a Community Intelligence Audit':'Explore the Community Intelligence Platform'}</a><a className="text-link" href={item.type==='Scorecard'?'/the-redditrepreneur-community-intelligence-scorecard':site.audit}>{item.type==='Scorecard'?'Read the methodology':'Learn About the Audit'}</a></div></div>}
      </div>
    </div>

    {related.length>0&&<section className="related-content shell" aria-labelledby={`related-${item.slug}`}><div className="eyebrow">Continue exploring</div><h2 id={`related-${item.slug}`}>Related Community Intelligence research</h2><div className="related-grid">{related.map(candidate=><article key={candidate.slug}><div className="eyebrow">{candidate.type}</div><h3><Link href={`/${candidate.slug}`}>{candidate.title}</Link></h3><p>{candidate.excerpt}</p></article>)}</div></section>}
    <div className="shell share-shell"><SharePost title={item.title} url={`${site.url}/${item.slug}/`}/></div>
    <section id="about-author" className="author-box shell"><Image src="/tonte-bo-douglas.jpg" width={150} height={150} alt="Tonte Bo Douglas"/><div><div className="eyebrow">About the author</div><h2>Tonte Bo Douglas</h2><p>Founder of The Redditrepreneur and a Community Intelligence researcher and strategist studying how online communities shape trust, discovery, brands and markets.</p><Link href="/authors/tonte-bo-douglas">View Tonte&rsquo;s latest work</Link></div></section>
    <div className="shell"><Newsletter/></div>
  </article>
}
