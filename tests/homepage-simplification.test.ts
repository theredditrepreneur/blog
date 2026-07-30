import {readFileSync} from 'node:fs'
import {describe,expect,it} from 'vitest'

const home=readFileSync('app/page.tsx','utf8')
const latestResearch=readFileSync('components/latest-research.tsx','utf8')

describe('homepage publication direction',()=>{
  it('starts with a concise publication mission and editorial desks',()=>{
    expect(home).not.toContain('Understand the Conversations Shaping Brands, Markets and Culture')
    expect(home).not.toContain('className="hero shell"')
    expect(home).toContain('publication-hero')
    expect(home).toContain("We publish Community Intelligence for the world&apos;s most important industries.")
    expect(home).toContain('Industries We Track')
  })

  it('only shows latest-research filters that have matching items',()=>{
    expect(latestResearch).toContain("items.some(item=>item.type===(typeFor[filter]||filter))")
    expect(latestResearch).toContain("Articles:'Article'")
  })
})
