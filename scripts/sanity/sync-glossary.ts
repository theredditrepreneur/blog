import {getCliClient} from 'sanity/cli'
import {glossarySlug,glossaryTerms} from '../../lib/glossary'

const client=getCliClient({apiVersion:'2026-07-12'})
const authorId='ghost-author-6a3c71f79974230008809877'
const publishedAt='2026-07-13T00:00:00.000Z'
const block=(text:string,key:string)=>[{_type:'block',_key:key,style:'normal',markDefs:[],children:[{_type:'span',_key:`${key}-span`,text,marks:[]}]}]

let transaction=client.transaction()
for(const term of glossaryTerms){
  const slug=glossarySlug(term.term)
  const id=`glossary-${slug}`
  const fields={
    title:term.term,term:term.term,slug:{_type:'slug',current:slug},excerpt:term.definition,
    conciseDefinition:term.definition,fullDefinition:block(term.definition,`${slug}-definition`),
    whyItMatters:block(`${term.term} provides consistent language for interpreting community conversations and their implications.`,`${slug}-why`),
    example:block(`A Community Intelligence analysis may use ${term.term.toLowerCase()} to explain a repeated pattern in discovery, evaluation or recommendation.`,`${slug}-example`),
    author:{_type:'reference',_ref:authorId},publishedAt,topics:[],frameworks:[],relatedContent:[],featured:false,
    seo:{_type:'seo',title:`${term.term} Definition`.slice(0,60),description:term.definition.slice(0,160)},body:[],
  }
  transaction=transaction.createIfNotExists({_id:id,_type:'glossaryEntry',...fields}).patch(id,patch=>patch.set(fields))
}
await transaction.commit({visibility:'sync'})

transaction=client.transaction()
for(const term of glossaryTerms){
  const id=`glossary-${glossarySlug(term.term)}`
  const relatedTerms=term.related.map(label=>({_type:'reference',_key:glossarySlug(label),_ref:`glossary-${glossarySlug(label)}`}))
  transaction=transaction.patch(id,patch=>patch.set({relatedTerms}))
}
await transaction.commit({visibility:'sync'})

const result=await client.fetch(`{ "count": count(*[_type=="glossaryEntry"]), "items": *[_type=="glossaryEntry"]|order(term asc){_id,term,"slug":slug.current,"author":author->name,"relatedCount":count(relatedTerms)} }`)
console.log(JSON.stringify(result,null,2))
