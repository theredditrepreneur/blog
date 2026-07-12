import fs from 'node:fs'
import crypto from 'node:crypto'
import path from 'node:path'

export type GhostPost={id:string;uuid:string;title:string;slug:string;status:string;type:'post'|'page';html:string|null;plaintext:string|null;lexical:string|null;custom_excerpt:string|null;feature_image:string|null;published_at:string|null;updated_at:string|null;canonical_url:string|null;featured:number|boolean}
export type GhostData={posts:GhostPost[];tags:any[];users:any[];posts_tags:any[];posts_authors:any[];posts_meta:any[]}
export type GhostExport={db:Array<{meta:{version:string;exported_on:number};data:GhostData}>}

export function readExport(file:string){const parsed=JSON.parse(fs.readFileSync(file,'utf8')) as GhostExport;if(!parsed.db?.[0]?.data)throw new Error('Not a supported Ghost export');return parsed.db[0]}
export function resolveGhostUrl(value:string|undefined|null,origin='https://blog.theredditrepreneur.com'){return value?.replaceAll('__GHOST_URL__',origin)}
export function sanitiseHtml(html='') {return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi,'').replace(/javascript:/gi,'')}
export function extractUrls(html=''){return {links:[...html.matchAll(/href=["']([^"']+)/gi)].map(x=>x[1]),images:[...html.matchAll(/(?:src|poster)=["']([^"']+)/gi)].map(x=>x[1])}}
export function unsupported(html=''){const checks:{name:string,re:RegExp,replacement:string}[]=[{name:'raw-script',re:/<script\b/i,replacement:'curated product or CTA block'},{name:'iframe',re:/<iframe\b/i,replacement:'allow-listed embed block'},{name:'video',re:/<video\b/i,replacement:'video block'},{name:'table',re:/<table\b/i,replacement:'accessible table block'},{name:'html-card',re:/kg-html-card/i,replacement:'native structured block'},{name:'signup',re:/kg-signup|data-members-form/i,replacement:'newsletter CTA block'},{name:'gallery',re:/kg-gallery/i,replacement:'gallery block'},{name:'bookmark',re:/kg-bookmark/i,replacement:'link preview block'}];return checks.filter(x=>x.re.test(html)).map(x=>({element:x.name,nativeReplacement:x.replacement,fallback:'sanitised legacy HTML',manualReview:true}))}

export function mapping(post:GhostPost){const t=post.title.toLowerCase();let type='article',confidence:'high'|'medium'|'low'='medium',review=false
  if(post.type==='page')type='page'
  else if(t.includes('community intelligence scorecard')&&t!=='the redditrepreneur community intelligence scorecard')type='scorecard'
  else if(t==='the redditrepreneur community intelligence scorecard')type='page'
  else if(t.includes('community intelligence weekly'))type='weekly'
  else if(t.includes('community intelligence index'))type='indexIssue'
  else if(t.includes('benchmark'))type='benchmark'
  else if(t==='what is community gravity?'||t.includes('community intelligence stack'))type='framework'
  else if(['apple:','gta 6','cernucci','streamer university','tiktok shop'].some(x=>t.includes(x)))type='caseStudy'
  else if(t==='what is community intelligence?')type='researchReport'
  else {review=true;confidence='low'}
  return {ghost_post_id:post.id,title:post.title,current_slug:post.slug,proposed_content_type:type,proposed_primary_topic:primaryTopic(post.title),confidence,manual_review:review}
}
function primaryTopic(title:string){const t=title.toLowerCase();if(t.includes('search')||t.includes('google'))return 'AI Search';if(t.includes('reddit'))return 'Reddit';if(t.includes('saas'))return 'B2B SaaS';if(t.includes('tiktok')||t.includes('streamer'))return 'Creator Economy';if(t.includes('scorecard')||t.includes('apple')||t.includes('gymshark')||t.includes('barclays'))return 'Brand Intelligence';return 'Community Intelligence'}
export function duplicateCandidates(posts:GhostPost[]){const exact=new Map<string,string[]>();for(const p of posts){const key=crypto.createHash('sha256').update((p.plaintext||'').replace(/\s+/g,' ').trim()).digest('hex');exact.set(key,[...(exact.get(key)||[]),p.slug])}return [...exact.values()].filter(x=>x.length>1)}
export function ensureDir(dir:string){fs.mkdirSync(dir,{recursive:true})}
export function arg(name:string){const i=process.argv.findIndex(x=>x===name||x.startsWith(`${name}=`));if(i<0)return undefined;return process.argv[i].includes('=')?process.argv[i].split('=').slice(1).join('='):process.argv[i+1]}
export function reportPath(name:string){const dir=path.resolve('reports/generated');ensureDir(dir);return path.join(dir,name)}
