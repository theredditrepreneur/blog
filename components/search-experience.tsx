'use client'

import {useMemo,useState} from 'react'
import Link from 'next/link'
import {content,frameworks,topics} from '@/lib/content'
import {getIndustry,industries} from '@/lib/industries'

function Highlight({text,query}:{text:string,query:string}){if(!query)return text;const index=text.toLowerCase().indexOf(query.toLowerCase());if(index<0)return text;return <>{text.slice(0,index)}<mark>{text.slice(index,index+query.length)}</mark>{text.slice(index+query.length)}</>}

export function SearchExperience({initialQuery=''}:{initialQuery?:string}){
  const [q,setQ]=useState(initialQuery)
  const [industry,setIndustry]=useState('All')
  const [framework,setFramework]=useState('All')
  const [topic,setTopic]=useState('All')
  const [sort,setSort]=useState('relevance')
  const results=useMemo(()=>content.filter(item=>{
    const itemIndustry=getIndustry(item)
    const corpus=[item.title,item.excerpt,item.topic,...(item.tags||[]),itemIndustry.name,itemIndustry.deskName,...itemIndustry.frameworks].filter(Boolean).join(' ').toLowerCase()
    const matchesIndustry=industry==='All'||itemIndustry.slug===industry
    const matchesFramework=framework==='All'||item.type==='Framework'&&item.title.toLowerCase().includes(framework.toLowerCase())||itemIndustry.frameworks.includes(framework)||corpus.includes(framework.toLowerCase())
    const matchesTopic=topic==='All'||item.topic===topic||item.tags?.includes(topic)
    return matchesIndustry&&matchesFramework&&matchesTopic&&corpus.includes(q.toLowerCase())
  }).sort((a,b)=>sort==='newest'?b.date.localeCompare(a.date):(q&&b.title.toLowerCase().includes(q.toLowerCase())?1:0)-(q&&a.title.toLowerCase().includes(q.toLowerCase())?1:0)),[q,industry,framework,topic,sort])

  return <>
    <header className="search-hero shell"><span className="publication-kicker">Publication search</span><h1>Search the research</h1><p>Find analysis by industry, framework, company, brand, keyword or topic.</p></header>
    <section className="search-panel publication-search shell">
      <label htmlFor="site-search">Keyword, company, brand or topic</label>
      <input id="site-search" type="search" value={q} onChange={event=>setQ(event.target.value)} placeholder="Try ‘Fortnite’, ‘trust’ or ‘Community Gravity’"/>
      <div className="search-options">
        <label htmlFor="industry-filter">Industry<select id="industry-filter" value={industry} onChange={event=>setIndustry(event.target.value)}><option>All</option>{industries.map(value=><option value={value.slug} key={value.slug}>{value.name}</option>)}</select></label>
        <label htmlFor="framework-filter">Framework<select id="framework-filter" value={framework} onChange={event=>setFramework(event.target.value)}><option>All</option>{frameworks.map(value=><option key={value}>{value}</option>)}</select></label>
        <label htmlFor="topic-filter">Topic<select id="topic-filter" value={topic} onChange={event=>setTopic(event.target.value)}><option>All</option>{topics.map(value=><option key={value}>{value}</option>)}</select></label>
        <label htmlFor="sort-results">Sort<select id="sort-results" value={sort} onChange={event=>setSort(event.target.value)}><option value="relevance">Relevance</option><option value="newest">Newest</option></select></label>
      </div>
      <h2 className="results-heading">{q?`Results for “${q}”`:'All research'}</h2>
      <p aria-live="polite">{results.length} {results.length===1?'result':'results'}</p>
      {results.length?<div className="search-results">{results.map(item=>{const itemIndustry=getIndustry(item);return <article key={item.slug}><div className="card-taxonomy"><Link className="industry-badge" href={`/industries/${itemIndustry.slug}`}>{itemIndustry.name}</Link><span>{item.type}{item.topic?` · ${item.topic}`:''}</span></div><h3><Link href={`/${item.slug}`}><Highlight text={item.title} query={q}/></Link></h3><p><Highlight text={item.excerpt} query={q}/></p></article>})}</div>:<div className="empty-state"><h3>No matching research</h3><p>Try a broader phrase, remove a filter, or explore the <Link href="/industries">industry desks</Link>.</p></div>}
    </section>
  </>
}
