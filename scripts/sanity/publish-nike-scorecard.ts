import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2024-01-01'})
const documentId='scorecard-nike-community-intelligence'
const draftId=`drafts.${documentId}`

type DraftDocument=Record<string,unknown>&{_id:string,_type:string}
const draft=await client.fetch<DraftDocument|null>('*[_id==$draftId][0]',{draftId})
if(!draft)throw new Error(`Sanity draft ${draftId} was not found`)

const {_rev,_createdAt,_updatedAt,...content}=draft
void _rev
void _createdAt
void _updatedAt

await client.transaction()
  .createOrReplace({...content,_id:documentId})
  .delete(draftId)
  .commit()

const result=await client.fetch('*[_id==$documentId][0]{_id,_type,title,"slug":slug.current,publishedAt,brandName,overallScore,grade,tier,dimensions[]{name,score,displayScore,interpretation},"author":author->name,"cover":coverImage.asset->url,"topics":topics[]->title,"related":relatedContent[]->{title,"slug":slug.current},seo}',{documentId})
console.log(JSON.stringify(result,null,2))
