import {content,type ContentType} from './content'
import {site} from './site'
const esc=(x:string)=>x.replace(/[<>&'\"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]!))
export function rss(title:string,types?:ContentType[]){const items=types?content.filter(x=>types.includes(x.type)):content;return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(title)}</title><link>${site.url}</link><description>${esc(site.description)}</description><language>en-gb</language>${items.map(x=>`<item><title>${esc(x.title)}</title><link>${site.url}/${x.slug}/</link><guid>${site.url}/${x.slug}/</guid><pubDate>${new Date(x.date).toUTCString()}</pubDate><description>${esc(x.excerpt)}</description></item>`).join('')}</channel></rss>`}
export const xml=(body:string)=>new Response(body,{headers:{'Content-Type':'application/rss+xml; charset=utf-8','Cache-Control':'public, max-age=0, s-maxage=3600'}})
