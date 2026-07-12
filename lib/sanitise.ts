export function sanitiseImportedHtml(html:string){
  const safe=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi,'').replace(/javascript:/gi,'')
  return safe.split(/(<[^>]+>)/g).map(part=>part.startsWith('<')?part:part.replace(/([A-Za-z])-([A-Za-z])/g,'$1 $2')).join('')
}
