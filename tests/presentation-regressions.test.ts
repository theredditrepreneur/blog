import fs from 'node:fs'
import {describe,expect,it} from 'vitest'
import {prepareImportedHtml} from '../lib/sanitise'

describe('presentation regressions',()=>{
  it('includes imported body h1 headings without rendering another page h1',()=>{
    const prepared=prepareImportedHtml('<h1>Primary section</h1><h2>Supporting section</h2>')
    expect(prepared.headings).toEqual([
      {id:'primary-section',label:'Primary section',level:1},
      {id:'supporting-section',label:'Supporting section',level:2},
    ])
    expect(prepared.html).toContain('<h2 id="primary-section">Primary section</h2>')
    expect(prepared.html).not.toContain('<h1')
  })

  it('decodes typographic entities in article contents labels',()=>{
    const prepared=prepareImportedHtml('<h2>Editor&rsquo;s Note</h2><h2>Research &amp; Analysis</h2>')
    expect(prepared.headings.map(heading=>heading.label)).toEqual(["Editor’s Note",'Research & Analysis'])
    expect(prepared.html).toContain('id="editors-note"')
  })

  it('draws homepage arrows without depending on a text glyph',()=>{
    const css=fs.readFileSync('app/globals.css','utf8')
    expect(css).toContain(".signal-visual i:after{content:''")
    expect(css).toContain('border-bottom:2px solid var(--orange);transform:rotate(45deg)')
  })
})
