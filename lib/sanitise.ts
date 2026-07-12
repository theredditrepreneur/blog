export function sanitiseImportedHtml(html:string){return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi,'').replace(/javascript:/gi,'')}
