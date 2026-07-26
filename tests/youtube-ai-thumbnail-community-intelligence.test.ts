import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  youtubeAiThumbnailArticle,
  youtubeAiThumbnailBody,
  youtubeAiThumbnailRelated,
} from '../lib/articles/youtube-ai-thumbnail-community-intelligence'

describe('YouTube AI thumbnail Community Intelligence article', () => {
  it('uses the requested production metadata', () => {
    expect(youtubeAiThumbnailArticle.slug).toBe('youtube-is-fighting-ai-slop-while-teaching-creators-to-make-more-ai-content')
    expect(youtubeAiThumbnailArticle.topic).toBe('Industry News')
    expect(youtubeAiThumbnailArticle.date).toBe('2026-07-26')
    expect(youtubeAiThumbnailArticle.draft).toBe(false)
    expect(youtubeAiThumbnailArticle.featured).toBe(true)
    expect(youtubeAiThumbnailArticle.readingMinutes).toBeGreaterThanOrEqual(7)
    expect(youtubeAiThumbnailArticle.readingMinutes).toBeLessThanOrEqual(9)
  })

  it('uses YouTube primary sources and accurate product language', () => {
    expect(youtubeAiThumbnailBody).toContain('https://blog.youtube/news-and-events/youtube-studio-custom-thumbnail-updates/')
    expect(youtubeAiThumbnailBody).toContain('https://support.google.com/youtube/answer/1311392?hl=en-GB')
    expect(youtubeAiThumbnailBody).toContain('Ask Studio')
    expect(youtubeAiThumbnailBody).toContain('long form videos')
    expect(youtubeAiThumbnailBody).toContain('does not say that every creator in every country can use it immediately')
    expect(youtubeAiThumbnailBody).toContain('not against AI itself')
  })

  it('includes the requested service and Community Intelligence links', () => {
    expect(youtubeAiThumbnailBody).toContain('href="/what-is-community-intelligence"')
    expect(youtubeAiThumbnailBody).toContain('services/community-intelligence-audit')
    expect(youtubeAiThumbnailBody).toContain('services/ai-authority-audit')
    expect(youtubeAiThumbnailBody).toContain('services/reddit-authenticity-risk-audit')
    expect(youtubeAiThumbnailRelated).toEqual([
      'reddit-is-using-ai-to-fight-ai-slop',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
      'what-streamer-university-teaches-us-about-community-intelligence',
    ])
  })

  it('contains no em dashes, trademark symbols or duplicate body title', () => {
    expect(youtubeAiThumbnailBody).not.toMatch(/[\u2014\u2122\u00ae]/)
    expect(youtubeAiThumbnailArticle.metaDescription).not.toMatch(/[\u2014\u2122\u00ae]/)
    expect(youtubeAiThumbnailBody).not.toContain('<h1')
    expect(youtubeAiThumbnailBody).not.toContain('Continue reading')
  })

  it('ships the unchanged attached cover image dimensions', () => {
    const image = path.resolve('public/youtube-ai-thumbnail-community-intelligence.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(youtubeAiThumbnailArticle.imageWidth).toBe(1280)
    expect(youtubeAiThumbnailArticle.imageHeight).toBe(704)
  })
})
