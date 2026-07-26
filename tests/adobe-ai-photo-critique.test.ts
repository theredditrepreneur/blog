import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {adobeAiPhotoCritiqueArticle,adobeAiPhotoCritiqueBody,adobeAiPhotoCritiqueRelated} from '../lib/articles/adobe-ai-photo-critique'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')

describe('Adobe AI photo critique article',()=>{
  it('uses the requested published metadata',()=>{
    expect(adobeAiPhotoCritiqueArticle.slug).toBe('adobe-ai-photo-critique')
    expect(adobeAiPhotoCritiqueArticle.topic).toBe('Artificial Intelligence')
    expect(adobeAiPhotoCritiqueArticle.date).toBe('2026-07-26')
    expect(adobeAiPhotoCritiqueArticle.draft).toBe(false)
    expect(adobeAiPhotoCritiqueArticle.seoTitle).toBe('Adobe AI Photo Critique: Who Decides What Good Looks Like?')
    expect(contentRegistry).toContain('adobeAiPhotoCritiqueArticle,tripComAiTravelAgentArticle')
    expect(contentRegistry).toContain("'Artificial Intelligence'")
  })

  it('describes the experiment accurately',()=>{
    expect(adobeAiPhotoCritiqueBody).toContain('experimental camera app')
    expect(adobeAiPhotoCritiqueBody).toContain('This is not a finished feature available to every Adobe customer')
    expect(adobeAiPhotoCritiqueBody).toContain('Adobe is still working on parts of the idea')
    expect(adobeAiPhotoCritiqueBody).toContain('research.adobe.com/articles/playground/playground.html')
    expect(adobeAiPhotoCritiqueBody).toContain('research.adobe.com/articles/indigo/indigo.html')
  })

  it('includes the requested editorial elements and working internal routes',()=>{
    expect(adobeAiPhotoCritiqueBody).toContain("<h2 id=\"adobe-editor-note-title\">Editor's Note</h2>")
    expect(adobeAiPhotoCritiqueBody).toContain('Something to Remember')
    expect(adobeAiPhotoCritiqueBody).toContain('Explore Community Intelligence Audits')
    expect(adobeAiPhotoCritiqueBody).toContain('href="/what-is-community-intelligence"')
    expect(adobeAiPhotoCritiqueBody).toContain('href="/the-ai-authority-formula"')
    expect(adobeAiPhotoCritiqueBody).toContain('href="/the-ai-evidence-layer-is-more-important-than-any-single-platform"')
    expect(adobeAiPhotoCritiqueBody).toContain('href="/community-intelligence-is-an-early-warning-system"')
    expect(adobeAiPhotoCritiqueRelated).toEqual([
      'youtube-is-fighting-ai-slop-while-teaching-creators-to-make-more-ai-content',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'community-intelligence-is-an-early-warning-system',
    ])
  })

  it('contains no duplicate title or prohibited punctuation',()=>{
    expect(adobeAiPhotoCritiqueBody).not.toContain('<h1')
    expect(adobeAiPhotoCritiqueBody).not.toMatch(/—/)
    expect(adobeAiPhotoCritiqueArticle.title).not.toMatch(/—/)
    expect(adobeAiPhotoCritiqueArticle.metaDescription).not.toMatch(/—/)
  })

  it('ships the supplied 16 by 9 cover image',()=>{
    const image=path.resolve('public/adobe-ai-photo-critique.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(fs.statSync(image).size).toBe(178622)
    expect(adobeAiPhotoCritiqueArticle.imageWidth).toBe(1280)
    expect(adobeAiPhotoCritiqueArticle.imageHeight).toBe(720)
  })
})
