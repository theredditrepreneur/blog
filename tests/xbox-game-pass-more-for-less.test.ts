import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  xboxGamePassArticle,
  xboxGamePassBody,
  xboxGamePassRelated,
} from '../lib/articles/xbox-game-pass-more-for-less'

describe('Xbox Game Pass expectation debt case study',()=>{
  it('uses the requested published metadata',()=>{
    expect(xboxGamePassArticle.slug).toBe('xbox-game-pass-more-for-less')
    expect(xboxGamePassArticle.type).toBe('Case Study')
    expect(xboxGamePassArticle.topic).toBe('Community Intelligence')
    expect(xboxGamePassArticle.date).toBe('2026-07-26')
    expect(xboxGamePassArticle.draft).toBe(false)
  })

  it('states the verified restructuring facts carefully',()=>{
    expect(xboxGamePassBody).toContain('about 3,200 roles')
    expect(xboxGamePassBody).toContain('About 1,600')
    expect(xboxGamePassBody).toContain('Compulsion Games and Double Fine')
    expect(xboxGamePassBody).toContain('Ninja Theory and Undead Labs')
    expect(xboxGamePassBody).toContain('Xbox did not announce its closure')
    expect(xboxGamePassBody).toContain('Asha Sharma, CEO Xbox')
    expect(xboxGamePassBody).toContain('not accurate to say that Game Pass alone caused the restructure')
  })

  it('uses current UK Game Pass plans and launch access',()=>{
    expect(xboxGamePassBody).toContain('Game Pass Ultimate at £16.99 a month')
    expect(xboxGamePassBody).toContain('Game Pass Premium at £10.99 a month')
    expect(xboxGamePassBody).toContain('Game Pass Essential at £6.99 a month')
    expect(xboxGamePassBody).toContain('PC Game Pass at £10.99 a month')
    expect(xboxGamePassBody).toContain('major games on their release day')
    expect(xboxGamePassBody).toContain('within twelve months')
    expect(xboxGamePassBody).toContain('Call of Duty')
  })

  it('includes the frameworks, takeaways and related cases',()=>{
    expect(xboxGamePassBody).toContain('href="/what-is-community-intelligence"')
    expect(xboxGamePassBody).toContain('community-intelligence-audit')
    expect(xboxGamePassBody).toContain('Belief-Correction-388026b0422280249396c6fb9ec32a6d')
    expect(xboxGamePassBody).toContain('Narrative-Compression-388026b0422280178e89ee70e3aeb49e')
    expect(xboxGamePassBody).toContain('Hype-Hangover-388026b04222805e8508c7f3f434ba82')
    expect(xboxGamePassBody).toContain('What This Means')
    expect(xboxGamePassRelated).toEqual([
      'amazon-games-inside-prime-video',
      'meta-glasses-monthly-charge-ownership',
      'squarespace-price-increase-community-intelligence',
    ])
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(xboxGamePassBody).not.toMatch(/[—™®]/)
    expect(xboxGamePassArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the original 16 by 9 cover image',()=>{
    const image=path.resolve('public/xbox-game-pass-more-for-less.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(xboxGamePassArticle.imageWidth).toBe(1280)
    expect(xboxGamePassArticle.imageHeight).toBe(720)
  })
})
