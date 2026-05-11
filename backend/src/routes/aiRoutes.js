import { Router } from 'express'
import { z } from 'zod'
import { analyzeVideo, localizeHook, rewriteHook } from '../services/openaiService.js'

const router = Router()

const optionalText = (max) => z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().max(max).optional(),
)

const analyzeSchema = z.object({
  title: optionalText(160),
  description: optionalText(4000),
  videoUrl: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().url().max(500).optional(),
  ),
  niche: optionalText(160),
  targetAudience: optionalText(240),
  originalHook: optionalText(240),
  transcript: optionalText(6000),
  hashtags: optionalText(500),
  postingTime: optionalText(120),
  videoLength: optionalText(80),
  views: optionalText(40),
  likes: optionalText(40),
  comments: optionalText(40),
  shares: optionalText(40),
  saves: optionalText(40),
  avgWatchTime: optionalText(80),
  retentionPercent: optionalText(40),
  thumbnailNotes: optionalText(1000),
  competitorLinks: optionalText(1500),
  pastWinners: optionalText(2000),
  platform: z.enum(['TikTok', 'YouTube Shorts', 'Instagram Reels']),
  uploadMethod: z.enum(['Manual Upload', 'API Upload', 'Scheduler Tool']),
  ctaIntensity: z.enum(['Low', 'Medium', 'Aggressive']),
}).refine((data) => data.title || data.description || data.videoUrl || data.transcript || data.originalHook, {
  message: 'Add a video link, title, or description to analyze.',
  path: ['videoUrl'],
})

const hookSchema = z.object({
  hook: z.string().min(3).max(240),
  style: z.enum(['Curiosity', 'Gen-Z', 'Luxury', 'Ragebait', 'Emotional', 'Storytelling']),
})

const localizedHookSchema = z.object({
  hook: z.string().min(3).max(240),
  audience: z.enum(['USA Gen-Z', 'UK', 'Pakistan Gen-Z', 'Dubai', 'India', 'Spanish-speaking audience']),
})

router.post('/analyze', async (req, res, next) => {
  try {
    const input = analyzeSchema.parse(req.body)
    const analysis = await analyzeVideo(input)
    res.json(analysis)
  } catch (error) {
    next(error)
  }
})

router.post('/rewrite-hook', async (req, res, next) => {
  try {
    const input = hookSchema.parse(req.body)
    const result = await rewriteHook(input)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/localize-hook', async (req, res, next) => {
  try {
    const input = localizedHookSchema.parse(req.body)
    const result = await localizeHook(input)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
