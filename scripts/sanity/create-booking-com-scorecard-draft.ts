import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {bookingComScorecardBody,bookingComScorecardDraft,bookingComScorecardRelated} from '../../lib/drafts/booking-com-scorecard'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='scorecard-booking-com'
const draftId=`drafts.${documentId}`
const proposedPublicationDate='2026-07-14T12:00:00.000Z'
const assetPath=path.resolve('public/booking-com-community-intelligence-scorecard.webp')
const canonicalUrl=`https://blog.theredditrepreneur.com/${bookingComScorecardDraft.slug}`
const scorecard=bookingComScorecardDraft.scorecard

if(!scorecard)throw new Error('Booking.com Scorecard data is missing')

const existing=await client.fetch<Array<{_id:string}>>('*[slug.current==$slug && !(_id in [$draftId,$documentId])]{_id}',{slug:bookingComScorecardDraft.slug,draftId,documentId})
if(existing.length)throw new Error(`Slug already belongs to ${existing.map(item=>item._id).join(', ')}`)

const author=await client.fetch<{_id:string}|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]{_id}')
if(!author)throw new Error('Tonte Bo Douglas author document was not found')

const topicDefinitions=[
  ['Travel','travel','Community Intelligence research about travel brands, booking behaviour and traveller experience.'],
  ['Customer Experience','customer-experience','Research about how customer experiences shape trust, advocacy and brand perception.'],
  ['Brand Intelligence','brand-intelligence','Research about the community evidence shaping brand perception, trust and authority.'],
  ['AI Search','ai-search','Research about how AI systems discover, interpret and recommend brands and information.'],
  ['Community Trust','community-trust','Research about the confidence communities place in brands, information and experience.'],
  ['Customer Support','customer-support','Research about support experiences and the conversations they create.'],
  ['Online Travel','online-travel','Community Intelligence research about online travel platforms and booking markets.'],
] as const

const topicRefs=[] as Array<{_type:'reference',_key:string,_ref:string}>
for(const [title,slug,introduction] of topicDefinitions){
  let topic=await client.fetch<{_id:string}|null>('*[_type=="topic" && (slug.current==$slug || title==$title)][0]{_id}',{slug,title})
  if(!topic){
    const topicId=`topic-${slug}`
    await client.createIfNotExists({_id:topicId,_type:'topic',title,slug:{_type:'slug',current:slug},introduction,seo:{_type:'seo',title:`${title} Research`,description:`Explore The Redditrepreneur research and analysis about ${title.toLowerCase()}.`}})
    topic={_id:topicId}
  }
  topicRefs.push({_type:'reference',_key:slug,_ref:topic._id})
}

const existingDraft=await client.fetch<{coverRef?:string}|null>('*[_id==$draftId][0]{"coverRef":coverImage.asset._ref}',{draftId})
const imageAsset=existingDraft?.coverRef?{_id:existingDraft.coverRef}:await client.assets.upload('image',fs.createReadStream(assetPath),{
  filename:'booking-com-community-intelligence-scorecard.webp',
  contentType:'image/webp',
  title:bookingComScorecardDraft.title,
})
const coverImage={_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:bookingComScorecardDraft.imageAlt}

const related=await client.fetch<Array<{_id:string,slug:string}>>('*[_type in ["article","researchReport","scorecard","caseStudy","framework","benchmark","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',{slugs:bookingComScorecardRelated})

await client.createOrReplace({
  _id:draftId,
  _type:'scorecard',
  title:bookingComScorecardDraft.title,
  slug:{_type:'slug',current:bookingComScorecardDraft.slug},
  excerpt:bookingComScorecardDraft.excerpt,
  coverImage,
  author:{_type:'reference',_ref:author._id},
  publishedAt:proposedPublicationDate,
  updatedAt:proposedPublicationDate,
  topics:topicRefs,
  frameworks:[],
  relatedContent:related.map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),
  featured:false,
  brandName:scorecard.brandName,
  overallScore:scorecard.overallScore,
  grade:scorecard.grade,
  tier:scorecard.tier,
  assessmentStatus:'Editorial Community Intelligence assessment',
  dimensions:scorecard.dimensions.map((dimension,index)=>({_type:'scoreDimension',_key:`dimension-${index+1}`,name:dimension.name,score:dimension.score,interpretation:dimension.interpretation,evidence:[]})),
  methodologyVersion:'Current Redditrepreneur Community Intelligence Scorecard methodology',
  keyInsight:scorecard.keyInsight,
  primaryStrength:scorecard.primaryStrength,
  primaryRisk:scorecard.primaryRisk,
  recommendations:['Improve customer support perception','Increase pricing transparency','Clarify cancellation policies','Strengthen Genius programme awareness','Continue building Community Authority through exceptional customer experience'],
  dataLimitations:'This score is a strategic editorial assessment rather than a statistically representative customer survey. No research period, sample size or evidence count has been specified.',
  seo:{_type:'seo',title:bookingComScorecardDraft.seoTitle,description:bookingComScorecardDraft.metaDescription,canonicalUrl,ogImage:coverImage},
  body:[{_type:'legacyHtml',_key:'scorecard-body',html:bookingComScorecardBody,reviewStatus:'reviewed',notes:'Supplied Booking.com Scorecard formatted as an unpublished editorial draft. Do not publish without explicit approval.'}],
})

const result=await client.fetch('*[_id==$draftId][0]{_id,_type,title,"slug":slug.current,publishedAt,brandName,overallScore,grade,tier,assessmentStatus,dimensions[]{name,score,interpretation},methodologyVersion,confidence,keyInsight,primaryStrength,primaryRisk,dataLimitations,"author":author->name,"cover":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->title,seo}',{draftId})
fs.mkdirSync(path.resolve('reports/generated'),{recursive:true})
fs.writeFileSync(path.resolve('reports/generated/booking-com-scorecard-draft.json'),JSON.stringify(result,null,2))
console.log(JSON.stringify(result,null,2))
