import Image from 'next/image'
import Link from 'next/link'
import type {ContentItem} from '@/lib/content'
import {content} from '@/lib/content'
import {site} from '@/lib/site'
import {prepareImportedHtml} from '@/lib/sanitise'
import {headOfCommunityIntelligenceDraft,headOfCommunityIntelligenceRelated} from '@/lib/drafts/head-of-community-intelligence'
import {bookingComScorecardDraft,bookingComScorecardRelated} from '@/lib/drafts/booking-com-scorecard'
import {redditAiSlopArticle,redditAiSlopRelated} from '@/lib/articles/reddit-ai-slop'
import {aiEvidenceLayerArticle,aiEvidenceLayerRelated} from '@/lib/articles/ai-evidence-layer'
import {franceSpainFrameworkDraft,franceSpainFrameworkRelated} from '@/lib/drafts/france-spain-framework'
import {englandCommunityCourtroomDraft,englandCommunityCourtroomRelated} from '@/lib/drafts/england-community-courtroom'
import {communityIntelligenceWeeklyPlatformLiveDraft,communityIntelligenceWeeklyPlatformLiveRelated} from '@/lib/drafts/community-intelligence-weekly-platform-live'
import {bbcRadioCommunityDraft,bbcRadioCommunityRelated} from '@/lib/drafts/bbc-radio-community'
import {nikeCommunityScorecardDraft,nikeCommunityScorecardRelated} from '@/lib/drafts/nike-community-scorecard'
import {communityIntelligenceEarlyWarningArticle,communityIntelligenceEarlyWarningRelated} from '@/lib/articles/community-intelligence-early-warning-system'
import {hubspotRedditPerformanceArticle,hubspotRedditPerformanceRelated} from '@/lib/articles/hubspot-reddit-performance-marketing'
import {restIsFootballCommunitySuccessArticle,restIsFootballCommunitySuccessRelated} from '@/lib/articles/rest-is-football-community-success'
import {xMen97Season2Article,xMen97Season2Related} from '@/lib/articles/x-men-97-season-2-community-intelligence'
import {squarespacePriceIncreaseArticle,squarespacePriceIncreaseRelated} from '@/lib/articles/squarespace-price-increase-community-intelligence'
import {hubspotCommunityGovernanceArticle,hubspotCommunityGovernanceRelated} from '@/lib/articles/hubspot-community-governance-product-decision'
import {worldCupCommercialisationArticle,worldCupCommercialisationRelated} from '@/lib/articles/world-cup-commercialisation'
import {facebookTikTokArticle,facebookTikTokRelated} from '@/lib/articles/facebook-becoming-more-like-tiktok'
import {metaGlassesOwnershipArticle,metaGlassesOwnershipRelated} from '@/lib/articles/meta-glasses-monthly-charge-ownership'
import {amazonPrimeVideoGamesArticle,amazonPrimeVideoGamesRelated} from '@/lib/articles/amazon-games-inside-prime-video'
import {xboxGamePassArticle,xboxGamePassRelated} from '@/lib/articles/xbox-game-pass-more-for-less'
import {openAiAgentOversightArticle,openAiAgentOversightRelated} from '@/lib/articles/openai-agent-hugging-face-community-oversight'
import {youtubeAiThumbnailArticle,youtubeAiThumbnailRelated} from '@/lib/articles/youtube-ai-thumbnail-community-intelligence'
import {patreonPlatformChangeArticle,patreonPlatformChangeRelated} from '@/lib/articles/patreon-platform-change'
import {tripComAiTravelAgentArticle,tripComAiTravelAgentRelated} from '@/lib/articles/trip-com-ai-travel-agent'
import {adobeAiPhotoCritiqueArticle,adobeAiPhotoCritiqueRelated} from '@/lib/articles/adobe-ai-photo-critique'
import {christopherNolanOdysseyArticle,christopherNolanOdysseyRelated} from '@/lib/articles/christopher-nolan-odyssey-trust-conversation'
import {saudiEaCommunityTrustArticle,saudiEaCommunityTrustRelated} from '@/lib/articles/saudi-arabia-buying-ea-community-trust'
import {communityIntelligenceWeeklyTrustArticle,communityIntelligenceWeeklyTrustRelated} from '@/lib/articles/community-intelligence-weekly-trust'
import {playstationBlackoutArticle,playstationBlackoutRelated} from '@/lib/articles/playstation-fans-planning-blackout'
import {metaSmartGlassesBystanderTrustArticle,metaSmartGlassesBystanderTrustRelated} from '@/lib/articles/meta-smart-glasses-bystander-trust-problem'
import {fanaticsSportsSuperAppArticle,fanaticsSportsSuperAppRelated} from '@/lib/articles/fanatics-building-the-sports-super-app'
import {haloPlaystationCommunityIntelligenceArticle,haloPlaystationCommunityIntelligenceRelated} from '@/lib/articles/halo-playstation-community-intelligence'
import {londonRobotaxiCommunityTrustArticle,londonRobotaxiCommunityTrustRelated} from '@/lib/articles/london-robotaxi-race-community-trust'
import {xMoneySocialReputationArticle,xMoneySocialReputationRelated} from '@/lib/articles/x-money-social-reputation-financial-trust'
import {appleLeasingOwnershipArticle,appleLeasingOwnershipRelated} from '@/lib/articles/apple-leasing-future-of-ownership'
import {redditGoogleKnowledgeStructureArticle,redditGoogleKnowledgeStructureRelated} from '@/lib/articles/reddit-google-community-knowledge-structure'
import {robloxAiGameCreationDiscoveryArticle,robloxAiGameCreationDiscoveryRelated} from '@/lib/articles/roblox-ai-game-creation-discovery'
import {cyeraInvisibleAiWorkforceArticle,cyeraInvisibleAiWorkforceRelated} from '@/lib/articles/cyera-invisible-ai-workforce'
import {netflixBritainDefaultTvChannelArticle,netflixBritainDefaultTvChannelRelated} from '@/lib/articles/netflix-britain-default-tv-channel'
import {xboxGameDiscInternetPermissionArticle,xboxGameDiscInternetPermissionRelated} from '@/lib/articles/xbox-game-disc-needs-internet-permission'
import {gtaViGamingEcosystemArticle,gtaViGamingEcosystemRelated} from '@/lib/articles/gta-vi-selling-the-entire-gaming-ecosystem'
import {davidOrnsteinCommunityTrustArticle,davidOrnsteinCommunityTrustRelated} from '@/lib/articles/every-community-has-its-own-david-ornstein'
import {fortniteAiCharactersCommunityArticle,fortniteAiCharactersCommunityRelated} from '@/lib/articles/fortnite-ai-characters-community-members'
import {Newsletter} from './newsletter'
import {SharePost} from './share-post'
import {ArticleDeskLink,FrameworkCard} from './publication'
import {getIndustry} from '@/lib/industries'

export function ArticlePage({item,embedded=false,bodyHtml,coverImageUrl}:{item:ContentItem,embedded?:boolean,bodyHtml?:string,coverImageUrl?:string}){
  const prepared=bodyHtml?prepareImportedHtml(bodyHtml):null
  const manualRelated:Record<string,string[]>={
    'the-ai-authority-formula':['the-community-intelligence-convergence-of-meta-reddit-and-google','the-community-intelligence-stack-turning-conversations-into-competitive-advantage','google-just-brought-communities-into-ai-search-heres-why-it-matters'],
    [headOfCommunityIntelligenceDraft.slug]:headOfCommunityIntelligenceRelated,
    [bookingComScorecardDraft.slug]:bookingComScorecardRelated,
    [redditAiSlopArticle.slug]:redditAiSlopRelated,
    [aiEvidenceLayerArticle.slug]:aiEvidenceLayerRelated,
    [franceSpainFrameworkDraft.slug]:franceSpainFrameworkRelated,
    [englandCommunityCourtroomDraft.slug]:englandCommunityCourtroomRelated,
    [communityIntelligenceWeeklyPlatformLiveDraft.slug]:communityIntelligenceWeeklyPlatformLiveRelated,
    [bbcRadioCommunityDraft.slug]:bbcRadioCommunityRelated,
    [nikeCommunityScorecardDraft.slug]:nikeCommunityScorecardRelated,
    [communityIntelligenceEarlyWarningArticle.slug]:communityIntelligenceEarlyWarningRelated,
    [hubspotRedditPerformanceArticle.slug]:hubspotRedditPerformanceRelated,
    [restIsFootballCommunitySuccessArticle.slug]:restIsFootballCommunitySuccessRelated,
    [xMen97Season2Article.slug]:xMen97Season2Related,
    [squarespacePriceIncreaseArticle.slug]:squarespacePriceIncreaseRelated,
    [hubspotCommunityGovernanceArticle.slug]:hubspotCommunityGovernanceRelated,
    [worldCupCommercialisationArticle.slug]:worldCupCommercialisationRelated,
    [facebookTikTokArticle.slug]:facebookTikTokRelated,
    [metaGlassesOwnershipArticle.slug]:metaGlassesOwnershipRelated,
    [amazonPrimeVideoGamesArticle.slug]:amazonPrimeVideoGamesRelated,
    [xboxGamePassArticle.slug]:xboxGamePassRelated,
    [openAiAgentOversightArticle.slug]:openAiAgentOversightRelated,
    [youtubeAiThumbnailArticle.slug]:youtubeAiThumbnailRelated,
    [patreonPlatformChangeArticle.slug]:patreonPlatformChangeRelated,
    [tripComAiTravelAgentArticle.slug]:tripComAiTravelAgentRelated,
    [adobeAiPhotoCritiqueArticle.slug]:adobeAiPhotoCritiqueRelated,
    [christopherNolanOdysseyArticle.slug]:christopherNolanOdysseyRelated,
    [saudiEaCommunityTrustArticle.slug]:saudiEaCommunityTrustRelated,
    [communityIntelligenceWeeklyTrustArticle.slug]:communityIntelligenceWeeklyTrustRelated,
    [playstationBlackoutArticle.slug]:playstationBlackoutRelated,
    [metaSmartGlassesBystanderTrustArticle.slug]:metaSmartGlassesBystanderTrustRelated,
    [fanaticsSportsSuperAppArticle.slug]:fanaticsSportsSuperAppRelated,
    [haloPlaystationCommunityIntelligenceArticle.slug]:haloPlaystationCommunityIntelligenceRelated,
    [londonRobotaxiCommunityTrustArticle.slug]:londonRobotaxiCommunityTrustRelated,
    [xMoneySocialReputationArticle.slug]:xMoneySocialReputationRelated,
    [appleLeasingOwnershipArticle.slug]:appleLeasingOwnershipRelated,
    [redditGoogleKnowledgeStructureArticle.slug]:redditGoogleKnowledgeStructureRelated,
    [robloxAiGameCreationDiscoveryArticle.slug]:robloxAiGameCreationDiscoveryRelated,
    [cyeraInvisibleAiWorkforceArticle.slug]:cyeraInvisibleAiWorkforceRelated,
    [netflixBritainDefaultTvChannelArticle.slug]:netflixBritainDefaultTvChannelRelated,
    [xboxGameDiscInternetPermissionArticle.slug]:xboxGameDiscInternetPermissionRelated,
    [gtaViGamingEcosystemArticle.slug]:gtaViGamingEcosystemRelated,
    [davidOrnsteinCommunityTrustArticle.slug]:davidOrnsteinCommunityTrustRelated,
    [fortniteAiCharactersCommunityArticle.slug]:fortniteAiCharactersCommunityRelated,
  }
  const itemIndustry=getIndustry(item)
  const related=manualRelated[item.slug]?.map(slug=>content.find(candidate=>candidate.slug===slug)).filter((candidate):candidate is ContentItem=>Boolean(candidate))||content.filter(candidate=>candidate.slug!==item.slug&&getIndustry(candidate).slug===itemIndustry.slug).slice(0,3)
  const archiveHref:Record<ContentItem['type'],string>={Research:'/research',Scorecard:'/scorecards','Case Study':'/case-studies',Framework:'/frameworks',Benchmark:'/benchmarks',Weekly:'/community-intelligence-weekly',Index:'/community-intelligence-index',Article:'/research'}
  const isAiAuthority=item.slug==='the-ai-authority-formula'
  const isHeadOfCommunityIntelligence=item.slug===headOfCommunityIntelligenceDraft.slug
  const isBookingScorecard=item.slug===bookingComScorecardDraft.slug
  const isNikeScorecard=item.slug===nikeCommunityScorecardDraft.slug
  const isEarlyWarning=item.slug===communityIntelligenceEarlyWarningArticle.slug
  const isRedditAiSlop=item.slug===redditAiSlopArticle.slug||item.slug===aiEvidenceLayerArticle.slug||item.slug===franceSpainFrameworkDraft.slug||item.slug===englandCommunityCourtroomDraft.slug||item.slug===communityIntelligenceWeeklyPlatformLiveDraft.slug||item.slug===bbcRadioCommunityDraft.slug||item.slug===hubspotRedditPerformanceArticle.slug||item.slug===restIsFootballCommunitySuccessArticle.slug||item.slug===xMen97Season2Article.slug||item.slug===squarespacePriceIncreaseArticle.slug||item.slug===hubspotCommunityGovernanceArticle.slug||item.slug===worldCupCommercialisationArticle.slug||item.slug===facebookTikTokArticle.slug||item.slug===metaGlassesOwnershipArticle.slug||item.slug===amazonPrimeVideoGamesArticle.slug||item.slug===xboxGamePassArticle.slug||item.slug===openAiAgentOversightArticle.slug||item.slug===youtubeAiThumbnailArticle.slug||item.slug===patreonPlatformChangeArticle.slug||item.slug===tripComAiTravelAgentArticle.slug||item.slug===adobeAiPhotoCritiqueArticle.slug||item.slug===christopherNolanOdysseyArticle.slug||item.slug===saudiEaCommunityTrustArticle.slug||item.slug===communityIntelligenceWeeklyTrustArticle.slug||item.slug===playstationBlackoutArticle.slug||item.slug===metaSmartGlassesBystanderTrustArticle.slug||item.slug===fanaticsSportsSuperAppArticle.slug||item.slug===haloPlaystationCommunityIntelligenceArticle.slug||item.slug===londonRobotaxiCommunityTrustArticle.slug||item.slug===xMoneySocialReputationArticle.slug||item.slug===appleLeasingOwnershipArticle.slug||item.slug===redditGoogleKnowledgeStructureArticle.slug||item.slug===robloxAiGameCreationDiscoveryArticle.slug||item.slug===cyeraInvisibleAiWorkforceArticle.slug||item.slug===netflixBritainDefaultTvChannelArticle.slug||item.slug===xboxGameDiscInternetPermissionArticle.slug||item.slug===gtaViGamingEcosystemArticle.slug||item.slug===davidOrnsteinCommunityTrustArticle.slug||item.slug===fortniteAiCharactersCommunityArticle.slug||isNikeScorecard||isEarlyWarning
  const tocLimit=isBookingScorecard||isNikeScorecard?24:12
  const publicationIndex=content.findIndex(candidate=>candidate.slug===item.slug)
  const newerArticle=publicationIndex>0?content[publicationIndex-1]:undefined
  const olderArticle=publicationIndex>=0&&publicationIndex<content.length-1?content[publicationIndex+1]:undefined
  const industry=itemIndustry

  return <article id="top">
    {!embedded&&<>
      <header className="article-header shell">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/industries/${industry.slug}`}>{industry.name}</Link><span>/</span><Link href={archiveHref[item.type]}>{item.type}</Link></nav>
        <div className="article-taxonomy"><Link className="industry-badge" href={`/industries/${industry.slug}`}>{industry.name}</Link><span>{item.topic||item.type}</span></div>
        <h1>{item.title}</h1>
        {(item.subtitle||isAiAuthority)&&<p className="article-subtitle">{item.subtitle||'Why AI Recommends Some Brands and Ignores Others'}</p>}
        {item.slug!==christopherNolanOdysseyArticle.slug&&item.slug!==communityIntelligenceWeeklyTrustArticle.slug&&item.slug!==appleLeasingOwnershipArticle.slug&&item.slug!==redditGoogleKnowledgeStructureArticle.slug&&item.slug!==robloxAiGameCreationDiscoveryArticle.slug&&item.slug!==cyeraInvisibleAiWorkforceArticle.slug&&item.slug!==netflixBritainDefaultTvChannelArticle.slug&&item.slug!==xboxGameDiscInternetPermissionArticle.slug&&item.slug!==gtaViGamingEcosystemArticle.slug&&item.slug!==davidOrnsteinCommunityTrustArticle.slug&&item.slug!==fortniteAiCharactersCommunityArticle.slug&&<p className="dek">{item.excerpt}</p>}
        <div className="byline"><Image src="/tonte-bo-douglas.jpg" width={48} height={48} alt="Tonte Bo Douglas"/><span>By <Link href="/authors/tonte-bo-douglas">Tonte Bo Douglas</Link><small>{item.draft?'Proposed':'Published'} <time dateTime={item.date}>{new Intl.DateTimeFormat('en-GB',{dateStyle:'long'}).format(new Date(item.date))}</time> · {item.readingMinutes||8} min read</small></span></div>
      </header>
      {coverImageUrl?<div className={`article-image shell${item.slug===metaSmartGlassesBystanderTrustArticle.slug||item.slug===fanaticsSportsSuperAppArticle.slug||item.slug===haloPlaystationCommunityIntelligenceArticle.slug||item.slug===londonRobotaxiCommunityTrustArticle.slug||item.slug===xMoneySocialReputationArticle.slug||item.slug===appleLeasingOwnershipArticle.slug||item.slug===redditGoogleKnowledgeStructureArticle.slug||item.slug===robloxAiGameCreationDiscoveryArticle.slug||item.slug===cyeraInvisibleAiWorkforceArticle.slug||item.slug===netflixBritainDefaultTvChannelArticle.slug||item.slug===xboxGameDiscInternetPermissionArticle.slug||item.slug===gtaViGamingEcosystemArticle.slug||item.slug===davidOrnsteinCommunityTrustArticle.slug||item.slug===fortniteAiCharactersCommunityArticle.slug?" article-image-16x9":""}`}><Image src={coverImageUrl} width={item.imageWidth||1600} height={item.imageHeight||900} sizes="(max-width: 960px) calc(100vw - 28px), 920px" alt={item.imageAlt||item.title} priority/></div>:<div className="article-cover"><div className="eyebrow light">The Redditrepreneur Research</div><strong>{item.title}</strong></div>}
    </>}

    <div className="article-layout shell">
      <aside><strong>On this page</strong>{prepared?.headings.filter(heading=>heading.level===2).slice(0,tocLimit).map(heading=><a href={`#${heading.id}`} key={heading.id}>{heading.label}</a>)}<a className="back-top" href="#top">Back to top</a></aside>
      <div id="article-content" className="prose">
        {prepared?<div className="legacy-content" dangerouslySetInnerHTML={{__html:prepared.html}}/>:<><h2>Overview</h2><p>{item.excerpt}</p><p>This item is awaiting final editorial conversion from the migration source.</p></>}
        {isRedditAiSlop?null:isBookingScorecard?<div className="inline-cta booking-scorecard-cta"><h3>Understand What Your Customers Recommend When You Are Not in the Room</h3><p>The Redditrepreneur helps organisations turn online community conversations into customer insight, competitor intelligence and better strategic decisions.</p><div className="actions"><a className="button" href={site.audit}>Learn About the Community Intelligence Audit</a><a className="text-link" href={site.app}>Explore the Community Intelligence Platform</a></div></div>:isHeadOfCommunityIntelligence?<div className="inline-cta"><h3>Bring Community Intelligence Into the Leadership Team</h3><p>Work with The Redditrepreneur as your external Head of Community Intelligence and turn community conversations into executive insight, competitive advantage and better strategic decisions.</p><div className="actions"><a className="button" href="https://www.theredditrepreneur.com/services/fractional-chief-community-intelligence-officer">Explore the Fractional CCI Officer Engagement</a><a className="text-link" href={site.app}>Explore the Community Intelligence Platform</a></div></div>:isAiAuthority?<div className="inline-cta ai-authority-cta"><h3>Discover What AI Believes About Your Brand</h3><p>The AI Authority Audit analyses AI generated recommendations, community conversations, competitor authority and the evidence shaping how your brand is represented before customers ever visit your website.</p><a className="button" href={site.aiAuthorityAudit}>Explore the AI Authority Audit</a></div>:<div className="inline-cta"><h3>Turn conversations into clarity</h3><p>{item.type==='Scorecard'?'Learn how a focused Community Intelligence Audit can reveal the forces shaping your brand.':'Explore the Community Intelligence platform or commission a focused audit of your brand, competitors and market.'}</p><div className="actions"><a className="button" href={item.type==='Scorecard'?site.audit:site.app}>{item.type==='Scorecard'?'Learn About a Community Intelligence Audit':'Explore the Community Intelligence Platform'}</a><a className="text-link" href={item.type==='Scorecard'?'/the-redditrepreneur-community-intelligence-scorecard':site.audit}>{item.type==='Scorecard'?'Read the methodology':'Learn About the Audit'}</a></div></div>}
      </div>
    </div>

    <section className="related-frameworks shell" aria-labelledby={`frameworks-${item.slug}`}><div className="eyebrow">Ideas used in this analysis</div><h2 id={`frameworks-${item.slug}`}>Related frameworks</h2><div className="publication-framework-grid">{industry.frameworks.slice(0,3).map(name=><FrameworkCard name={name} key={name}/>)}</div></section>
    {related.length>0&&<section className="related-content shell" aria-labelledby={`related-${item.slug}`}><div className="eyebrow">Continue exploring</div><h2 id={`related-${item.slug}`}>Related Community Intelligence research</h2><div className="related-grid">{related.map(candidate=><article key={candidate.slug}><div className="eyebrow">{candidate.type}</div><h3><Link href={`/${candidate.slug}`}>{candidate.title}</Link></h3><p>{candidate.excerpt}</p></article>)}</div></section>}
    <ArticleDeskLink industry={industry} item={item}/>
    {(isEarlyWarning||item.slug===adobeAiPhotoCritiqueArticle.slug||item.slug===christopherNolanOdysseyArticle.slug||item.slug===saudiEaCommunityTrustArticle.slug||item.slug===playstationBlackoutArticle.slug||item.slug===metaSmartGlassesBystanderTrustArticle.slug||item.slug===fanaticsSportsSuperAppArticle.slug||item.slug===haloPlaystationCommunityIntelligenceArticle.slug||item.slug===londonRobotaxiCommunityTrustArticle.slug||item.slug===xMoneySocialReputationArticle.slug||item.slug===appleLeasingOwnershipArticle.slug||item.slug===redditGoogleKnowledgeStructureArticle.slug||item.slug===robloxAiGameCreationDiscoveryArticle.slug||item.slug===cyeraInvisibleAiWorkforceArticle.slug||item.slug===netflixBritainDefaultTvChannelArticle.slug||item.slug===xboxGameDiscInternetPermissionArticle.slug||item.slug===gtaViGamingEcosystemArticle.slug||item.slug===davidOrnsteinCommunityTrustArticle.slug||item.slug===fortniteAiCharactersCommunityArticle.slug)&&<nav className="article-pagination shell" aria-label="Previous and next articles">{olderArticle&&<Link href={`/${olderArticle.slug}`}><span>Previous article</span><strong>{olderArticle.title}</strong></Link>}{newerArticle&&<Link href={`/${newerArticle.slug}`}><span>Next article</span><strong>{newerArticle.title}</strong></Link>}</nav>}
    <div className="shell share-shell"><SharePost title={item.title} url={`${site.url}/${item.slug}/`}/></div>
    <section id="about-author" className="author-box shell"><Image src="/tonte-bo-douglas.jpg" width={150} height={150} alt="Tonte Bo Douglas"/><div><div className="eyebrow">About the author</div><h2>Tonte Bo Douglas</h2><p>Founder of The Redditrepreneur and a Community Intelligence researcher and strategist studying how online communities shape trust, discovery, brands and markets.</p><Link href="/authors/tonte-bo-douglas">View Tonte&rsquo;s latest work</Link></div></section>
    <div className="shell"><Newsletter/></div>
  </article>
}
