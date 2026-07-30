import {readFileSync} from 'node:fs'
import {describe,expect,it} from 'vitest'

const home=readFileSync('app/page.tsx','utf8')
const latestResearch=readFileSync('components/latest-research.tsx','utf8')

describe('homepage publication direction',()=>{
  it('starts with the latest research instead of introductory marketing',()=>{
    expect(home).not.toContain('Understand the Conversations Shaping Brands, Markets and Culture')
    expect(home).not.toContain('className="hero shell"')
    expect(home).not.toContain('publication-hero')
    expect(home).not.toContain('Industries We Track')
    expect(home).not.toContain('Community Intelligence Frameworks')
    expect(home.indexOf('Latest Research')).toBeLessThan(home.indexOf('Featured Research'))
  })

  it('only shows latest-research filters that have matching items',()=>{
    expect(latestResearch).toContain("items.some(item=>item.type===(typeFor[filter]||filter))")
    expect(latestResearch).toContain("Articles:'Article'")
  })
})
