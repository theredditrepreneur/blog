import {createHash} from 'node:crypto'
import {createReadStream,existsSync} from 'node:fs'
import path from 'node:path'
import {htmlToBlocks} from '@portabletext/block-tools'
import {JSDOM} from 'jsdom'
import {createSchema,type ArraySchemaType} from 'sanity'
import {getCliClient} from 'sanity/cli'
import {content,type ContentItem} from '../../lib/content'
import {localBodies} from '../../lib/local-bodies'
import {schemaTypes} from '../../sanity/schema'

const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||'2026-07-12'
const dryRun=process.argv.includes('--dry-run')
const client=getCliClient({apiVersion})
const schema=createSchema({name:'local-content-migration',types:schemaTypes})
const blockContent=schema.get('blockContent') as ArraySchemaType
const documentType:Record<ContentItem['type'],string>={Article:'article',Research:'researchReport',Scorecard:'scorecard','Case Study':'caseStudy',Framework:'framework',Benchmark:'benchmark',Weekly:'weekly',Index:'indexIssue'}

const hash=(value:string)=>createHash('sha1').update(value).digest('hex')
const slugify=(value:string)=>value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,96)
const unique=<T>(items:T[])=>[...new Set(items)]

const existing=await client.fetch<Array<{_id:string;slug:string}>>('*[_type in $types && defined(slug.current)]{_id,"slug":slug.current}',{types:Object.values(documentType)})
const existingSlugs=new Set(existing.map(item=>item.slug))
const missing=content.filter(item=>!existingSlugs.has(item.slug))
const missingBodies=missing.filter(item=>!localBodies[item.slug]).map(item=>item.slug)

if(missingBodies.length)throw new Error(`Missing editable source bodies for: ${missingBodies.join(', ')}`)

const converted=missing.map(item=>{
  let counter=0
  const body=htmlToBlocks(localBodies[item.slug],blockContent,{parseHtml:html=>new JSDOM(html).window.document,keyGenerator:()=>hash(`${item.slug}:${counter++}`).slice(0,12)})
  return {item,body}
})

if(dryRun){
  console.log(JSON.stringify({mode:'dry-run',source:content.length,existing:existing.length,toCreate:converted.length,withImages:converted.filter(({item})=>item.image?.startsWith('/')).length,portableTextBlocks:converted.reduce((total,{body})=>total+body.length,0)},null,2))
}

if(!dryRun){
let authorId=await client.fetch<string|null>('*[_type=="author" && slug.current=="tonte-bo-douglas"][0]._id')
if(!authorId){
  authorId='author-tonte-bo-douglas'
  await client.createIfNotExists({_id:authorId,_type:'author',name:'Tonte Bo Douglas',slug:{_type:'slug',current:'tonte-bo-douglas'},role:'Founder and Community Intelligence researcher',bio:'Tonte Bo Douglas is the founder of The Redditrepreneur.'})
}

const existingTopics=await client.fetch<Array<{_id:string;slug:string}>>('*[_type=="topic" && defined(slug.current)]{_id,"slug":slug.current}')
const topicIds=new Map(existingTopics.map(topic=>[topic.slug,topic._id]))

for(const {item} of converted){
  for(const title of unique([item.topic,...(item.tags||[])].filter((value):value is string=>Boolean(value)))){
    const slug=slugify(title)
    if(topicIds.has(slug))continue
    const id=`topic-local-${hash(slug).slice(0,20)}`
    await client.createIfNotExists({_id:id,_type:'topic',title,slug:{_type:'slug',current:slug},introduction:`Research and analysis about ${title} through a Community Intelligence perspective.`,seo:{_type:'seo',title:`${title} Research | The Redditrepreneur`,description:`Explore The Redditrepreneur research and analysis about ${title}.`}})
    topicIds.set(slug,id)
  }
}

let created=0
let imagesUploaded=0
for(const {item,body} of converted){
  let coverImage
  if(item.image?.startsWith('/')){
    const filename=item.image.slice(1)
    const file=path.resolve('public',filename)
    if(!existsSync(file))throw new Error(`Missing cover image for ${item.slug}: ${file}`)
    let asset=await client.fetch<{_id:string}|null>('*[_type=="sanity.imageAsset" && originalFilename==$filename][0]{_id}',{filename})
    if(!asset){asset=await client.assets.upload('image',createReadStream(file),{filename});imagesUploaded++}
    coverImage={_type:'image',asset:{_type:'reference',_ref:asset._id},alt:item.imageAlt||item.title}
  }
  const topicRefs=unique([item.topic,...(item.tags||[])].filter((value):value is string=>Boolean(value))).map(title=>{const slug=slugify(title);return {_type:'reference',_key:hash(slug).slice(0,12),_ref:topicIds.get(slug)!}})
  const id=`local-content-${hash(item.slug).slice(0,24)}`
  const document:Record<string,unknown> & {_id:string;_type:string}={
    _id:id,_type:documentType[item.type],title:item.title,slug:{_type:'slug',current:item.slug},excerpt:item.excerpt,
    author:{_type:'reference',_ref:authorId},publishedAt:new Date(`${item.date}T09:00:00.000Z`).toISOString(),updatedAt:new Date().toISOString(),
    industry:item.industry,featured:Boolean(item.featured),topics:topicRefs,coverImage,
    seo:{_type:'seo',title:item.seoTitle,description:item.metaDescription,canonicalUrl:`https://blog.theredditrepreneur.com/${item.slug}`},
    legacy:{_type:'legacyMetadata',originalSlug:item.slug,originalUrl:`https://blog.theredditrepreneur.com/${item.slug}`,legacyTags:item.tags,manualReview:false,migrationNotes:['Migrated from the local publication source into editable Portable Text.']},
    body,
  }
  if(item.type==='Weekly'){document.issueNumber=4;document.issueDate=item.date}
  await client.createOrReplace(document)
  created++
}

const latest=content[0]
const latestId=await client.fetch<string|null>('*[_type in $types && slug.current==$slug][0]._id',{types:Object.values(documentType),slug:latest.slug})
const siteSettingsDefaults={title:'The Redditrepreneur Research',description:'Community Intelligence research covering Gaming, AI, Sport, SaaS, Consumer Brands and Entertainment.',footerStatement:"The Redditrepreneur publishes Community Intelligence for the world's most important industries.",featuredContent:latestId?{_type:'reference',_ref:latestId}:undefined,newsletterUrl:'https://theredditrepreneur.substack.com/',platformUrl:'https://app.theredditrepreneur.com',auditUrl:'https://theredditrepreneur.com',navigation:[{_key:'research',label:'Research',href:'/research'},{_key:'industries',label:'Industries',href:'/industries'},{_key:'frameworks',label:'Frameworks',href:'/frameworks'},{_key:'community-intelligence',label:'Community Intelligence',href:'/what-is-community-intelligence'},{_key:'about',label:'About',href:'/about'},{_key:'search',label:'Search',href:'/search'}]}
await client.createIfNotExists({_id:'siteSettings',_type:'siteSettings',...siteSettingsDefaults})
await client.patch('siteSettings').setIfMissing(siteSettingsDefaults).commit()

console.log(JSON.stringify({mode:'import',created,imagesUploaded,totalAfter:existing.length+created,siteSettings:'siteSettings'},null,2))
}
