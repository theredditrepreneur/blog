import {notFound} from 'next/navigation'
import {ArticlePage} from '@/components/article-page'
import {ScorecardPage} from '@/components/scorecard-page'
import {FrameworkPage} from '@/components/framework-page'
import {allContent,latestWeeklyLegacySlug,previousWeeklySlug} from '@/lib/content'
import {headOfCommunityIntelligenceBody,headOfCommunityIntelligenceDraft} from '@/lib/drafts/head-of-community-intelligence'
import {bookingComScorecardBody,bookingComScorecardDraft} from '@/lib/drafts/booking-com-scorecard'
import {redditAiSlopArticle,redditAiSlopBody} from '@/lib/articles/reddit-ai-slop'
import {aiEvidenceLayerArticle,aiEvidenceLayerBody} from '@/lib/articles/ai-evidence-layer'
import {franceSpainFrameworkBody,franceSpainFrameworkDraft} from '@/lib/drafts/france-spain-framework'
import {englandCommunityCourtroomBody,englandCommunityCourtroomDraft} from '@/lib/drafts/england-community-courtroom'
import {communityIntelligenceWeeklyPlatformLiveBody,communityIntelligenceWeeklyPlatformLiveDraft} from '@/lib/drafts/community-intelligence-weekly-platform-live'
import {bbcRadioCommunityBody,bbcRadioCommunityDraft} from '@/lib/drafts/bbc-radio-community'
import {nikeCommunityScorecardBody,nikeCommunityScorecardDraft,nikeCommunityScorecardFaqs} from '@/lib/drafts/nike-community-scorecard'
import {communityIntelligenceEarlyWarningArticle,communityIntelligenceEarlyWarningBody} from '@/lib/articles/community-intelligence-early-warning-system'
import {robloxCommunityScorecardBody,robloxCommunityScorecardDraft,robloxCommunityScorecardFaqs} from '@/lib/drafts/roblox-community-scorecard'
import {hubspotRedditPerformanceArticle,hubspotRedditPerformanceBody} from '@/lib/articles/hubspot-reddit-performance-marketing'
import {restIsFootballCommunitySuccessArticle,restIsFootballCommunitySuccessBody} from '@/lib/articles/rest-is-football-community-success'
import {xMen97Season2Article,xMen97Season2Body} from '@/lib/articles/x-men-97-season-2-community-intelligence'
import {squarespacePriceIncreaseArticle,squarespacePriceIncreaseBody} from '@/lib/articles/squarespace-price-increase-community-intelligence'
import {hubspotCommunityGovernanceArticle,hubspotCommunityGovernanceBody} from '@/lib/articles/hubspot-community-governance-product-decision'
import {worldCupCommercialisationArticle,worldCupCommercialisationBody} from '@/lib/articles/world-cup-commercialisation'
import {facebookTikTokArticle,facebookTikTokBody} from '@/lib/articles/facebook-becoming-more-like-tiktok'
import {metaGlassesOwnershipArticle,metaGlassesOwnershipBody} from '@/lib/articles/meta-glasses-monthly-charge-ownership'
import {amazonPrimeVideoGamesArticle,amazonPrimeVideoGamesBody} from '@/lib/articles/amazon-games-inside-prime-video'
import {xboxGamePassArticle,xboxGamePassBody} from '@/lib/articles/xbox-game-pass-more-for-less'
import {openAiAgentOversightArticle,openAiAgentOversightBody} from '@/lib/articles/openai-agent-hugging-face-community-oversight'
import {youtubeAiThumbnailArticle,youtubeAiThumbnailBody} from '@/lib/articles/youtube-ai-thumbnail-community-intelligence'
import {patreonPlatformChangeArticle,patreonPlatformChangeBody,patreonPlatformChangeFaqs} from '@/lib/articles/patreon-platform-change'
import {tripComAiTravelAgentArticle,tripComAiTravelAgentBody,tripComAiTravelAgentFaqs} from '@/lib/articles/trip-com-ai-travel-agent'
import {client} from '@/sanity/lib/client'
import {site} from '@/lib/site'

const localBodies:Record<string,string>={
  [headOfCommunityIntelligenceDraft.slug]:headOfCommunityIntelligenceBody,
  [bookingComScorecardDraft.slug]:bookingComScorecardBody,
  [redditAiSlopArticle.slug]:redditAiSlopBody,
  [aiEvidenceLayerArticle.slug]:aiEvidenceLayerBody,
  [franceSpainFrameworkDraft.slug]:franceSpainFrameworkBody,
  [englandCommunityCourtroomDraft.slug]:englandCommunityCourtroomBody,
  [communityIntelligenceWeeklyPlatformLiveDraft.slug]:communityIntelligenceWeeklyPlatformLiveBody,
  [bbcRadioCommunityDraft.slug]:bbcRadioCommunityBody,
  [nikeCommunityScorecardDraft.slug]:nikeCommunityScorecardBody,
  [communityIntelligenceEarlyWarningArticle.slug]:communityIntelligenceEarlyWarningBody,
  [robloxCommunityScorecardDraft.slug]:robloxCommunityScorecardBody,
  [hubspotRedditPerformanceArticle.slug]:hubspotRedditPerformanceBody,
  [restIsFootballCommunitySuccessArticle.slug]:restIsFootballCommunitySuccessBody,
  [xMen97Season2Article.slug]:xMen97Season2Body,
  [squarespacePriceIncreaseArticle.slug]:squarespacePriceIncreaseBody,
  [hubspotCommunityGovernanceArticle.slug]:hubspotCommunityGovernanceBody,
  [worldCupCommercialisationArticle.slug]:worldCupCommercialisationBody,
  [facebookTikTokArticle.slug]:facebookTikTokBody,
  [metaGlassesOwnershipArticle.slug]:metaGlassesOwnershipBody,
  [amazonPrimeVideoGamesArticle.slug]:amazonPrimeVideoGamesBody,
  [xboxGamePassArticle.slug]:xboxGamePassBody,
  [openAiAgentOversightArticle.slug]:openAiAgentOversightBody,
  [youtubeAiThumbnailArticle.slug]:youtubeAiThumbnailBody,
  [patreonPlatformChangeArticle.slug]:patreonPlatformChangeBody,
  [tripComAiTravelAgentArticle.slug]:tripComAiTravelAgentBody,
}

export function generateStaticParams(){return allContent.map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const item=allContent.find(candidate=>candidate.slug===slug)
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
  const item=allContent.find(candidate=>candidate.slug===slug)
  if(!item)notFound()

  const cmsSlug=slug===previousWeeklySlug?latestWeeklyLegacySlug:slug
  const cmsSlugs=slug===cmsSlug?[slug]:[slug,cmsSlug]
  let cms:{bodyHtml?:string,coverImageUrl?:string,updatedAt?:string}|null=null
  if(!item.draft){
    try{
      cms=await client.fetch(`*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","weekly","indexIssue","newsBrief"] && slug.current in $slugs][0]{"bodyHtml":body[0].html,"coverImageUrl":coverImage.asset->url,updatedAt}`,{slugs:cmsSlugs})
    }catch(error){
      console.error('Sanity article query failed',error)
    }
  }

  const bodyHtml=localBodies[item.slug]||cms?.bodyHtml
  const coverImageUrl=item.image||cms?.coverImageUrl
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
  const schema={
    '@context':'https://schema.org',
    '@type':isEarlyWarning?['Article','BlogPosting']:item.type==='Scorecard'||item.type==='Benchmark'?'Report':'Article',
    headline:item.title,
    description:item.excerpt,
    datePublished:item.date,
    dateModified:cms?.updatedAt||item.date,
    author:{'@type':'Person',name:'Tonte Bo Douglas',url:`${site.url}/authors/tonte-bo-douglas`},
    publisher:{'@type':'Organization',name:'The Redditrepreneur',url:site.main,logo:{'@type':'ImageObject',url:`${site.url}/redditrepreneur-logo.png`}},
    mainEntityOfPage:{'@type':'WebPage','@id':`${site.url}/${slug}`},
    image:schemaImage,
  }
  const page=item.type==='Scorecard'?<ScorecardPage item={item} bodyHtml={bodyHtml} coverImageUrl={coverImageUrl}/>:item.type==='Framework'?<FrameworkPage item={item} bodyHtml={bodyHtml} coverImageUrl={coverImageUrl}/>:<ArticlePage item={item} bodyHtml={bodyHtml} coverImageUrl={coverImageUrl}/>
  const isNikeScorecard=item.slug===nikeCommunityScorecardDraft.slug
  const isRobloxScorecard=item.slug===robloxCommunityScorecardDraft.slug
  const visibleFaqs=isNikeScorecard?nikeCommunityScorecardFaqs:isRobloxScorecard?robloxCommunityScorecardFaqs:isPatreonPlatformChange?patreonPlatformChangeFaqs:isTripComAiTravelAgent?tripComAiTravelAgentFaqs:null
  const faqSchema=visibleFaqs?{'@context':'https://schema.org','@type':'FAQPage',mainEntity:visibleFaqs.map(({question,answer})=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))}:null
  const breadcrumbSchema=isNikeScorecard||isRobloxScorecard||isEarlyWarning||isHubspotPerformance||isRestIsFootball||isXMen97||isSquarespacePriceIncrease||isHubspotCommunityGovernance||isWorldCupCommercialisation||isFacebookTikTok||isMetaGlassesOwnership||isAmazonPrimeVideoGames||isXboxGamePass||isOpenAiAgentOversight||isPatreonPlatformChange||isTripComAiTravelAgent?{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:site.url},
    {'@type':'ListItem',position:2,name:isNikeScorecard||isRobloxScorecard?'Scorecards':'Research',item:`${site.url}/${isNikeScorecard||isRobloxScorecard?'scorecards':'research'}`},
    {'@type':'ListItem',position:3,name:item.title,item:`${site.url}/${item.slug}`},
  ]}:null
  return <>{page}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\u003c')}}/>{faqSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema).replace(/</g,'\u003c')}}/>}{breadcrumbSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema).replace(/</g,'\u003c')}}/>}</>
}
