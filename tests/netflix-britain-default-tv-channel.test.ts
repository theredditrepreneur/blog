import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  netflixBritainDefaultTvChannelArticle,
  netflixBritainDefaultTvChannelBody,
  netflixBritainDefaultTvChannelRelated,
} from '../lib/articles/netflix-britain-default-tv-channel'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')+fs.readFileSync('lib/local-bodies.ts','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('Netflix Britain default TV channel article',()=>{
  it('uses the requested published metadata',()=>{
    expect(netflixBritainDefaultTvChannelArticle.slug).toBe('netflix-has-become-britains-default-tv-channel')
    expect(netflixBritainDefaultTvChannelArticle.topic).toBe('Community Intelligence')
    expect(netflixBritainDefaultTvChannelArticle.date).toBe('2026-07-29')
    expect(netflixBritainDefaultTvChannelArticle.draft).toBe(false)
    expect(netflixBritainDefaultTvChannelArticle.featured).toBe(true)
    expect(netflixBritainDefaultTvChannelArticle.seoTitle).toBe("Netflix Has Become Britain's Default TV Channel")
    expect(netflixBritainDefaultTvChannelArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('netflixBritainDefaultTvChannelArticle,cyeraInvisibleAiWorkforceArticle')
    expect(routeRegistry).toContain('[netflixBritainDefaultTvChannelArticle.slug]:netflixBritainDefaultTvChannelBody')
    expect(routeRegistry).toContain('isNetflixBritainDefaultTvChannel')
    expect(articlePage).toContain('[netflixBritainDefaultTvChannelArticle.slug]:netflixBritainDefaultTvChannelRelated')
    expect(articlePage).toContain('item.slug!==netflixBritainDefaultTvChannelArticle.slug')
  })

  it('keeps the editorial, framework and CTA requirements',()=>{
    expect(netflixBritainDefaultTvChannelBody).not.toContain('<h1')
    expect(netflixBritainDefaultTvChannelBody).not.toContain('—')
    expect(netflixBritainDefaultTvChannelBody).not.toMatch(/[™®]/)
    expect(netflixBritainDefaultTvChannelBody).not.toContain('Continue reading')
    expect(netflixBritainDefaultTvChannelBody).toContain('Discovery Ownership Gap')
    expect(netflixBritainDefaultTvChannelBody).toContain('Cultural Starting Point Fragmentation')
    expect(netflixBritainDefaultTvChannelBody).toContain('Recommendation to Culture Pipeline')
    expect(netflixBritainDefaultTvChannelBody).toContain('Community Memory Advantage')
    expect(netflixBritainDefaultTvChannelBody).toContain('What This Means')
    expect(netflixBritainDefaultTvChannelBody).toContain('Book a Community Intelligence Audit')
    expect(netflixBritainDefaultTvChannelBody).toContain('Explore The Redditrepreneur')
  })

  it('uses current primary evidence and safe external links',()=>{
    expect(netflixBritainDefaultTvChannelBody).toContain("29% of UK adults and teenagers")
    expect(netflixBritainDefaultTvChannelBody).toContain("The BBC also remains Britain's largest source of total video viewing")
    expect(netflixBritainDefaultTvChannelBody).toContain('ofcom.org.uk/siteassets/resources/documents/research-and-data/multi-sector/media-nations/2025')
    expect(netflixBritainDefaultTvChannelBody).toContain('barb.co.uk/news/barb-data-show-that-20-8m-uk-homes')
    const externalLinks=[...netflixBritainDefaultTvChannelBody.matchAll(/<a href="https:\/\/[^"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied cover and real related articles',()=>{
    const image=path.resolve('public/netflix-britain-default-tv-channel-cover.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(957590)
    expect(netflixBritainDefaultTvChannelArticle.imageWidth).toBe(1672)
    expect(netflixBritainDefaultTvChannelArticle.imageHeight).toBe(941)
    expect(netflixBritainDefaultTvChannelArticle.imageAlt).toBe("Netflix has become Britain's default TV channel, illustrated by traditional television changing into streaming.")
    expect(netflixBritainDefaultTvChannelRelated).toEqual([
      'the-rest-is-football-community-success-business-opportunities',
      'christopher-nolan-the-odyssey-trust-conversation',
      'x-men-97-season-2-community-intelligence-episode-6',
    ])
  })
})
