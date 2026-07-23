import type {CommunityIntelligenceScorecard} from '@/lib/community-intelligence-scorecard'

export const barclaysScorecard:CommunityIntelligenceScorecard={
  brandName:'Barclays Bank',
  criteria:{brandTrust:9,productSatisfaction:7.2,innovationPerception:7.5,customerSupport:6.5,communityEngagement:9.5,competitivePosition:8.5,advocacy:8,aiSearchReadiness:9.2,narrativeConsistency:7.5},
  analysis:{
    brandTrust:'Barclays retains strong institutional credibility even when communities criticise individual operational experiences.',
    productSatisfaction:'Customers continue to rely on the bank, although account restrictions, app changes and service friction weaken the experience.',
    innovationPerception:'The mobile banking experience is visible in community discussion, but changes can create uncertainty when communication is unclear.',
    customerSupport:'Fraud investigations, frozen accounts and unclear ownership remain the strongest sources of customer frustration.',
    communityEngagement:'Barclays appears consistently across UK conversations about accounts, mortgages, fraud protection, cards and switching banks.',
    competitivePosition:'The bank remains a major consideration, while Monzo, Starling, First Direct, Nationwide and Lloyds create credible alternatives.',
    advocacy:'Customers recommend Barclays, but those recommendations are frequently conditional rather than automatic.',
    aiSearchReadiness:'Decades of institutional recognition and extensive public discussion create a substantial evidence layer for AI answer engines.',
    narrativeConsistency:'Communities consistently separate institutional trust from frustration with specific operational experiences.',
  },
  keyInsight:'Barclays is not experiencing a collapse in trust. Its authority creates higher expectations, making communication and service friction more visible.',
  primaryStrength:'Institutional trust, community visibility and competitive recognition',
  primaryRisk:'Repeated support and communication friction can weaken day to day advocacy',
}

export const gymsharkScorecard:CommunityIntelligenceScorecard={
  brandName:'Gymshark',
  criteria:{brandTrust:9.5,productSatisfaction:9.2,innovationPerception:8.5,customerSupport:8.5,communityEngagement:9.5,competitivePosition:9,advocacy:9,aiSearchReadiness:9.2,narrativeConsistency:9.1},
  analysis:{
    brandTrust:'Product quality, brand authenticity, athlete partnerships and customer experience support exceptional trust.',
    productSatisfaction:'Community discussion consistently links Gymshark with positive product quality and purchase experiences.',
    innovationPerception:'The brand has evolved its products, campaigns and positioning in response to changing customer expectations.',
    customerSupport:'The available article evidence describes a strong customer experience, while not claiming universal satisfaction.',
    communityEngagement:'Gymshark attracts sustained organic participation across Reddit, TikTok, YouTube and fitness forums.',
    competitivePosition:'The brand is repeatedly shortlisted alongside the most recognised gym clothing alternatives.',
    advocacy:'Customers recommend and defend Gymshark without the brand needing to initiate every conversation.',
    aiSearchReadiness:'A large, consistent public record of recommendations and fitness discussion gives AI answer engines substantial evidence to interpret.',
    narrativeConsistency:'Communities consistently describe Gymshark through fitness culture, authenticity, product quality and athlete relationships.',
  },
  keyInsight:'Gymshark has built a brand that communities actively discuss, recommend and defend, giving it exceptional influence within fitness culture.',
  primaryStrength:'Organic community engagement, trust and advocacy',
  primaryRisk:'High expectations require the product and customer experience to remain consistent as the brand grows',
}

export const approvedRobloxScorecardValues={brandTrust:8.4,productSatisfaction:8.8,innovationPerception:9.2,customerSupport:7,communityEngagement:10,competitivePosition:9,advocacy:9.3,aiSearchReadiness:9.1,narrativeConsistency:8} as const
