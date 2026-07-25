import fs from 'node:fs'
import path from 'node:path'
import {describe,expect,it} from 'vitest'
import {
  facebookTikTokArticle,
  facebookTikTokBody,
  facebookTikTokRelated,
} from '../lib/articles/facebook-becoming-more-like-tiktok'

describe('Facebook TikTok style feed case study',()=>{
  it('uses the approved published metadata',()=>{
    expect(facebookTikTokArticle.slug).toBe('facebook-becoming-more-like-tiktok')
    expect(facebookTikTokArticle.type).toBe('Case Study')
    expect(facebookTikTokArticle.topic).toBe('Community Intelligence')
    expect(facebookTikTokArticle.date).toBe('2026-07-25')
    expect(facebookTikTokArticle.draft).toBe(false)
  })

  it('states the verified limits of the Meta test',()=>{
    expect(facebookTikTokBody).toContain('This is a test, not a full launch.')
    expect(facebookTikTokBody).toContain('a subset of people')
    expect(facebookTikTokBody).toContain('Meta has not named those countries.')
    expect(facebookTikTokBody).toContain('able to opt out')
    expect(facebookTikTokBody).toContain('not a confirmed permanent default')
  })

  it('includes the requested frameworks, summary and related content',()=>{
    expect(facebookTikTokBody).toContain('href="/what-is-community-intelligence"')
    expect(facebookTikTokBody).toContain('href="/what-is-community-gravity"')
    expect(facebookTikTokBody).toContain('Belief-Correction-388026b0422280249396c6fb9ec32a6d')
    expect(facebookTikTokBody).toContain('Narrative-Compression-388026b0422280178e89ee70e3aeb49e')
    expect(facebookTikTokBody).toContain('What This Means')
    expect(facebookTikTokRelated).toHaveLength(3)
  })

  it('contains no em dashes or trademark symbols',()=>{
    expect(facebookTikTokBody).not.toMatch(/[—™®]/)
    expect(facebookTikTokArticle.metaDescription).not.toMatch(/[—™®]/)
  })

  it('ships the original 16 by 9 cover image',()=>{
    const image=path.resolve('public/facebook-becoming-more-like-tiktok.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(facebookTikTokArticle.imageWidth).toBe(1280)
    expect(facebookTikTokArticle.imageHeight).toBe(720)
  })
})
