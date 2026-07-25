import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  squarespacePriceIncreaseArticle,
  squarespacePriceIncreaseBody,
  squarespacePriceIncreaseRelated,
} from '../lib/articles/squarespace-price-increase-community-intelligence'

describe('Squarespace price increase Community Intelligence case study',()=>{
  it('uses the approved published metadata',()=>{
    expect(squarespacePriceIncreaseArticle.slug).toBe('squarespace-price-increase-community-intelligence')
    expect(squarespacePriceIncreaseArticle.type).toBe('Case Study')
    expect(squarespacePriceIncreaseArticle.topic).toBe('Community Intelligence')
    expect(squarespacePriceIncreaseArticle.date).toBe('2026-07-25')
    expect(squarespacePriceIncreaseArticle.draft).toBe(false)
  })

  it('preserves the supplied section structure',()=>{
    const headings=[...squarespacePriceIncreaseBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'The Backlash Is Not One Emotion',
      'Customers Are Recalculating the Convenience Premium',
      'The Difference Between Anger and Churn Intent',
      'Legacy Customers Experience Price Increases Differently',
      'The Real Risk Is Belief Correction',
      'Narrative Compression Can Make the Problem Worse',
      'Pricing Communication Is Part of the Product Experience',
      'What Squarespace Should Monitor Next',
      'What Squarespace Should Do Next',
      'What This Teaches Every Subscription Business',
      'Final Takeaway',
    ])
  })

  it('contains relevant links, related content and the inline CTA',()=>{
    expect(squarespacePriceIncreaseBody).toContain('href="/what-is-community-intelligence"')
    expect(squarespacePriceIncreaseBody).toContain('Belief-Correction')
    expect(squarespacePriceIncreaseBody).toContain('Narrative-Compression')
    expect(squarespacePriceIncreaseBody).toContain('https://theredditrepreneur.com')
    expect(squarespacePriceIncreaseRelated).toHaveLength(3)
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(squarespacePriceIncreaseBody).not.toMatch(/[—™®]/)
    expect(squarespacePriceIncreaseArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the supplied 16 by 9 cover image',()=>{
    const image=path.resolve('public/squarespace-price-increase-community-intelligence.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(200_000)
    expect(squarespacePriceIncreaseArticle.imageWidth).toBe(1280)
    expect(squarespacePriceIncreaseArticle.imageHeight).toBe(720)
  })
})
