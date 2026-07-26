import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  amazonPrimeVideoGamesArticle,
  amazonPrimeVideoGamesBody,
  amazonPrimeVideoGamesRelated,
} from '../lib/articles/amazon-games-inside-prime-video'

describe('Amazon games inside Prime Video case study',()=>{
  it('uses the requested published metadata',()=>{
    expect(amazonPrimeVideoGamesArticle.slug).toBe('amazon-games-inside-prime-video')
    expect(amazonPrimeVideoGamesArticle.type).toBe('Case Study')
    expect(amazonPrimeVideoGamesArticle.topic).toBe('Community Intelligence')
    expect(amazonPrimeVideoGamesArticle.date).toBe('2026-07-26')
    expect(amazonPrimeVideoGamesArticle.draft).toBe(false)
  })

  it('states the verified limits of the launch',()=>{
    expect(amazonPrimeVideoGamesBody).toContain('Fire TV devices')
    expect(amazonPrimeVideoGamesBody).toContain('United States and the United Kingdom')
    expect(amazonPrimeVideoGamesBody).toContain('not yet a global launch')
    expect(amazonPrimeVideoGamesBody).toContain('Luna Premium is a separate subscription')
    expect(amazonPrimeVideoGamesBody).toContain('compatible controller or turn their phone into a controller')
    expect(amazonPrimeVideoGamesBody).toContain('Hogwarts Legacy')
    expect(amazonPrimeVideoGamesBody).toContain('EA Sports FC 26')
    expect(amazonPrimeVideoGamesBody).toContain('Indiana Jones and the Great Circle')
  })

  it('accurately explains the earlier Luna changes',()=>{
    expect(amazonPrimeVideoGamesBody).toContain('On 10 April 2026')
    expect(amazonPrimeVideoGamesBody).toContain('EA, GOG and Ubisoft')
    expect(amazonPrimeVideoGamesBody).toContain('until 10 June 2026')
    expect(amazonPrimeVideoGamesBody).toContain('did not offer a general refund')
    expect(amazonPrimeVideoGamesBody).toContain('remained available through the linked EA, GOG or Ubisoft account')
    expect(amazonPrimeVideoGamesBody).toContain('download save data for ninety days')
    expect(amazonPrimeVideoGamesBody).toContain('might not work on another platform')
  })

  it('includes useful links, takeaways and relevant related cases',()=>{
    expect(amazonPrimeVideoGamesBody).toContain('href="/what-is-community-intelligence"')
    expect(amazonPrimeVideoGamesBody).toContain('community-intelligence-audit')
    expect(amazonPrimeVideoGamesBody).toContain('Belief-Correction-388026b0422280249396c6fb9ec32a6d')
    expect(amazonPrimeVideoGamesBody).toContain('Narrative-Compression-388026b0422280178e89ee70e3aeb49e')
    expect(amazonPrimeVideoGamesBody).toContain('Hype-Hangover-388026b04222805e8508c7f3f434ba82')
    expect(amazonPrimeVideoGamesBody).toContain('What This Means')
    expect(amazonPrimeVideoGamesRelated).toEqual([
      'meta-glasses-monthly-charge-ownership',
      'squarespace-price-increase-community-intelligence',
      'hubspot-community-governance-product-decision',
    ])
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(amazonPrimeVideoGamesBody).not.toMatch(/[—™®]/)
    expect(amazonPrimeVideoGamesArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the original 16 by 9 cover image',()=>{
    const image=path.resolve('public/amazon-games-inside-prime-video.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(amazonPrimeVideoGamesArticle.imageWidth).toBe(1280)
    expect(amazonPrimeVideoGamesArticle.imageHeight).toBe(720)
  })
})
