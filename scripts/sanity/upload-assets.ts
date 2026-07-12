import {createReadStream,readFileSync,writeFileSync} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2026-07-12'})
const report=JSON.parse(readFileSync('reports/generated/image-migration.json','utf8'))
const byUrl=new Map<string,{newAsset:string,usedBy:string[]}>(report.records.filter((x:any)=>x.newAsset).map((x:any)=>[x.originalUrl,x]))
const uploaded=new Map<string,string>()
const results:any[]=[]

for(const [url,record] of byUrl){
  const absolute=path.resolve(record.newAsset)
  const asset=await client.assets.upload('image',createReadStream(absolute),{filename:path.basename(absolute)})
  uploaded.set(url,asset._id)
  results.push({originalUrl:url,sanityAsset:asset._id,status:'uploaded',usedBy:record.usedBy})
}

const docs=await client.fetch<Array<{_id:string,coverImageSource?:string}>>('*[defined(coverImageSource)]{_id,coverImageSource}')
for(const doc of docs){
  const assetId=doc.coverImageSource&&uploaded.get(doc.coverImageSource)
  if(assetId)await client.patch(doc._id).set({coverImage:{_type:'image',asset:{_type:'reference',_ref:assetId}}}).unset(['coverImageSource']).commit()
}

const founder=await client.assets.upload('image',createReadStream('public/tonte-bo-douglas.jpg'),{filename:'tonte-bo-douglas.jpg'})
await client.patch('ghost-author-6a3c71f79974230008809877').set({photo:{_type:'image',asset:{_type:'reference',_ref:founder._id},alt:'Tonte Bo Douglas'}}).commit()

writeFileSync('reports/generated/sanity-asset-upload.json',JSON.stringify({generatedAt:new Date().toISOString(),uploaded:results.length,patchedCovers:docs.filter(x=>x.coverImageSource&&uploaded.has(x.coverImageSource)).length,founderAsset:founder._id,results},null,2))
console.log(JSON.stringify({uploaded:results.length,patchedCovers:docs.filter(x=>x.coverImageSource&&uploaded.has(x.coverImageSource)).length,founderAsset:founder._id},null,2))
