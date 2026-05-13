import { Router } from 'express'
import { z } from 'zod'
import { analyzeVideo, localizeHook, rewriteHook } from '../services/openaiService.js'

const router = Router()

const analyzeSchema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().min(5).max(4000),
  platform: z.enum(['TikTok', 'YouTube Shorts', 'Instagram Reels']),
  uploadMethod: z.enum(['Manual Upload', 'API Upload', 'Scheduler Tool']),
  ctaIntensity: z.enum(['Low', 'Medium', 'Aggressive']),
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
