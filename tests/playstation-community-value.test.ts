import fs from 'node:fs'
import {describe,expect,it} from 'vitest'
import {playstationCommunityValueArticle,playstationCommunityValueBody} from '../lib/articles/playstation-community-more-valuable-than-hardware'

const contentRegistry=fs.readFileSync('lib/content.ts','utf8')

describe('PlayStation community value article',()=>{
  it('is published in the main content feed with complete metadata',()=>{
    expect(contentRegistry).toContain('playstationCommunityValueArticle')
    expect(playstationCommunityValueArticle.draft).toBe(false)
    expect(playstationCommunityValueArticle.industry).toBe('gaming')
    expect(playstationCommunityValueArticle.image).toBe('/playstation-community-more-valuable-than-hardware-cover.png')
    expect(playstationCommunityValueArticle.imageAlt).toContain('PlayStation 5 console')
  })

  it('keeps the analysis cautious and provides sources',()=>{
    expect(playstationCommunityValueBody).toContain('do not explain why')
    expect(playstationCommunityValueBody).toContain('The outcome is not guaranteed')
    expect(playstationCommunityValueBody).toContain('<h2>Sources</h2>')
    expect(playstationCommunityValueBody).not.toContain('—')
  })
})
