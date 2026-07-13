export function sanitiseImportedHtml(html:string){
  const safe=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi,'').replace(/javascript:/gi,'')
  return safe.split(/(<[^>]+>)/g).map(part=>part.startsWith('<')?part:part.replace(/([A-Za-z])-([A-Za-z])/g,'$1 $2')).join('')
}

export type ArticleHeading={id:string;label:string;level:2|3}

export function prepareImportedHtml(html:string){
  const headings:ArticleHeading[]=[]
  const used=new Map<string,number>()
  const safe=sanitiseImportedHtml(html).replace(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi,'<h2$1>$2</h2>')
  const prepared=safe.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,(_,level,attrs,inner)=>{
    const label=String(inner).replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').trim()
    const base=label.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section'
    const count=(used.get(base)||0)+1;used.set(base,count)
    const id=count===1?base:`${base}-${count}`
    headings.push({id,label,level:Number(level) as 2|3})
    return `<h${level}${String(attrs).replace(/\sid=("[^"]*"|'[^']*')/i,'')} id="${id}">${inner}</h${level}>`
  })
  return {html:prepared,headings}
}
