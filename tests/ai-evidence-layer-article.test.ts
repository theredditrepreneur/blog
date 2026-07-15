import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {aiEvidenceLayerArticle,aiEvidenceLayerBody,aiEvidenceLayerRelated} from '../lib/articles/ai-evidence-layer'

describe('AI Evidence Layer research article',()=>{
  it('uses the established published article metadata',()=>{
    expect(aiEvidenceLayerArticle.draft).toBe(false)
    expect(aiEvidenceLayerArticle.date).toBe('2026-07-15')
    expect(aiEvidenceLayerArticle.slug).toBe('the-ai-evidence-layer-is-more-important-than-any-single-platform')
    expect(aiEvidenceLayerArticle.topic).toBe('AI Search')
    expect(aiEvidenceLayerArticle.seoTitle?.length).toBeLessThanOrEqual(60)
  })

  it('preserves the requested table of contents structure',()=>{
    const headings=[...aiEvidenceLayerBody.matchAll(/<h2(?: id="[^"]+")?>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'We Have Been Thinking About Platforms Instead Of Evidence',
      'The Internet Is Becoming One Large Evidence Layer',
      'Three Types Of Evidence',
      'Why Community Evidence Is Growing In Importance',
      'AI Does Not Read Marketing Alone',
      'The Strongest Brands Build Every Layer',
      'Community Intelligence Connects The Evidence',
      'AI Authority Is Built On Evidence',
      'The Future Belongs To Evidence',
      'Final Thought',
      'Understand The Evidence Surrounding Your Brand',
    ])
  })

  it('contains the framework, three evidence cards and service hierarchy',()=>{
    expect(aiEvidenceLayerBody).toContain('class="evidence-framework-callout"')
    expect(aiEvidenceLayerBody).toContain('class="evidence-type-grid"')
    expect(aiEvidenceLayerBody).toContain('https://www.theredditrepreneur.com/services/ai-authority-audit')
    expect(aiEvidenceLayerBody).toContain('https://www.theredditrepreneur.com/services/community-intelligence-audit')
    expect(aiEvidenceLayerBody).toContain('https://www.theredditrepreneur.com/services/reddit-authenticity-risk-audit')
    expect(aiEvidenceLayerBody).toContain('https://www.theredditrepreneur.com/services/fractional-chief-community-intelligence-officer')
  })

  it('uses deliberate internal relationships',()=>{
    expect(aiEvidenceLayerBody).toContain('https://www.theredditrepreneur.com/community-intelligence')
    expect(aiEvidenceLayerBody).toContain('/the-ai-authority-formula')
    expect(aiEvidenceLayerRelated).toEqual([
      'the-ai-authority-formula',
      'the-community-intelligence-stack-turning-conversations-into-competitive-advantage',
      'reddit-is-using-ai-to-fight-ai-slop',
    ])
  })

  it('contains no prohibited typography in article prose',()=>{
    const prose=aiEvidenceLayerBody.replace(/<[^>]+>/g,' ')
    expect(prose).not.toContain('—')
    expect(prose).not.toContain('™')
    expect(prose).not.toContain('®')
    expect(prose).not.toMatch(/[A-Za-z]-[A-Za-z]/)
  })

  it('ships the optimised 16 by 9 cover asset',()=>{
    const image=path.resolve('public/ai-evidence-layer-cover.webp')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(150_000)
    expect(aiEvidenceLayerArticle.imageWidth).toBe(1280)
    expect(aiEvidenceLayerArticle.imageHeight).toBe(720)
  })
})
