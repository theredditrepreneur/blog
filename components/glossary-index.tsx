'use client'

import {useMemo,useState} from 'react'
import Link from 'next/link'
import {glossarySlug,type GlossaryTerm} from '@/lib/glossary'

export function GlossaryIndex({terms}:{terms:GlossaryTerm[]}){
  const [query,setQuery]=useState('');const [topic,setTopic]=useState('All')
  const topics=['All',...Array.from(new Set(terms.map(term=>term.topic)))]
  const visible=useMemo(()=>terms.filter(term=>(topic==='All'||term.topic===topic)&&(`${term.term} ${term.definition}`.toLowerCase().includes(query.toLowerCase()))),[query,topic,terms])
  const letters=new Set(terms.map(term=>term.term[0]))
  return <>
    <section className="glossary-tools shell" aria-label="Glossary tools"><label htmlFor="glossary-search">Search the glossary</label><input id="glossary-search" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search terms and definitions"/><div className="filter-row" aria-label="Filter glossary by topic">{topics.map(value=><button type="button" className={topic===value?'active':''} aria-pressed={topic===value} onClick={()=>setTopic(value)} key={value}>{value}</button>)}</div></section>
    <nav className="alphabet shell" aria-label="Glossary alphabet">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter=>letters.has(letter)?<a key={letter} href={`#${letter}`}>{letter}</a>:<span className="disabled" aria-disabled="true" key={letter}>{letter}</span>)}</nav>
    <p className="shell result-count" aria-live="polite">{visible.length} {visible.length===1?'term':'terms'}</p>
    <section className="glossary-list shell">{visible.map((term,index)=>{const isFirstForLetter=visible.findIndex(item=>item.term[0]===term.term[0])===index;return <article id={isFirstForLetter?term.term[0]:`${term.term[0]}-${glossarySlug(term.term)}`} key={term.term}><div className="eyebrow">{term.topic}</div><h2>{term.term}</h2><p>{term.definition}</p><p className="related-terms"><strong>Related:</strong> {term.related.join(', ')}</p><Link href={`/glossary/${glossarySlug(term.term)}`}>Read the full definition</Link></article>})}</section>
  </>
}
