import {describe,expect,it} from 'vitest'
import {readFileSync} from 'node:fs'
import {getIndustry,industries} from '../lib/industries'

describe('publication-first redesign',()=>{
  it('defines the six editorial desks',()=>{
    expect(industries.map(industry=>industry.slug)).toEqual(['gaming','ai','sport','saas','consumer-brands','entertainment'])
  })

  it('assigns content to one primary industry',()=>{
    const gaming=getIndustry({title:'A Fortnite game community',slug:'example',type:'Article',excerpt:'Gaming analysis',date:'2026-07-30'} as never)
    const sport=getIndustry({title:'Football supporters',slug:'example-two',type:'Article',excerpt:'Sport analysis',date:'2026-07-30'} as never)
    expect(gaming.slug).toBe('gaming')
    expect(sport.slug).toBe('sport')
  })

  it('makes frameworks first-class publication content',()=>{
    const source=readFileSync('lib/content.ts','utf8')
    expect(source).toContain('Community Intelligence Stack')
    expect(source).toContain('Community Intelligence Scorecard')
    expect(source).toContain('Customer Insight Triangle')
    expect(source).toContain('Community Gravity')
  })

  it('preserves article routing while adding desk routes to the sitemap',()=>{
    const sitemap=readFileSync('app/sitemap.ts','utf8')
    expect(sitemap).toContain('...content.map')
    expect(sitemap).toContain('industries.map')
    expect(readFileSync('app/industries/[slug]/page.tsx','utf8')).toContain('generateStaticParams')
  })

  it('uses publication positioning and industry-aware article exploration',()=>{
    expect(readFileSync('app/page.tsx','utf8')).toContain("We publish Community Intelligence for the world&apos;s most important industries.")
    expect(readFileSync('components/article-page.tsx','utf8')).toContain('ArticleDeskLink')
    expect(readFileSync('app/layout.tsx','utf8')).toContain('NewsMediaOrganization')
  })
})
