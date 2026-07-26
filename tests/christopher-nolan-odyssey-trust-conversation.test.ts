import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  christopherNolanOdysseyArticle,
  christopherNolanOdysseyBody,
  christopherNolanOdysseyRelated,
} from '../lib/articles/christopher-nolan-odyssey-trust-conversation'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')

describe("Christopher Nolan's The Odyssey trust article",()=>{
  it('uses the requested published metadata',()=>{
    expect(christopherNolanOdysseyArticle.slug).toBe('christopher-nolan-the-odyssey-trust-conversation')
    expect(christopherNolanOdysseyArticle.topic).toBe('Community Intelligence')
    expect(christopherNolanOdysseyArticle.date).toBe('2026-07-26')
    expect(christopherNolanOdysseyArticle.draft).toBe(false)
    expect(christopherNolanOdysseyArticle.featured).toBe(true)
    expect(christopherNolanOdysseyArticle.subtitle).toContain('creator trust')
    expect(contentRegistry).toContain('christopherNolanOdysseyArticle,adobeAiPhotoCritiqueArticle')
  })

  it('uses verified release and IMAX sources',()=>{
    expect(christopherNolanOdysseyBody).toContain('universalpictures.ca/movie/the-odyssey')
    expect(christopherNolanOdysseyBody).toContain('www.imax.com/movie/the-odyssey')
    expect(christopherNolanOdysseyBody).toContain('now playing in cinemas')
    expect(christopherNolanOdysseyBody).toContain('first feature film shot entirely with IMAX film cameras')
  })

  it('is spoiler free and does not overstate audience agreement',()=>{
    expect(christopherNolanOdysseyBody).toContain('The reaction is not completely united')
    expect(christopherNolanOdysseyBody).toContain('Criticism does not automatically mean audiences have lost trust')
    expect(christopherNolanOdysseyBody).not.toContain('everyone agrees')
    expect(christopherNolanOdysseyBody).not.toContain('the ending')
    expect(christopherNolanOdysseyBody).not.toMatch(/—/)
    expect(christopherNolanOdysseyBody).not.toContain('<h1')
  })

  it('includes the requested editorial elements and CTA',()=>{
    expect(christopherNolanOdysseyBody).toContain('class="editors-note"')
    expect(christopherNolanOdysseyBody).toContain('Understand What Your Community Really Believes')
    expect(christopherNolanOdysseyBody).toContain('Explore Community Intelligence Services')
    expect(christopherNolanOdysseyBody).toContain('https://theredditrepreneur.com')
    expect(christopherNolanOdysseyRelated).toEqual([
      'the-rest-is-football-community-success-business-opportunities',
      'what-is-community-gravity',
      'community-intelligence-is-an-early-warning-system',
    ])
  })

  it('ships the supplied 16 by 9 cover image',()=>{
    const image=path.resolve('public/christopher-nolan-the-odyssey-trust-conversation.png')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(1600617)
    expect(christopherNolanOdysseyArticle.imageWidth).toBe(1672)
    expect(christopherNolanOdysseyArticle.imageHeight).toBe(941)
  })
})
