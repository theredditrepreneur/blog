'use client'

import {useEffect,useState} from 'react'
import type {ArticleHeading} from '@/lib/sanitise'

export function ArticleOutline({headings}:{headings:ArticleHeading[]}){
  const [activeId,setActiveId]=useState(headings[0]?.id||'')

  useEffect(()=>{
    if(!headings.length)return
    let frame=0
    const update=()=>{
      frame=0
      let current=headings[0].id
      for(const heading of headings){
        const element=document.getElementById(heading.id)
        if(element&&element.getBoundingClientRect().top<=170)current=heading.id
      }
      setActiveId(current)
    }
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
    update()
    window.addEventListener('scroll',onScroll,{passive:true})
    window.addEventListener('hashchange',update)
    return ()=>{
      window.removeEventListener('scroll',onScroll)
      window.removeEventListener('hashchange',update)
      if(frame)cancelAnimationFrame(frame)
    }
  },[headings])

  if(!headings.length)return null
  const links=headings.map(heading=><a className={activeId===heading.id?'active':undefined} aria-current={activeId===heading.id?'location':undefined} data-level={heading.level} href={`#${heading.id}`} key={heading.id}>{heading.label}</a>)

  return <>
    <aside className="article-outline" aria-label="Article outline">
      <strong>On this page</strong>
      <nav>{links}</nav>
      <a className="back-top" href="#top">Back to top</a>
    </aside>
    <details className="article-outline-mobile">
      <summary>On this page</summary>
      <nav>{links}</nav>
    </details>
  </>
}
