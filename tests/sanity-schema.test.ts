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
