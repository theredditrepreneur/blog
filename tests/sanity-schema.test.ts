import {readFileSync} from 'node:fs'
import {describe,expect,it} from 'vitest'

describe('Sanity editorial schema',()=>{
  it('uses the shared industry field only once in case studies',()=>{
    const documents=readFileSync('sanity/schema/documents.ts','utf8')
    const caseStudy=documents.match(/export const caseStudy=.*$/m)?.[0]||''
    expect(caseStudy).not.toContain("name:'industry'")
  })

  it('references reusable CTA documents from article bodies',()=>{
    const shared=readFileSync('sanity/schema/shared.ts','utf8')
    expect(shared).toContain("type:'reference',to:[{type:'callToAction'}]")
  })
})

describe('Sanity Studio security policy',()=>{
  it('allows the Sanity bridge required by the embedded Studio',()=>{
    const config=readFileSync('next.config.ts','utf8')
    expect(config).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com")
  })
})
