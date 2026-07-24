import fs from 'node:fs'
import {describe,expect,it} from 'vitest'
import {prepareImportedHtml} from '../lib/sanitise'

describe('presentation regressions',()=>{
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
