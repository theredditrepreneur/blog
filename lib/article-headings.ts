import type {ArticleHeading} from './sanitise'
import type {SanityBody} from './sanity-content'

function headingId(label:string,used:Map<string,number>){
  const base=label.toLowerCase().replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section'
  const count=(used.get(base)||0)+1
  used.set(base,count)
  return count===1?base:`${base}-${count}`
}

function blockText(block:Record<string,unknown>){
  if(!Array.isArray(block.children))return ''
  return block.children.map(child=>typeof child==='object'&&child&&'text' in child?String(child.text):'').join('').trim()
}

export function preparePortableHeadings(body:SanityBody|undefined){
  const headings:ArticleHeading[]=[]
  const idsByKey:Record<string,string>={}
  const used=new Map<string,number>()

  for(const [index,block] of (body||[]).entries()){
    if(block._type!=='block'||(block.style!=='h1'&&block.style!=='h2'&&block.style!=='h3'))continue
    const label=blockText(block)
    if(!label)continue
    const id=headingId(label,used)
    const key=typeof block._key==='string'?block._key:`heading-${index}`
    idsByKey[key]=id
    headings.push({id,label,level:block.style==='h1'?1:block.style==='h3'?3:2})
  }

  return {headings,idsByKey}
}
