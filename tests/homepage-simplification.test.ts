import {readFileSync} from 'node:fs'
import {describe,expect,it} from 'vitest'

const home=readFileSync('app/page.tsx','utf8')
const latestResearch=readFileSync('components/latest-research.tsx','utf8')

describe('homepage simplification',()=>{
  it('starts with featured articles instead of the introductory hero',()=>{
    expect(home).not.toContain('Understand the Conversations Shaping Brands, Markets and Culture')
    expect(home).not.toContain('className="hero shell"')
    expect(home).toContain('featured-research-section')
  })

  it('only shows latest-research filters that have matching items',()=>{
    expect(latestResearch).toContain("items.some(item=>item.type===(typeFor[filter]||filter))")
    expect(latestResearch).toContain("Articles:'Article'")
  })
})
