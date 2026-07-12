'use client'

import {useMemo,useState} from 'react'
import {ContentCard} from './cards'
import type {ContentItem} from '@/lib/content'

const filters=['All','Research','Scorecards','Case Studies','Frameworks','Benchmarks','Weekly'] as const
const typeFor:Record<string,string>={Scorecards:'Scorecard','Case Studies':'Case Study',Frameworks:'Framework',Benchmarks:'Benchmark'}

export function LatestResearch({items}:{items:ContentItem[]}){
  const [active,setActive]=useState('All')
  const visible=useMemo(()=>active==='All'?items:items.filter(item=>item.type===(typeFor[active]||active)),[active,items])
  return <>
    <div className="filter-row" aria-label="Filter latest research">
      {filters.map(filter=><button type="button" className={active===filter?'active':''} aria-pressed={active===filter} onClick={()=>setActive(filter)} key={filter}>{filter}</button>)}
    </div>
    <p className="result-count" aria-live="polite">{visible.length} {visible.length===1?'item':'items'}</p>
    {visible.length?<div className="card-grid">{visible.map(item=><ContentCard key={item.slug} item={item}/>)}</div>:<div className="empty-state"><h3>No recent {active.toLowerCase()} yet</h3><p>Explore the dedicated archive for earlier publications and new additions.</p></div>}
  </>
}
