'use client'

import {useState} from 'react'

export function SharePost({title,url}:{title:string,url:string}) {
  const [copied,setCopied]=useState(false)
  const encodedUrl=encodeURIComponent(url)
  const encodedTitle=encodeURIComponent(title)
  async function share() {
    if(navigator.share){await navigator.share({title,url});return}
    await navigator.clipboard.writeText(url)
    setCopied(true)
  }
  async function copyLink(){await navigator.clipboard.writeText(url);setCopied(true)}
  return <section className="share-post" aria-labelledby="share-heading">
    <div><div className="eyebrow">Share this post</div><h2 id="share-heading">Found this useful?</h2></div>
    <div className="share-actions">
      <button type="button" onClick={share}>Share</button>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
      <a href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer">X</a>
      <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>Email</a>
      <button type="button" onClick={copyLink}>{copied?'Copied':'Copy link'}</button>
    </div>
    <p className="share-status" aria-live="polite">{copied?'Link copied to your clipboard.':''}</p>
  </section>
}
