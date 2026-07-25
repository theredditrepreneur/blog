import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  hubspotCommunityGovernanceArticle,
  hubspotCommunityGovernanceBody,
  hubspotCommunityGovernanceRelated,
} from '../lib/articles/hubspot-community-governance-product-decision'

describe('HubSpot community governance case study',()=>{
  it('uses the approved published metadata',()=>{
    expect(hubspotCommunityGovernanceArticle.slug).toBe('hubspot-community-governance-product-decision')
    expect(hubspotCommunityGovernanceArticle.type).toBe('Case Study')
    expect(hubspotCommunityGovernanceArticle.topic).toBe('Community Intelligence')
    expect(hubspotCommunityGovernanceArticle.date).toBe('2026-07-25')
    expect(hubspotCommunityGovernanceArticle.draft).toBe(false)
  })

  it('preserves the supplied section structure',()=>{
    const headings=[...hubspotCommunityGovernanceBody.matchAll(/<h2>(.*?)<\/h2>/g)].map(match=>match[1])
    expect(headings).toEqual([
      'Customer Communities Are Becoming Product Governance Systems',
      'The Feature May Have Been Useful',
      'Feature Value and Permission Legitimacy Are Different',
      'The Four Stages of Community Intervention',
      'The Real Issue Was a Belief Change',
      'HubSpot Experienced a Trust Shock',
      'Narrative Compression Made the Risk Larger',
      'HubSpot&rsquo;s Brand Made the Backlash More Serious',
      'Communities Can Catch What Internal Teams Miss',
      'What SaaS Companies Should Learn',
      'Communities Are Not Just Feedback Channels',
      'Community Intelligence Is an Early Warning System',
      'A Better Decision Process',
      'Final Takeaway',
    ])
  })

  it('contains relevant framework links, related content and the inline CTA',()=>{
    expect(hubspotCommunityGovernanceBody).toContain('href="/what-is-community-intelligence"')
    expect(hubspotCommunityGovernanceBody).toContain('Belief-Correction')
    expect(hubspotCommunityGovernanceBody).toContain('Narrative-Compression')
    expect(hubspotCommunityGovernanceBody).toContain('https://theredditrepreneur.com')
    expect(hubspotCommunityGovernanceRelated).toEqual([
      'hubspot-just-made-reddit-a-performance-marketing-channel',
      'squarespace-price-increase-community-intelligence',
      'community-intelligence-is-an-early-warning-system',
    ])
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(hubspotCommunityGovernanceBody).not.toMatch(/[—™®]/)
    expect(hubspotCommunityGovernanceArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the supplied 16 by 9 cover image',()=>{
    const image=path.resolve('public/hubspot-community-governance-product-decision.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBeLessThan(200_000)
    expect(hubspotCommunityGovernanceArticle.imageWidth).toBe(1280)
    expect(hubspotCommunityGovernanceArticle.imageHeight).toBe(720)
  })
})
