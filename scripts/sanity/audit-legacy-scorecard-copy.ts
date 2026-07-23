import {getCliClient} from 'sanity/cli'
const client=getCliClient({apiVersion:'2024-01-01'})
const documents=await client.fetch<Array<{title:string,slug:string,html:string}>>('*[_type=="scorecard"]{title,"slug":slug.current,"html":body[0].html}')
const patterns=['five dimensions','Community Presence','Share of Consensus','Insight Responsiveness']
let failures=0
for(const document of documents){
  for(const pattern of patterns){
    const index=document.html.indexOf(pattern)
    if(index<0)continue
    failures++
    console.log(`${document.slug}: ${document.html.slice(Math.max(0,index-90),index+pattern.length+90).replace(/\s+/g,' ')}`)
  }
}
if(failures)throw new Error(`${failures} legacy Scorecard references remain in Sanity article bodies`)
console.log(`No legacy five dimension copy remains across ${documents.length} Sanity Scorecards.`)
