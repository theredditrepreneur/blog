import {createReadStream} from 'node:fs'
import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2026-07-12'})
const documentId='ghost-6a4eb46a506c200001788f61'
const draftId=`drafts.${documentId}`
const title='Community Intelligence Weekly: The Death Of Social Listening, B2B SaaS Community Intelligence Benchmarks and More'
const slug='community-intelligence-weekly-the-death-of-social-listening-b2b-saas-community-intelligence-benchmarks-and-more'
const excerpt='This week: why social listening is giving way to Community Intelligence, new B2B SaaS benchmarks and the signals reshaping how brands understand communities.'

const asset=await client.assets.upload('image',createReadStream('public/community-intelligence-weekly.jpg'),{
  filename:'community-intelligence-weekly.jpg',
  title:'Community Intelligence Weekly cover',
})

const fields={
  title,
  slug:{_type:'slug',current:slug},
  excerpt,
  issueNumber:3,
  issueDate:'2026-07-08',
  coverImage:{_type:'image',asset:{_type:'reference',_ref:asset._id},alt:'Community Intelligence Weekly cover'},
}

const draft=await client.getDocument(draftId)
const transaction=client.transaction().patch(documentId,patch=>patch.set(fields).setIfMissing({seo:{}}).set({'seo.title':title.slice(0,60),'seo.description':excerpt.slice(0,160)}))
if(draft)transaction.patch(draftId,patch=>patch.set(fields).setIfMissing({seo:{}}).set({'seo.title':title.slice(0,60),'seo.description':excerpt.slice(0,160)}))
await transaction.commit({visibility:'sync'})

const updated=await client.fetch(`*[_id in $ids]{_id,title,"slug":slug.current,excerpt,issueNumber,issueDate,"coverRef":coverImage.asset._ref,"coverAlt":coverImage.alt,"bodyCount":count(body),publishedAt}`,{ids:[documentId,draftId]})
console.log(JSON.stringify({assetId:asset._id,documents:updated},null,2))
