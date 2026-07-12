import {readFileSync,writeFileSync} from 'node:fs'
import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2026-07-12'})
const upload=JSON.parse(readFileSync('reports/generated/sanity-asset-upload.json','utf8'))
const ids=[...new Set<string>(upload.results.map((x:any)=>x.sanityAsset))]
const assets=await client.fetch<Array<{_id:string,url:string}>>('*[_id in $ids]{_id,url}',{ids})
const assetUrls=new Map(assets.map(x=>[x._id,x.url]))
const replacements=new Map<string,string>()
for(const row of upload.results){const url=assetUrls.get(row.sanityAsset);if(url)replacements.set(row.originalUrl,url)}

const docs=await client.fetch<Array<{_id:string,body?:Array<any>}>>('*[defined(body[_type=="legacyHtml"][0].html)]{_id,body}')
let patched=0
for(const doc of docs){let changed=false;const body=(doc.body||[]).map(block=>{if(block._type!=='legacyHtml'||!block.html)return block;let html=String(block.html).replace(/\s+srcset=("[^"]*"|'[^']*')/gi,'').replace(/\s+sizes=("[^"]*"|'[^']*')/gi,'');for(const [oldUrl,newUrl] of replacements)html=html.replaceAll(oldUrl,newUrl);changed ||= html!==block.html;return {...block,html}});if(changed){await client.patch(doc._id).set({body}).commit();patched++}}
const result={generatedAt:new Date().toISOString(),documentsInspected:docs.length,documentsPatched:patched,replacements:replacements.size}
writeFileSync('reports/generated/body-image-rewrite.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2))
