import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  openAiAgentOversightArticle,
  openAiAgentOversightBody,
  openAiAgentOversightRelated,
} from '../lib/articles/openai-agent-hugging-face-community-oversight'

describe('OpenAI agent and Hugging Face oversight case study', () => {
  it('uses the requested published metadata', () => {
    expect(openAiAgentOversightArticle.slug).toBe('openai-agent-hugging-face-community-oversight')
    expect(openAiAgentOversightArticle.type).toBe('Case Study')
    expect(openAiAgentOversightArticle.topic).toBe('Community Intelligence')
    expect(openAiAgentOversightArticle.date).toBe('2026-07-26')
    expect(openAiAgentOversightArticle.draft).toBe(false)
  })

  it('passes the central verification gate with both primary sources', () => {
    expect(openAiAgentOversightBody).toContain('https://huggingface.co/blog/security-incident-july-2026')
    expect(openAiAgentOversightBody).toContain('https://openai.com/index/hugging-face-model-evaluation-security-incident/')
    expect(openAiAgentOversightBody).toContain('compromised systems belonging to Hugging Face')
    expect(openAiAgentOversightBody).toContain('unauthorised access')
    expect(openAiAgentOversightBody).toContain('GPT 5.6 Sol')
    expect(openAiAgentOversightBody).toContain('more capable model that had not yet been released')
    expect(openAiAgentOversightBody).toContain('ExploitGym')
  })

  it('states disputed and preliminary details carefully', () => {
    expect(openAiAgentOversightBody).toContain('That part of the timeline remains disputed')
    expect(openAiAgentOversightBody).toContain('an FBI investigation has not been confirmed')
    expect(openAiAgentOversightBody).toContain('current account preliminary')
    expect(openAiAgentOversightBody).toContain('does not mean the models had human motives')
    expect(openAiAgentOversightBody).not.toContain('went rogue')
  })

  it('includes useful frameworks, internal links and related research', () => {
    expect(openAiAgentOversightBody).toContain('href="/what-is-community-intelligence"')
    expect(openAiAgentOversightBody).toContain('href="/community-intelligence-is-an-early-warning-system"')
    expect(openAiAgentOversightBody).toContain('community-intelligence-audit')
    expect(openAiAgentOversightBody).toContain('Belief-Correction-388026b0422280249396c6fb9ec32a6d')
    expect(openAiAgentOversightBody).toContain('Narrative-Compression-388026b0422280178e89ee70e3aeb49e')
    expect(openAiAgentOversightBody).toContain('href="/glossary/trust-collapse"')
    expect(openAiAgentOversightBody).toContain('What This Means')
    expect(openAiAgentOversightRelated).toEqual([
      'community-intelligence-is-an-early-warning-system',
      'reddit-is-using-ai-to-fight-ai-slop',
      'the-ai-evidence-layer-is-more-important-than-any-single-platform',
    ])
  })

  it('contains no em dashes, trademark symbols or duplicate body title', () => {
    expect(openAiAgentOversightBody).not.toMatch(/[\u2014\u2122\u00ae]/)
    expect(openAiAgentOversightArticle.metaDescription).not.toMatch(/[\u2014\u2122\u00ae]/)
    expect(openAiAgentOversightBody).not.toContain('<h1')
  })

  it('ships the original 16 by 9 cover image', () => {
    const image = path.resolve('public/openai-agent-hugging-face-community-oversight.jpg')
    expect(fs.existsSync(image)).toBe(true)
    expect(openAiAgentOversightArticle.imageWidth).toBe(1280)
    expect(openAiAgentOversightArticle.imageHeight).toBe(720)
  })
})
