import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  londonRobotaxiCommunityTrustArticle,
  londonRobotaxiCommunityTrustBody,
  londonRobotaxiCommunityTrustRelated,
} from '../lib/articles/london-robotaxi-race-community-trust'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')
const routeRegistry=fs.readFileSync('app/[slug]/page.tsx','utf8')+fs.readFileSync('lib/local-bodies.ts','utf8')
const articlePage=fs.readFileSync('components/article-page.tsx','utf8')

describe('London robotaxi community trust article',()=>{
  it('uses the requested published metadata',()=>{
    expect(londonRobotaxiCommunityTrustArticle.slug).toBe('london-robotaxi-race-community-trust')
    expect(londonRobotaxiCommunityTrustArticle.topic).toBe('Community Intelligence')
    expect(londonRobotaxiCommunityTrustArticle.date).toBe('2026-07-29')
    expect(londonRobotaxiCommunityTrustArticle.draft).toBe(false)
    expect(londonRobotaxiCommunityTrustArticle.featured).toBe(true)
    expect(londonRobotaxiCommunityTrustArticle.seoTitle).toBe('London’s Robotaxi Race Is a Community Trust Test')
    expect(londonRobotaxiCommunityTrustArticle.readingMinutes).toBeGreaterThan(0)
  })

  it('is registered for listings, routing, metadata and related articles',()=>{
    expect(contentRegistry).toContain('londonRobotaxiCommunityTrustArticle,haloPlaystationCommunityIntelligenceArticle')
    expect(routeRegistry).toContain('[londonRobotaxiCommunityTrustArticle.slug]:londonRobotaxiCommunityTrustBody')
    expect(routeRegistry).toContain('isLondonRobotaxiCommunityTrust')
    expect(articlePage).toContain('[londonRobotaxiCommunityTrustArticle.slug]:londonRobotaxiCommunityTrustRelated')
  })

  it('keeps the editorial, framework and CTA requirements',()=>{
    expect(londonRobotaxiCommunityTrustBody).not.toContain('<h1')
    expect(londonRobotaxiCommunityTrustBody).not.toContain('—')
    expect(londonRobotaxiCommunityTrustBody).not.toMatch(/[™®]/)
    expect(londonRobotaxiCommunityTrustBody).not.toContain('Continue reading')
    expect(londonRobotaxiCommunityTrustBody).toContain('Involuntary User Community')
    expect(londonRobotaxiCommunityTrustBody).toContain('Shared Space Trust')
    expect(londonRobotaxiCommunityTrustBody).toContain('Passenger-Public Trust Gap')
    expect(londonRobotaxiCommunityTrustBody).toContain('Encounter-Led Adoption')
    expect(londonRobotaxiCommunityTrustBody).toContain('Incident Narrative Multiplication')
    expect(londonRobotaxiCommunityTrustBody).toContain("Editor's Note")
    expect(londonRobotaxiCommunityTrustBody).toContain('Book a Community Intelligence Audit')
  })

  it('uses current official sources and safe external links',()=>{
    expect(londonRobotaxiCommunityTrustBody).toContain('gov.uk/government/news/passengers-one-step-closer')
    expect(londonRobotaxiCommunityTrustBody).toContain('london-assembly-current-investigations/autonomous-passenger-vehicles-london')
    expect(londonRobotaxiCommunityTrustBody).toContain('london.gov.uk/rise-robotaxis-london')
    const externalLinks=[...londonRobotaxiCommunityTrustBody.matchAll(/<a href="https:\/\/[^\"]+"[^>]*>/g)].map(match=>match[0])
    expect(externalLinks.length).toBeGreaterThan(0)
    for(const link of externalLinks){
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
  })

  it('uses the supplied 16:9 cover and existing related articles',()=>{
    const image=path.resolve('public/london-robotaxi-race-community-trust.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(226174)
    expect(londonRobotaxiCommunityTrustArticle.imageWidth).toBe(1280)
    expect(londonRobotaxiCommunityTrustArticle.imageHeight).toBe(720)
    expect(londonRobotaxiCommunityTrustArticle.imageAlt).toBe('A modern autonomous London taxi surrounded by pedestrians, cyclists and other road users, representing the communities affected by robotaxis.')
    expect(londonRobotaxiCommunityTrustRelated).toEqual([
      'meta-smart-glasses-bystander-trust-problem',
      'what-is-community-intelligence',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
    ])
  })
})
