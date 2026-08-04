import {notFound} from 'next/navigation'
import {ArticlePage} from '@/components/article-page'
import {ScorecardPage} from '@/components/scorecard-page'
import {FrameworkPage} from '@/components/framework-page'
import {allContent,latestWeeklyLegacySlug,previousWeeklySlug} from '@/lib/content'
import {localBodies} from '@/lib/local-bodies'
import {nikeCommunityScorecardDraft,nikeCommunityScorecardFaqs} from '@/lib/drafts/nike-community-scorecard'
import {communityIntelligenceEarlyWarningArticle} from '@/lib/articles/community-intelligence-early-warning-system'
import {robloxCommunityScorecardDraft,robloxCommunityScorecardFaqs} from '@/lib/drafts/roblox-community-scorecard'
import {hubspotRedditPerformanceArticle} from '@/lib/articles/hubspot-reddit-performance-marketing'
import {restIsFootballCommunitySuccessArticle} from '@/lib/articles/rest-is-football-community-success'
import {xMen97Season2Article} from '@/lib/articles/x-men-97-season-2-community-intelligence'
import {squarespacePriceIncreaseArticle} from '@/lib/articles/squarespace-price-increase-community-intelligence'
import {hubspotCommunityGovernanceArticle} from '@/lib/articles/hubspot-community-governance-product-decision'
import {worldCupCommercialisationArticle} from '@/lib/articles/world-cup-commercialisation'
import {facebookTikTokArticle} from '@/lib/articles/facebook-becoming-more-like-tiktok'
import {metaGlassesOwnershipArticle} from '@/lib/articles/meta-glasses-monthly-charge-ownership'
import {amazonPrimeVideoGamesArticle} from '@/lib/articles/amazon-games-inside-prime-video'
import {xboxGamePassArticle} from '@/lib/articles/xbox-game-pass-more-for-less'
import {openAiAgentOversightArticle} from '@/lib/articles/openai-agent-hugging-face-community-oversight'
import {patreonPlatformChangeArticle,patreonPlatformChangeFaqs} from '@/lib/articles/patreon-platform-change'
import {tripComAiTravelAgentArticle,tripComAiTravelAgentFaqs} from '@/lib/articles/trip-com-ai-travel-agent'
import {adobeAiPhotoCritiqueArticle} from '@/lib/articles/adobe-ai-photo-critique'
import {christopherNolanOdysseyArticle} from '@/lib/articles/christopher-nolan-odyssey-trust-conversation'
import {saudiEaCommunityTrustArticle} from '@/lib/articles/saudi-arabia-buying-ea-community-trust'
import {communityIntelligenceWeeklyTrustArticle} from '@/lib/articles/community-intelligence-weekly-trust'
import {playstationBlackoutArticle} from '@/lib/articles/playstation-fans-planning-blackout'
import {metaSmartGlassesBystanderTrustArticle} from '@/lib/articles/meta-smart-glasses-bystander-trust-problem'
import {fanaticsSportsSuperAppArticle} from '@/lib/articles/fanatics-building-the-sports-super-app'
import {haloPlaystationCommunityIntelligenceArticle} from '@/lib/articles/halo-playstation-community-intelligence'
import {londonRobotaxiCommunityTrustArticle} from '@/lib/articles/london-robotaxi-race-community-trust'
import {xMoneySocialReputationArticle} from '@/lib/articles/x-money-social-reputation-financial-trust'
import {appleLeasingOwnershipArticle} from '@/lib/articles/apple-leasing-future-of-ownership'
import {redditGoogleKnowledgeStructureArticle} from '@/lib/articles/reddit-google-community-knowledge-structure'
import {robloxAiGameCreationDiscoveryArticle} from '@/lib/articles/roblox-ai-game-creation-discovery'
import {cyeraInvisibleAiWorkforceArticle} from '@/lib/articles/cyera-invisible-ai-workforce'
import {netflixBritainDefaultTvChannelArticle} from '@/lib/articles/netflix-britain-default-tv-channel'
import {xboxGameDiscInternetPermissionArticle} from '@/lib/articles/xbox-game-disc-needs-internet-permission'
import {gtaViGamingEcosystemArticle} from '@/lib/articles/gta-vi-selling-the-entire-gaming-ecosystem'
import {davidOrnsteinCommunityTrustArticle} from '@/lib/articles/every-community-has-its-own-david-ornstein'
import {fortniteAiCharactersCommunityArticle} from '@/lib/articles/fortnite-ai-characters-community-members'
import {site} from '@/lib/site'
import {getIndustry} from '@/lib/industries'
import {getSanityArticle,getSanityArticles,mergeContent} from '@/lib/sanity-content'
import {getEditorialSettings} from '@/lib/sanity-settings'

export function generateStaticParams(){return allContent.map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const item=(await getSanityArticle(slug))?.item||allContent.find(candidate=>candidate.slug===slug)
  if(!item)return {}
  const isAiAuthority=slug==='the-ai-authority-formula'
  const metaTitle=item.seoTitle||(isAiAuthority?'The AI Authority Formula: Why AI Recommends Some Brands':item.title)
  const description=item.metaDescription||(isAiAuthority?'Discover the six signals that shape AI recommendations, including Community Trust, Evidence Quality, Third Party Validation and Expert Consensus.':item.excerpt)
  const socialTitle=item.socialTitle||metaTitle
  const socialDescription=item.socialDescription||description
  const images=item.image?[{url:item.image,width:item.imageWidth||1600,height:item.imageHeight||900,alt:item.imageAlt||item.title}]:undefined

  return {
    title:item.seoTitle||isAiAuthority?{absolute:metaTitle}:metaTitle,
    description,
    authors:[{name:'Tonte Bo Douglas',url:'/authors/tonte-bo-douglas'}],
    robots:item.draft?{index:false,follow:false}:undefined,
    alternates:{canonical:`/${slug}`},
    openGraph:{type:'article',title:socialTitle,description:socialDescription,url:`/${slug}`,publishedTime:new Date(item.date).toISOString(),modifiedTime:new Date(item.date).toISOString(),authors:['Tonte Bo Douglas'],images},
    twitter:{card:'summary_large_image',title:socialTitle,description:socialDescription,images:item.image?[item.image]:undefined},
  }
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const localItem=allContent.find(candidate=>candidate.slug===slug)
  const directCms=await getSanityArticle(slug)
  const item=directCms?.item||localItem
  if(!item)notFound()
  const settings=await getEditorialSettings()
  const publicationName=settings.publicationName||'The Redditrepreneur Research'

  const cmsSlug=slug===previousWeeklySlug?latestWeeklyLegacySlug:slug
  const cmsSlugs=slug===cmsSlug?[slug]:[slug,cmsSlug]
  const cms=directCms||(cmsSlugs.length>1?await getSanityArticle(cmsSlug):null)

  const bodyHtml=cms?cms.bodyHtml:localBodies[item.slug]
  const coverImageUrl=cms?.item.image||item.image
  const schemaImage=coverImageUrl?.startsWith('/')?`${site.url}${coverImageUrl}`:coverImageUrl
  const isEarlyWarning=item.slug===communityIntelligenceEarlyWarningArticle.slug
  const isHubspotPerformance=item.slug===hubspotRedditPerformanceArticle.slug
  const isRestIsFootball=item.slug===restIsFootballCommunitySuccessArticle.slug
  const isXMen97=item.slug===xMen97Season2Article.slug
  const isSquarespacePriceIncrease=item.slug===squarespacePriceIncreaseArticle.slug
  const isHubspotCommunityGovernance=item.slug===hubspotCommunityGovernanceArticle.slug
  const isWorldCupCommercialisation=item.slug===worldCupCommercialisationArticle.slug
  const isFacebookTikTok=item.slug===facebookTikTokArticle.slug
  const isMetaGlassesOwnership=item.slug===metaGlassesOwnershipArticle.slug
  const isAmazonPrimeVideoGames=item.slug===amazonPrimeVideoGamesArticle.slug
  const isXboxGamePass=item.slug===xboxGamePassArticle.slug
  const isOpenAiAgentOversight=item.slug===openAiAgentOversightArticle.slug
  const isPatreonPlatformChange=item.slug===patreonPlatformChangeArticle.slug
  const isTripComAiTravelAgent=item.slug===tripComAiTravelAgentArticle.slug
  const isAdobeAiPhotoCritique=item.slug===adobeAiPhotoCritiqueArticle.slug
  const isChristopherNolanOdyssey=item.slug===christopherNolanOdysseyArticle.slug
  const isSaudiEaCommunityTrust=item.slug===saudiEaCommunityTrustArticle.slug
  const isCommunityIntelligenceWeeklyTrust=item.slug===communityIntelligenceWeeklyTrustArticle.slug
  const isPlaystationBlackout=item.slug===playstationBlackoutArticle.slug
  const isMetaSmartGlassesBystanderTrust=item.slug===metaSmartGlassesBystanderTrustArticle.slug
  const isFanaticsSportsSuperApp=item.slug===fanaticsSportsSuperAppArticle.slug
  const isHaloPlaystationCommunityIntelligence=item.slug===haloPlaystationCommunityIntelligenceArticle.slug
  const isLondonRobotaxiCommunityTrust=item.slug===londonRobotaxiCommunityTrustArticle.slug
  const isXMoneySocialReputation=item.slug===xMoneySocialReputationArticle.slug
  const isAppleLeasingOwnership=item.slug===appleLeasingOwnershipArticle.slug
  const isRedditGoogleKnowledgeStructure=item.slug===redditGoogleKnowledgeStructureArticle.slug
  const isRobloxAiGameCreationDiscovery=item.slug===robloxAiGameCreationDiscoveryArticle.slug
  const isCyeraInvisibleAiWorkforce=item.slug===cyeraInvisibleAiWorkforceArticle.slug
  const isNetflixBritainDefaultTvChannel=item.slug===netflixBritainDefaultTvChannelArticle.slug
  const isXboxGameDiscInternetPermission=item.slug===xboxGameDiscInternetPermissionArticle.slug
  const isGtaViGamingEcosystem=item.slug===gtaViGamingEcosystemArticle.slug
  const isDavidOrnsteinCommunityTrust=item.slug===davidOrnsteinCommunityTrustArticle.slug
  const isFortniteAiCharactersCommunity=item.slug===fortniteAiCharactersCommunityArticle.slug
  const industry=getIndustry(item)
  const routeHasDedicatedPresentation=isEarlyWarning||isHubspotPerformance||isRestIsFootball||isXMen97||isSquarespacePriceIncrease||isHubspotCommunityGovernance||isWorldCupCommercialisation||isFacebookTikTok||isMetaGlassesOwnership||isAmazonPrimeVideoGames||isXboxGamePass||isOpenAiAgentOversight||isPatreonPlatformChange||isTripComAiTravelAgent||isAdobeAiPhotoCritique||isChristopherNolanOdyssey||isSaudiEaCommunityTrust||isCommunityIntelligenceWeeklyTrust||isPlaystationBlackout||isMetaSmartGlassesBystanderTrust||isFanaticsSportsSuperApp||isHaloPlaystationCommunityIntelligence||isLondonRobotaxiCommunityTrust||isXMoneySocialReputation||isAppleLeasingOwnership||isRedditGoogleKnowledgeStructure||isRobloxAiGameCreationDiscovery||isCyeraInvisibleAiWorkforce||isNetflixBritainDefaultTvChannel||isXboxGameDiscInternetPermission||isGtaViGamingEcosystem||isDavidOrnsteinCommunityTrust||isFortniteAiCharactersCommunity
  const schema={
    '@context':'https://schema.org',
    '@type':isEarlyWarning?['Article','BlogPosting']:item.type==='Scorecard'||item.type==='Benchmark'?'Report':'Article',
    headline:item.title,
    description:item.excerpt,
    datePublished:item.date,
    dateModified:cms?.updatedAt||item.date,
    author:{'@type':'Person',name:'Tonte Bo Douglas',url:`${site.url}/authors/tonte-bo-douglas`},
    publisher:{'@type':'Organization',name:publicationName,url:site.url,logo:{'@type':'ImageObject',url:`${site.url}/redditrepreneur-logo.png`}},
    mainEntityOfPage:{'@type':'WebPage','@id':`${site.url}/${slug}`},
    image:schemaImage,
    articleSection:industry.name,
    about:{'@type':'Thing',name:industry.deskName,url:`${site.url}/industries/${industry.slug}`},
    isAccessibleForFree:routeHasDedicatedPresentation||!item.draft,
  }
  const mergedContent=mergeContent(allContent,await getSanityArticles())
  const page=item.type==='Scorecard'?<ScorecardPage item={item} bodyHtml={bodyHtml} coverImageUrl={coverImageUrl}/>:item.type==='Framework'?<FrameworkPage item={item} bodyHtml={bodyHtml} coverImageUrl={coverImageUrl}/>:<ArticlePage item={item} bodyHtml={bodyHtml} coverImageUrl={coverImageUrl} portableBody={cms?.body} allItems={mergedContent}/>
  const isNikeScorecard=item.slug===nikeCommunityScorecardDraft.slug
  const isRobloxScorecard=item.slug===robloxCommunityScorecardDraft.slug
  const visibleFaqs=isNikeScorecard?nikeCommunityScorecardFaqs:isRobloxScorecard?robloxCommunityScorecardFaqs:isPatreonPlatformChange?patreonPlatformChangeFaqs:isTripComAiTravelAgent?tripComAiTravelAgentFaqs:null
  const faqSchema=visibleFaqs?{'@context':'https://schema.org','@type':'FAQPage',mainEntity:visibleFaqs.map(({question,answer})=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))}:null
  const breadcrumbSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:site.url},
    {'@type':'ListItem',position:2,name:'Industries',item:`${site.url}/industries`},
    {'@type':'ListItem',position:3,name:industry.name,item:`${site.url}/industries/${industry.slug}`},
    {'@type':'ListItem',position:4,name:item.title,item:`${site.url}/${item.slug}`},
  ]}
  return <>{page}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\u003c')}}/>{faqSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema).replace(/</g,'\u003c')}}/>}{breadcrumbSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema).replace(/</g,'\u003c')}}/>}</>
}
